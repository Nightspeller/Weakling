import * as Phaser from 'phaser';
import { Scene } from 'phaser';
import { tilesetConfig } from '../../config/constants';

export function preloadInterfaceAndIconsAssets(preloadScene: Scene) {
  preloadScene.load.image('doll', 'assets/images/interface/doll.png');
  preloadScene.load.image('inventory-slot', 'assets/images/interface/inventory-slot.png');

  preloadScene.load.image('interface-24x19', 'assets/images-extruded/interface/interface-24x19.png');
  preloadScene.load.image('main-menu-background', 'assets/images/interface/main-menu-background.jpg');
  preloadScene.load.image('fishing-background', 'assets/images/interface/fishing-background.png');

  // Items
  preloadScene.load.spritesheet('icon-item-set', 'assets/images-extruded/interface/icon-item-set.png', tilesetConfig);
  preloadScene.load.spritesheet('icon-farming-set', 'assets/images-extruded/interface/icon-farming-set.png', tilesetConfig);

  // Icons atlas - Assets for this atlas are under top level assets folder (assets/ftp-project/icons) and compiled during build by Webpack, on the fly.
  preloadScene.load.atlas('icons',
    'assets/images-extruded/interface/icons.png',
    'assets/images-extruded/interface/icons.json');

  preloadScene.load.atlas('paper-scrolls',
    'assets/images-extruded/animations/paper-scrolls.png',
    'assets/images-extruded/animations/paper-scrolls.json');
}

export function createPaperScrollAnimations(scene: Phaser.Scene) {
  const paperScrollKeys = ['scroll-caltor', 'scroll-greatplains', 'scroll-honeywood', 'scroll-dungeon', 'scroll-empty'];
  const paperScrollTexture = 'paper-scrolls';

  paperScrollKeys.forEach((paperScrollKey) => {
    scene.anims.create({
      key: `${paperScrollKey}-open`,
      frames: scene.anims.generateFrameNames(paperScrollTexture, {
        start: 0,
        end: 18,
        prefix: paperScrollKey,
        suffix: '.png',
        zeroPad: 0,
      }),
      duration: 5000,
      frameRate: 20,
      repeat: 0,
    });
    scene.anims.create({
      key: `${paperScrollKey}-close`,
      frames: scene.anims.generateFrameNames(paperScrollTexture, {
        start: 19,
        end: 37,
        prefix: paperScrollKey,
        suffix: '.png',
        zeroPad: 0,
      }),
      frameRate: 20,
      repeat: 0,
    });
  });
}
