import * as Phaser from 'phaser';
import TextButton from '../../helpers/textButton';
import PaperScrollLabel from '../../helpers/paperScrollLabel';

import { GAME_H, GAME_W } from '../../config/constants';
import BackgroundSoundScene from '../backgroundSoundScene';

export default class MainMenuScene extends Phaser.Scene {
  private clouds: Phaser.GameObjects.TileSprite;

  constructor() {
    super({ key: 'MainMenu' });
  }

  preload() {
  }

  create() {
    console.log('Creating main menu');

    const buttonTextSize = 32;
    const textFont = 'harrington';
    const maxButtonWidth = 300;
    const startGameSound = this.sound.add('main-menu-start-game', { volume: 0.5 });

    const backgroundSoundScene = this.scene.get('BackgroundSound') as BackgroundSoundScene;
    backgroundSoundScene.playBackgroundMusic('menu');

    // backgroundImage
    this.add.image(0, 0, 'main-menu-sky')
      .setOrigin(0, 0)
      .setDisplaySize(GAME_W, GAME_H).setScrollFactor(0);

    this.clouds = this.add.tileSprite(640, GAME_H * 0.4, 1440, 480, 'clouds');

    this.add.image(0, GAME_H / 6, 'main-menu-mountains')
      .setOrigin(0, 0)
      .setDisplaySize(GAME_W, GAME_H).setScrollFactor(0);

    const paperScrollLabel = new PaperScrollLabel(this, GAME_W * 0.43, GAME_H * 0.45, 4, 5, 'paper-scroll-background');
    this.add.existing(paperScrollLabel);

    // subtitle
    this.add.text(GAME_W / 2, GAME_H * 0.15,
      'Serg Nights presents:',
      {
        font: `16px ${textFont}`,
        color: '#222222',
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0);

    const buttonTexts = ['Play', 'Options', 'About'];

    buttonTexts.forEach((buttonText, i) => {
      const buttonObj = new TextButton(this, GAME_W / 2, GAME_H * (2 / 3) + i * 60 - 100, buttonText, {
        font: `${buttonTextSize}px ${textFont}`,
        color: '#222222',
        align: 'center',
        // backgroundColor: '#222222',
        fixedWidth: maxButtonWidth,
        padding: {
          x: 10,
          y: 10,
        },
      })
        .setOrigin(0.5, 0.5)
        .setInteractive({ useHandCursor: true })
        .setScrollFactor(0);

      if (buttonText === 'Play') {
        buttonObj.once('pointerdown', () => {
          startGameSound.play();
          this.cameras.main.fadeOut(1500, 0, 0, 0);
          this.time.delayedCall(1500, () => {
            this.scene.start('Intro', { prevScene: this.scene.key });
          });
        }).setScrollFactor(0);
      } else {
        buttonObj.on('pointerdown', () => {
          // this.scene.pause(this.scene.key);
          this.scene.run(buttonText, { prevScene: this.scene.key });
        });
      }

      // add button to scene
      this.add.existing(buttonObj);
    });

    // logo
    this.add.image((GAME_W * 0.03), (GAME_H * 0.06), 'main-menu-logo')
      .setOrigin(0, 0).setScrollFactor(0);

    const firstTimeLaunch = localStorage.getItem('firstTimeLaunch') ?? 'true';
    if (firstTimeLaunch === 'true') {
      localStorage.setItem('firstTimeLaunch', 'false');
      this.scene.run('About', { prevScene: this.scene.key });
    }
  }

  update() {
    this.clouds.tilePositionX += 0.5;
  }
}
