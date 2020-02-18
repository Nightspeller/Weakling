import {GAME_H, GAME_W} from "../config/constants.js";

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({key: 'MainMenu'});
    }

    preload() {

    }

    create() {
        console.log('Creating main menu');

        const backgroundImage = this.add.image(0,0, 'main-menu-background')
            .setOrigin(0,0)
            .setDisplaySize(GAME_W, GAME_H);

        const menuBackground = this.add.graphics()
            .lineStyle(3,0x222222)
            .fillStyle(0x2A3E07)
            .fillRect(GAME_W/4, 100, GAME_W/2, GAME_H-200)
            .strokeRect(GAME_W/4, 100, GAME_W/2, GAME_H-200);

        const subtitle = this.add.text(GAME_W / 2, GAME_H / 2 - 120,
            `Serg Nights' presents:`,
            {
                font: '14px monospace',
                fill: '#b5b5b5'
            }
        ).setOrigin(0.5, 0.5);

        const title = this.add.text(GAME_W / 2, GAME_H / 2 - 70,
            'Weakling!',
            {
                font: '50px monospace',
                fill: '#ca0000'
            }
        ).setOrigin(0.5, 0.5);

        const startButtonText = this.add.text(GAME_W / 2, GAME_H * 2 / 3 - 70,
            'Let it begin...',
            {
                font: '20px monospace',
                fill: '#ffffff',
                backgroundColor: '#222222',
                padding: 10,
            }
        ).setOrigin(0.5, 0.5).setInteractive({useHandCursor: true});

        const border = this.add.graphics()
            .lineStyle(2,0xffffff, 0.4)
            .strokeRect(startButtonText.getTopLeft().x, startButtonText.getTopLeft().y, startButtonText.width, startButtonText.height);

        startButtonText.once('pointerdown', () => {
            //this.scene.start("Battle", {enemies: [{"type": "wildBoar"}, {"type": "wizard"}, {"type": "wizard"}, {"type": "wildBoar"}], prevScene: "Caltor"});
            this.scene.start("Caltor", {prevScene: this.scene.key});
        });

        const optionsText = this.add.text(GAME_W / 2, GAME_H * 2 / 3 + 20,
            'Options',
            {
                font: '20px monospace',
                fill: '#ffffff',
                padding: 10
            }
        ).setOrigin(0.5, 0.5).setInteractive({useHandCursor: true});
    }
}
