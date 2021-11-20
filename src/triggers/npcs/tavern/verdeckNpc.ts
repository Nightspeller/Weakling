import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { SpriteParameters } from '../../../types/my-types';
import { verdeckDialog } from '../../../data/dialogs/tavern/verdeckDialog';

export default class VerdeckNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Verdeck',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: verdeckDialog,
      interactionCallback: (/* param: string */) => {
      },
      items: [
        { itemId: 'copper-pieces', quantity: 40 },

      ],
    });
  }
}
