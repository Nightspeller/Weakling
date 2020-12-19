export class RichText extends Phaser.GameObjects.Text {
    private additionalElements: Phaser.GameObjects.Group;

    constructor(
        scene: Phaser.Scene,
        x,
        y,
        text,
        style?,
        border?: { color: number, width: number, alpha: number }
    ) {
        super(scene, x, y, text, style);
        this.additionalElements = scene.add.group();
        if (border) {
            this.additionalElements.add(scene.add.graphics()
                .lineStyle(border.width, border.color, border.alpha)
                .strokeRect(this.x, this.y, this.width, this.height));
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
