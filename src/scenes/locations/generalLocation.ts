import * as Phaser from 'phaser';

import { Player, playerInstance } from '../../characters/adventurers/player';
import Item from '../../entities/item';
import {
  DEBUG, GAME_H, GAME_W, PLAYER_RUN_WORLD_SPEED, PLAYER_WORLD_SPEED,
} from '../../config/constants';
import messages from '../../data/messages';
import Container from '../../triggers/container';
import Trigger from '../../triggers/trigger';
import prepareLog from '../../helpers/logger';
import { SpriteParameters, TiledObjectProp } from '../../types/my-types';
import EnemyTrigger from '../../triggers/enemyTrigger';
import drawInterface from './drawInterfaceButtons';

export default class GeneralLocation extends Phaser.Scene {
  public player: Player;
  public keys: { [key: string]: any };
  public layers: Phaser.Tilemaps.TilemapLayer[];
  public map: Phaser.Tilemaps.Tilemap;
  public prevSceneKey: string;
  public triggers: Trigger[];
  public spaceBarCooldown: number;
  public offsetX: number;
  public offsetY: number;
  private startPoint: { x: number; y: number };
  public playerImage: Phaser.Physics.Arcade.Sprite;
  private playerSpeed: number;
  private lastCursor: string;
  private objectsHighlightBorders: Phaser.GameObjects.Group;
  protected cursorCoordinatesText: Phaser.GameObjects.Text;
  public somethingTriggered: boolean;
  private abovePlayerTextTween: Phaser.Tweens.Tween;
  private levelUpIcon: Phaser.GameObjects.Sprite;

  constructor(sceneSettings: Phaser.Types.Scenes.SettingsConfig) {
    super(sceneSettings);
    this.triggers = [];
    this.spaceBarCooldown = 0;
    this.playerSpeed = PLAYER_WORLD_SPEED;
    this.lastCursor = 'down';
    this.somethingTriggered = false;
  }

  preload() {
    this.load.scenePlugin({
      key: 'AnimatedTiles',
      url: './plugins/AnimatedTiles.js',
      systemKey: 'animatedTiles',
    });
  }

  public init(data: { toCoordinates: { x: number, y: number } }) {
    if (data.toCoordinates && data.toCoordinates.x !== -1) {
      this.startPoint = {
        x: data.toCoordinates.x * 32,
        y: data.toCoordinates.y * 32,
      };
    }
  }

