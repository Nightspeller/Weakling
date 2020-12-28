import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { limeDialog, limeSecondDialog } from '../../../data/dialogs/honeywood/limeDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class LimeNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Lime',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: limeDialog,
      interactionCallback: (param: string) => {
        if (param === 'seedsObtained') {
          scene.player.addItemToInventory('chamomile-seeds', 3);
          this.setDialog(limeSecondDialog);
        }
      },
      items: [
        { itemId: 'chamomile-seeds', quantity: 10 },
        { itemId: 'chamomile', quantity: 5 },
      ],
    });
  }
}
