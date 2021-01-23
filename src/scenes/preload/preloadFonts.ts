import { Scene } from 'phaser';

export default function preloadFonts(preloadScene: Scene) {
  preloadScene.load.bitmapFont('bitmapArial', 'assets/bitmap-fonts/bitmapArial16.png', 'assets/bitmap-fonts/bitmapArial16.fnt');
}
