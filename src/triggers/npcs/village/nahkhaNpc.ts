import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import {
  nahkhaAfterGoodsObtainedDialog,
  nahkhaAfterTheElderDialog,
  nahkhaBeforeTheElderDialog,
} from '../../../data/dialogs/village/nahkhaDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class NahkhaNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Nahkha',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: nahkhaBeforeTheElderDialog,
      interactionCallback: () => {
      },
    });

    this.preInteractionCallback = () => {
      if (
        scene.player.getQuestById('bigCaltorTrip').currentStates.includes('talkedToElder') === true
                && scene.player.getQuestById('bigCaltorTrip').currentStates.includes('basketsObtained') === false
      ) {
        this.setDialog(nahkhaAfterTheElderDialog, (param: string) => {
          if (param === 'basketsObtained') {
            this.setDialog(nahkhaAfterGoodsObtainedDialog);
            scene.player.addItemToInventory('basket', 10, undefined, scene);
            scene.player.updateQuest('bigCaltorTrip', 'basketsObtained');
          }
        });
      }
    };
  }
}
