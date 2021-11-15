import * as Phaser from 'phaser';
// @ts-ignore
import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick';

import { Player, playerInstance } from '../../characters/adventurers/player';
import Item from '../../entities/item';
import {
  GAME_H, LOCATION_SCENE_CAMERA_ZOOM, PLAYER_RUN_WORLD_SPEED, PLAYER_WORLD_SPEED,
} from '../../config/constants';
import Trigger from '../../triggers/trigger';
import prepareLog from '../../helpers/logger';
import { SpriteParameters } from '../../types/my-types';
import EnemyTrigger from '../../triggers/enemyTrigger';
import BackgroundSoundScene from '../backgroundSoundScene';
import populateLocationFromTiled from './tiledMapParser';

export default class GeneralLocation extends Phaser.Scene {
  public player: Player;
  public keys: { [key: string]: any };
  public layers: Phaser.Tilemaps.TilemapLayer[] = [];
  public map: Phaser.Tilemaps.Tilemap;
  public prevSceneKey: string;
  public currSceneKey: string;
  public triggers: Trigger[];
  public spaceBarCooldown: number;
  public offsetX: number;
  public offsetY: number;
  startPoint: { x: number; y: number };
  public playerImage: Phaser.Physics.Arcade.Sprite;
  private playerSpeed: number;
  private lastCursor: string;
  private objectsHighlightBorders: Phaser.GameObjects.Group;
  protected cursorCoordinatesText: Phaser.GameObjects.Text;
  public somethingTriggered: boolean;
  private abovePlayerTextTween: Phaser.Tweens.Tween;
  private levelUpIcon: Phaser.GameObjects.Sprite;
  private joyStick: VirtualJoystick;
  private updatePlayerMovement: boolean;
  public playerLight: Phaser.GameObjects.Light;

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
    this.player = playerInstance;
    this.updatePlayerMovement = true;
    this.playerImage = this.physics.add.sprite(0, 0, null);

    // Helper function which reads all layers and objects from Tiled Map and creates Phaser Map and Game Objects
    populateLocationFromTiled.apply(this, [mapKey]);

    if (this.startPoint) {
      // -32 + 8 is an adjustment for player image and body, as well as +8 to center it in the cell
      this.playerImage.setPosition(this.startPoint.x + this.offsetX - 32 + 8, this.startPoint.y + this.offsetY - 48 + 8);
      this.playerImage.setTexture(this.player.worldImageSpriteParams.texture, this.player.worldImageSpriteParams.frame);
      this.playerImage.setOrigin(0, 0).setDepth(1);
      this.playerImage.anims.play('idle_down');
      this.playerImage.setCollideWorldBounds(true);

      this.playerImage.body.setSize(16, 16).setOffset(32, 48);

      this.keys = this.input.keyboard.addKeys('W,S,A,D,left,right,up,down,space');

      const camera = this.cameras.main;
      camera.startFollow(this.playerImage);
      camera.setBounds(0, 0, this.offsetX * 2 + this.map.widthInPixels, this.offsetY * 2 + this.map.heightInPixels);
      camera.zoom = LOCATION_SCENE_CAMERA_ZOOM;
      camera.setDeadzone(100, 50);

      this.scene.launch('WorldMapUIScene', this);
      const backgroundSoundScene = this.scene.get('BackgroundSound') as BackgroundSoundScene;
      backgroundSoundScene.playBackgroundMusic('world');
    }

    this.physics.world.setBounds(this.offsetX, this.offsetY, this.map.widthInPixels, this.map.heightInPixels);

    this.levelUpIcon = this.add.sprite(this.playerImage.x, this.playerImage.y, 'icons', 'icons/pointers-and-arrows/green-up-arrow')
      .setOrigin(0, 1)
      .setVisible(false);
    this.levelUpIcon.setInteractive({ useHandCursor: true });
    this.levelUpIcon.on('pointerdown', () => this.switchToScene('LevelUpScreen', {}, false));

    this.events.on('resume', (scene: GeneralLocation, data: any) => {
      this.scene.launch('WorldMapUIScene', this);
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
      if (data?.fishingObjectName) {
        const fishingTrigger = this.triggers.find((trigger) => trigger.name === data.fishingObjectName);
        fishingTrigger.image.setTexture('icons', 'icons/icons-and-status-effects/sleeping');
        fishingTrigger.additionalData.caughtAt = Date.now();
        fishingTrigger.setDisableState(true);
        this.showTextAbovePlayer('Caught one!');
      }
    });

