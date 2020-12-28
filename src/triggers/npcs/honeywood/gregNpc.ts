import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import {
  gregAfterQuestFinishedDialog,
  gregDialog,
  gregQuestAcceptedDialog,
} from '../../../data/dialogs/honeywood/gregDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class GregNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Greg',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: gregDialog,
      interactionCallback: (param: string) => {
        if (param === 'jobAccepted') {
          scene.player.addQuest('gatherTheGarlic');
          this.setDialog(gregQuestAcceptedDialog);
        }
        if (param === 'garlicGathered') {
          scene.player.updateQuest('gatherTheGarlic', 'completed');
          this.setDialog(gregAfterQuestFinishedDialog);
        }
        if (param === 'garlicGatheredOpenShop') {
          scene.player.updateQuest('gatherTheGarlic', 'completed');
          this.setDialog(gregAfterQuestFinishedDialog);
          this.startTrade();
        }
        if (param === 'openShop') {
          this.startTrade();
        }
      },
      items: [
        { itemId: 'garlic', quantity: 10 },
        { itemId: 'garlic-seeds', quantity: 10 },
      ],
    });
  }
}
