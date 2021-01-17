import { Scene } from 'phaser';
import { tilesetConfig } from '../../config/constants';

export default function preloadInterfaceAndIconsAssets(preloadScene: Scene) {
  preloadScene.load.image('doll', 'assets/images/interface/doll.png');
  preloadScene.load.image('inventory-slot', 'assets/images/interface/inventory-slot.png');

  preloadScene.load.image('interface-24x19', 'assets/images-extruded/interface/interface-24x19.png');
  preloadScene.load.image('main-menu-background', 'assets/images/interface/main-menu-background.jpg');

  // Items
  preloadScene.load.spritesheet('icon-item-set', 'assets/images-extruded/interface/icon-item-set.png', tilesetConfig);

  // Icons atlas - Assets for this atlas are under top level assets folder (assets/ftp-project/icons) and compiled during build by Webpack, on the fly.
  preloadScene.load.atlas('icons',
    'assets/images-extruded/interface/icons.png',
    'assets/images-extruded/interface/icons.json');
}
