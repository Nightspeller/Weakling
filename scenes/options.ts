import {GAME_H, GAME_W} from "../config/constants.js";
import {optionsInstance} from "../config/optionsConfig.js";
import Rectangle = Phaser.Geom.Rectangle;

export class OptionsScene extends Phaser.Scene {
    private parentSceneKey: string;

    constructor() {
        super({key: 'Options'});
    }

    init({prevScene}) {
        this.parentSceneKey = prevScene;
    }

    preload() {

    }

    create() {
        const optionsZone = this.add.zone(0, 0, GAME_W, GAME_H).setOrigin(0, 0).setInteractive();

        const optionsBackground = this.add.graphics()
            .lineStyle(3, 0x222222)
            .fillStyle(0x2A3E07)
            .fillRect(GAME_W / 3 - 25, 150, GAME_W / 3 + 40, GAME_H - 300)
            .strokeRect(GAME_W / 3 - 25, 150, GAME_W / 3 + 40, GAME_H - 300)
            .setInteractive({
                hitArea: new Rectangle(GAME_W / 3 - 25, 150, GAME_W / 3 + 40, GAME_H - 300),
                hitAreaCallback: Rectangle.Contains
            });
        optionsBackground.on('pointerdown', (pointer, x, y, event) => event.stopPropagation());

        const title = this.add.text(GAME_W / 2, GAME_H / 2 - 120,
            'Options',
            {
                font: '30px monospace',
                fill: '#ffffff'
            }
        ).setOrigin(0.5, 0.5);
        const titleAudio = this.add.text(GAME_W / 2, GAME_H / 2 - 50,
            'Audio:',
            {
                font: '20px monospace',
                fill: '#ffffff'
            }
        ).setOrigin(0.5, 0.5);
        const musicToggle = this.add.text(GAME_W / 2, GAME_H / 2,
            `Music is ${optionsInstance.isMusicOn ? 'ON' : 'OFF'}`,
            {
                font: '20px monospace',
                fill: '#ffffff'
            }
        ).setOrigin(0.5, 0.5).setInteractive({useHandCursor: true});
        musicToggle.on('pointerdown', () => {
            optionsInstance.toggleMusic();
            musicToggle.setText(`Music is ${optionsInstance.isMusicOn ? 'ON' : 'OFF'}`)
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
                });*/

        const restartButton = this.add.text(GAME_W / 2, GAME_H * 2 / 3 - 30,
            'Restart the game',
            {
                font: '20px monospace',
                fill: '#ca0000'
            }
        ).setOrigin(0.5, 0.5).setInteractive({useHandCursor: true});
        restartButton.on('pointerdown', () => {
            window.location.reload();
        });

        const backButton = this.add.text(GAME_W / 2, GAME_H * 2 / 3 + 20,
            'Back to game',
            {
                font: '20px monospace',
                fill: '#ffffff'
            }
        ).setOrigin(0.5, 0.5).setInteractive({useHandCursor: true});
        backButton.on('pointerdown', () => this._close());
        this.input.keyboard.on('keyup-O', () => this._close());
        this.input.keyboard.on('keyup-ESC', () => this._close());
        optionsZone.once('pointerdown', () => this._close());

        this.scene.bringToTop('Options');
    }

    private _close() {
        this.scene.stop(this.scene.key);
        this.scene.run(this.parentSceneKey);
    }
}
