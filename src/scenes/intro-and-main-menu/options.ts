import * as Phaser from 'phaser';

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
    const optionsZone = this.add.zone(0, 0, GAME_W, GAME_H)
      .setOrigin(0, 0)
      .setInteractive();

    const optionsBackground = this.add.graphics()
      .lineStyle(3, 0x222222)
      .fillStyle(0x2A3E07)
      .fillRect(GAME_W / 3 - 25, 150, GAME_W / 3 + 40, GAME_H - 300)
      .strokeRect(GAME_W / 3 - 25, 150, GAME_W / 3 + 40, GAME_H - 300)
      .setInteractive({
        hitArea: new Phaser.Geom.Rectangle(GAME_W / 3 - 25, 150, GAME_W / 3 + 40, GAME_H - 300),
        hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      });
    optionsBackground.on('pointerdown', (pointer: any, x: number, y: number, event: any) => event.stopPropagation());

    this.add.text(GAME_W / 2, GAME_H / 2 - 120,
      'Options',
      {
        font: '30px monospace',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5);
    this.add.text(GAME_W / 2, GAME_H / 2 - 50,
      'Audio:',
      {
        font: '20px monospace',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5);
    const musicToggle = this.add.text(GAME_W / 2, GAME_H / 2 - 20,
      `Music is ${optionsInstance.isMusicOn ? 'ON' : 'OFF'}`,
      {
        font: '20px monospace',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });
    musicToggle.on('pointerdown', () => {
      optionsInstance.toggleMusic();
      musicToggle.setText(`Music is ${optionsInstance.isMusicOn ? 'ON' : 'OFF'}`);
    });
    const fullScreenToggle = this.add.text(GAME_W / 2, GAME_H / 2 + 40,
      `Full Screen mode is ${this.scale.isFullscreen ? 'ON' : 'OFF'}`,
      {
        font: '20px monospace',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });
    fullScreenToggle.on('pointerdown', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
        fullScreenToggle.setText('Full Screen mode is OFF');
      } else {
        this.scale.startFullscreen();
        fullScreenToggle.setText('Full Screen mode is ON');
      }
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

    /*    const restartButton = this.add.text(GAME_W / 2, GAME_H * (2 / 3) - 30,
      'Restart the game',
      {
        font: '20px monospace',
        color: '#ca0000',
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });
    restartButton.on('pointerdown', () => {
      window.location.reload();
    }); */

    const aboutText = this.add.text(GAME_W / 2, GAME_H * (2 / 3) + 20,
      'About',
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

    aboutText.on('pointerdown', () => {
      this.scene.pause(this.scene.key);
      this.scene.run('About', { prevScene: this.scene.key });
    });

    const backButton = this.add.text(GAME_W / 2, GAME_H * (2 / 3) + 50,
      'Back to game',
      {
        font: '20px monospace',
        color: '#60ff7b',
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });
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
