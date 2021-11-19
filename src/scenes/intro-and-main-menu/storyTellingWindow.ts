import * as Phaser from 'phaser';

import { sceneEvents } from '../../triggers/eventsCenter';

export default class StoryTellingWindow extends Phaser.Scene {

  private currentVideo = 0;
  public storyImage!: Phaser.Physics.Arcade.Sprite
  
  constructor() {
    super('StoryTellingWindow');
  }

  preload() {
  }

  create() {
    const cameraWidth = this.cameras.main.width;
    const cameraHeight = this.cameras.main.height;

    const storyVideoKeysDict = [
      { "order": 0, "key": "intro-part-1", "playbackRate": 1, "loop": false, "fadeIn": true, "fadeOut": true },
      { "order": 1, "key": "intro-part-2", "playbackRate": 1, "loop": true, "fadeIn": true, "fadeOut": true },
      { "order": 2, "key": "intro-part-3", "playbackRate": 1, "loop": true, "fadeIn": true, "fadeOut": true },
      { "order": 3, "key": "intro-part-4", "playbackRate": 1, "loop": true, "fadeIn": false, "fadeOut": false },
      { "order": 4, "key": "intro-part-5", "playbackRate": 0.5, "loop": false, "fadeIn": true, "fadeOut": true },
      { "order": 6, "key": "intro-part-6", "playbackRate": 1, "loop": true, "fadeIn": true, "fadeOut": true },
      { "order": 5, "key": "intro-part-2", "playbackRate": 1, "loop": true, "fadeIn": false, "fadeOut": false },
      { "order": 7, "key": "intro-part-7", "playbackRate": 1, "loop": true, "fadeIn": false, "fadeOut": false },
      { "order": 8, "key": "intro-part-8", "playbackRate": 1, "loop": false, "fadeIn": false, "fadeOut": false },
      { "order": 9, "key": "intro-part-9", "playbackRate": 1, "loop": true, "fadeIn": false, "fadeOut": true },
    ] as any

    const video = this.add.video(cameraWidth / 2, cameraHeight / 3, storyVideoKeysDict[this.currentVideo]['key']).play(storyVideoKeysDict[this.currentVideo]['loop']);
    video.scale = 1.7;

    video.on('complete', (videoObj: Phaser.GameObjects.Video) => {
      if(!storyVideoKeysDict[this.currentVideo]['loop']) {
        ++this.currentVideo
        videoObj.changeSource(storyVideoKeysDict[this.currentVideo]['key'])
          .setLoop(storyVideoKeysDict[this.currentVideo]['loop'])
          .setPlaybackRate(storyVideoKeysDict[this.currentVideo]['playbackRate']);
      }
    });

    sceneEvents.on('change-intro-story-video', () => {
        if(storyVideoKeysDict[this.currentVideo]['fadeOut']) tweenFadeOut.play()
    
        ++this.currentVideo

        video.changeSource(storyVideoKeysDict[this.currentVideo]['key'])
          .setLoop(storyVideoKeysDict[this.currentVideo]['loop'])
          .setPlaybackRate(storyVideoKeysDict[this.currentVideo]['playbackRate']);

        if(storyVideoKeysDict[this.currentVideo - 1]['fadeIn']) tweenFadeIn.play();
        
    });

    var tweenFadeOut = this.tweens.add({
        targets: video,
        alpha: { from: 1, to: 0 },
        paused: false,
        duration: 500,
        ease: 'Linear', 
        yoyo: false, // true to tween backward
        repeat: 0,
    })

    var tweenFadeIn = this.tweens.add({
        targets: video,
        alpha: { from: 0, to: 1 },
        paused: false,
        duration: 500,
        ease: 'Linear', 
        yoyo: false, // true to tween backward
        repeat: 0,
    })
    
    
  }

  preUpdate(t: number, dt: number) {
  }
}
