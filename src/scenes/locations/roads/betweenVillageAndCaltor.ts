import * as Phaser from 'phaser';
import GeneralLocation from '../generalLocation';
import GraveNpc from '../../../triggers/npcs/betweenVillageAndCaltor/graveNpc';

import { sceneEvents } from '../../../triggers/eventsCenter';

import DestinationPoint from '../../../characters/creatures/destinationPoint';
import Butterfly from '../../../characters/creatures/butterfly';

import findPath from '../../../helpers/findPath';

export default class BetweenVillageAndCaltorScene extends GeneralLocation {
  private destinationPoints!: Phaser.Physics.Arcade.Group
  private butterflies!: Phaser.Physics.Arcade.Group

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

    this.map.getObjectLayer('DestinationPoints')?.objects.forEach((destinationPointObj) => {
      this.destinationPoints.get(
        destinationPointObj.x, destinationPointObj.y, 'base-separated-1', 55,
      );
    });

    this.butterflies = this.physics.add.group({
      classType: Butterfly,
      createCallback: (butterflyGameObject) => {
        const butterflyColors = ['blue', 'pink', 'green', 'yellow'];
        const randomButterflyColor = Phaser.Math.Between(0, butterflyColors.length - 1);
        const butterflyGameObj = butterflyGameObject as Butterfly;

        butterflyGameObj.body.onCollide = true;

        const destinationPoints = this.destinationPoints.getChildren();

        const randomDestinationPoint = destinationPoints[Phaser.Math.Between(0, destinationPoints.length - 1)] as DestinationPoint;

        butterflyGameObj.butterflyColor = butterflyColors[randomButterflyColor];

        // move the butterfly to the randomly picket destination point
        this.moveButterfly(randomDestinationPoint.x, randomDestinationPoint.y, butterflyGameObj);
      },
    });

    this.map.getObjectLayer('Butterflies')?.objects.forEach((butterflyObject) => {
      this.butterflies.get(
        butterflyObject.x,
        butterflyObject.y, 'butterflies',
      );
    });

    new GraveNpc({ scene: this });
  }

  setupEvents() {
    sceneEvents.on('butterfly-reached-destination-point', (butterfly: Phaser.Physics.Arcade.Sprite) => {
      const butteflyGameObj = butterfly as Butterfly;
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

  moveButterfly(toPositionX: number, toPositionY: number, butterflyObject: Butterfly) {
    const butterfly = butterflyObject;

    const groundLayerObject = this.map.getLayer('Layer 1/Below player').tilemapLayer;
    const wallsLayerObject = this.map.getLayer('Layer 1/Collisions').tilemapLayer;

    const generatedPath = findPath(
      { x: butterfly.x, y: butterfly.y },
      { x: toPositionX, y: toPositionY },
      groundLayerObject,
      wallsLayerObject,
    );
    butterfly.flyAlong(generatedPath);
  }

  public update() {
    super.update();
  }
}
