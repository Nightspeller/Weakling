import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import {
  moorshDialog,
  moorshSecondAcceptedDialog,
  moorshSecondNotAcceptedDialog, moorshThirdDialog,
} from '../../../data/dialogs/village/moorshDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class MoorshNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Moorsh',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: moorshDialog,
      interactionCallback: (param: string) => {
        if (param === 'boneQuestAccepted') {
          this.setDialog(moorshSecondAcceptedDialog, (param: string) => {
            if (param === 'sporesObtained') {
              scene.player.updateQuest('bonesPicking', 'completed');
              scene.player.addItemToInventory('purplecup-spore', 2, undefined, scene);
              scene.player.addItemToInventory('longshroom-spore', 2, undefined, scene);
              this.setDialog(moorshThirdDialog, (param: string) => {
                if (param === 'openStore') this.startTrade();
              });
            }
          });
          scene.player.addQuest('bonesPicking');
        } else {
          this.setDialog(moorshSecondNotAcceptedDialog);
        }
      },
      items: [
        { itemId: 'purplecup-spore', quantity: 5 },
        { itemId: 'longshroom-spore', quantity: 5 },
        { itemId: 'rocky-rose-sapling', quantity: 2 },
        { itemId: 'yellow-fingers-sapling', quantity: 3 },
        { itemId: 'pinky-pie-sapling', quantity: 2 },
      ],
    });
  }
}
