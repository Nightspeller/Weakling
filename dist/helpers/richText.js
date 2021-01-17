define(["require", "exports", "phaser"], function (require, exports, Phaser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RichText extends Phaser.GameObjects.Text {
        constructor(scene, x, y, text, style, border) {
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
    exports.default = RichText;
});
//# sourceMappingURL=richText.js.map