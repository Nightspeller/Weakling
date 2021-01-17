define(["require", "exports", "phaser"], function (require, exports, Phaser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ProgressBar extends Phaser.GameObjects.Container {
        constructor({ scene, x, y, color, current, max, width, }) {
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
    exports.default = ProgressBar;
});
//# sourceMappingURL=progressBar.js.map