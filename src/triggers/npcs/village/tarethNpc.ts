import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { tarethDialog, tarethDoneDialog, tarethSecondDialog } from '../../../data/dialogs/village/tarethDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class TarethNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Tareth',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: tarethDialog,
      interactionCallback: () => {
        this.setDialog(tarethSecondDialog, (param: string) => {
          if (param === 'potionGiven') {
            this.setDialog(tarethDoneDialog, (/* param */) => {
              scene.player.updateQuest('helpTheTareth', 'completed');
            });
            scene.player.updateQuest('helpTheTareth', 'potionGiven');
          } else {
            scene.player.updateQuest('helpTheTareth', 'potionToMake');
          }
        });
        scene.player.addQuest('helpTheTareth');
      },
    });
  }
}