  public create(mapKey: string) {
    this.map = this.make.tilemap({ key: mapKey });
    this.offsetX = this.map.widthInPixels < GAME_W ? (GAME_W - this.map.widthInPixels) / 2 : 0;
    this.offsetY = this.map.heightInPixels < GAME_H ? (GAME_H - this.map.heightInPixels) / 2 : 0;

    this.player = playerInstance;
    const startObject = this.getMapObject('Start');
    if (!this.startPoint && startObject) {
      this.startPoint = {
        x: startObject.x,
        y: startObject.y,
      };
    }
    if (this.startPoint) {
      this.playerImage = this.physics.add.sprite(
        this.startPoint.x + this.offsetX,
        this.startPoint.y + this.offsetY,
        this.player.worldImageSpriteParams.texture,
        this.player.worldImageSpriteParams.frame,
      );
      this.playerImage.setOrigin(0, 0).setDepth(1);
      this.playerImage.anims.play('idle_down');
      this.playerImage.setCollideWorldBounds(true);

      this.playerImage.body.setSize(32, 32).setOffset(32, 48);

      this.keys = this.input.keyboard.addKeys('W,S,A,D,left,right,up,down,space');

      const camera = this.cameras.main;
      camera.startFollow(this.playerImage);
      camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
      camera.setDeadzone(200, 100);
      drawInterface(this);
    }

    const tilesets: Phaser.Tilemaps.Tileset[] = [];
    this.map.tilesets.forEach((tileset) => {
      tilesets.push(this.map.addTilesetImage(tileset.name, tileset.name));
    });

    this.layers = [];
    this.map.layers.forEach((layer) => {
      const createdLayer = this.map.createLayer(layer.name, tilesets, this.offsetX, this.offsetY);

      if (layer.alpha !== 1) createdLayer.setAlpha(layer.alpha);
      this.layers.push(createdLayer);
      // lol kek if there is no props then it is an object, otherwise - array.. Phaser bug?
      if (Array.isArray(layer.properties) && layer.properties.find((prop: any) => prop.name === 'hasCollisions' && prop.value === true)) {
        createdLayer.setCollisionByProperty({ collides: true });
        this.setSidesCollisions(createdLayer.layer);
        this.physics.add.collider(this.playerImage, createdLayer);
      }
      if (Array.isArray(layer.properties) && layer.properties.find((prop: any) => prop.name === 'fringe')) {
        createdLayer.setDepth(1);
      }
    });

    this.map.getObjectLayer('Doors/Doors Objects')?.objects.forEach((object) => {
      const spriteParams = this.getSpriteParamsByObjectName(object.name, 'Doors/Doors Objects');
      // Todo: there must be a better way to do that but I am way too tired now to find it...
      const trigger = new Trigger({
        scene: this,
        name: object.name,
        triggerX: object.x,
        triggerY: object.y,
        triggerW: object.width,
        triggerH: object.height,
        texture: spriteParams.texture,
        frame: spriteParams.frame,
        interaction: 'activate',
        callback: () => {
          trigger.setDisableState(true);
          trigger.image.disableBody();
          this.layers.find((layer) => layer.layer.name === 'Doors/Doors Fringe')
            .getTileAtWorldXY(trigger.image.x + 16, trigger.image.y - 16)
            .setVisible(false);
          trigger.image.anims.play('open_door');
          trigger.image.y -= 64;
          trigger.image.body.setOffset(0, 64);
        },
      });
    });

    this.map.getObjectLayer('Containers')?.objects.forEach((object) => {
      const spriteParams = this.getSpriteParamsByObjectName(object.name, 'Containers');
      const { texture } = spriteParams;
      const frame = spriteParams.frame as number;
      const emptyFrame = object.properties?.find((prop: TiledObjectProp) => prop.name === 'openedFrame')?.value;
      const isSecret = object.properties?.find((prop: TiledObjectProp) => prop.name === 'secret')?.value;
      const items = JSON.parse(
        object.properties?.find((prop: TiledObjectProp) => prop.name === 'items')?.value,
      ) as { itemId: string, quantity: number }[];
      const disableWhenEmpty = object.properties?.find((prop: TiledObjectProp) => prop.name === 'disableWhenEmpty')?.value;
      const requiresToOpen = object.properties?.find((prop: TiledObjectProp) => prop.name === 'requiresToOpen')?.value;
      const instantPickup = object.properties?.find((prop: TiledObjectProp) => prop.name === 'instantPickup')?.value;

      new Container({
        scene: this,
        triggerX: object.x,
        triggerY: object.y,
        triggerW: object.width,
        triggerH: object.height,
        name: object.name,
        items: items.map((itemDescription) => new Item(itemDescription.itemId, itemDescription.quantity)),
        texture,
        frame,
        isSecret,
        emptyTexture: texture,
        emptyFrame,
        flipX: object.flippedHorizontal,
        flipY: object.flippedVertical,
        disableWhenEmpty,
        requiresToOpen,
        instantPickup,
      });
    });

    this.map.getObjectLayer('Enemies')?.objects.forEach((object) => {
      const enemyImage = object.properties?.find((prop: TiledObjectProp) => prop.name === 'image')?.value;
      const enemies = JSON.parse(object.properties.find((prop: TiledObjectProp) => prop.name === 'enemies')?.value) as { 'type': string }[];
      const background = object.properties.find((prop: TiledObjectProp) => prop.name === 'background')?.value || 'field-background';
      const drop = JSON.parse(object.properties.find((prop: TiledObjectProp) => prop.name === 'drop')?.value || '[]') as { 'itemId': string, 'quantity': number, 'chance': number }[];
      const xpReward = object.properties?.find((prop: TiledObjectProp) => prop.name === 'xpReward')?.value ?? 0;
      new EnemyTrigger({
        scene: this,
        name: object.name,
        triggerX: object.x,
        triggerY: object.y,
        triggerW: object.width,
        triggerH: object.height,
        spriteParameters: { texture: enemyImage, frame: null },
        enemies,
        drop,
        xpReward,
        background,
      });
    });

    this.map.getObjectLayer('Waypoints')
      ?.objects
      .forEach((object) => {
        const toLocation = object.properties?.find((prop: TiledObjectProp) => prop.name === 'location')?.value;
        let toCoordinates = object.properties?.find((prop: TiledObjectProp) => prop.name === 'toCoordinates')?.value;
        if (toCoordinates) toCoordinates = JSON.parse(toCoordinates);
        new Trigger({
          scene: this,
          name: object.name,
          triggerX: object.x,
          triggerY: object.y,
          triggerW: object.width,
          triggerH: object.height,
          interaction: 'activateOverlap',
          callback: () => {
            if (toLocation) {
              this.switchToScene(toLocation, undefined, undefined, toCoordinates);
            } else if (toCoordinates) {
              this.playerImage.setPosition(toCoordinates.x * 32 + this.offsetX, toCoordinates.y * 32 + this.offsetY);
            }
          },
        });
      });

    this.map.getObjectLayer('Messages')
      ?.objects
      .forEach((object) => {
        const messageId = object.properties?.find((prop: TiledObjectProp) => prop.name === 'messageId')?.value;
        const messageText = messages[messageId];
        const interaction = object.properties?.find((prop: TiledObjectProp) => prop.name === 'interaction')?.value;
        const singleUse = object.properties?.find((prop: TiledObjectProp) => prop.name === 'singleUse')?.value;
        new Trigger({
          scene: this,
          name: object.name,
          triggerX: object.x,
          triggerY: object.y,
          triggerW: object.width,
          triggerH: object.height,
          texture: this.getSpriteParamsByObjectName(object.name, 'Messages')?.texture,
          frame: this.getSpriteParamsByObjectName(object.name, 'Messages')?.frame,
          interaction,
          singleUse,
          callback: () => {
            this.switchToScene('Dialog', {
              dialogTree: [{
                id: 'message',
                text: messageText,
                replies: [{
                  text: '(End)',
                  callbackParam: 'fastEnd',
                }],
              }],
              speakerName: object.name,
            }, false);
          },
        });
      });

    // @ts-ignore
    this.sys.animatedTiles.init(this.map);

    this.physics.world.setBounds(this.offsetX, this.offsetY, this.map.widthInPixels, this.map.heightInPixels);

    this.levelUpIcon = this.add.sprite(this.playerImage.x, this.playerImage.y, 'icons', 'icons/pointers-and-arrows/green-up-arrow')
      .setOrigin(0, 1)
      .setVisible(false);
    this.levelUpIcon.setInteractive({ useHandCursor: true });
    this.levelUpIcon.on('pointerdown', () => this.switchToScene('LevelUpScreen', {}, false));

    this.events.on('resume', (scene: GeneralLocation, data: any) => {
      if (data?.defeatedEnemy) {
        this.player.defeatedEnemies.push(`${mapKey}/${data.defeatedEnemy}`);
        const trigger = this.triggers.find((trigger) => trigger.name === data.defeatedEnemy);
        trigger?.destroy();
        if (trigger && (trigger instanceof EnemyTrigger)) {
          trigger.drop?.forEach((dropped) => {
            const shouldDrop = !(Math.random() > dropped.chance);
            if (shouldDrop) {
              this.createDroppedItem(dropped.itemId, dropped.quantity);
            }
          });
          if (trigger.xpReward !== 0) {
            this.player.addXp(trigger.xpReward);
            this.showTextAbovePlayer(`${trigger.xpReward} XP!`, 2000);
          }
        }
      }
      if (data?.droppedItems) {
        data.droppedItems.forEach((droppedItem: any) => this.createDroppedItem(droppedItem));
      }
      if (data?.switchToScene) {
        this.switchToScene(data.switchToScene, data.data);
      }
    });

    this.events.on('wake', (scene: any, data: any) => {
      if (data?.toCoordinates && data.toCoordinates.x !== -1) {
        this.playerImage.setPosition(data.toCoordinates.x * 32 + this.offsetX, data.toCoordinates.y * 32 + this.offsetY);
      }
      if (this.objectsHighlightBorders) this.objectsHighlightBorders.clear(true, true);

      this.playerSpeed = PLAYER_WORLD_SPEED;
      this.playerImage.play(`idle_${this.lastCursor}`);
    });

    this.setupAttackKey();

    this.setupRunKey();

    this.setupDebugCollisionGraphics();
  }

