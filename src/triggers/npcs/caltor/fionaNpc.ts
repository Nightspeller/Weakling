import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import fionaDialog from '../../../data/dialogs/caltor/fionaDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class FionaNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Fiona',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: fionaDialog,
      interactionCallback: (param: string) => {
        if (param === 'openShop') {
          this.startTrade();
        }
        /* if (param === 'goodsSold') {
                    scene.player.addItemToInventory('copper-pieces', 100, undefined, scene);
                    this.addItemsToTrade([
                        {itemId: 'minerals', quantity: 10},
                        {itemId: 'basket', quantity: 10},
                    ]);
                    scene.player.updateQuest('bigCaltorTrip', 'goodsSold');
                }
                if (param === 'goodsSoldAndOpenShop') {
                    scene.player.addItemToInventory('copper-pieces', 100, undefined, scene);
                    this.addItemsToTrade([
                        {itemId: 'minerals', quantity: 10},
                        {itemId: 'basket', quantity: 10},
                    ]);
                    scene.player.updateQuest('bigCaltorTrip', 'goodsSold');
                    this.startTrade();
                } */
      },
      items: [
        { itemId: 'copper-pieces', quantity: 10 },
        { itemId: 'chamomile', quantity: 5 },
        { itemId: 'chamomile-seeds', quantity: 10 },
        { itemId: 'primula-flower', quantity: 5 },
        { itemId: 'primula-sapling', quantity: 10 },
      ],
    });
  }
}
