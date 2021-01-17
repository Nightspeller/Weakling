define(["require", "exports", "phaser", "../../config/constants", "../../config/optionsConfig"], function (require, exports, Phaser, constants_1, optionsConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OptionsScene extends Phaser.Scene {
        constructor() {
            super({ key: 'Options' });
        }
        init({ prevScene }) {
            this.parentSceneKey = prevScene;
        }
        preload() {
        }
        create() {
            const optionsZone = this.add.zone(0, 0, constants_1.GAME_W, constants_1.GAME_H)
                .setOrigin(0, 0)
                .setInteractive();
            const optionsBackground = this.add.graphics()
                .lineStyle(3, 0x222222)
                .fillStyle(0x2A3E07)
                .fillRect(constants_1.GAME_W / 3 - 25, 150, constants_1.GAME_W / 3 + 40, constants_1.GAME_H - 300)
                .strokeRect(constants_1.GAME_W / 3 - 25, 150, constants_1.GAME_W / 3 + 40, constants_1.GAME_H - 300)
                .setInteractive({
                hitArea: new Phaser.Geom.Rectangle(constants_1.GAME_W / 3 - 25, 150, constants_1.GAME_W / 3 + 40, constants_1.GAME_H - 300),
                hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            });
            optionsBackground.on('pointerdown', (pointer, x, y, event) => event.stopPropagation());
            this.add.text(constants_1.GAME_W / 2, constants_1.GAME_H / 2 - 120, 'Options', {
                font: '30px monospace',
                color: '#ffffff',
            })
                .setOrigin(0.5, 0.5);
            this.add.text(constants_1.GAME_W / 2, constants_1.GAME_H / 2 - 50, 'Audio:', {
                font: '20px monospace',
                color: '#ffffff',
            })
                .setOrigin(0.5, 0.5);
            const musicToggle = this.add.text(constants_1.GAME_W / 2, constants_1.GAME_H / 2, `Music is ${optionsConfig_1.optionsInstance.isMusicOn ? 'ON' : 'OFF'}`, {
                font: '20px monospace',
                color: '#ffffff',
            })
                .setOrigin(0.5, 0.5)
                .setInteractive({ useHandCursor: true });
            musicToggle.on('pointerdown', () => {
                optionsConfig_1.optionsInstance.toggleMusic();
                musicToggle.setText(`Music is ${optionsConfig_1.optionsInstance.isMusicOn ? 'ON' : 'OFF'}`);
            });
            /*        const effectsToggle = this.add.text(GAME_W / 2, GAME_H / 2 + 40,
                          `Effects are ${optionsInstance.isEffectsOn ? 'ON' : 'OFF'}`,
                          {
                              font: '20px monospace',
                              fill: '#ffffff'
                          }
                      ).setOrigin(0.5, 0.5).setInteractive({useHandCursor: true});
                      effectsToggle.on('pointerdown', () => {
                          optionsInstance.toggleEffects();
                          effectsToggle.setText(`Effects are ${optionsInstance.isEffectsOn ? 'ON' : 'OFF'}`)
                      }); */
            const restartButton = this.add.text(constants_1.GAME_W / 2, constants_1.GAME_H * (2 / 3) - 30, 'Restart the game', {
                font: '20px monospace',
                color: '#ca0000',
            })
                .setOrigin(0.5, 0.5)
                .setInteractive({ useHandCursor: true });
            restartButton.on('pointerdown', () => {
                window.location.reload();
            });
            const backButton = this.add.text(constants_1.GAME_W / 2, constants_1.GAME_H * (2 / 3) + 20, 'Back to game', {
                font: '20px monospace',
                color: '#ffffff',
            })
                .setOrigin(0.5, 0.5)
                .setInteractive({ useHandCursor: true });
            backButton.on('pointerdown', () => this._close());
            this.input.keyboard.on('keyup-O', () => this._close());
            this.input.keyboard.on('keyup-ESC', () => this._close());
            optionsZone.once('pointerdown', () => this._close());
            this.scene.bringToTop('Options');
        }
        _close() {
            this.scene.stop(this.scene.key);
            this.scene.run(this.parentSceneKey);
        }
    }
    exports.default = OptionsScene;
});
//# sourceMappingURL=options.js.map