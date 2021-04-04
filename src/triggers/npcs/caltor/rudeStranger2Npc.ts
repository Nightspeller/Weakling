import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { SpriteParameters } from '../../../types/my-types';
import rudeStrangerDialog from '../../../data/dialogs/caltor/rudeStrangerDialog';

export default class RudeStranger2Npc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Rude stranger 2',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: rudeStrangerDialog,
      interactionCallback: () => {
      },
    });
  }
}
