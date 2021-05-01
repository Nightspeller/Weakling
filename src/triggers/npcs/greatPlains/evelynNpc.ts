import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import evelynDialog from '../../../data/dialogs/greatPlains/evelynDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class EvelynNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Evelyn',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: evelynDialog,
      interactionCallback: () => {
      },
    });
  }
}
