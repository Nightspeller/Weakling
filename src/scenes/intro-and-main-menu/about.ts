import * as Phaser from 'phaser';
import { GAME_H, GAME_W } from '../../config/constants';
import TextButton from '../../helpers/textButton';
import PaperScrollLabel from '../../helpers/paperScrollLabel';

export default class AboutScene extends Phaser.Scene {
  private parentSceneKey: string;

  constructor() {
    super({ key: 'About' });
  }

  init({ prevScene }: { prevScene: string }) {
    this.parentSceneKey = prevScene;
  }

  preload() {

  }

  create() {
    const textFont = 'harrington';
    const textColor = '#222222';

    const aboutZone = this.add.zone(0, 0, GAME_W, GAME_H)
      .setOrigin(0, 0)
      .setInteractive();

    const aboutBackground = this.add.graphics()
      .lineStyle(3, 0x222222)
      .fillStyle(0x2A3E07)
      .fillRect(GAME_W / 10, 150, GAME_W * (4 / 5), GAME_H - 300)
      .strokeRect(GAME_W / 10, 150, GAME_W * (4 / 5), GAME_H - 300)
      .setInteractive({
        hitArea: new Phaser.Geom.Rectangle(GAME_W / 10, 150, GAME_W * (4 / 5), GAME_H - 300),
        hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      });
    aboutBackground.on('pointerdown', (pointer: any, x: number, y: number, event: any) => event.stopPropagation());

    const paperScrollBackground = new PaperScrollLabel(this, GAME_W / 10, 130, 18, 9, 'paper-scroll-background');
    this.add.existing(paperScrollBackground);

    this.add.text(GAME_W / 2, GAME_H / 2 - 180,
      'About the game',
      {
        font: `30px ${textFont}`,
        color: `${textColor}`,
      })
      .setOrigin(0.5, 0.5);
    this.add.text(GAME_W / 2, GAME_H / 2 - 60,
      `  Welcome to the "Weakling!", absolutely free and totally open sourced RPG game!
      
  This is just the beginning and very much work in progress on it's early stage, but there are already a few things you can do to explore it yourself!
  
  Pull requests and any other help is greatly welcomed! If you can code, draw, write, create music, or simply play the game and share bugs and ideas, get in touch:`,
      {
        font: `20px ${textFont}`,
        fixedWidth: GAME_W * (4 / 5) - 20,
        wordWrap: { width: GAME_W * (4 / 5) - 20 },
        color: `${textColor}`,
      })
      .setOrigin(0.5, 0.5);

    let fullscreenText = 'For the best experience, we recommend enabling Full Screen Mode in options. Mobile experience is not 100% ready.';
    if (this.sys.game.device.os.iOS || this.sys.game.device.os.iPad || this.sys.game.device.os.iPhone) {
      fullscreenText = `  For the best experience, we recommend enabling Full Screen Mode in options. Mobile experience is not 100% ready.
  Unfortunately, iOS does not fully support full screen mode - in order to get it on apple devices, please go to Share Menu -> Add to Home Screen and lunch the game via Home Screen Icon.
  Yeah, we know, it sucks, but that is the only, Apple, way...`;
    }
    this.add.text(GAME_W / 2, GAME_H / 2 + 50,
      'https://github.com/Nightspeller/Weakling',
      {
        font: `20px ${textFont}`,
        color: '#252acb',
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => { window.open('https://github.com/Nightspeller/Weakling', '_blank'); });
    this.add.text(GAME_W / 2, GAME_H / 2 + 80,
      'https://discord.gg/uRqzU6ZqGn',
      {
        font: `20px ${textFont}`,
        color: '#252acb',
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => { window.open('https://discord.gg/uRqzU6ZqGn', '_blank'); });
    this.add.text(GAME_W / 2, GAME_H / 2 + 120, fullscreenText,
      {
        font: `20px ${textFont}`,
        fixedWidth: GAME_W * (4 / 5) - 20,
        wordWrap: { width: GAME_W * (4 / 5) - 20 },
        color: `${textColor}`,
      })
      .setOrigin(0.5, 0.5);

    const backButton = new TextButton(this, GAME_W / 2, GAME_H * (2 / 3) + 60,
      'Close',
      {
        font: `20px ${textFont}`,
        color: `${textColor}`,
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });

    this.add.existing(backButton);
    backButton.on('pointerdown', () => this._close());
    this.input.keyboard.on('keyup-ESC', () => this._close());
    aboutZone.once('pointerdown', () => this._close());

    this.scene.bringToTop('About');
  }

  private _close() {
    this.scene.stop(this.scene.key);
  }
}
