import { Scene } from 'phaser';

export default function preloadAudioAssets(preloadScene: Scene) {
  // Songs
  preloadScene.load.audio('main-menu-theme', ['assets/audio/main-menu.ogg', 'assets/audio/main-menu.mp3']);
  preloadScene.load.audio('evelyns-story', ['assets/audio/evelyns-story.ogg', 'assets/audio/evelyns-story.mp3']);
  preloadScene.load.audio('intro', ['assets/audio/intro.ogg', 'assets/audio/intro.mp3']);
  preloadScene.load.audio('keys-for-success', ['assets/audio/keys-for-success.ogg', 'assets/audio/keys-for-success.mp3']);

  // Sound effects
  preloadScene.load.audio('text-button-hover', ['assets/audio/ui/text-button-hover.ogg', 'assets/audio/ui/text-button-hover.mp3']);
  preloadScene.load.audio('text-button-select', ['assets/audio/ui/text-button-select.ogg', 'assets/audio/ui/text-button-select.mp3']);
  preloadScene.load.audio('checkbox-checked', ['assets/audio/ui/checkbox-checked.ogg', 'assets/audio/ui/checkbox-checked.mp3']);
  preloadScene.load.audio('typewriter-long', ['assets/audio/ui/typewriter-long.ogg', 'assets/audio/ui/typewriter-long.mp3']);
  preloadScene.load.audio('typewriter-short', ['assets/audio/ui/typewriter-short.ogg', 'assets/audio/ui/typewriter-short.mp3']);
  preloadScene.load.audio('typewriter-end', ['assets/audio/ui/typewriter-end.ogg', 'assets/audio/ui/typewriter-end.mp3']);
  preloadScene.load.audio('main-menu-start-game', ['assets/audio/ui/main-menu-start-game.ogg', 'assets/audio/ui/main-menu-start-game.mp3']);
  preloadScene.load.audio('world-map-ui-button-select', ['assets/audio/ui/world-map-ui-button-select.ogg', 'assets/audio/ui/world-map-ui-button-select.mp3']);
  preloadScene.load.audio('hover', ['assets/audio/ui/hover.ogg', 'assets/audio/ui/hover.mp3']);

  preloadScene.load.audio('fishing-bait', ['assets/audio/fishing/fishing-bait.ogg', 'assets/audio/fishing/fishing-bait.mp3']);
  preloadScene.load.audio('fishing-success', ['assets/audio/fishing/fishing-success.ogg', 'assets/audio/fishing/fishing-success.mp3']);
  preloadScene.load.audio('fishing-missed', ['assets/audio/fishing/fishing-missed.ogg', 'assets/audio/fishing/fishing-missed.mp3']);

  preloadScene.load.audio('paper-scroll-open', ['assets/audio/ui/paper-scroll-open.ogg', 'assets/audio/ui/paper-scroll-open.mp3']);
  preloadScene.load.audio('paper-scroll-close', ['assets/audio/ui/paper-scroll-close.ogg', 'assets/audio/ui/paper-scroll-close.mp3']);
}
