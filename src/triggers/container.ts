import GeneralLocation from '../scenes/locations/generalLocation';
import Item from '../entities/item';
import Trigger from './trigger';
import { Slots } from '../types/my-types';

interface ContainerParams {
  scene: GeneralLocation,
  name: string,
  triggerX: number,
  triggerY: number,
  triggerW: number,
  triggerH: number,
  texture: string,
  frame: number,
  isSecret?: boolean,
  items?: Item[],
  numberOfSlots?: number,
  emptyTexture?: string,
  emptyFrame?: number,
  requiresToOpen?: string,
  disableWhenEmpty?: boolean
  flipX?: boolean,
  flipY?: boolean,
  instantPickup?: boolean,
}

export default class Container extends Trigger {
  private items: Map<Slots, Item>;

  constructor({
    scene,
    name,
    triggerX,
    triggerY,
    triggerW,
    triggerH,
    texture,
    frame,
    isSecret = false,
    items = [],
    numberOfSlots = 10,
    emptyTexture,
    emptyFrame,
    requiresToOpen,
    disableWhenEmpty = false,
    flipX = false,
    flipY = false,
    instantPickup = false,
  }: ContainerParams) {
    if (emptyFrame === -1) emptyFrame = undefined;
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
      isSecret,
      callback: () => {
        if (requiresToOpen) {
          const item = scene.player.getInventoryItemById(requiresToOpen);
          if (!item) return;
        }
        if (instantPickup) {
          items.forEach((itemDescription) => {
            const newItem = scene.player.addItemToInventory(itemDescription.itemId, itemDescription.quantity, undefined, scene);
            if (newItem) {
              scene.showTextAbovePlayer(`${newItem.displayName} (${itemDescription.quantity})`);
            } else {
              scene.showTextAbovePlayer('No space in backpack!');
            }
          });
          // TODO: might be nice to use emptyFrame when provided instead of destroying
          this.destroy();
          return;
        }
        scene.switchToScene('ContainerOverlay', {
          name,
          numberOfSlots,
          items: this.items,
          closeCallback: (itemsInContainer: any) => {
            this.items = itemsInContainer;
            if (this.items.size === 0 && emptyFrame) {
              this.image.setTexture(emptyTexture, emptyFrame);
            } else {
              this.image.setTexture(texture, frame);
            }
            if (this.items.size === 0 && disableWhenEmpty) {
              if (emptyFrame === undefined) {
                this.destroy();
              } else {
                this.setDisableState(true);
              }
            }
          },
        }, false);
      },
    });
    this.items = new Map<Slots, Item>();
    for (let i = 0; i < Math.floor(numberOfSlots / 5) + 1; i += 1) {
      const slotsInRow = Math.floor((numberOfSlots - 5 * i) / 5) > 0 ? 5 : numberOfSlots % 5;
      for (let j = 0; j < slotsInRow; j += 1) {
        if (items[5 * i + j]) {
          this.items.set(`containerSlot${j}_${i}` as Slots, items[5 * i + j]);
        }
      }
    }
    if (flipX) this.image.flipX = true;
    if (flipY) this.image.flipY = true;
  }
}
