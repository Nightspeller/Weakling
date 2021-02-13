import * as Phaser from 'phaser';
import { tilesetConfig } from '../../../config/constants';

export function preloadCreaturesAssets(scene: Phaser.Scene) {
  scene.load.spritesheet('firefly', 'assets/images-extruded/animations/firefly.png', tilesetConfig);
  scene.load.spritesheet('butterflies', 'assets/images-extruded/animations/butterflies.png', tilesetConfig);
}

export function createCreatureAnimations(scene: Phaser.Scene) {
  createFireflyAnimations(scene);
  createButterflyAnimations(scene);
}

export function createButterflyAnimations(scene: Phaser.Scene) {
  const butterflyKeys = ['butterfly-blue-flying', 'butterfly-pink-flying', 'butterfly-green-flying', 'butterfly-yellow-flying'];
  const butterflyTexture = 'butterflies';

  // the number of frames of the flying animation
  const numberOfFrames = 7;

  butterflyKeys.forEach((butterflyKey, i) => {
    scene.anims.create({
      key: butterflyKey,
      frames: scene.anims.generateFrameNames(butterflyTexture, { start: i * numberOfFrames, end: numberOfFrames * (i + 1) - 1 }),
      frameRate: 35,
      repeat: -1,
    });
  });
}

function createFireflyAnimations(scene: Phaser.Scene) {
  scene.anims.create({
    key: 'firefly-blinking',
    frames: scene.anims.generateFrameNames('firefly'),
  });
}
