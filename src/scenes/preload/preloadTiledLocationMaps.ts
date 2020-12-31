import { Scene } from 'phaser';

export default function preloadTiledLocationMaps(preloadScene: Scene) {
  // Load the export Tiled JSON
  preloadScene.load.tilemapTiledJSON('caltor', 'assets/exported-maps/caltor.json');
  preloadScene.load.tilemapTiledJSON('crypt', 'assets/exported-maps/crypt.json');
  preloadScene.load.tilemapTiledJSON('house', 'assets/exported-maps/house.json');
  preloadScene.load.tilemapTiledJSON('tavern', 'assets/exported-maps/tavern.json');
  preloadScene.load.tilemapTiledJSON('booksStore', 'assets/exported-maps/booksStore.json');
  preloadScene.load.tilemapTiledJSON('hermitsTower', 'assets/exported-maps/hermitsTower.json');
  preloadScene.load.tilemapTiledJSON('honeywood', 'assets/exported-maps/honeywood.json');
  preloadScene.load.tilemapTiledJSON('village', 'assets/exported-maps/village.json');
  preloadScene.load.tilemapTiledJSON('battle', 'assets/exported-maps/fight.json');
  preloadScene.load.tilemapTiledJSON('hargkakhsCave', 'assets/exported-maps/hargkakhsCave.json');
  preloadScene.load.tilemapTiledJSON('weaklingsCave', 'assets/exported-maps/weaklingsCave.json');
  preloadScene.load.tilemapTiledJSON('eldersCave', 'assets/exported-maps/eldersCave.json');
  preloadScene.load.tilemapTiledJSON('nahkhasCave', 'assets/exported-maps/nahkhasCave.json');
  preloadScene.load.tilemapTiledJSON('dungeon', 'assets/exported-maps/dungeon.json');
  preloadScene.load.tilemapTiledJSON('betweenVillageAndDungeon', 'assets/exported-maps/betweenVillageAndDungeon.json');
  preloadScene.load.tilemapTiledJSON('betweenVillageAndCaltor', 'assets/exported-maps/betweenVillageAndCaltor.json');
  preloadScene.load.tilemapTiledJSON('backCave', 'assets/exported-maps/backCave.json');
  preloadScene.load.tilemapTiledJSON('greatPlains', 'assets/exported-maps/greatPlains.json');
  preloadScene.load.tilemapTiledJSON('dungeonLevel1', 'assets/exported-maps/dungeonLevel1.json');
}
