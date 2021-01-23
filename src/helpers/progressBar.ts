import * as Phaser from 'phaser';

interface ProgressBarConstructorParams {
  scene: Phaser.Scene;
  x: number;
  y: number;
  color: number;
  current: number;
  max: number;
  width: number;
}

export default class ProgressBar extends Phaser.GameObjects.Container {
  constructor({
    scene, x, y, color, current, max, width,
  }: ProgressBarConstructorParams) {
    super(scene);

    const additionalGraphics = scene.add.graphics()
      .fillStyle(color, 0.25)
      .fillRect(x, y, width, 12)
      .fillStyle(color, 0.25)
      .fillRect(x, y, width * (current / max), 12);

    const bitmapText = new Phaser.GameObjects.BitmapText(scene, x + width / 2, y, 'bitmapArial', `${current} / ${max}`, 12, 1).setOrigin(0.5, 0);

    this.add([additionalGraphics, bitmapText]);
  }
}
