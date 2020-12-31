import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { announcementsDialog, announcementsEmptyDialog } from '../../../data/dialogs/caltor/announcementsDialog';
import { playerInstance } from '../../../characters/adventurers/player';
import { SpriteParameters } from '../../../types/my-types';

export default class AnnouncementsDeskNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Announcements',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: announcementsDialog,
      interactionCallback: (param: string) => {
        if (param === 'questAccepted') {
          this.setDialog(announcementsEmptyDialog);
          scene.player.addQuest('boarsAtTheFields');
          if (playerInstance.defeatedEnemies.includes('caltor/Boars 1') && playerInstance.defeatedEnemies.includes('caltor/Boars 2')) {
            playerInstance.updateQuest('boarsAtTheFields', 'boarsKilled');
          }
        }
      },
    });
  }
}
