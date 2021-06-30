import * as Phaser from 'phaser';
import WebAudioSoundManager = Phaser.Sound.WebAudioSoundManager;
import SoundConfig = Phaser.Types.Sound.SoundConfig;
import WebAudioSound = Phaser.Sound.WebAudioSound;
import SoundMarker = Phaser.Types.Sound.SoundMarker;
import { Scene } from 'phaser';

export class MyWebAudioSoundManager extends WebAudioSoundManager {
  private backgroundSounds: WebAudioSound[] = [];
  private effectSounds: WebAudioSound[] = [];
  public backgroundSoundsVolume: number = 0.8;
  public effectSoundsVolume: number = 0.2;
  constructor(game: Phaser.Game) {
    super(game);
  }

  public add(key: string, config?: SoundConfig, type?: 'background' | 'effect') {
    if (type !== 'background' && type !== 'effect') {
      console.error(`Error! Sound manager did not get sound type for ${key}`);
      type = 'effect';
    };
    if (!config) config = {};
    let sound: WebAudioSound;
    if (type === 'background') {
      if (config?.volume) {
        config.volume = config.volume * this.backgroundSoundsVolume;
      } else {
        config.volume = this.backgroundSoundsVolume;
      }
      sound = super.add(key, config);
      this.backgroundSounds.push(sound)
    } else {
      if (config?.volume) {
        config.volume = config.volume * this.backgroundSoundsVolume;
      } else {
        config.volume = this.backgroundSoundsVolume;
      }
      sound = super.add(key, config);
      this.effectSounds.push(sound)
    }
    return sound;
  }

  public changeBackgroundVolume(volume: number) {
    this.backgroundSounds.forEach(sound => {
      sound.setVolume(volume);
    });
    this.backgroundSoundsVolume = volume;
  }

  public changeEffectsVolume(volume: number) {
    this.effectSounds.forEach(sound => {
      sound.setVolume(volume);
    })
    this.effectSoundsVolume = volume;
  }

  public play(key: string, extra: SoundConfig| SoundMarker) {
    return super.play(key, extra);
  }

  public changeBackgroundSoundtrack(scene: Scene, newSound: WebAudioSound) {
    this.backgroundSounds.forEach(sound => {
      scene.tweens.add({
        targets: sound,
        volume: 0,
        duration: 1500,
        onComplete: () => {
          sound.stop();
          newSound.play();
          scene.tweens.add({
            targets: newSound,
            volume: this.backgroundSoundsVolume,
            duration: 5000,
          });
        },
      });
    });
  }
}
