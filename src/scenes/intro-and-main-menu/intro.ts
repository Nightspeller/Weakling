import GeneralLocation from '../locations/generalLocation';
import BackgroundSoundScene from '../backgroundSoundScene';

import {introRevivalDialog} from '../../data/dialogs/introRevivalDialog';
import { sceneEvents } from '../../triggers/eventsCenter';

export default class IntroScene extends GeneralLocation {
  constructor() {
    super({ key: 'Intro' });
  }

  preload() {
  }

  public init(data: any) {
    super.init(data);
  }
  create() {
    this.cameras.main.fadeIn(2000, 0, 0, 0);

    const soundManagerScene = this.scene.get('BackgroundSound') as BackgroundSoundScene;
    soundManagerScene.playBackgroundMusic('intro');

    this.scene.run('StoryTellingWindow');

    this.time.delayedCall(7500, () => {
    this.switchToScene('Dialog', {
      dialogTree: introRevivalDialog,
      speakerName: 'Unknown'
        },
      closeCallback: () => {
        this.cameras.main.fadeOut(1500, 0, 0, 0);
        this.scene.remove('StoryTellingWindow');
          this.time.delayedCall(1500, () => {
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
      updateCallback: () => {
        console.log('updateCallback')
        sceneEvents.emit('change-intro-story-video')
      }
    }, false);
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
