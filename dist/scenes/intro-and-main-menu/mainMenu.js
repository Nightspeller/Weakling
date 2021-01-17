define(["require", "exports", "phaser", "../../config/constants"], function (require, exports, Phaser, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainMenuScene extends Phaser.Scene {
        constructor() {
            super({ key: 'MainMenu' });
        }
        preload() {
        }
        create() {
            console.log('Creating main menu');
            // backgroundImage
            this.add.image(0, 0, 'main-menu-background')
                .setOrigin(0, 0)
                .setDisplaySize(constants_1.GAME_W, constants_1.GAME_H);
            // menuBackground
            this.add.graphics()
                .lineStyle(3, 0x222222)
                .fillStyle(0x2A3E07)
                .fillRect(constants_1.GAME_W / 3 - 25, 150, constants_1.GAME_W / 3 + 40, constants_1.GAME_H - 300)
                .strokeRect(constants_1.GAME_W / 3 - 25, 150, constants_1.GAME_W / 3 + 40, constants_1.GAME_H - 300);
            // subtitle
            this.add.text(constants_1.GAME_W / 2, constants_1.GAME_H / 2 - 120, 'Serg Nights\' presents:', {
                font: '14px monospace',
                color: '#b5b5b5',
            })
                .setOrigin(0.5, 0.5);
            // title
            this.add.text(constants_1.GAME_W / 2, constants_1.GAME_H / 2 - 70, 'Weakling!', {
                font: '50px monospace',
                color: '#ca0000',
            })
                .setOrigin(0.5, 0.5);
            const startButtonText = this.add.text(constants_1.GAME_W / 2, constants_1.GAME_H * (2 / 3) - 70, 'Let it begin...', {
                font: '20px monospace',
                color: '#ffffff',
                backgroundColor: '#222222',
                padding: {
                    x: 10,
                    y: 10,
                },
            })
                .setOrigin(0.5, 0.5)
                .setInteractive({ useHandCursor: true });
            // border
            this.add.graphics()
                .lineStyle(2, 0xffffff, 0.4)
                .strokeRect(startButtonText.getTopLeft().x, startButtonText.getTopLeft().y, startButtonText.width, startButtonText.height);
            startButtonText.once('pointerdown', () => {
                this.scene.start('Intro', { prevScene: this.scene.key });
            });
            const optionsText = this.add.text(constants_1.GAME_W / 2, constants_1.GAME_H * (2 / 3) + 20, 'Options', {
                font: '20px monospace',
                color: '#ffffff',
                padding: {
                    x: 10,
                    y: 10,
                },
            })
                .setOrigin(0.5, 0.5)
                .setInteractive({ useHandCursor: true });
            optionsText.on('pointerdown', () => {
                this.scene.pause(this.scene.key);
                this.scene.run('Options', { prevScene: this.scene.key });
            });
        }
    }
    exports.default = MainMenuScene;
});
//# sourceMappingURL=mainMenu.js.map