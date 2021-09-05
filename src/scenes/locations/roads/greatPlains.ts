import GeneralLocation from '../generalLocation';
import EvelynNpc from '../../../triggers/npcs/greatPlains/evelynNpc';
import evelynDialog from '../../../data/dialogs/greatPlains/evelynDialog';
import BackgroundSoundScene from '../../backgroundSoundScene';

export default class GreatPlainsScene extends GeneralLocation {
  protected evelyn: EvelynNpc;

  constructor() {
    super({ key: 'GreatPlains' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('greatPlains');

    this.evelyn = new EvelynNpc({ scene: this });
  }

  protected async performSpecificCutsceneActions(cutsceneId: string) {
    if (cutsceneId === 'evelynsDream') {
      const backgroundSoundScene = this.scene.get('BackgroundSound') as BackgroundSoundScene;
      backgroundSoundScene.pauseBackgroundMusic();
      const newSound = this.sound.add('evelyns-story', { loop: true, volume: 0 });

      newSound.play();
      this.tweens.add({
        targets: newSound,
        volume: 0.1,
        duration: 1500,
      });

      await this.evelyn.walkThePathToCoords(this.playerImage.x + this.playerImage.width / 4, this.playerImage.y);
      await new Promise<void>((resolve) => {
        this.switchToScene('Dialog', {
          dialogTree: evelynDialog,
          speakerName: 'Evelyn',
          closeCallback: () => {
            resolve();
          },
        }, false);
      });

      // Now, lets restore sounds:
      backgroundSoundScene.resumeBackgroundMusic();

      this.tweens.add({
        targets: newSound,
        volume: 0.0,
        duration: 1500,
        onComplete: () => {
          newSound.stop();
        },
      });
    }
  }
}
