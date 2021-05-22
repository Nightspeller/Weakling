import * as Phaser from 'phaser';

export default class PaperScrollLabel extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);
    this.createPaperScrollLabel(scene, x, y, width, height);
  }

  /**
   *
   * @param x
   * @param y
   * @param width - Width in tiles where each tile has a width equal to 64px
   * @param height - Height in tiles where each tile has a width equal to 64px
   */
  private createPaperScrollLabel(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    const tileAmount = width * height;

    let currentFrame = 0;

    for (let i = 0; i < height; i += 1) {
      if (tileAmount - i * width === tileAmount) { // first row ?
        currentFrame = 0;
      } else if (tileAmount - i * width === width) { // last row ?
        currentFrame = 6;
      } else { // all rows between
        currentFrame = 3;
      }
      scene.add.sprite(x, y + 64 * i, 'paper-scroll-background', currentFrame);
      for (let j = 1; j < width - 1; j += 1) {
        if (tileAmount - i * width === tileAmount) { // first row ?
          currentFrame = 1;
        } else if (tileAmount - i * width === width) { // last row ?
          currentFrame = 7;
        } else { // all rows between
          currentFrame = 4;
        }
        scene.add.sprite(x + (64 * j), y + 64 * i, 'paper-scroll-background', currentFrame);
      }

      if (tileAmount - i * width === tileAmount) {
        currentFrame = 2;
      } else if (tileAmount - i * width === width) {
        currentFrame = 8;
      } else {
        currentFrame = 5;
      }

      scene.add.sprite(x + (width - 1) * 64, y + 64 * i, 'paper-scroll-background', currentFrame);
    }
  }
}
