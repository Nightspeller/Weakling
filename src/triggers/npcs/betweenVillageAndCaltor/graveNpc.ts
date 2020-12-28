import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import {
  graveDialog,
  graveDialogWithFalseName, graveDialogWithGlorification,
  graveDialogWithTrueName, readyToTakeTheOath,
} from '../../../data/dialogs/betweenVillageAndCaltor/graveDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class GraveNpc extends GeneralNpc {
  constructor({
    scene,
    x,
    y,
    spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Grave',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: graveDialog,
      interactionCallback: (/* param */) => {
        scene.player.addQuest('theSelflessSpirit');
      },
    });

    this.preInteractionCallback = () => {
      if (scene.player.getQuestById('theSelflessSpirit')) {
        scene.triggers.forEach((trigger) => {
          if (trigger.name === 'Primula'
            && trigger.image.x > 640 && trigger.image.x < 736
            && trigger.image.y > 288 && trigger.image.y < 384
          ) {
            scene.player.updateQuest('theSelflessSpirit', 'deathMoaned');
          }
        });
      }

      if (scene.player.getQuestById('theSelflessSpirit')
        ?.currentStates
        .includes('falseNameLearned')) {
        this.setDialog(graveDialogWithFalseName, (param: string) => {
          if (param === 'falseNameCalled') {
            scene.player.updateQuest('theSelflessSpirit', 'falseNameCalled');
            scene.switchToScene('Battle', {
              enemies: [{ type: 'ghost-knight' }],
              background: 'field-background',
            });
          }
        });
      }
      if (scene.player.getQuestById('theSelflessSpirit')
        ?.currentStates
        .includes('trueNameLearned')) {
        this.setDialog(graveDialogWithTrueName, (param: string) => {
          if (param === 'trueNameCalled') {
            scene.player.updateQuest('theSelflessSpirit', 'trueNameCalled');
          }
        });
      }
      if (scene.player.getQuestById('theSelflessSpirit')
        ?.currentStates
        .includes('deedsGlorified')) {
        this.setDialog(graveDialogWithGlorification, (param: string) => {
          // eslint-disable-next-line no-empty
          if (param === 'deedsGlorified') { }
        });
      }
      if (scene.player.getQuestById('theSelflessSpirit')
        ?.currentStates
        .includes('trueNameCalled')
        && scene.player.getQuestById('theSelflessSpirit')
          ?.currentStates
          .includes('deedsGlorified')
        && scene.player.getQuestById('theSelflessSpirit')
          ?.currentStates
          .includes('deathMoaned')) {
        this.setDialog(readyToTakeTheOath, (param: string) => {
          if (param === 'oathTaken') {
            scene.player.updateAchievement('Spirit them away', undefined, true);
            scene.player.updateQuest('theSelflessSpirit', 'completed');
          }
        });
      }
    };
  }
}
