import * as Phaser from 'phaser';

import { sceneEvents } from '../../triggers/eventsCenter';
import { introVideoData } from '../../data/videoData';

export default class StorytellingWindow extends Phaser.Scene {
  private currentVideo = 0;
  public storyImage!: Phaser.Physics.Arcade.Sprite

  constructor() {
    super('StorytellingWindow');
  }

  preload() {
  }

  create() {
    const cameraWidth = this.cameras.main.width;
    const cameraHeight = this.cameras.main.height;

    const video = this.add.video(cameraWidth / 2, cameraHeight / 3, introVideoData[this.currentVideo].key)
      .play(introVideoData[this.currentVideo].loop);
    video.scale = 1.7;

    video.on('complete', (videoObj: Phaser.GameObjects.Video) => {
      if (!introVideoData[this.currentVideo].loop) {
        this.currentVideo += 1;
        videoObj.changeSource(introVideoData[this.currentVideo].key)
          .setLoop(introVideoData[this.currentVideo].loop)
          .setPlaybackRate(introVideoData[this.currentVideo].playbackRate);
      }
    });

    sceneEvents.on('change-intro-story-video', () => {
      if (introVideoData[this.currentVideo].fadeOut) tweenFadeOut.play();
      this.currentVideo += 1;
      video.changeSource(introVideoData[this.currentVideo].key)
        .setLoop(introVideoData[this.currentVideo].loop)
        .setPlaybackRate(introVideoData[this.currentVideo].playbackRate);
      if (introVideoData[this.currentVideo - 1].fadeIn) tweenFadeIn.play();
    });

    const tweenFadeOut = this.tweens.add({
      targets: video,
      alpha: { from: 1, to: 0 },
      paused: false,
      duration: 500,
      ease: 'Linear',
      yoyo: false, // true to tween backward
      repeat: 0,
    });

    const tweenFadeIn = this.tweens.add({
      targets: video,
      alpha: { from: 0, to: 1 },
      paused: false,
      duration: 500,
      ease: 'Linear',
      yoyo: false, // true to tween backward
      repeat: 0,
    });
  }

  preUpdate() {
  }
}
