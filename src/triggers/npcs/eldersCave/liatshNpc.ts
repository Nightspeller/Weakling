import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import liatshDialog from '../../../data/dialogs/eldersCave/liatshDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class LiatshNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Liatsh',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: liatshDialog,
      interactionCallback: (/* param */) => {
      },
    });
  }
}
