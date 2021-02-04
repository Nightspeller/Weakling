import * as Phaser from 'phaser';
import GeneralLocation from '../generalLocation';
import GraveNpc from '../../../triggers/npcs/betweenVillageAndCaltor/graveNpc';

import { sceneEvents } from '../../../triggers/EventsCenter';

import DestinationPoint from '../../../characters/creatures/DestinationPoint';
import Butterfly from '../../../characters/creatures/Butterfly';

import findPath from '../../../helpers/findPath';

export default class BetweenVillageAndCaltorScene extends GeneralLocation {
  private destinationPoints!: Phaser.Physics.Arcade.Group
  private butterFlies!: Phaser.Physics.Arcade.Group

  constructor() {
    super({ key: 'BetweenVillageAndCaltor' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('betweenVillageAndCaltor');

    this.setupEvents();

    this.destinationPoints = this.physics.add.group({
      classType: DestinationPoint,
    });

    this.map.getObjectLayer('Destinationpoints')?.objects.forEach((destinationPointObj) => {
      this.destinationPoints.get(
        destinationPointObj.x, destinationPointObj.y, 'base', 55,
      );
    });

    this.butterFlies = this.physics.add.group({
      classType: Butterfly,
      createCallback: (butterflyGameObject) => {
        const butterflyColors = ['blue', 'pink', 'green', 'yellow'];
        const randomButterflyColor = Phaser.Math.Between(0, butterflyColors.length - 1);
        const butteflyGameObj = butterflyGameObject as Butterfly;

        butteflyGameObj.body.onCollide = true;

        const destinationPoints = this.destinationPoints.getChildren();

        const randomDestinationPoint = destinationPoints[Phaser.Math.Between(0, destinationPoints.length - 1)] as DestinationPoint;

        butteflyGameObj.butterflyColor = butterflyColors[randomButterflyColor];

        // move the buttersly to the randomly picket destination point
        this.moveButterfly(randomDestinationPoint.x, randomDestinationPoint.y, butteflyGameObj);
      },
    });

    this.map.getObjectLayer('Butterflies')?.objects.forEach((butterflyObject) => {
      this.butterFlies.get(
        butterflyObject.x,
        butterflyObject.y, 'butterflies',
      );
    });

    new GraveNpc({ scene: this });
  }

  setupEvents() {
    sceneEvents.on('butterfly-reached-destination-point', (butterfly: Phaser.Physics.Arcade.Sprite) => {
      const butteflyGameObj = butterfly as Butterfly;
      butteflyGameObj.body.onCollide = true;
      const destinationPoints = this.destinationPoints.getChildren();
      const randomDestinationPoint = destinationPoints[Phaser.Math.Between(0, destinationPoints.length - 1)] as DestinationPoint;

      this.time.addEvent({
        delay: Phaser.Math.Between(1000, 4000),
        callback: () => {
          this.moveButterfly(randomDestinationPoint.x, randomDestinationPoint.y, butteflyGameObj);
        },
        loop: false,
      });
    });
  }

  moveButterfly(toPositionX: number, toPositionY: number, butterflyObject: any) {
    const { worldX, worldY } = { worldX: toPositionX, worldY: toPositionY };

    const butterfly = butterflyObject as Butterfly;

    const groundLayerObject = this.map.getLayer('Layer 1/Below player').tilemapLayer;
    const wallsLayerObject = this.map.getLayer('Layer 1/Collisions').tilemapLayer;

    const startVector = groundLayerObject.worldToTileXY(butterfly.x, butterfly.y);
    const targetVector = groundLayerObject.worldToTileXY(worldX, worldY);

    const generatedPath = findPath(startVector, targetVector, groundLayerObject, wallsLayerObject);
    butterfly.flyAlong(generatedPath);
  }

  public update() {
    super.update();
  }
}
