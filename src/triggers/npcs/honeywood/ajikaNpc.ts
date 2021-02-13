import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { SpriteParameters } from '../../../types/my-types';
import {
  ajikaDialog, ajikaFamilyReunitedDialog, ajikaKaiFoundDialog,
  ajikaNotYetFoundDialog,
  ajikaRonFoundDialog,
  ajikaRonLostDialog,
} from '../../../data/dialogs/honeywood/ajikaDialog';

export default class AjikaNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Ajika',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: ajikaDialog,
      interactionCallback: (param: string) => {
        if (param === 'questObtained') {
          this.setDialog(ajikaNotYetFoundDialog);
          scene.player.addQuest('lostInTheWoods');
        }
        if (param === 'sonReturned') {
          scene.player.updateQuest('lostInTheWoods', 'completed');
          this.setDialog(ajikaRonLostDialog, (param: string) => {
            if (param === 'findRonAccepted') {
              this.setDialog(ajikaNotYetFoundDialog);
              scene.player.addQuest('lostInTheWoodsPartTwo');
            }
            if (param === 'husbandReturned') {
              scene.player.updateQuest('lostInTheWoodsPartTwo', 'completed');
              this.setDialog(ajikaFamilyReunitedDialog, (param: string) => {
                if (param === 'openShop') {
                  this.startTrade();
                }
              });
            }
          });
        }
      },
      items: [
        { itemId: 'copper-pieces', quantity: 10 },
        { itemId: 'chocolatePie', quantity: 3 },
        { itemId: 'apple', quantity: 5 },
      ],
    });

    this.preInteractionCallback = () => {
      if (scene.player.getQuestById('lostInTheWoods')?.currentStates.includes('kaiFound')
        && !scene.player.getQuestById('lostInTheWoods')?.currentStates.includes('completed')
      ) {
        this.setDialog(ajikaKaiFoundDialog);
      }

      if (scene.player.getQuestById('lostInTheWoodsPartTwo')?.currentStates.includes('ronFound')
        && !scene.player.getQuestById('lostInTheWoodsPartTwo')?.currentStates.includes('completed')
      ) {
        this.setDialog(ajikaRonFoundDialog);
      }
    };
  }
}
