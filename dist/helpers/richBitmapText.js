define(["require", "exports", "phaser"], function (require, exports, Phaser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RichBitmapText extends Phaser.GameObjects.Container {
        constructor({ scene, x, y, font, text, size, align, border, fill, crossed, }) {
            super(scene);
            this.additionalGraphics = scene.add.graphics();
            this.bitmapText = new Phaser.GameObjects.BitmapText(scene, x, y, font, text, size, align);
            this.border = border;
            this.fill = fill;
            this.crossed = crossed;
            this.add([this.additionalGraphics, this.bitmapText]);
            this.drawAdditionalGraphics();
        }
        drawAdditionalGraphics() {
            this.additionalGraphics.clear();
            if (this.border !== undefined) {
                this.additionalGraphics
                    .lineStyle(this.border.width, this.border.color, this.border.alpha)
                    .strokeRectShape(this.bitmapText.getTextBounds().global);
            }
            if (this.fill !== undefined) {
                this.additionalGraphics
                    .fillStyle(this.fill.color, this.fill.alpha)
                    .fillRectShape(this.bitmapText.getTextBounds().global);
            }
            if (this.crossed) {
                this.additionalGraphics
                    .lineStyle(1, 0x000000)
                    .lineBetween(this.bitmapText.x, this.bitmapText.y + this.bitmapText.height / 2, this.bitmapText.x + this.bitmapText.width, this.bitmapText.y + this.bitmapText.height / 2);
            }
        }
        setText(text) {
            this.bitmapText.setText(text);
            this.drawAdditionalGraphics();
            return this;
        }
        cross(cross) {
            this.crossed = cross;
            this.drawAdditionalGraphics();
        }
    }
    exports.default = RichBitmapText;
});
//# sourceMappingURL=richBitmapText.js.map