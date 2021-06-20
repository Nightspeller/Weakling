import * as Phaser from 'phaser';

import Item from '../../entities/item';
import Trigger from '../trigger';
import GeneralLocation from '../../scenes/locations/generalLocation';
import { DialogTree, Slots, SpriteParameters } from '../../types/my-types';
import findPath from '../../helpers/findPath';

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

  public async walkThePathToCoords(x: number, y: number, finalFacingDirection = 'down', walkingSpeed = 0.05) {
    const groundLayerObject = this.scene.map.getLayer('Layer 1/Below player').tilemapLayer;
    const wallsLayerObject = this.scene.map.getLayer('Layer 1/Collisions').tilemapLayer;
    const path = findPath(
      {x: this.image.x, y: this.image.y},
      { x, y },
      groundLayerObject,
      wallsLayerObject
    );
    console.log('Walking along the path', path);
    if (path.length !== 0) {
      for (const pathSegment of path) {
        await this.animateWalkingTo(pathSegment.x, pathSegment.y, walkingSpeed);
      }
      console.log(`${this.image.texture.key}-idle-${finalFacingDirection}`);
      this.image.anims.play(`${this.image.texture.key}-idle-${finalFacingDirection}`);
    }
  }

  private async animateWalkingTo(targetX: number, targetY: number, walkingSpeed: number) {
    const currentX = this.image.x;
    const currentY = this.image.y;
    const dx = currentX - targetX;
    const dy = currentY - targetY;
    // Lets see if char moves more along X or along Y to play more suitable animation
    const primaryAxe = Math.abs(dx) > Math.abs(dy) ? 'axeX' : 'axeY';
    const distance = Math.sqrt((currentX - targetX)**2 + (currentY- targetY)**2);
    if (primaryAxe === 'axeX' && dx < 0) {
      this.image.anims.play(`${this.image.texture.key}-walk-right`, true);
    }
    if (primaryAxe === 'axeX' && dx > 0) {
      this.image.anims.play(`${this.image.texture.key}-walk-left`, true);
    }
    if (primaryAxe === 'axeY' && dy < 0) {
      this.image.anims.play(`${this.image.texture.key}-walk-down`, true);
    }
    if (primaryAxe === 'axeY' && dy > 0) {
      this.image.anims.play(`${this.image.texture.key}-walk-up`, true);
    }
    await new Promise<void>(resolve => {
      this.scene.tweens.add({
        targets: this.image,
        x: targetX,
        y: targetY,
        duration: distance/walkingSpeed,
        onComplete: () => {
          resolve();
        },
      })
    })
  }

  protected handlePlayerImageCollision(playerImage: Phaser.Physics.Arcade.Sprite, collisionImage: Phaser.Physics.Arcade.Sprite) {
    // to prevent the animation to play for graveNpc
    if (collisionImage.frame.texture.key === 'base-addition') return;

    if (collisionImage.anims == null && collisionImage.anims.currentFrame == null) return;

    const triggerBodyBounds = collisionImage.body.getBounds({
      x: 0, y: 0, right: 0, bottom: 0,
    });
    const playerBodyBounds = playerImage.body.getBounds({
      x: 0, y: 0, right: 0, bottom: 0,
    });

    if (triggerBodyBounds.y === playerBodyBounds.bottom) collisionImage.anims.play(`${collisionImage.texture.key}-idle-up`);
    if (triggerBodyBounds.x === playerBodyBounds.right) collisionImage.anims.play(`${collisionImage.texture.key}-idle-left`);
    if (triggerBodyBounds.bottom === playerBodyBounds.y) collisionImage.anims.play(`${collisionImage.texture.key}-idle-down`);
    if (triggerBodyBounds.right === playerBodyBounds.x) collisionImage.anims.play(`${collisionImage.texture.key}-idle-right`);
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
