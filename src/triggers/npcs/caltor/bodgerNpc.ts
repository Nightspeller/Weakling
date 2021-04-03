import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import bodgerDialog from '../../../data/dialogs/caltor/bodgerDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class BodgerNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Bodger',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: bodgerDialog,
      interactionCallback: (param: string) => {
        if (param === 'openShop') {
          this.startTrade();
        }
        if (param === 'goodsSold') {
          scene.player.addItemToInventory('copper-pieces', 100, undefined, scene);
          this.addItemsToTrade([
            { itemId: 'minerals', quantity: 10 },
            { itemId: 'basket', quantity: 10 },
          ]);
          scene.player.updateQuest('bigCaltorTrip', 'goodsSold');
        }
        if (param === 'goodsSoldAndOpenShop') {
          scene.player.addItemToInventory('copper-pieces', 100, undefined, scene);
          this.addItemsToTrade([
            { itemId: 'minerals', quantity: 10 },
            { itemId: 'basket', quantity: 10 },
          ]);
          scene.player.updateQuest('bigCaltorTrip', 'goodsSold');
          this.startTrade();
        }
      },
      items: [
        { itemId: 'copper-pieces', quantity: 10 },
        { itemId: 'dagger-weapon', quantity: 1 },
        { itemId: 'leather-armor', quantity: 1 },
        { itemId: 'leather-pants', quantity: 1 },
        { itemId: 'leather-boots', quantity: 1 },
        { itemId: 'simple-bow', quantity: 1 },
        { itemId: 'wooden-arrow', quantity: 10 },
        { itemId: 'decent-fishing-rod', quantity: 1 },
      ],
    });
  }
}
