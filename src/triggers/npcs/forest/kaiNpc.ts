import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { SpriteParameters } from '../../../types/my-types';
import { kaiDialog, kaiHasToReturnDialog } from './kaiDialog';
import { ajikaKaiFoundDialog } from '../../../data/dialogs/honeywood/ajikaDialog';

export default class KaiNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Kai',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: kaiDialog,
      interactionCallback: (param: string) => {
        if (param === 'kaiFound') {
          this.destroy();
          scene.player.updateQuest('lostInTheWoods', 'kaiFound');
        }
      },
      items: [],
    });

    this.preInteractionCallback = () => {
      if (scene.player.getQuestById('lostInTheWoods')?.currentStates.includes('started')) {
        this.setDialog(kaiHasToReturnDialog);
      }
    };
  }
}
