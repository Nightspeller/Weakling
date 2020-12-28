import * as Phaser from 'phaser';

interface RichTextStyle extends Phaser.Types.GameObjects.Text.TextStyle {
  'text-decoration'?: string
}

// TODO: investigate properties of text style - there might be built in stroke text
export default class RichText extends Phaser.GameObjects.Text {
  private additionalElements: Phaser.GameObjects.Group;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    style?: RichTextStyle,
    border?: { color: number, width: number, alpha: number },
  ) {
    super(scene, x, y, text, style);
    this.additionalElements = scene.add.group();
    if (border) {
      this.additionalElements.add(scene.add.graphics()
        .lineStyle(border.width, border.color, border.alpha)
        .strokeRectShape(this.getBounds()));
    }
    if (style?.['text-decoration'] === 'line-through') {
      this.additionalElements.add(scene.add.graphics()
        .lineStyle(1, 0x000000)
        .lineBetween(this.x, this.y + this.height / 2, this.x + this.width, this.y + this.height / 2));
    }
    scene.add.existing(this);
  }

  public destroy() {
    super.destroy();
    this.additionalElements.destroy();
  }

  public cross() {
    this.additionalElements.add(this.scene.add.graphics()
      .lineStyle(1, 0x000000)
      .lineBetween(this.x, this.y + this.height / 2, this.x + this.width, this.y + this.height / 2));
  }
}
