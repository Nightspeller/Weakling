import GeneralLocation from '../generalLocation';
import EvelynNpc from '../../../triggers/npcs/greatPlains/evelynNpc';
import evelynDialog from '../../../data/dialogs/greatPlains/evelynDialog';

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
      const currentSound = this.sound.get('keys-for-success');
      const newSound = this.sound.add('evelyns-story', { loop: true });
      if (currentSound) {
        this.tweens.add({
          targets: currentSound,
          volume: 0,
          duration: 1500,
        });
      }
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

      if (currentSound) {
        this.tweens.add({
          targets: currentSound,
          volume: 0.10,
          duration: 1500,
        });
      }
      this.tweens.add({
        targets: this.sound.get('evelyns-story'),
        volume: 0.0,
        duration: 1500,
      });
    }
  }
}
