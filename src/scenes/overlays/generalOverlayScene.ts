import * as Phaser from 'phaser';
import { OverlaySceneOptions } from '../../types/my-types';

export default class GeneralOverlayScene extends Phaser.Scene {
  public opts: OverlaySceneOptions;

  protected parentSceneKey: string;

  constructor({ key }: { key: string }) {
    super({ key });
  }

  public create(parentSceneKey: string, opts?: OverlaySceneOptions) {
    this.opts = {
      ...{
        backgroundColor: 0xf0d191,
        backgroundAlpha: 1,
        windowX: 16,
        windowY: 16,
        windowWidth: 32 * 39,
        windowHeight: 32 * 21.5,

        borderThickness: 2,
        borderColor: 0x907748,
        borderAlpha: 1,

        baseDepth: 0,

        closeButtonColor: '#2d2d2d',
        closeButtonHoverColor: 'red',

        textColor: 'white',
      },
      ...opts,
    };
    this.parentSceneKey = parentSceneKey;
    this.input.setDefaultCursor('default');
    this._drawBackground();
    this._drawCloseButton();
  }

  protected _drawBackground() {
    this.add.image(this.opts.windowX, this.opts.windowY, 'interface-24x19')
      .setDisplaySize(this.opts.windowWidth, this.opts.windowHeight)
      .setAlpha(this.opts.backgroundAlpha)
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(this.opts.baseDepth);
  }

  protected _drawCloseButton() {
    const closeButtonX = this.opts.windowX + this.opts.windowWidth - 36;
    const closeButtonY = this.opts.windowY + 4;

    const closeBtn = this.add.text(closeButtonX, closeButtonY, 'X', {
      font: 'bold 32px Arial',
      color: this.opts.closeButtonColor,
      fixedWidth: 32,
      fixedHeight: 32,
      align: 'center',
    })
      .setScrollFactor(0)
      .setDepth(this.opts.baseDepth)
      .setInteractive({ useHandCursor: true });

    this.add.graphics()
      .lineStyle(this.opts.borderThickness, this.opts.borderColor, this.opts.borderAlpha)
      .strokeRect(closeButtonX, closeButtonY, closeBtn.width, closeBtn.height)
      .setScrollFactor(0)
      .setDepth(this.opts.baseDepth);

    closeBtn.on('pointerover', () => closeBtn.setColor(this.opts.closeButtonHoverColor));
    closeBtn.on('pointerout', () => closeBtn.setColor(this.opts.closeButtonColor));
    closeBtn.on('pointerdown', () => this.closeScene());
    this.input.keyboard.on('keyup-ESC', () => this.closeScene());
    if (this.input.gamepad.total === 0) {
      this.input.gamepad.once('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
        this.setupGamepadControls(pad);
      });
    } else {
      this.setupGamepadControls(this.input.gamepad.pad1);
    }
  }

  public closeScene(switchParam?: any) {
    console.log(`Switching from %c${this.scene.key}%c to %c${this.parentSceneKey}%c. Should %c${this.scene.key}%c turn off %c(sleep): true`, 'color: red', 'color: auto', 'color: red', 'color: auto', 'color: red', 'color: auto', 'color: red');
    console.log(switchParam);
    this.scene.run(this.parentSceneKey, switchParam);
    this.scene.stop(this.scene.key);
  }

  protected setupGamepadControls(pad: Phaser.Input.Gamepad.Gamepad) {
    pad.on('down', (index: number) => {
      if (index === 0) {
        this.closeScene();
      }
    });
  }
}