    this.events.on('wake', (scene: any, data: any) => {
      this.scene.launch('WorldMapUIScene', this);
      if (data?.toCoordinates && data.toCoordinates.x !== -1) {
        // -32 + 8 is an adjustment for player image and body, as well as +8 to center it in the cell
        this.playerImage.setPosition(data.toCoordinates.x * 32 + this.offsetX - 32 + 8, data.toCoordinates.y * 32 + this.offsetY - 48 + 8);
      }
      if (this.objectsHighlightBorders) this.objectsHighlightBorders.clear(true, true);

      this.playerSpeed = PLAYER_WORLD_SPEED;
      this.playerImage.play(`idle_${this.lastCursor}`);
    });

    this.setupAttackKey();

    this.setupRunKey();

    this.setupDebugCollisionGraphics();

    this.setupMobileControls();

    if (this.input.gamepad.total === 0) {
      this.input.gamepad.once('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
        this.setupControllerControls(pad);
      });
    } else {
      this.setupControllerControls(this.input.gamepad.pad1);
    }
  }

  // This function contains actual cutscene actions and will be implemented in child scene
  // eslint-disable-next-line no-empty-function,@typescript-eslint/no-unused-vars
  protected async performSpecificCutsceneActions(cutsceneId: string): Promise<void> { }

  /**
   * @param cutsceneId - cutscene key to fetch custom data for the corresponding cutscene
   */
  public async performGeneralCutsceneActions(cutsceneId: string) {
    // Execute common cutscene actions:
    // First, disable player controls:
    this.togglePlayerMovement(true);
    // Now lets widen the camera and await until its done before continue
    await this.changeCameraFormat('widenCameraFormat', 100, 2, 1500);
    // We are ready to play cutscene, lets pass control to actual Location to show cutscene actions:
    await this.performSpecificCutsceneActions(cutsceneId);
    // Child scene is done with cutscene, lets return everything to normal:
    // Start with restoring the camera
    await this.changeCameraFormat('restoreCameraFormat', 100, 2, 1500);
    // And finally return control to the player:
    this.togglePlayerMovement(false);
  }

  private togglePlayerMovement(disableMovement: boolean) {
    this.updatePlayerMovement = !disableMovement;
    const parts = this.playerImage.anims.currentAnim.key.split('_');
    if (parts.length !== null) {
      this.playerImage.anims.play(`idle_${parts[1]}`);
    }
  }

  private async changeCameraFormat(type: 'widenCameraFormat' | 'restoreCameraFormat', changeViewportHeight: number, zoomNumber: number, tweenDuration: number): Promise<void> {
    if (type !== 'widenCameraFormat' && type !== 'restoreCameraFormat') {
      console.log(`${type} is not a valid argument`);
      return;
    }

    let camHeight = this.cameras.main.height;
    if (type === 'widenCameraFormat') {
      camHeight -= (changeViewportHeight * zoomNumber);
    } else if (type === 'restoreCameraFormat') {
      camHeight += (changeViewportHeight * zoomNumber);
    }
    const toHeight = camHeight;
    await new Promise<void>((resolve) => {
      this.tweens.add({
        targets: this.cameras.main,
        y: type === 'widenCameraFormat' ? changeViewportHeight : 0,
        height: toHeight,
        zoom: zoomNumber,
        duration: tweenDuration,
        ease: 'Power2',
        onComplete: () => resolve(),
      });
    });
  }

  public createDroppedItem(item: Item | string, quantity = 1): Trigger {
    if (typeof item === 'string') {
      item = new Item(item, quantity);
    }
    // TODO: name must be unique
    const droppedItemTrigger = new Trigger({
      scene: this,
      name: item.displayName,
      triggerX: this.playerImage.x + this.playerImage.width / 4,
      triggerY: this.playerImage.y + this.playerImage.height / 4,
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
          this.showTextAbovePlayer(`${itemInInventory.displayName} (${itemInInventory.quantity})`);
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

  setSidesCollisions(layer: Phaser.Tilemaps.LayerData) {
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
    this.updateFishingSpots();

    if (this.playerLight) {
      this.playerLight.x = this.playerImage.getCenter().x;
      this.playerLight.y = this.playerImage.getCenter().y;
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

    this.currSceneKey = sceneKey;
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
    this.scene.stop('WorldMapUIScene');
  }

  public updatePlayer() {
    if (!this.updatePlayerMovement) return;

    let upStick = false;
    let downStick = false;
    let rightStick = false;
    let leftStick = false;

    if (this.input.gamepad.total !== 0) {
      const pad = this.input.gamepad.getPad(0);
      rightStick = pad.axes[0].getValue() > 0.5;
      leftStick = pad.axes[0].getValue() < -0.5;
      downStick = pad.axes[1].getValue() > 0.5;
      upStick = pad.axes[1].getValue() < -0.5;
    }

    const up = this.keys.up.isDown || this.keys.W.isDown || this.joyStick?.up || upStick;
    const down = this.keys.down.isDown || this.keys.S.isDown || this.joyStick?.down || downStick;
    const right = this.keys.right.isDown || this.keys.D.isDown || this.joyStick?.right || rightStick;
    const left = this.keys.left.isDown || this.keys.A.isDown || this.joyStick?.left || leftStick;

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
    } else if (this.levelUpIcon.visible) {
      this.levelUpIcon.setVisible(false);
    }
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

  private setupMobileControls() {
    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS || this.sys.game.device.os.iPad || this.sys.game.device.os.iPhone) {
      // keep in mind camera scaling - basically all dimensions here are magic numbers...
      this.joyStick = new VirtualJoystick(this, {
        x: 400,
        y: GAME_H - 260,
        radius: 50,
        base: this.add.circle(0, 0, 50, 0x888888, 0.75).setDepth(100),
        thumb: this.add.circle(0, 0, 25, 0xcccccc, 0.75).setDepth(101),
        // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
        // forceMin: 16,
        // enable: true
      }).setScrollFactor(0);

      const mobileActionButton = this.add.circle(900, GAME_H - 260, 37.5, 0xcccccc, 0.75)
        .setDepth(100)
        .setScrollFactor(0)
        .setInteractive();
      mobileActionButton.on('pointerdown', () => {
        this.input.keyboard.emit('keydown-SPACE', { preventDefault: () => {} });
      });
    }
  }

  private updateFishingSpots() {
    const fishingTriggers = this.triggers.filter((trigger) => trigger.additionalData.fishCooldown);
    fishingTriggers.forEach((fishingTrigger) => {
      if (fishingTrigger.additionalData.caughtAt !== undefined
        && fishingTrigger.image.frame.name !== 'icons/fishing/fishing-hook'
        && Date.now() - fishingTrigger.additionalData.caughtAt > fishingTrigger.additionalData.fishCooldown! * 1000
      ) {
        fishingTrigger.additionalData.caughtAt = undefined;
        fishingTrigger.image.setTexture('icons', 'icons/fishing/fishing-hook');
        fishingTrigger.setDisableState(false);
        const fishes = fishingTrigger.additionalData.possibleFishes;
        const randomFishRoll = Math.random();
        let accumulatedProbability = 0;
        let currentFishName: string;
        for (let i = 0; i < fishes.length; i += 1) {
          accumulatedProbability += fishes[i].chance;
          if (randomFishRoll < accumulatedProbability) {
            currentFishName = fishes[i].name;
            break;
          }
        }
        fishingTrigger.updateCallback(() => {
          this.switchToScene('Fishing', {
            currentFishName,
            objectName: fishingTrigger.name,
          }, false);
        }, true);
      }
    });
  }

  private setupControllerControls(pad: Phaser.Input.Gamepad.Gamepad) {
    // see updatePlayer() for axis setup
    pad.off('down');
    pad.on('down', (index: number) => {
      console.log(index);
      if (index === 3) {
        this.input.keyboard.emit('keyup-Q', { preventDefault: () => {} });
      }
      if (index === 1) {
        this.input.keyboard.emit('keydown-SPACE', { preventDefault: () => {} });
      }
      if (index === 2) {
        this.input.keyboard.emit('keydown-E', { preventDefault: () => {} });
      }
      if (index === 8) {
        this.scene.get('WorldMapUIScene').input.keyboard.emit('keyup-ESC', { preventDefault: () => {} });
      }
      if (index === 4) {
        this.scene.get('WorldMapUIScene').input.keyboard.emit('keyup-J', { preventDefault: () => {} });
      }
      if (index === 5) {
        this.scene.get('WorldMapUIScene').input.keyboard.emit('keyup-I', { preventDefault: () => {} });
      }
      if (index === 9) {
        this.scene.get('WorldMapUIScene').input.keyboard.emit('keyup-K', { preventDefault: () => {} });
      }
    });
  }
}
