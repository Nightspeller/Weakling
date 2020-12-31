import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { whiskersDialog, whiskersSecondDialog } from '../../../data/dialogs/village/whiskersDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class WhiskersNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Whiskers',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: whiskersDialog,
      interactionCallback: () => {
        this.setDialog(whiskersSecondDialog);
      },
    });
  }
}
