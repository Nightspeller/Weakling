import * as Phaser from 'phaser';

import Item from '../../entities/item';
import Trigger from '../trigger';
import GeneralLocation from '../../scenes/locations/generalLocation';
import { DialogTree, Slots, SpriteParameters } from '../../types/my-types';

export interface NpcOptions {
  scene: GeneralLocation;
  name: string;
  triggerX?: number;
  triggerY?: number;
  spriteParams?: SpriteParameters;
  initDialog?: DialogTree;
  preInteractionCallback?: Function;
  interactionCallback?: Function;
  items?: any[];
}

export default class GeneralNpc extends Trigger {
  public dialog: DialogTree;
  protected preInteractionCallback: Function;
  private interactionCallback: Function;
  private items: Map<Slots, Item>;
  private numberOfSlots: number;

  constructor(
    {
      scene,
      name,
      triggerX,
      triggerY,
      spriteParams,
      initDialog,
      items = [],
      preInteractionCallback = () => {
      },
      interactionCallback = () => {
      },
    }: NpcOptions,
  ) {
    if (triggerX === undefined) {
      const mapObject = scene.getMapObject(name, 'NPCs');
      triggerX = mapObject.x;
      triggerY = mapObject.y;
      spriteParams = scene.getSpriteParamsByObjectName(name, 'NPCs') || {
        texture: undefined,
        frame: undefined,
      };
      spriteParams.width = mapObject.width;
      spriteParams.height = mapObject.height;
    }
    super({
      scene,
      name,
      triggerX,
      triggerY,
      triggerW: spriteParams.width,
      triggerH: spriteParams.height,
      texture: spriteParams.texture,
      frame: spriteParams.frame,
      callback: () => {
        this.preInteractionCallback();
        if (this.dialog) {
          scene.switchToScene('Dialog', {
            dialogTree: this.dialog,
            speakerName: this.name,
            closeCallback: (param: any) => {
              this.interactionCallback(param);
            },
          }, false);
        } else {
          this.interactionCallback = interactionCallback || (() => {});
          this.interactionCallback();
        }
      },
    });
    if (spriteParams.animation) this.image.anims.play(spriteParams.animation);
    this.dialog = initDialog;
    this.preInteractionCallback = preInteractionCallback;
    this.interactionCallback = interactionCallback;

    this.items = new Map<Slots, Item>();
    this.numberOfSlots = 15;
    for (let i = 0; i < Math.floor(this.numberOfSlots / 5) + 1; i += 1) {
      const slotsInRow = Math.floor((this.numberOfSlots - 5 * i) / 5) > 0 ? 5 : this.numberOfSlots % 5;
      for (let j = 0; j < slotsInRow; j += 1) {
        if (items[5 * i + j]) {
          const newItem = new Item(items[5 * i + j].itemId, items[5 * i + j].quantity);
          this.items.set(`containerSlot${j}_${i}` as Slots, newItem);
        }
      }
    }
  }

  protected handlePlayerImageCollision(playerImage: Phaser.Physics.Arcade.Sprite, collisionImage: Phaser.Physics.Arcade.Sprite) {
    // to prevent the animation to play for graveNpc
    if (collisionImage.frame.texture.key === 'base-addition') return;

    if (collisionImage.anims == null && collisionImage.anims.currentFrame == null) return;

    if (playerImage.y + playerImage.body.height <= collisionImage.y - collisionImage.body.height / 2) {
      collisionImage.anims.play(`${collisionImage.texture.key}-idle-up`);
    } else if (playerImage.y >= collisionImage.y + collisionImage.body.height / 2) {
      collisionImage.anims.play(`${collisionImage.texture.key}-idle-down`);
    } else if (playerImage.x < collisionImage.x) {
      collisionImage.anims.play(`${collisionImage.texture.key}-idle-left`);
    } else if (playerImage.x > collisionImage.x) {
      collisionImage.anims.play(`${collisionImage.texture.key}-idle-right`);
    }
  }

  public setDialog(newDialog?: DialogTree, newInteractionCallback?: Function) {
    this.dialog = newDialog;
    if (newInteractionCallback) this.interactionCallback = newInteractionCallback;
  }

  public startTrade() {
    this.scene.switchToScene('TraderOverlay', {
      name: this.name,
      numberOfSlots: this.numberOfSlots,
      items: this.items,
      closeCallback: (itemsInContainer: Map<Slots, Item>) => {
        this.items = itemsInContainer;
      },
    }, false);
  }

  public addItemsToTrade(itemsData: { itemId: string; quantity: number }[]) {
    itemsData.forEach((item) => {
      for (let i = 0; i < Math.floor(this.numberOfSlots / 5) + 1; i += 1) {
        const slotsInRow = Math.floor((this.numberOfSlots - 5 * i) / 5) > 0 ? 5 : this.numberOfSlots % 5;
        for (let j = 0; j < slotsInRow; j += 1) {
          if (this.items.get(`containerSlot${j}_${i}` as Slots) === undefined) {
            const newItem = new Item(item.itemId, item.quantity);
            this.items.set(`containerSlot${j}_${i}` as Slots, newItem);
            return;
          }
        }
      }
      throw new Error('Trader is full, cant add items! Write more code to handle it properly!');
    });
  }
}
