import * as Phaser from 'phaser';

export class SoundManager {
  public isMusicOn: boolean;
  public isEffectsOn: boolean;
  public backgroundSoundVolume: number;
  public effectsVolume: number;

  private manager: Phaser.Sound.WebAudioSoundManager;

  private backgroundSounds: Phaser.Sound.WebAudioSound[];
  private effectsSounds:Phaser.Sound.WebAudioSound[];
  private isMuted: boolean;

  constructor() {
    this.isMuted = false;
    this.isMusicOn = true;
    this.isEffectsOn = true;
    this.backgroundSoundVolume = 0.1;
    this.effectsVolume = 0.1;
  }

  public playBackgroundSound(soundKey: string, shouldAddToToExisting = true, shouldLoop = true) {
    // See if we already added this sound to the sound manager, if not - add it.
    let sound = this.manager.get(soundKey) as Phaser.Sound.WebAudioSound;
    if (!sound) {
      sound = this.manager.add(soundKey, {
        loop: shouldLoop,
        volume: this.backgroundSoundVolume,
      });
    }

    // Do we want newly played sound to be added to already playing ones, or stop them all
    if (shouldAddToToExisting) {
      this.backgroundSounds.push(sound);
    } else {
      this.backgroundSounds.forEach((existingBgSound) => existingBgSound.stop());
      this.backgroundSounds = [sound];
    }
    sound.play();
    return sound;
  }

  public playEffectSound(soundKey: string, shouldLoop = true) {
    // See if we already added this sound to the sound manager, if not - add it.
    let sound = this.manager.get(soundKey) as Phaser.Sound.WebAudioSound;
    if (!sound) {
      sound = this.manager.add(soundKey, {
        loop: shouldLoop,
        volume: this.effectsVolume,
      });
    }
    this.effectsSounds.push(sound);
    sound.play();
    return sound;
  }

  public getSound(soundKey: string) {
    return this.manager.get(soundKey);
  }

  public async changeVolume(newVolume: number, type: 'background' | 'effects') {
    if (type === 'background') {
      this.backgroundSoundVolume = newVolume;
      this.backgroundSounds.forEach((sound) => {
        sound.setVolume(newVolume);
      });
    } else {
      this.effectsVolume = newVolume;
      this.effectsSounds.forEach((sound) => {
        sound.setVolume(newVolume);
      });
    }
  }

  public setGlobalMute(shouldMute: boolean) {
    this.isMuted = shouldMute;
    this.manager.mute = shouldMute;
  }

  public setSoundManager(scene: Phaser.Scene) {
    this.manager = scene.sound as Phaser.Sound.WebAudioSoundManager;
  }
}

export const soundManager = new SoundManager();
