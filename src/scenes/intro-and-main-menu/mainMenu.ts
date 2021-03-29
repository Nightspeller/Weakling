import * as Phaser from 'phaser';

import { GAME_H, GAME_W } from '../../config/constants';

export default class MainMenuScene extends Phaser.Scene {
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
      .setDisplaySize(GAME_W, GAME_H);

    // menuBackground
    this.add.graphics()
      .lineStyle(3, 0x222222)
      .fillStyle(0x2A3E07)
      .fillRect(GAME_W / 3 - 25, 150, GAME_W / 3 + 40, GAME_H - 300)
      .strokeRect(GAME_W / 3 - 25, 150, GAME_W / 3 + 40, GAME_H - 300);

    // subtitle
    this.add.text(GAME_W / 2, GAME_H / 2 - 120,
      'Serg Nights presents:',
      {
        font: '14px monospace',
        color: '#b5b5b5',
      })
      .setOrigin(0.5, 0.5);

    // title
    this.add.text(GAME_W / 2, GAME_H / 2 - 70,
      'Weakling!',
      {
        font: '50px monospace',
        color: '#ca0000',
      })
      .setOrigin(0.5, 0.5);

    const startButtonText = this.add.text(GAME_W / 2, GAME_H * (2 / 3) - 70,
      'Let it begin...',
      {
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

    const optionsText = this.add.text(GAME_W / 2, GAME_H * (2 / 3) + 20,
      'Options',
      {
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

    const firstTimeLaunch = localStorage.getItem('firstTimeLaunch') ?? 'true';
    console.log(firstTimeLaunch);
    if (firstTimeLaunch === 'true') {
      localStorage.setItem('firstTimeLaunch', 'false');
      console.log('here');
      this.scene.pause(this.scene.key);
      this.scene.run('About', { prevScene: this.scene.key });
    }
  }
}