  public createDroppedItem(item: Item | string, quantity = 1): Trigger {
    if (typeof item === 'string') {
      item = new Item(item, quantity);
    }
    // TODO: name must be unique
    const droppedItemTrigger = new Trigger({
      scene: this,
      name: item.displayName,
      triggerX: this.playerImage.x,
      triggerY: this.playerImage.y,
      triggerW: 32,
      triggerH: 32,
      offsetX: 0,
      offsetY: 0,
      texture: item.sprite.texture,
      frame: item.sprite.frame,
      interaction: 'activate',
      singleUse: false,
      callback: () => {
        const itemInInventory = this.player.addItemToInventory(item);
        if (itemInInventory !== undefined) {
          this.showTextAbovePlayer(`${itemInInventory.displayName} (${quantity})`);
          droppedItemTrigger.destroy();
        }
      },
    });
    return droppedItemTrigger;
  }

  public getSpriteParamsByObjectName(objectName: string, objectLayer = 'Objects'): SpriteParameters | undefined {
    const { gid } = this.getMapObject(objectName, objectLayer);
    for (let i = 0; i < this.map.tilesets.length; i += 1) {
      const tileset = this.map.tilesets[i];
      if (gid >= tileset.firstgid && gid < tileset.firstgid + tileset.total) {
        let animKey;
        // @ts-ignore
        if (tileset.tileData[gid - tileset.firstgid]?.animation) {
          // @ts-ignore
          console.log('Found animation', tileset.tileData[gid - tileset.firstgid].animation);
          animKey = this._createAnimationFromTiled(
            tileset.image.key,
            gid - tileset.firstgid,
            // @ts-ignore
            tileset.tileData[gid - tileset.firstgid].animation,
          );
        }
        return {
          texture: tileset.name,
          frame: gid - tileset.firstgid,
          animation: animKey,
        };
      }
    }
    return undefined;
  }

