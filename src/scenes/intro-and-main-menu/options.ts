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

    // positioning of UI elements
    const navButtonPosX: number = GAME_W / 2.04;
    const checkboxPosX: number = GAME_W / 1.69;
    const buttonStartPosY: number = GAME_H * 0.33 + 90;
    const buttonYDist: number = 60;

    const textFont = 'harrington';
    const optionsZone = this.add.zone(0, 0, GAME_W, GAME_H)
      .setOrigin(0, 0)
      .setInteractive();

    const optionsBackground = new PaperScrollLabel(this, GAME_W * 0.40, GAME_H * 0.38, 5, 6, 'paper-scroll-background');
    this.add.existing(optionsBackground);

    optionsBackground.on('pointerdown', (pointer: any, x: number, y: number, event: any) => event.stopPropagation());

    const audioToggleText = new TextButton(this, navButtonPosX, buttonStartPosY,
      'Audio: ',
      {
        font: `${buttonTextSize}px ${textFont}`,
        color: '#222222',
        align: 'center',
        fixedWidth: maxButtonWidth,
        padding: {
          x: 10,
          y: 10,
        },
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });

    const audioToggleCheckbox = new CheckboxButton(this, checkboxPosX, buttonStartPosY, optionsInstance.isMusicOn, 'checkbox-unchecked')
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });

    const toggleAudio = () => {
      optionsInstance.toggleMusic();
      audioToggleCheckbox.isChecked = optionsInstance.isMusicOn;
    };

    audioToggleText.on('pointerdown', toggleAudio);
    audioToggleCheckbox.on('pointerdown', toggleAudio);

    const fullScreenToggleText = new TextButton(this, navButtonPosX, buttonStartPosY + buttonYDist,
      'Full Screen Mode: ',
      {
        font: `${buttonTextSize}px ${textFont}`,
        color: '#222222',
        align: 'center',
        fixedWidth: maxButtonWidth,
        padding: {
          x: 10,
          y: 10,
        },
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });

    const fullScreenToggleCheckbox = new CheckboxButton(this, checkboxPosX, buttonStartPosY + buttonYDist, this.scale.isFullscreen, 'checkbox-unchecked')
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });

    const toggleFullScreen = () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
        fullScreenToggleCheckbox.isChecked = false;
      } else {
        this.scale.startFullscreen();
        fullScreenToggleCheckbox.isChecked = true;
      }
    };

    fullScreenToggleText.on('pointerdown', () => { toggleFullScreen(); });
    fullScreenToggleCheckbox.on('pointerdown', () => { toggleFullScreen(); });

    const aboutButton = new TextButton(this, navButtonPosX, buttonStartPosY + buttonYDist * 2,
      'About', {
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

    const backButton = new TextButton(this, GAME_W / 2.04, buttonStartPosY + buttonYDist * 3,
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

    const buttonArray = [audioToggleText, audioToggleCheckbox, fullScreenToggleText, fullScreenToggleCheckbox, backButton, aboutButton];

    buttonArray.forEach((obj: TextButton) => {
      this.add.existing(obj);
    });

    aboutButton.on('pointerdown', () => this.scene.run('About', { prevScene: this.scene.key }));
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
