import { Scene } from 'phaser';

export default function preloadAudioAssets(preloadScene: Scene) {
  // Audio
  preloadScene.load.audio('intro', ['assets/audio/intro.ogg', 'assets/audio/intro.mp3']);
  preloadScene.load.audio('keys-for-success', ['assets/audio/keys-for-success.mp3', 'assets/audio/keys-for-success.ogg']);

  preloadScene.load.audio('fishing-bait', 'assets/audio/fishing/fishing-bait.ogg');
  preloadScene.load.audio('fishing-success', 'assets/audio/fishing/fishing-success.wav');
  preloadScene.load.audio('fishing-missed', 'assets/audio/fishing/fishing-missed.wav');
}