  private _createAnimationFromTiled(tilesetImageKey: string, gid: number, tiledAnimation: { duration: number, tileid: number }[]): string {
    const phaserAnimationFrames = tiledAnimation.map((tiledFrame) => ({
      key: tilesetImageKey,
      frame: tiledFrame.tileid,
      duration: tiledFrame.duration,
    }));
    this.anims.create({
      key: tilesetImageKey + gid,
      frames: phaserAnimationFrames,
      repeat: -1,
    });
    return tilesetImageKey + gid;
  }

  private setSidesCollisions(layer: Phaser.Tilemaps.LayerData) {
    for (let ty = 0; ty < layer.height; ty += 1) {
      for (let tx = 0; tx < layer.width; tx += 1) {
        const tile = layer.data[ty][tx];

        if (tile?.properties.collideSides) {
          const directions = JSON.parse(tile.properties.collideSides);
          if ((tx !== 0) && directions.includes('left') && !layer.data[ty][tx - 1].collideRight) {
            tile.setCollision(true, tile.collideRight, tile.collideUp, tile.collideDown, false);
            layer.data[ty][tx - 1].setCollision(
              layer.data[ty][tx - 1].collideLeft,
              true,
              layer.data[ty][tx - 1].collideUp,
              layer.data[ty][tx - 1].collideDown,
              false,
            );
          }
          if ((tx !== layer.width - 1) && directions.includes('right') && !layer.data[ty][tx + 1].collideLeft) {
            tile.setCollision(tile.collideLeft, true, tile.collideUp, tile.collideDown, false);
            layer.data[ty][tx + 1].setCollision(
              true,
              layer.data[ty][tx + 1].collideRight,
              layer.data[ty][tx + 1].collideUp,
              layer.data[ty][tx + 1].collideDown,
              false,
            );
          }
          if ((ty !== 0) && directions.includes('up') && !layer.data[ty - 1][tx].collideDown) {
            tile.setCollision(tile.collideLeft, tile.collideRight, true, tile.collideDown, false);
            layer.data[ty - 1][tx].setCollision(
              layer.data[ty - 1][tx].collideLeft,
              layer.data[ty - 1][tx].collideRight,
              layer.data[ty - 1][tx].collideUp,
              true, false,
            );
          }
          if ((ty !== layer.height - 1) && directions.includes('down') && !layer.data[ty + 1][tx].collideUp) {
            tile.setCollision(tile.collideLeft, tile.collideRight, tile.collideUp, true, false);
            layer.data[ty + 1][tx].setCollision(
              layer.data[ty + 1][tx].collideLeft,
              layer.data[ty + 1][tx].collideRight,
              true,
              layer.data[ty + 1][tx].collideDown,
              false,
            );
          }
        }
      }
    }
  }

