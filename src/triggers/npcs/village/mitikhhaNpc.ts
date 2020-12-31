import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import {
  mitikhhaDialog,
  mitikhhaSecondDialog,
  mitikhhaWelcomeBackDialog,
} from '../../../data/dialogs/village/mitikhhaDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class MitikhhaNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Mitikhha',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: mitikhhaDialog,
      interactionCallback: () => {
        this.setDialog(mitikhhaSecondDialog);
      },
    });

    this.preInteractionCallback = () => {
      if (scene.player.getQuestById('bigCaltorTrip').currentStates.includes('goodsSold')) {
        this.setDialog(mitikhhaWelcomeBackDialog, () => {
          this.destroy();
        });
        scene.player.updateQuest('bigCaltorTrip', 'completed');
      }
    };
  }
}
