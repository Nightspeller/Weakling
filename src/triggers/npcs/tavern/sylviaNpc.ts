import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { SpriteParameters } from '../../../types/my-types';
import { sylviaDialog } from '../../../data/dialogs/tavern/sylviaDialog';

export default class SylviaNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Sylvia',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: sylviaDialog,
      interactionCallback: (/* param: string */) => {
      },
      items: [
        { itemId: 'copper-pieces', quantity: 40 },

      ],
    });
  }
}
