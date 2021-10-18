import * as Phaser from 'phaser';
import Trigger from '../../triggers/trigger';
import GeneralLocation from './generalLocation';
import { GAME_H, GAME_W, LOCATION_SCENE_CAMERA_ZOOM } from '../../config/constants';
import { TiledObjectProp } from '../../types/my-types';
import Container from '../../triggers/container';
import Item from '../../entities/item';
import EnemyTrigger from '../../triggers/enemyTrigger';
import messages from '../../data/messages';

export default function populateLocationFromTiled(this: GeneralLocation, mapKey: string) {
  this.map = this.make.tilemap({ key: mapKey });
  this.offsetX = this.map.widthInPixels * LOCATION_SCENE_CAMERA_ZOOM < GAME_W ? (GAME_W - this.map.widthInPixels) / 2 : 0;
  this.offsetY = this.map.heightInPixels * LOCATION_SCENE_CAMERA_ZOOM < GAME_H ? (GAME_H - this.map.heightInPixels) / 2 : 0;

  const startObject = this.getMapObject('Start');
  if (!this.startPoint && startObject) {
    this.startPoint = {
      x: startObject.x,
      y: startObject.y,
    };
  }

  const tilesets: Phaser.Tilemaps.Tileset[] = [];
  this.map.tilesets.forEach((tileset) => {
    tilesets.push(this.map.addTilesetImage(tileset.name, tileset.name));
  });

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

  // @ts-ignore
  this.sys.animatedTiles.init(this.map);

  createDoors.apply(this);
  createContainers.apply(this);
  createEnemies.apply(this);
  createWaypoints.apply(this);
  createEventTriggers.apply(this);
  createMessages.apply(this);
  createFishingSpots.apply(this);

  createLights.apply(this);
}

function createLights(this: GeneralLocation) {
  // lol kek if there is no props then it is an object, otherwise - array.. Phaser bug?
  const mapAmbientLightColor = Array.isArray(this.map.properties) && this.map.properties.find((prop: any) => prop.name === 'ambientLightColor')?.value * 1;
  if (mapAmbientLightColor) {
    this.lights.enable().setAmbientColor(mapAmbientLightColor);

    this.map.getObjectLayer('Lights')?.objects.forEach((object) => {
      const radius = object.properties?.find((prop: TiledObjectProp) => prop.name === 'radius')?.value * 1;
      const color = object.properties?.find((prop: TiledObjectProp) => prop.name === 'color')?.value * 1;
      const intensity = object.properties?.find((prop: TiledObjectProp) => prop.name === 'intensity')?.value * 1;
      const flickerSpeed = object.properties?.find((prop: TiledObjectProp) => prop.name === 'flickerSpeed')?.value * 1;

      this.layers.forEach((layer) => layer.setPipeline('Light2D'));

      const light = this.lights.addLight(object.x + object.width / 2, object.y + object.height / 2, radius, color, intensity);

      this.triggers.forEach((trigger) => trigger.image?.setPipeline('Light2D'));

      if (flickerSpeed !== 0) {
        this.tweens.add({
          targets: [light],
          radius: radius * 0.9,
          ease: 'Sine.easeInOut',
          yoyo: true,
          repeat: -1,
          duration: flickerSpeed,
        });
      }
    });

    this.playerLight = this.lights.addLight(0, 0, 100).setIntensity(2);
  }
}

function createEventTriggers(this: GeneralLocation) {
  this.map.getObjectLayer('EventTriggers')?.objects.forEach((object) => {
    const cutscene = object.properties?.find((prop: TiledObjectProp) => prop.name === 'cutscene')?.value;
    const singleUse = object.properties?.find((prop: TiledObjectProp) => prop.name === 'singleUse')?.value;
    const interaction = object.properties?.find((prop: TiledObjectProp) => prop.name === 'interaction')?.value;
    new Trigger({
      scene: this,
      name: object.name,
      triggerX: object.x,
      triggerY: object.y,
      triggerW: object.width,
      triggerH: object.height,
      interaction,
      singleUse,
      callback: () => {
        this.performGeneralCutsceneActions(cutscene);
      },
    });
  });
}

function createMessages(this: GeneralLocation) {
  this.map.getObjectLayer('Messages')?.objects.forEach((object) => {
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
}

function createFishingSpots(this: GeneralLocation) {
  this.map.getObjectLayer('Fishing Spots')?.objects.forEach((object) => {
    const fishString = object.properties?.find((prop: TiledObjectProp) => prop.name === 'fish')?.value;
    const fishCooldown = object.properties?.find((prop: TiledObjectProp) => prop.name === 'cooldown')?.value;
    const fishes = JSON.parse(fishString);
    const fishTrigger = new Trigger({
      scene: this,
      name: object.name,
      triggerX: object.x,
      triggerY: object.y,
      triggerW: object.width,
      triggerH: object.height,
      texture: 'icons',
      frame: 'icons/icons-and-status-effects/sleeping',
      callback: () => {},
    });
    fishTrigger.additionalData.caughtAt = 0;
    fishTrigger.additionalData.possibleFishes = fishes;
    fishTrigger.additionalData.fishCooldown = fishCooldown;
  });
}

function createContainers(this: GeneralLocation) {
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
}

function createEnemies(this: GeneralLocation) {
  this.map.getObjectLayer('Enemies')?.objects.forEach((object) => {
    const enemyImage = object.properties?.find((prop: TiledObjectProp) => prop.name === 'image')?.value;
    const enemies = JSON.parse(object.properties.find((prop: TiledObjectProp) => prop.name === 'enemies')?.value) as { 'type': string }[];
    const background = object.properties.find((prop: TiledObjectProp) => prop.name === 'background')?.value || 'field-background';
    const drop = JSON.parse(object.properties.find((prop: TiledObjectProp) => prop.name === 'drop')?.value || '[]') as { 'itemId': string, 'quantity': number, 'chance': number }[];
    if (drop[0]?.itemId === '') drop.pop(); // in case somebody left 'default' empty item drop in tiled, delete it
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
}

function createDoors(this: GeneralLocation) {
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
}

function createWaypoints(this: GeneralLocation) {
  this.map.getObjectLayer('Waypoints')?.objects.forEach((object) => {
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
          // -32 + 8 is an adjustment for player image and body, as well as +8 to center it in the cell
          this.playerImage.setPosition(toCoordinates.x * 32 + this.offsetX - 32 + 8, toCoordinates.y * 32 + this.offsetY - 48 + 8);
        }
      },
    });
  });
}
