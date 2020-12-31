import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import { elderFirstTimeDialog, elderSecondTimeDialog } from '../../../data/dialogs/village/elderGreetingDialog';
import { elderInstance } from '../../../characters/adventurers/elder';
import { SpriteParameters } from '../../../types/my-types';

export default class ElderNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Elder Guarthh',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: elderFirstTimeDialog,
      interactionCallback: () => {
        scene.player.updateQuest('bigCaltorTrip', 'talkedToElder');
        this.setDialog(elderSecondTimeDialog, (param: string) => {
          if (param === 'readyToGo') {
            this.destroy();
            scene.player.party.push(elderInstance);
            scene.player.updateQuest('bigCaltorTrip', 'readyToGo');
          }
        });
      },
    });
  }
}
