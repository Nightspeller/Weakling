import * as Phaser from 'phaser';

import GeneralLocation from '../scenes/locations/generalLocation';

interface TriggerParams {
  scene: GeneralLocation,
  name: string,
  triggerX: number,
  triggerY: number,
  triggerW: number,
  triggerH: number,
  callback?: Function;
  texture?: string;
  frame?: number | string;
  interaction?: 'collide' | 'overlap' | 'activate' | 'activateOverlap';
  offsetX?: number;
  offsetY?: number;
  singleUse?: boolean;
  isSecret?: boolean;
}

export default class Trigger {
  public image: Phaser.Physics.Arcade.Sprite;
  callback: Function;
  protected scene: GeneralLocation;
  private type: 'collide' | 'overlap' | 'activate' | 'activateOverlap';
  private singleUse: boolean;
  private isSecret: boolean;
  private highlightBorder: Phaser.GameObjects.Graphics;
  public name: string;
  private disabled: boolean;
  public destroyed: boolean;

  constructor(
    {
      scene,
      name,
      triggerX,
      triggerY,
      triggerW,
      triggerH,
      callback = () => { },
      texture = null,
      frame = null,
      interaction = 'activate',
      offsetX = scene.offsetX,
      offsetY = scene.offsetY,
      isSecret = false,
      singleUse = false,
    }: TriggerParams,
  ) {
    this.scene = scene;
    this.name = name;
    this.callback = callback;
    this.type = interaction;
    this.singleUse = singleUse;
    this.isSecret = isSecret;
    this.disabled = false;
    this.destroyed = false;
    this.image = scene.physics.add
      .sprite(triggerX + offsetX, triggerY + offsetY, texture, frame)
      .setOrigin(0, 0)
      .setDisplaySize(triggerW, triggerH)
      .setImmovable();
    if (texture === null) {
      this.image.setVisible(false);
    }

    if (interaction === 'collide') {
      scene.physics.add.collider(scene.playerImage, this.image, () => {
        if (this.disabled === false) {
          this.callback();
          if (singleUse) {
            this.destroy();
          }
        }
      });
    }
    if (interaction === 'overlap') {
      scene.physics.add.overlap(scene.playerImage, this.image, () => {
        if (this.disabled === false) {
          this.callback();
          if (singleUse) {
            this.destroy();
          }
        }
      });
    }
    if (interaction === 'activate') {
      scene.physics.add.collider(scene.playerImage, this.image, this.handlePlayerImageCollision);
    }
    if (interaction === 'activateOverlap') {
      scene.physics.add.overlap(scene.playerImage, this.image);
    }

    this.highlightBorder = this.scene.add.graphics()
      .lineStyle(2, 0xca5d8f)
      .strokeRectShape(this.image.getBounds())
      .setVisible(false);

    this.setDisableState(false);

    scene.triggers.push(this);
  }

  public setDisableState(shouldDisable: boolean) {
    if (shouldDisable) {
      this.highlightBorder.setVisible(false);
      this.scene.input.keyboard.removeListener('keydown-SPACE', this.onSpaceBarPressed, this);
      this.scene.input.keyboard.removeListener('keydown-SHIFT', this.onHighlightOn, this);
      this.scene.input.keyboard.removeListener('keyup-SHIFT', this.onHighlightOff, this);
      this.disabled = true;
    } else {
      if (this.type === 'activate' || this.type === 'activateOverlap') {
        this.scene.input.keyboard.on('keydown-SPACE', this.onSpaceBarPressed, this);
      }
      if (this.isSecret === false) {
        this.scene.input.keyboard.on('keydown-SHIFT', this.onHighlightOn, this);
        this.scene.input.keyboard.on('keyup-SHIFT', this.onHighlightOff, this);
      }
      this.disabled = false;
    }
  }

  public destroy() {
    this.image.destroy();
    this.destroyed = true;
    this.highlightBorder?.destroy();
    this.scene.input.keyboard.off('keydown-SPACE', this.onSpaceBarPressed, this);
    this.scene.input.keyboard.off('keydown-SHIFT', this.onHighlightOn, this);
    this.scene.input.keyboard.off('keyup-SHIFT', this.onHighlightOff, this);
    this.scene.triggers = this.scene.triggers.filter((trigger) => trigger !== this);
  }

  // @ts-ignore
  private onSpaceBarPressed(event) {
    event.preventDefault();
    const { scene } = this;
    // checking if player is looking at the trigger image, adjustments are done in order to reflect the fact that physical body is smaller than the image
    const triggerBodyBounds = this.image.body.getBounds({
      x: 0, y: 0, right: 0, bottom: 0,
    });
    const playerBodyBounds = scene.playerImage.body.getBounds({
      x: 0, y: 0, right: 0, bottom: 0,
    });
    if (this.scene.somethingTriggered === false && (this.type === 'activateOverlap'
      || (triggerBodyBounds.y === playerBodyBounds.bottom && scene.playerImage.frame.name.includes('down'))
      || (triggerBodyBounds.x === playerBodyBounds.right && scene.playerImage.frame.name.includes('right'))
      || (triggerBodyBounds.bottom === playerBodyBounds.y && scene.playerImage.frame.name.includes('up'))
      || (triggerBodyBounds.right === playerBodyBounds.x && scene.playerImage.frame.name.includes('left'))
    )) {
      const bodies = scene.physics.overlapRect(this.image.x, this.image.y, this.image.displayWidth + 2, this.image.displayHeight + 2);
      // @ts-ignore
      if (bodies.includes(scene.playerImage.body) && bodies.includes(this.image.body)) {
        this.scene.somethingTriggered = true;
        setTimeout(() => {
          this.scene.somethingTriggered = false;
        }, 0);
        this.callback();
        if (this.singleUse) {
          this.destroy();
        }
      }
    }
  }

  // This is overridden by the child
  // eslint-disable-next-line no-unused-vars
  protected handlePlayerImageCollision(playerImage: Phaser.Physics.Arcade.Sprite, collisionImage: Phaser.Physics.Arcade.Sprite) { }

  // @ts-ignore
  private onHighlightOn(event) {
    event.preventDefault();
    this.highlightBorder.setVisible(true);
  }

  // @ts-ignore
  private onHighlightOff(event) {
    event.preventDefault();
    this.highlightBorder.setVisible(false);
  }

  public updateCallback(newCallback: Function, overwrite = false) {
    if (overwrite) {
      this.callback = newCallback;
    } else {
      const oldCallback = this.callback;
      this.callback = () => {
        newCallback();
        oldCallback();
      };
    }
  }
}