  public getMapObject(objectName: string, objectLayer = 'Objects'): Phaser.Types.Tilemaps.TiledObject {
    const object = this.map.findObject(objectLayer, (obj) => obj.name === objectName);
    if (!object) console.log(`Object ${objectName} was not found on ${objectLayer} layer!`);
    return object;
  }

  public update() {
    this.updatePlayer();
    if (DEBUG) {
      const cursorX = Math.round(this.input.mousePointer.x);
      const cursorY = Math.round(this.input.mousePointer.y);
      if (this.cursorCoordinatesText) {
        this.cursorCoordinatesText.setText(`${cursorX} ${cursorY}`);
      } else {
        this.cursorCoordinatesText = this.add.text(0, 0, `${cursorX} ${cursorY}`, {
          color: 'black',
          backgroundColor: '#f0d191',
        })
          .setDepth(1000)
          .setScrollFactor(0)
          .setOrigin(0, 0);
      }
    }
  }

  public setupDebugCollisionGraphics() {
    let debugModeOn = false;
    const debugGraphicsGroup = this.add.group();
    this.layers.forEach((layer) => {
      const debugGraphics = this.add.graphics()
        .setAlpha(0.25);
      if (
        Array.isArray(layer.layer.properties)
        && layer.layer.properties.find((prop: any) => prop.name === 'hasCollisions' && prop.value === true)
      ) {
        layer.renderDebug(debugGraphics, {
          tileColor: null,
          collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
          faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
        });
      }
      debugGraphicsGroup.add(debugGraphics);
    });
    debugGraphicsGroup.setVisible(debugModeOn);

    this.input.keyboard.off('keyup-F1');
    this.input.keyboard.on('keyup-F1', () => {
      debugModeOn = !debugModeOn;
      debugGraphicsGroup.setVisible(debugModeOn);
    });
    this.input.keyboard.off('keyup-F2');
    this.input.keyboard.on('keyup-F2', () => {
      console.log(this);
      console.log(this.player);
    });
  }

  public switchToScene(sceneKey: string, data: object = {}, shouldSleep = true, toCoordinates: { x: number, y: number } = null) {
    console.log(...prepareLog(`Switching from ??${this.scene.key} to ??${sceneKey}. Should ??${this.scene.key} turn off !!(sleep): !!${shouldSleep}`));
    console.log(`Data passed to ${sceneKey}:`, data);
    // TODO: figure out proper way to stop player from sticky controls - caused by scene pausing...
    // further investigation - confirmed in FF, dunno about other browsers. If take away focus from the window and back - no bug.
    // still dont know how to fix properly..
    // this event handler should not be here (it actually should not exist at all) but keeping it here for easier port of the fix..
    // NEW INFO - apparently this does the fix, though mechanisms changed since it was detected so not sure, keeping old solution just in case
    this.input.keyboard.resetKeys();
    // if (this.keys) Object.values(this.keys).forEach(key => key.isDown = false);

    if (sceneKey === this.scene.key) {
      throw new Error(`Trying to switch to scene while already being there: ${sceneKey}`);
    }

    if (shouldSleep) {
      this.scene.sleep(this.scene.key);
    } else {
      this.scene.pause(this.scene.key);
    }
    this.scene.run(sceneKey, {
      ...data,
      prevScene: this.scene.key,
      toCoordinates,
    });
  }

