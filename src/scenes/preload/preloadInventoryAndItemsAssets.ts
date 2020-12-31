import { Scene } from 'phaser';
import { tilesetConfig } from '../../config/constants';

export default function preloadInventoryAndItemsAssets(preloadScene: Scene) {
  preloadScene.load.image('doll', 'assets/images/interface/doll.png');
  preloadScene.load.image('inventory-slot', 'assets/images/interface/inventory-slot.png');

  // Items
  preloadScene.load.image('rope-belt', 'assets/images/items/rope-belt.png');
  preloadScene.load.image('bag-green', 'assets/images/items/bag-green.png');
  preloadScene.load.image('spear-weapon', 'assets/images/items/spear-weapon.png');
  preloadScene.load.image('allpowerful-necklace', 'assets/images/items/allpowerful-necklace.png');
  preloadScene.load.spritesheet('icon-item-set', 'assets/images-extruded/items/icon-item-set.png', tilesetConfig);
  preloadScene.load.spritesheet('price-tag-icons', 'assets/images-extruded/interface/price-tag-icons.png', tilesetConfig);

  // Items Atlases
  preloadScene.load.atlas('icons-additional',
    'assets/images-extruded/interface/icons-additional.png',
    'assets/images-extruded/interface/icons-additional.json');
  preloadScene.load.atlas('edited',
    'assets/images-extruded/interface/edited.png',
    'assets/images-extruded/interface/edited.json');
  preloadScene.load.atlas('potions',
    'assets/images-extruded/items/potions.png',
    'assets/images-extruded/items/potions.json');
  preloadScene.load.atlas('eggs',
    'assets/images-extruded/items/eggs.png',
    'assets/images-extruded/items/eggs.json');
}
