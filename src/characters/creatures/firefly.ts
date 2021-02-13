import * as Phaser from 'phaser';
import GeneralLocation from '../../scenes/locations/generalLocation';

export default class Firefly extends Phaser.Physics.Arcade.Sprite {
  private mapStartX: number;
  private mapEndX: number;
  private mapStartY: number;
  private mapEndY: number;

  constructor(scene: GeneralLocation) {
    super(scene, 0, 0, 'firefly', 0);

    this.mapStartX = scene.offsetX;
    this.mapEndX = scene.offsetX + scene.map.widthInPixels;
    this.mapStartY = scene.offsetY;
    this.mapEndY = scene.offsetY + scene.map.heightInPixels;

    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.spawn();
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.rotation += 0.005;
  }

  // plays firefly animation a few times times and once it is done, calls itself again to start over with new position and speed
  private spawn() {
    this
      .setAlpha(Phaser.Math.Between(20, 80) / 100)
      .setVelocity(Phaser.Math.Between(-15, 15), Phaser.Math.Between(-15, 15))
      .setPosition(Phaser.Math.Between(this.mapStartX, this.mapEndX), Phaser.Math.Between(this.mapStartY, this.mapEndY))
      .setRotation(0)
      .play({
        key: 'firefly-blinking', frameRate: 10, repeat: 30, startFrame: Phaser.Math.Between(0, 11),
      })
      .off('animationcomplete')
      .on('animationcomplete', () => {
        this.spawn();
      });
  }
}
