import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { SpriteParameters } from '../../../types/my-types';

export default class KasimaNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Kasima',
      triggerX: x,
      triggerY: y,
      spriteParams,
      interactionCallback: () => {
        this.startTrade();
      },
      items: [
        { itemId: 'copper-pieces', quantity: 200 },
        { itemId: 'silver-pieces', quantity: 1 },
        { itemId: 'rope-belt', quantity: 1 },
        { itemId: 'invisibility-cape', quantity: 1 },
        { itemId: 'minor-energy-ring', quantity: 1 },
        { itemId: 'small-bottle', quantity: 2 },
        { itemId: 'medium-bottle', quantity: 2 },
        { itemId: 'big-bottle', quantity: 2 },
      ],
    });
  }
}
