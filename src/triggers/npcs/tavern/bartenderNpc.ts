import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { bartenderDialog, bartenderNoRumoresDialog } from '../../../data/dialogs/tavern/bartenderDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class BartenderNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Bartender',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: bartenderDialog,
      interactionCallback: (param: string) => {
        if (param === 'beerAndRumorObtained') {
          scene.player.addItemToInventory('beer', 1, undefined, scene);
          this.setDialog(bartenderNoRumoresDialog);
        }
        if (param === 'openShop') {
          this.startTrade();
        }
      },
      items: [
        { itemId: 'copper-pieces', quantity: 40 },
        { itemId: 'beer', quantity: 5 },
        { itemId: 'pumpkin', quantity: 2 },
        { itemId: 'apple', quantity: 3 },
        { itemId: 'carrot', quantity: 4 },
      ],
    });
  }
}
