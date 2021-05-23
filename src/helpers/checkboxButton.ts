import * as Phaser from 'phaser';

export default class CheckboxButton extends Phaser.GameObjects.Sprite {
  private hoverStateSound: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private checkedStateSound: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

  // texture keys
  private checkedState: string;
  private uncheckedState: string;

  public isChecked: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number, isChecked: boolean,
    uncheckedStateTexture: string, checkedStateTexture?: string, frame?: string | number,
    hoverStateSound?: string, checkedStateSound?: string) {
    super(scene, x, y, checkedStateTexture, frame);

    this.isChecked = isChecked;

    this.checkedStateSound = scene.sound.add(
      hoverStateSound !== undefined ? checkedStateSound : 'checkbox-checked', { volume: 0.1 },
    );

    this.hoverStateSound = scene.sound.add(
      hoverStateSound !== undefined ? hoverStateSound : 'text-button-hover', { volume: 0.1 },
    );

    this.checkedState = checkedStateTexture !== undefined ? checkedStateTexture : 'checkbox-checked';
    this.uncheckedState = uncheckedStateTexture !== undefined ? uncheckedStateTexture : 'checkbox-unchecked';

    this.setTexture(this.isChecked ? this.checkedState : this.uncheckedState);

    this.setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.enterButtonHoverState())
      .on('pointerout', () => this.enterButtonRestState())
      .on('pointerdown', () => this.enterButtonActiveState())
      .on('pointerup', () => {
        this.enterButtonHoverState();
      });
  }

  private enterButtonHoverState() {
    this.hoverStateSound.play();
  }

  private enterButtonRestState() {
  }

  private enterButtonActiveState() {
    this.isChecked = !this.isChecked;
    this.setTexture(this.isChecked ? this.checkedState : this.uncheckedState);
    this.checkedStateSound.play();
  }
}
