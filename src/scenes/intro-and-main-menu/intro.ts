import * as Phaser from 'phaser';
import { GAME_H, GAME_W } from '../../config/constants';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Intro' });
  }

  preload() {
  }

  create() {
    const bgMusic = this.sound.add('intro', {
      loop: true,
      volume: 0.3,
    });
    // bgMusic.soundType = 'music';

    bgMusic.play();

    this.add.text(GAME_W / 2, GAME_H / 2 - 70,
      'Still... Stay still... Calm... Stay calm... \n\n'
      + 'You do not have to go, you do not have to do anything at all...\n\n'
      + 'Just stay that incredibly still..and listen to my voice.\n\n\n'
      + 'I am here to help. I Can help you, and I Will. But I need you to help me first.\n\n'
      + 'Concentrate.. Concentrate on my voice, stay still...and Think. \n\n'
      + 'I need you to help me, I need you to give me a Reason.\n\n'
      + 'A reason to help you.\n\n'
      + 'So ... Think. Just Think...\n\n\n'
      + 'Good... Very good.\n\n\n'
      + 'Now...take me there, show me...',
      {
        font: '14px monospace',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5);

    const showHimVillage = this.add.text(GAME_W / 2, GAME_H / 2 + 200,
      'Show him that lovely morning at the Village',
      {
        font: '14px monospace',
        color: '#ffffff',
        backgroundColor: '#222222',
        padding: {
          x: 10,
          y: 10,
        },
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });

    this.add.graphics()
      .lineStyle(2, 0xffffff, 0.4)
      .strokeRect(showHimVillage.getTopLeft().x, showHimVillage.getTopLeft().y, showHimVillage.width, showHimVillage.height);

    showHimVillage.once('pointerdown', () => {
      bgMusic.stop();
      this.scene.start('WeaklingsCave', { prevScene: this.scene.key });
    });

    const showHimDungeon = this.add.text(GAME_W / 2, GAME_H / 2 + 250,
      'Show him the dungeon',
      {
        font: '14px monospace',
        color: '#ffffff',
        backgroundColor: '#222222',
        padding: {
          x: 10,
          y: 10,
        },
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });

    this.add.graphics()
      .lineStyle(2, 0xffffff, 0.4)
      .strokeRect(showHimDungeon.getTopLeft().x, showHimDungeon.getTopLeft().y, showHimDungeon.width, showHimDungeon.height);

    showHimDungeon.once('pointerdown', () => {
      alert('Coming soon!');
      // bgMusic.stop();
      // this.scene.start("Dungeon", {prevScene: this.scene.key});
    });
  }
}
