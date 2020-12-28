import GeneralLocation from '../scenes/locations/generalLocation';
import Item from '../entities/item';
import Trigger from './trigger';
import { Slots } from '../types/my-types';

interface AlchemyStandParams {
  scene: GeneralLocation,
  name: string,
  triggerX: number,
  triggerY: number,
  triggerW: number,
  triggerH: number,
  texture: string,
  frame: number,
  workingTexture?: string,
  workingFrame?: number,
}

export default class AlchemyStand extends Trigger {
  private items: Map<Slots, Item>;

  constructor(
    {
      scene,
      name,
      triggerX,
      triggerY,
      triggerW,
      triggerH,
      texture,
      frame,
      workingTexture,
      workingFrame,
    }: AlchemyStandParams,
  ) {
    super({
      scene,
      name,
      triggerX,
      triggerY,
      triggerW,
      triggerH,
      texture,
      frame,
      interaction: 'activate',
      isSecret: false,
      callback: () => {
        scene.switchToScene('AlchemyStand', {
          name,
          itemsOnStand: this.items,
          closeCallback: (itemsOnStand: any) => {
            this.items = itemsOnStand;
            if (this.items.size !== 0 && workingFrame) {
              this.image.setTexture(workingTexture, workingFrame);
            } else {
              this.image.setTexture(texture, frame);
            }
          },
        }, false);
      },
    });
    this.items = new Map<Slots, Item>();
  }
}
