import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { hermitDialogStab } from '../../../data/dialogs/hermitsTower/hermitDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class HermitNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Hermit',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: hermitDialogStab,
      interactionCallback: (param: string) => {
        if (param === 'openShop') {
          this.startTrade();
        }
      },
      items: [
        { itemId: 'copper-pieces', quantity: 10 },
        { itemId: 'dagger-weapon', quantity: 1 },
        { itemId: 'leather-armor', quantity: 1 },
        { itemId: 'leather-pants', quantity: 1 },
        { itemId: 'leather-boots', quantity: 1 },
      ],
    });
  }
}
