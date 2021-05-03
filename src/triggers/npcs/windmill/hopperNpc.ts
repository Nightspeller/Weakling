import GeneralNpc from '../generalNpc';
import GeneralLocation from '../../../scenes/locations/generalLocation';
import hopperDialog from '../../../data/dialogs/windmill/hopperDialog';
import { SpriteParameters } from '../../../types/my-types';
import Container from '../../container';
import Item from '../../../entities/item';

export default class HopperNpc extends GeneralNpc {
  constructor({
    scene, x, y, spriteParams,
  }: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
    super({
      scene,
      name: 'Hopper',
      triggerX: x,
      triggerY: y,
      spriteParams,
      initDialog: hopperDialog,
      interactionCallback: (param: string) => {
        if (param === 'wheatFlourObtained') {
          const item = new Item('wheat-flour', 1);
          const trigger = scene.triggers.find((trigger) => trigger.name === 'MillChest') as Container;
          trigger.addItem(item);
        } else if (param === 'cornFlourObtained') {
          const item = new Item('corn-flour', 1);
          const trigger = scene.triggers.find((trigger) => trigger.name === 'MillChest') as Container;
          trigger.addItem(item);
        }
      },
    });
  }
}