  public updatePlayer() {
    const up = this.keys.up.isDown || this.keys.W.isDown;
    const down = this.keys.down.isDown || this.keys.S.isDown;
    const right = this.keys.right.isDown || this.keys.D.isDown;
    const left = this.keys.left.isDown || this.keys.A.isDown;

    this.playerImage.setVelocity(0);

    const isAttackAnimPlaying = this.playerImage.anims.isPlaying && this.playerImage.anims.getName()
      .includes('attack');

    if (!isAttackAnimPlaying) {
      if (this.lastCursor && !up && !down && !right && !left) {
        this.playerImage.play(`idle_${this.lastCursor}`, true);
      }

      if (up) {
        this.playerImage.setVelocityY(-this.playerSpeed);
      } else if (down) {
        this.playerImage.setVelocityY(this.playerSpeed);
      }

      if (right) {
        this.playerImage.setVelocityX(this.playerSpeed);
      } else if (left) {
        this.playerImage.setVelocityX(-this.playerSpeed);
      }

      this.playerImage.body.velocity.normalize()
        .scale(this.playerSpeed);

      if (up || (up && right) || (up && left)) {
        this.playerImage.play('walk_up', true);
        this.lastCursor = 'up';
      } else if (down || (down && right) || (down && left)) {
        this.playerImage.play('walk_down', true);
        this.lastCursor = 'down';
      }
      if (right && !up && !down) {
        this.playerImage.play('walk_right', true);
        this.lastCursor = 'right';
      } else if (left && !up && !down) {
        this.playerImage.play('walk_left', true);
        this.lastCursor = 'left';
      }
    }
    if (this.player.readyForLevelUp) {
      if (!this.levelUpIcon.visible) this.levelUpIcon.setVisible(true);
      this.levelUpIcon.setPosition(this.playerImage.x, this.playerImage.y);
    } else if (this.levelUpIcon.visible) this.levelUpIcon.setVisible(false);
  }

  private setupRunKey() {
    this.input.keyboard.off('keyup-Q');
    this.input.keyboard.on('keyup-Q', () => {
      if (this.playerSpeed === PLAYER_RUN_WORLD_SPEED) {
        this.playerSpeed = PLAYER_WORLD_SPEED;
      } else {
        this.playerSpeed = PLAYER_RUN_WORLD_SPEED;
      }
    });
  }

  private setupAttackKey() {
    this.input.keyboard.off('keydown-E');
    this.input.keyboard.on('keydown-E', () => {
      const isWalkAnimPlaying = this.playerImage.anims.isPlaying && this.playerImage.anims.getName()
        .includes('walk');
      const isAttackAnimPlaying = this.playerImage.anims.isPlaying && this.playerImage.anims.getName()
        .includes('attack');
      if (!isWalkAnimPlaying && !isAttackAnimPlaying) {
        this.playerImage.anims.play(`attack_${this.lastCursor}`, true);
      }
    });
  }

  public showTextAbovePlayer(text: string, duration = 1000) {
    const textObj = this.add.text(this.playerImage.x + 16, this.playerImage.y, text, {
      color: 'black',
      fontStyle: 'bold',
    })
      .setDepth(10)
      .setOrigin(0.5, 0.5);
    let delay = 0;
    if (this.abovePlayerTextTween) {
      delay = 500;
    }
    this.abovePlayerTextTween = this.add.tween({
      targets: textObj,
      y: {
        from: this.playerImage.y,
        to: this.playerImage.y - 50,
      },
      ease: 'Linear',
      delay,
      duration,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        textObj.destroy();
        this.abovePlayerTextTween = undefined;
      },
    });
  }
}
