import { Scene } from 'phaser';
import { tilesetConfig } from '../../config/constants';

export default function preloadTilesetAssets(preloadScene: Scene) {
  // Tilesets
  preloadScene.load.spritesheet('base-separated-1', 'assets/images-extruded/tilesets/base-separated-1.png', tilesetConfig);
  preloadScene.load.spritesheet('base-separated-2', 'assets/images-extruded/tilesets/base-separated-2.png', tilesetConfig);
  preloadScene.load.spritesheet('base-addition', 'assets/images-extruded/tilesets/base-addition.png', tilesetConfig);
  preloadScene.load.spritesheet('houses', 'assets/images-extruded/tilesets/houses.png', tilesetConfig);
  preloadScene.load.spritesheet('dirt1-dirt2', 'assets/images-extruded/tilesets/dirt1-dirt2.png', tilesetConfig);
  preloadScene.load.spritesheet('grass1', 'assets/images-extruded/tilesets/grass1.png', tilesetConfig);
  preloadScene.load.spritesheet('grass2', 'assets/images-extruded/tilesets/grass2.png', tilesetConfig);
  preloadScene.load.spritesheet('grass3', 'assets/images-extruded/tilesets/grass3.png', tilesetConfig);
  preloadScene.load.spritesheet('grass4', 'assets/images-extruded/tilesets/grass4.png', tilesetConfig);
  preloadScene.load.spritesheet('long-grass', 'assets/images-extruded/tilesets/long-grass.png', tilesetConfig);
  preloadScene.load.spritesheet('dirt1', 'assets/images-extruded/tilesets/dirt1.png', tilesetConfig);
  preloadScene.load.spritesheet('dirt2', 'assets/images-extruded/tilesets/dirt2.png', tilesetConfig);
  preloadScene.load.spritesheet('dirt4', 'assets/images-extruded/tilesets/dirt4.png', tilesetConfig);
  preloadScene.load.spritesheet('water2', 'assets/images-extruded/tilesets/water2.png', tilesetConfig);
  preloadScene.load.spritesheet('atmospheric-animations', 'assets/images/animations/atmospheric-animations.png', tilesetConfig);
  preloadScene.load.spritesheet('windmill', 'assets/images-extruded/animations/windmill.png', tilesetConfig);
  preloadScene.load.spritesheet('tree-emerald-thin', 'assets/images-extruded/tilesets/tree-emerald-thin.png', tilesetConfig);
  preloadScene.load.spritesheet('tree-green-bushy', 'assets/images-extruded/tilesets/tree-green-bushy.png', tilesetConfig);
  preloadScene.load.spritesheet('tree-green-thin', 'assets/images-extruded/tilesets/tree-green-thin.png', tilesetConfig);
  preloadScene.load.spritesheet('tree-green-wide-edit', 'assets/images-extruded/tilesets/tree-green-wide-edit.png', tilesetConfig);
  preloadScene.load.spritesheet('tree-green-willow', 'assets/images-extruded/tilesets/tree-green-willow.png', tilesetConfig);
  preloadScene.load.spritesheet('tree-red-thin', 'assets/images-extruded/tilesets/tree-red-thin.png', tilesetConfig);
  preloadScene.load.spritesheet('grass1-dirt1', 'assets/images-extruded/tilesets/grass1-dirt1.png', tilesetConfig);
  preloadScene.load.spritesheet('grass1-dirt2', 'assets/images-extruded/tilesets/grass1-dirt2.png', tilesetConfig);
  preloadScene.load.spritesheet('grass1-dirt4', 'assets/images-extruded/tilesets/grass1-dirt4.png', tilesetConfig);
  preloadScene.load.spritesheet('wall-up', 'assets/images-extruded/tilesets/wall-up.png', tilesetConfig);
  preloadScene.load.spritesheet('flowers', 'assets/images-extruded/tilesets/flowers.png', tilesetConfig);
  preloadScene.load.spritesheet('castle', 'assets/images-extruded/tilesets/castle.png', tilesetConfig);

  preloadScene.load.spritesheet('grassland', 'assets/images-extruded/tilesets/grassland.png', tilesetConfig);
  preloadScene.load.spritesheet('caves', 'assets/images-extruded/tilesets/caves.png', tilesetConfig);
  preloadScene.load.spritesheet('caves-grassland-entrance', 'assets/images-extruded/tilesets/caves-grassland-entrance.png', tilesetConfig);
  preloadScene.load.spritesheet('caves-decoration-animated-b', 'assets/images-extruded/tilesets/caves-decoration-animated-b.png', tilesetConfig);
}
