import * as Phaser from 'phaser';

export default class TextButton extends Phaser.GameObjects.Text {
  private hoverStateSound: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private activeStateSound: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

  constructor(scene: Phaser.Scene, x: number, y: number,
    text: string, style: object, hoverStateSound?: string, activeStateSound?: string) {
    super(scene, x, y, text, style);

    this.hoverStateSound = scene.sound.add(
      hoverStateSound !== undefined ? hoverStateSound : 'text-button-hover', { volume: 0.1 },
    );

    this.activeStateSound = scene.sound.add(
      activeStateSound !== undefined ? activeStateSound : 'text-button-select', { volume: 0.1 },
    );

    this.setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.enterButtonHoverState())
      .on('pointerout', () => this.enterButtonRestState())
      .on('pointerdown', () => this.enterButtonActiveState())
      .on('pointerup', () => {
        this.enterButtonHoverState();
      });
  }

  private enterButtonHoverState() {
    this.setStyle({ fill: '#ff0' });
    this.hoverStateSound.play();
  }

  private enterButtonRestState() {
    this.setStyle({ fill: '#222222' });
  }

  private enterButtonActiveState() {
    this.setStyle({ fill: '#0ff' });
    this.activeStateSound.play();
  }
}
