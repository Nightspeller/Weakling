import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { SpriteParameters } from '../../../types/my-types';
import { victousDialog } from '../../../data/dialogs/tavern/victousDialog';

export default class VictousNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Victous',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: victousDialog,
      interactionCallback: (/* param: string */) => {
      },
      items: [
        { itemId: 'copper-pieces', quantity: 40 },

      ],
    });
  }
}
