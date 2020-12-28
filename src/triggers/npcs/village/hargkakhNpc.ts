import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import {
  hargkakhAfterGoodsObtainedDialog,
  hargkakhFirstDialog,
  hargkakhSecondTryDialog,
} from '../../../data/dialogs/village/hargkakhDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class HargkakhNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Hargkakh',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: hargkakhFirstDialog,
      interactionCallback: (param: string) => {
        if (param === 'pickupFailure') {
          scene.player.addItemToInventory('hargkakhs-key', 1, undefined, scene);
          this.setDialog(hargkakhSecondTryDialog, (param: string) => {
            if (param === 'mineralsObtained') {
              this.setDialog(hargkakhAfterGoodsObtainedDialog);
              scene.player.addItemToInventory('minerals', 10, undefined, scene);
              scene.player.updateQuest('bigCaltorTrip', 'mineralsObtained');
            }
          });
        }
        if (param === 'mineralsObtained') {
          this.setDialog(hargkakhAfterGoodsObtainedDialog);
          scene.player.addItemToInventory('minerals', 10, undefined, scene);
          scene.player.updateQuest('bigCaltorTrip', 'mineralsObtained');
        }
      },
    });
  }
}
