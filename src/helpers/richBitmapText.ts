import * as Phaser from 'phaser';

interface RichBitmapTextConstructorParams {
  scene: Phaser.Scene;
  x: number;
  y: number;
  font: string;
  text?: string | string[];
  size?: number;
  align?: number;
  border?: { color: number; width: number; alpha: number };
  fill?: { color: number; alpha?: number };
  crossed?: boolean;
}

export default class RichBitmapText extends Phaser.GameObjects.Container {
  private bitmapText: Phaser.GameObjects.BitmapText;
  private additionalGraphics: Phaser.GameObjects.Graphics;
  private border: { color: number; width: number; alpha: number };
  private fill: { color: number; alpha?: number };
  private crossed: boolean;

  constructor({
    scene, x, y, font, text, size, align, border, fill, crossed,
  }: RichBitmapTextConstructorParams) {
    super(scene);
    this.additionalGraphics = scene.add.graphics();
    this.bitmapText = new Phaser.GameObjects.BitmapText(scene, x, y, font, text, size, align);
    this.border = border;
    this.fill = fill;
    this.crossed = crossed;
    this.add([this.additionalGraphics, this.bitmapText]);
    this.drawAdditionalGraphics();
  }

  private drawAdditionalGraphics() {
    this.additionalGraphics.clear();
    if (this.border !== undefined) {
      this.additionalGraphics
        .lineStyle(this.border.width, this.border.color, this.border.alpha)
        .strokeRectShape(this.bitmapText.getTextBounds().global as Phaser.Geom.Rectangle);
    }
    if (this.fill !== undefined) {
      this.additionalGraphics
        .fillStyle(this.fill.color, this.fill.alpha)
        .fillRectShape(this.bitmapText.getTextBounds().global as Phaser.Geom.Rectangle);
    }
    if (this.crossed) {
      this.additionalGraphics
        .lineStyle(1, 0x000000)
        .lineBetween(
          this.bitmapText.x,
          this.bitmapText.y + this.bitmapText.height / 2,
          this.bitmapText.x + this.bitmapText.width,
          this.bitmapText.y + this.bitmapText.height / 2,
        );
    }
  }

  public setText(text: string): this {
    this.bitmapText.setText(text);
    this.drawAdditionalGraphics();
    return this;
  }

  public cross(cross: boolean) {
    this.crossed = cross;
    this.drawAdditionalGraphics();
  }
}
