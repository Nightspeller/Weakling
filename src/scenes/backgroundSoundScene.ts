import * as Phaser from 'phaser';

export default class BackgroundSoundScene extends Phaser.Scene {
  private worldBackgroundMusicKeys: string[];
  private cavesBackgroundMusicKeys: string[];
  private battleBackgroundMusicKeys: string[];
  private currentlyPlayingMusicType: string;
  private currentlyPlayingSoundName: string;
  constructor() {
    super({ key: 'BackgroundSound' });

    this.worldBackgroundMusicKeys = [
      'keys-for-success',
      'the-old-country-farm',
      'the-town-that-time-forgot',
      'untainted-fey',
    ];

    this.cavesBackgroundMusicKeys = [
      'labyrinth-of-lost-dreams',
    ];

    this.battleBackgroundMusicKeys = [
      'massacre-on-teddy-bear-hill',
    ];
  }

  preload() {
    // we should not preload all the background music here at once because its very big, will be loading things as we need
  }

  init() {
  }

  create() {
  }

  public playBackgroundMusic(type: 'world' | 'battle' | 'menu' | 'intro' | 'caves') {
    if (this.currentlyPlayingMusicType !== type) {
      this.currentlyPlayingMusicType = type;
      // shuffling the array so the songs are playing in different order
      if (type === 'world') {
        this.playSongSet(this.worldBackgroundMusicKeys, 0);
      }
      if (type === 'caves') {
        this.playSongSet(this.cavesBackgroundMusicKeys.sort(() => Math.random() - 0.5), 0);
      }
      if (type === 'battle') {
        this.playSongSet(this.battleBackgroundMusicKeys.sort(() => Math.random() - 0.5), 0);
      }
      if (type === 'menu') {
        this.playBackgroundSong('main-menu-theme', true);
      }
      if (type === 'intro') {
        this.playBackgroundSong('intro', true);
      }
    }
  }

  public pauseBackgroundMusic(fadeDelay = 1500) {
    const currentSound = this.sound.get(this.currentlyPlayingSoundName);
    this.tweens.add({
      targets: currentSound,
      volume: 0,
      duration: fadeDelay,
      onComplete: () => {
        currentSound.pause();
      },
    });
  }

  public resumeBackgroundMusic(fadeDelay = 1500) {
    const currentSound = this.sound.get(this.currentlyPlayingSoundName);
    currentSound.resume();
    this.tweens.add({
      targets: currentSound,
      volume: 0.1,
      duration: fadeDelay,
    });
  }

  private async playSongSet(songsKeys: string[], index: number) {
    const songToPlay = songsKeys[index];
    const playingSong = await this.playBackgroundSong(songToPlay, false);
    // now lets get the newly playing sound to switch to the next one once this one is done
    playingSong.once('complete', () => {
      const nextIndex = index === songsKeys.length - 1 ? 0 : index + 1;
      console.log(`Completed song ${index}, playing next song number ${nextIndex} out of the list:`, songsKeys);
      this.playSongSet(songsKeys, nextIndex);
    });
  }

  private async playBackgroundSong(songName: string, shouldLoop: boolean): Promise<Phaser.Sound.BaseSound> {
    const currentlyPlayingSoundName = this.sound.get(this.currentlyPlayingSoundName);
    if (currentlyPlayingSoundName) {
      currentlyPlayingSoundName.stop();
    }
    this.currentlyPlayingSoundName = songName;
    const existingSong = this.sound.get(songName);
    if (existingSong) {
      existingSong.play();
      return existingSong;
    }
    this.load.audio(
      songName,
      [
        `assets/audio/music/${songName}.ogg`,
        `assets/audio/music/${songName}.mp3`,
      ],
    );
    this.load.start();
    return new Promise((resolve) => {
      this.load.once('complete', () => {
        const bgMusic = this.sound.add(songName, {
          loop: shouldLoop,
          volume: 0.1,
        });
        bgMusic.play();
        resolve(bgMusic);
      });
    });
  }

  public update() {
  }
}
