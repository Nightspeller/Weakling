import { Scene } from 'phaser';

export default function preloadAudioAssets(preloadScene: Scene) {
  // Audio
  preloadScene.load.audio('main-menu-theme', ['assets/audio/main-menu.ogg', 'assets/audio/main-menu.mp3']);
  preloadScene.load.audio('text-button-hover', 'assets/audio/ui/text-button-hover.ogg');
  preloadScene.load.audio('text-button-select', 'assets/audio/ui/text-button-select.ogg');
  preloadScene.load.audio('checkbox-checked', 'assets/audio/ui/checkbox-checked.ogg');
  preloadScene.load.audio('main-menu-start-game', 'assets/audio/ui/main-menu-start-game.ogg');

  preloadScene.load.audio('intro', ['assets/audio/intro.ogg', 'assets/audio/intro.mp3']);
  preloadScene.load.audio('keys-for-success', ['assets/audio/keys-for-success.mp3', 'assets/audio/keys-for-success.ogg']);

  preloadScene.load.audio('fishing-bait', 'assets/audio/fishing/fishing-bait.ogg');
  preloadScene.load.audio('fishing-success', 'assets/audio/fishing/fishing-success.wav');
  preloadScene.load.audio('fishing-missed', 'assets/audio/fishing/fishing-missed.wav');

  preloadScene.load.audio('paper-scroll-open', 'assets/audio/ui/paper-scroll-open.wav');
  preloadScene.load.audio('paper-scroll-close', 'assets/audio/ui/paper-scroll-close.wav');
}
