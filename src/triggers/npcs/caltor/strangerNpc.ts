import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import strangerDialog from '../../../data/dialogs/caltor/strangerDialog';
import { SpriteParameters } from '../../../types/my-types';

export default class StrangerNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Stranger',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: strangerDialog,
      interactionCallback: (param: string) => {
        if (param === 'daggerObtained') {
          scene.player.addItemToInventory('dagger-weapon', 1, undefined, scene);
        }
      },
    });
  }
}
