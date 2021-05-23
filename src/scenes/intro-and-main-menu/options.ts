import * as Phaser from 'phaser';
import TextButton from '../../helpers/textButton';
import CheckboxButton from '../../helpers/checkboxButton';
import PaperScrollLabel from '../../helpers/paperScrollLabel';

import { GAME_H, GAME_W } from '../../config/constants';
import { optionsInstance } from '../../config/optionsConfig';

export default class OptionsScene extends Phaser.Scene {
  private parentSceneKey: string;

  constructor() {
    super({ key: 'Options' });
  }

  init({ prevScene }: { prevScene: string }) {
    this.parentSceneKey = prevScene;
  }

  preload() {

  }

  create() {
    const maxButtonWidth = 300;
    const buttonTextSize = 20;
    const textFont = 'harrington';
    const optionsZone = this.add.zone(0, 0, GAME_W, GAME_H)
      .setOrigin(0, 0)
      .setInteractive();

    const optionsBackground = new PaperScrollLabel(this, GAME_W * 0.43, GAME_H * 0.45, 5, 5, 'paper-scroll-background');
    this.add.existing(optionsBackground);

    optionsBackground.on('pointerdown', (pointer: any, x: number, y: number, event: any) => event.stopPropagation());

    const checkboxDescriptions = ['Audio', 'Full Screen Mode'];

    checkboxDescriptions.forEach((checkboxDescription, i) => {
      this.add.text(GAME_W / 2, GAME_H * (2 / 3) + i * 60 - 100,
        `${checkboxDescription}: `,
        {
          font: `${buttonTextSize}px ${textFont}`,
          color: '#222222',
        })
        .setOrigin(0.5, 0.5);
    });

    const musicToggle = new CheckboxButton(this, GAME_W / 1.65, GAME_H * 0.53, optionsInstance.isMusicOn, 'checkbox-unchecked')
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });

    const fullScreenToggle = new CheckboxButton(this, GAME_W / 1.65, GAME_H * 0.61, this.scale.isFullscreen, 'checkbox-unchecked')
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });

    musicToggle.on('pointerdown', () => {
      optionsInstance.toggleMusic();
      musicToggle.isChecked = optionsInstance.isMusicOn;
    });

    fullScreenToggle.on('pointerdown', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });

    const backButton = new TextButton(this, GAME_W / 2, GAME_H * (2 / 3) + 20,
      'Back to game', {
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
      .setInteractive({ useHandCursor: true });

    const buttonArray = [musicToggle, fullScreenToggle, backButton];

    buttonArray.forEach((obj: TextButton) => {
      this.add.existing(obj);
    });

    backButton.on('pointerdown', () => this._close());
    this.input.keyboard.on('keyup-O', () => this._close());
    this.input.keyboard.on('keyup-ESC', () => this._close());
    optionsZone.once('pointerdown', () => this._close());

    this.scene.bringToTop('Options');
  }

  private _close() {
    this.scene.stop(this.scene.key);
    if (this.parentSceneKey !== 'MainMenu') { // to prevent the cloud animation from restarting
      this.scene.run(this.parentSceneKey);
    }
  }
}
