import * as Phaser from 'phaser';

export default class FireFly extends Phaser.Physics.Arcade.Sprite {
    private velX: number
    private velY: number

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
      super(scene, x, y, texture, frame);

      this.setRandomDirection();
      scene.physics.world.enable(this);
      this.setCollideWorldBounds(true);
    }

    setRandomDirection() {
      const randomDirX = Phaser.Math.Between(-30, 30);
      const randomDirY = Phaser.Math.Between(-30, 30);
      this.velX = randomDirX;
      this.velY = randomDirY;
    }

    fly() {
      if (!this.body) {
        return;
      }
      this.setVelocity(this.velX, this.velY);
    }

    preUpdate(t: number, dt: number) {
      super.preUpdate(t, dt);

      if (!this.body) {
        return;
      }

      this.fly();
    }
}
