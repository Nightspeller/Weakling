import GeneralLocation from '../locations/generalLocation';
import BackgroundSoundScene from '../backgroundSoundScene';

import { introRevivalDialog } from '../../data/dialogs/introRevivalDialog';
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

    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.remove('StorytellingWindow');
      this.scene.start('WeaklingsCave', { prevScene: this.scene.key });
    });

    this.scene.run('StorytellingWindow');

    this.time.delayedCall(7500, () => {
      this.switchToScene('Dialog', {
        dialogTree: introRevivalDialog,
        speakerName: 'Unknown',
        sounds: {
          volume: 0.1,
          soundKeys: { shortSound: 'typewriter-intro-short', longSound: 'typewriter-intro-long', endSound: 'typewriter-end' },
        },
        closeCallback: () => {
          this.cameras.main.fadeOut(1500, 0, 0, 0);
        },
        updateCallback: () => {
          console.log('updateCallback');
          sceneEvents.emit('change-intro-story-video');
        },
      }, false);
    });
  }
}
