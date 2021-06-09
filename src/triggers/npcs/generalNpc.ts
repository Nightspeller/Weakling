import * as Phaser from 'phaser';

import Item from '../../entities/item';
import Trigger from '../trigger';
import GeneralLocation from '../../scenes/locations/generalLocation';
import { DialogTree, Slots, SpriteParameters } from '../../types/my-types';

enum NpcActionState
{
  WALKING,
  IDLE
}

export const enum Direction {
  IDLE_DOWN,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  NONE
}

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

  private walkPath: Phaser.Math.Vector2[];
  private walkToTarget?: Phaser.Math.Vector2;
  private _direction: Direction;
  private _npcActionState: NpcActionState;

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

    this.walkPath = [];
    this._direction = Direction.NONE;
    this._npcActionState = NpcActionState.IDLE;

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

  public playNpcAnimation(npcImage: Phaser.Physics.Arcade.Sprite) {
    npcImage.anims.play('female22-2-walk-down');
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

  walkAlong(path: Phaser.Math.Vector2[]) {
    if (!path || path.length <= 0) {
      return;
    }

    this.walkPath = path;
    this.walkTo(this.walkPath.shift()!);
  }

  private walkTo(target: Phaser.Math.Vector2) {
    this.walkToTarget = target;
    this.walk();
  }

  public walk() {
    if (!this.image.body) {
      return;
    }

    let dx = 0;
    let dy = 0;

    if (this.walkToTarget) {
      dx = this.walkToTarget.x - this.image.x;
      dy = this.walkToTarget.y - this.image.y;

      if (Math.abs(dx) < 1) {
        dx = 0;
      }
      if (Math.abs(dy) < 1) {
        dy = 0;
      }
      if (dx === 0 && dy === 0) {
        if (this.walkPath.length > 0) {
          this.walkTo(this.walkPath.shift()!);
          return;
        }

        this.walkToTarget = undefined;
        this._npcActionState = NpcActionState.IDLE;
      }
    }

    this.mimicKeys(dx, dy);
  }

  mimicKeys(dx: number, dy: number) {
    const walkLeft = dx < 0;
    const walkRight = dx > 0;
    const walkUp = dy < 0;
    const walkDown = dy > 0;

    const speed = 25;

    if (walkLeft) {
      this._direction = Direction.LEFT;
      this.image.anims.play(`${this.image.texture.key}-walk-left`, true);
      this.image.setVelocity(-speed, 0);
    } else if (walkRight) {
      this._direction = Direction.RIGHT;
      this.image.anims.play(`${this.image.texture.key}-walk-right`, true);
      this.image.setVelocity(speed, 0);
    } else if (walkUp) {
      this._direction = Direction.UP;
      this.image.anims.play(`${this.image.texture.key}-walk-up`, true);
      this.image.setVelocity(0, -speed);
    } else if (walkDown) {
      this._direction = Direction.DOWN;
      this.image.anims.play(`${this.image.texture.key}-walk-down`, true);
      this.image.setVelocity(0, speed);
    } else {
      this.image.setVelocity(0, 0);
    }
  }
}
