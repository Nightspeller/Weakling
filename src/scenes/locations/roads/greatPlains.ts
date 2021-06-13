import * as Phaser from 'phaser';
import GeneralLocation from '../generalLocation';
import EvelynNpc from '../../../triggers/npcs/greatPlains/evelynNpc';
import GeneralNpc from '../../../triggers/npcs/generalNpc';
import cutsceneData from '../../../data/cutsceneData';
import { CutsceneEvent } from '../../../types/my-types';

export default class GreatPlainsScene extends GeneralLocation {
  private updateNpcPath: boolean;
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

    this.evelyn = new EvelynNpc({ scene: this });
    this.updateNpcPath = false;
  }

  /**
   *
   * @param cutsceneKey - cutscene key to fetch custom data for the corresponding cutscene
   */
  public playCutscene(cutsceneKey: string) {
    cutsceneData.forEach((cutscene) => {
      console.log(cutscene);
      if (cutscene.cutsceneId === 'evelynsDream') {
        // iterate through all events
        cutscene.events.forEach((event: CutsceneEvent) => {
          if (event.eventName === 'changeCameraFormatEvent') {
            const [type, changeViewportHeight, zoomNumber, tweenDuration] = Object.values(event.eventData);
            this.changeCameraFormat(type, changeViewportHeight, zoomNumber, tweenDuration);
          } else if (event.eventName === 'playAudio') {
            const [soundAssetKey, loopAudio, audioVolume, audioOffset] = Object.values(event.eventData);
            this.playAudio(soundAssetKey, loopAudio, audioVolume, audioOffset);
          } else if (event.eventName === 'fadeAudio') {
            const [audioType, fadeDuration, fadeToVolume, audioOffset] = Object.values(event.eventData);
            this.fadeAudio(audioType, fadeDuration, fadeToVolume, audioOffset);
          } else if (event.eventName === 'startMovingObject') {
            const [target, toPosX, toPosY] = Object.values(event.eventData);
            this.startMovingObject(target, toPosX, toPosY);
          } else if (event.eventName === 'stopMovingObject') {
            const [target] = Object.values(event.eventData);
            this.stopMovingObject(target);
          } else if (event.eventName === 'startDialog') {
            // since the duration of this event depends on when the player chooses to end
            // the dialogue, this event store the subsequent events as well. Check
            // cutsceneData.ts and my-types.ts for more info

            const [sceneKey, dialogTree, dialogDelay] = Object.values(event.eventData);
            const dialogEvent = { ...event.eventData };
            const sebsequentEvents = { ...dialogEvent.onCloseEvents };
            this.playDialog(sceneKey, dialogTree, dialogDelay, () => {
              dialogEvent.onCloseEvents.forEach((subEvent: CutsceneEvent) => {
                if (subEvent.eventName === 'changeCameraFormatEvent') {
                  const [type, changeViewportHeight, zoomNumber, tweenDuration] = Object.values(subEvent.eventData);
                  this.changeCameraFormat(type, changeViewportHeight, zoomNumber, tweenDuration);
                  // this.restoreCameraFormat(100, 2, 1500);
                } else if (subEvent.eventName === 'playAudio') {
                  const [soundAssetKey, loopAudio, audioVolume, audioOffset] = Object.values(subEvent.eventData);
                  this.playAudio(soundAssetKey, loopAudio, audioVolume, audioOffset);
                } else if (subEvent.eventName === 'fadeAudio') {
                  const [audioType, fadeDuration, fadeToVolume, audioOffset] = Object.values(subEvent.eventData);
                  this.fadeAudio(audioType, fadeDuration, fadeToVolume, audioOffset);
                } else if (subEvent.eventName === 'startMovingObject') {
                  const [target, toPosX, toPosY] = Object.values(subEvent.eventData);
                  this.startMovingObject(target, toPosX, toPosY);
                } else if (subEvent.eventName === 'stopMovingObject') {
                  const [target] = Object.values(subEvent.eventData);
                  this.stopMovingObject(target);
                }
              });
            });
          }
        });
      }
    });
  }

  public update() {
    super.update();

    if (this.updateNpcPath) {
      this.evelyn.moveCharacter(this.map, this.playerImage.x, this.playerImage.y);
    }
  }

  private startMovingObject(target: string, toPosX: number | 'playerPosX', toPosY: number | 'playerPosY') {
    if (target !== 'npc') {
      console.log(`${target} is not a valid argument`);
      return;
    }
    this.updateNpcPath = true;
    this.evelyn.walkEvent.paused = false;
    if (toPosX === 'playerPosX' && toPosY === 'playerPosY') {
      this.evelyn.moveCharacter(this.map, this.playerImage.x, this.playerImage.y);
    } else if (typeof toPosX === 'number' && typeof toPosY === 'number') {
      this.evelyn.moveCharacter(this.map, toPosX, toPosY);
    }
  }

  private stopMovingObject(target: 'npc') {
    if (target !== 'npc') {
      console.log(`${target} is not a valid argument`);
      return;
    }
    this.updateNpcPath = true;
    console.log(`${target} has stopped moving`);
  }

  private changeCameraFormat(type: 'widenCameraFormat' | 'restoreCameraFormat', changeViewportHeight: number, zoomNumber: number, tweenDuration: number) {
    if (type !== 'widenCameraFormat' && type !== 'restoreCameraFormat') {
      console.log(`${type} is not a valid argument`);
      return;
    }

    let camHeight = this.cameras.main.height;
    if (type === 'widenCameraFormat') {
      camHeight -= (changeViewportHeight * zoomNumber);
    } else if (type === 'restoreCameraFormat') {
      camHeight += (changeViewportHeight * zoomNumber);
    }
    const toHeight = camHeight;
    this.tweens.add({
      targets: this.cameras.main,
      y: type === 'widenCameraFormat' ? changeViewportHeight : 0,
      height: toHeight,
      zoom: zoomNumber,
      duration: tweenDuration,
      ease: 'Power2',
      completeDelay: tweenDuration,
    });
  }

  private playAudio(soundAssetKey: string, loopAudio: boolean, audioVolume: number, audioOffset: number) {
    setTimeout(() => {
      this.cutsceneMusic = this.sound.add(soundAssetKey, {
        loop: loopAudio,
        volume: audioVolume,
      });
      this.cutsceneMusic.play();
    }, audioOffset);
  }

  private fadeAudio(audioType: 'cutsceneAudio' | 'mainAudio',
    fadeDuration: number, fadeToVolume: number, audioOffset: number = 0) {
    setTimeout(() => {
      if (audioType === 'cutsceneAudio') {
        this.tweens.add({
          targets: this.cutsceneMusic,
          volume: fadeToVolume,
          duration: fadeDuration,
        });
      } else if (audioType === 'mainAudio') {
        this.tweens.add({
          targets: this.scene.scene.sound.get('keys-for-success'),
          volume: fadeToVolume,
          duration: fadeDuration,
        });
      }
    }, audioOffset);
  }

  private playDialog(sceneKey: string, dialogTree: DialogTree, dialogDelay?: number, callback?: Function) {
    const delay = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, dialogDelay);
    }).then(() => {
      console.log('Done waiting.');
      this.switchToScene(sceneKey, {
        dialogTree,
        closeCallback: () => {
          if (callback !== undefined) {
            callback();
          }
        },
      }, false);
    });
  }
}
