import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { SpriteParameters } from '../../../types/my-types';
import { ronDialog, ronHasToReturnDialog } from './ronDialog';
import { kaiHasToReturnDialog } from './kaiDialog';

export default class RonNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Ron',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: ronDialog,
      interactionCallback: (param: string) => {
        if (param === 'ronFound') {
          this.destroy();
          scene.player.updateQuest('lostInTheWoodsPartTwo', 'ronFound');
        }
      },
      items: [],
    });

    this.preInteractionCallback = () => {
      if (scene.player.getQuestById('lostInTheWoodsPartTwo')?.currentStates.includes('started')) {
        this.setDialog(ronHasToReturnDialog);
      }
    };
  }
}
