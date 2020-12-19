export class RichText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, border) {
        super(scene, x, y, text, style);
        this.additionalElements = scene.add.group();
        if (border) {
            this.additionalElements.add(scene.add.graphics()
                .lineStyle(border.width, border.color, border.alpha)
                .strokeRect(this.x, this.y, this.width, this.height));
        }
        if ((style === null || style === void 0 ? void 0 : style['text-decoration']) === 'line-through') {
            this.additionalElements.add(scene.add.graphics()
                .lineStyle(1, 0x000000)
                .lineBetween(this.x, this.y + this.height / 2, this.x + this.width, this.y + this.height / 2));
        }
        scene.add.existing(this);
    }
    destroy() {
        super.destroy();
        this.additionalElements.destroy();
    }
    cross() {
        this.additionalElements.add(this.scene.add.graphics()
            .lineStyle(1, 0x000000)
            .lineBetween(this.x, this.y + this.height / 2, this.x + this.width, this.y + this.height / 2));
    }
}
//# sourceMappingURL=richText.js.map