import * as Phaser from 'phaser';
import GeneralLocation from '../generalLocation';
import EvelynNpc from '../../../triggers/npcs/greatPlains/evelynNpc';
import evelynDialog from '../../../data/dialogs/greatPlains/evelynDialog';
import GeneralNpc from '../../../triggers/npcs/generalNpc';

export default class GreatPlainsScene extends GeneralLocation {
  private updateNpcPath: Phaser.Time.TimerEvent
  private bgMusic: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private cutsceneMusic: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

  private evelyn: GeneralNpc
  constructor() {
    super({ key: 'GreatPlains' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('greatPlains');

    this.bgMusic = this.sound.add('keys-for-success', {
      loop: true,
      volume: 0.1,
    });

    this.evelyn = new EvelynNpc({ scene: this });

    this.updateNpcPath = this.time.addEvent({
      delay: 500, // each second
      callback: () => {
        this.evelyn.walkEvent.paused = false;
        this.evelyn.moveCharacter(this.map, this.playerImage.x, this.playerImage.y);
      },
      loop: true,
    });

    this.updateNpcPath.paused = true;
  }

  public update() {
    super.update();
  }

  public playCutscene(cutsceneKey: string) {
    // TODO: Use the cutscene key to fetch custom data for the corresponding cutscene. I don't know how to best structure the data at the moment. Either as an object, a queue, or in another way.
    console.log(cutsceneKey);

    this.updateNpcPath.paused = false;
    this.evelyn.walkEvent.paused = false;

    this.cutsceneMusic = this.sound.add('evelyns-story', {
      loop: false,
      volume: 0.3,
    });

    this.cutsceneMusic.play();

    this.widenCameraFormat(100, 2, 1500);

    this.playDialog('Dialog', evelynDialog, 4000);
  }

  private widenCameraFormat(changeViewportHeight: number, zoomNumber: number, tweenDuration: number) {
    let camHeight = this.cameras.main.height;
    camHeight -= (changeViewportHeight * zoomNumber);
    const toHeight = camHeight;
    this.tweens.add({
      targets: this.cameras.main,
      y: changeViewportHeight,
      height: toHeight,
      zoom: zoomNumber,
      duration: tweenDuration,
      ease: 'Power2',
      completeDelay: tweenDuration,
    });
  }

  private fadeOutCutsceneMusic(fadeDuration: number) {
    this.tweens.add({
      targets: this.cutsceneMusic,
      volume: 0,
      duration: fadeDuration,
    });
  }

  private fadeInMainMusic(fadeDuration: number) {
    this.bgMusic.play();
    this.tweens.add({
      targets: this.bgMusic,
      volume: 0.1,
      duration: fadeDuration,
    });
  }

  private restoreCameraFormat(changeViewportHeight: number, zoomNumber: number, tweenDuration: number) {
    let camHeight = this.cameras.main.height;
    camHeight += (changeViewportHeight * zoomNumber);
    const toHeight = camHeight;
    this.tweens.add({
      targets: this.cameras.main,
      y: 0,
      height: toHeight,
      zoom: zoomNumber,
      duration: tweenDuration,
      ease: 'Power2',
      completeDelay: 1000,
    });
  }

  private playDialog(sceneKey: string, dialogTree: DialogTree, dialogDelay?: number) {
    const delay = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, dialogDelay);
    }).then(() => {
      console.log('Done waiting.');
      this.switchToScene(sceneKey, {
        dialogTree,
        closeCallback: () => {
          this.restoreCameraFormat(100, 2, 1500);
          setTimeout(() => {
            this.updateNpcPath.paused = true;
            // this.cutsceneMusic = SoundFade.fadeOut(scene, sound, duration);
            this.fadeOutCutsceneMusic(1500);
            this.fadeInMainMusic(3000);
          }, 3000);
        },
      }, false);
    });
  }
}
