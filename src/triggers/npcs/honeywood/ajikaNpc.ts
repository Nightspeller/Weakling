import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { SpriteParameters } from '../../../types/my-types';
import { ajikaDialog, ajikaNotYetFoundDialog } from '../../../data/dialogs/honeywood/ajikaDialog';

export default class AjikaNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Ajika',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: ajikaDialog,
      interactionCallback: (param: string) => {
        if (param === 'questObtained') {
          this.setDialog(ajikaNotYetFoundDialog);
        }
      },
      items: [],
    });
  }
}
