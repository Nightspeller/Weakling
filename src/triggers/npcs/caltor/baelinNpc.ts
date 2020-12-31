import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import baelinDialog from '../../../data/dialogs/caltor/baelinDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class BaelinNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Baelin',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: baelinDialog,
      interactionCallback: () => {
      },
    });
  }
}
