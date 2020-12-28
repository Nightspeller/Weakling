import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { keithDialog, keithNoApologyDialog, keithShopAgainDialog } from '../../../data/dialogs/village/keithDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class KeithNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Farmer Keith',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: keithDialog,
      interactionCallback: (param: string) => {
        if (param === 'noApology') {
          this.setDialog(keithNoApologyDialog);
        }
        if (param === 'openShop') {
          this.startTrade();
          this.setDialog(keithShopAgainDialog);
        }
      },
      items: [
        { itemId: 'copper-pieces', quantity: 30 },
        { itemId: 'carrot-seeds', quantity: 5 },
        { itemId: 'carrot', quantity: 3 },
        { itemId: 'strawberry-seeds', quantity: 3 },
        { itemId: 'strawberry', quantity: 5 },
        { itemId: 'pumpkin-seeds', quantity: 5 },
        { itemId: 'pumpkin', quantity: 3 },
        { itemId: 'cabbage-seeds', quantity: 5 },
        { itemId: 'cabbage', quantity: 3 },
        { itemId: 'basic-sack', quantity: 1 },
      ],
    });
  }
}
