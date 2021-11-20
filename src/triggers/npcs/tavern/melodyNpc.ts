import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { SpriteParameters } from '../../../types/my-types';
import { melodyDialog } from '../../../data/dialogs/tavern/melodyDialog';

export default class MelodyNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Melody',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: melodyDialog,
      interactionCallback: (/* param: string */) => {
      },
      items: [
        { itemId: 'copper-pieces', quantity: 40 },

      ],
    });
  }
}
