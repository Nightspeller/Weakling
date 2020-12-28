import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import {
  fountainChangedDialog,
  fountainSignDialog,
  fountainVandalDialog,
} from '../../../data/dialogs/caltor/fountainSignDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class FountainNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Fountain sign',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: fountainSignDialog,
      interactionCallback: () => {
        if (scene.player.getQuestById('theSelflessSpirit')?.currentStates.includes('started')) {
          scene.player.updateQuest('theSelflessSpirit', 'falseNameLearned');
        }
      },
    });

    this.preInteractionCallback = () => {
      if (scene.player.getQuestById('theSelflessSpirit')?.currentStates.includes('trueNameLearned')
                && !scene.player.getQuestById('theSelflessSpirit')?.currentStates.includes('deedsGlorified')
      ) {
        this.setDialog(fountainVandalDialog, (param: string) => {
          if (param === 'fountainVandalized') {
            scene.player.updateQuest('theSelflessSpirit', 'deedsGlorified');
            this.setDialog(fountainChangedDialog, () => {
            });
          }
        });
      }
    };
  }
}
