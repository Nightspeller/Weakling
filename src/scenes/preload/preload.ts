import * as Phaser from 'phaser';
import { optionsInstance } from '../../config/optionsConfig';
import { DEBUG } from '../../config/constants';
import preloadTilesetAssets from './preloadTilesetAssets';
import preloadTiledLocationMaps from './preloadTiledLocationMaps';
import preloadInventoryAndItemsAssets from './preloadInventoryAndItemsAssets';
import preloadAudioAssets from './preloadAudioAssets';
import drawLoadingProgressBar from './drawLoadingProgressBar';
import { preloadBattleAssets, createBattleAnimations } from './battle-assets-and-animations/preloadBattleAssets';
import { preloadWorldAssets, createWorldAnimations } from './world-assets-and-animations/preloadWorldAssets';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' });
  }

  preload() {
    drawLoadingProgressBar(this);

    preloadBattleAssets(this);
    preloadWorldAssets(this);
    preloadAudioAssets(this);
    preloadTilesetAssets(this);
    preloadInventoryAndItemsAssets(this);
    preloadTiledLocationMaps(this);
    preloadTilesetAssets(this);

    // Interface
    this.load.image('interface-24x19', 'assets/images-extruded/interface/interface-24x19.png');
    this.load.image('main-menu-background', 'assets/images/interface/main-menu-background.jpg');
  }

  create() {
    createBattleAnimations(this);
    createWorldAnimations(this);

    optionsInstance.setSoundManager(this);
    if (DEBUG) optionsInstance.toggleMusic();

    if (DEBUG) {
      const debugScene = 'WeaklingsCave';
      // this.scene.start("Battle", {enemies: [{"type": "ghost-knight"}, {"type": "skeleton"}, {"type": "wizard"}, {"type": "wildBoar"}], background: 'cave-background', prevScene: "Caltor"});
      console.log(`Preload done, starting ${debugScene}`);
      this.scene.start(debugScene, { prevScene: this.scene.key });
    } else {
      console.log('Preload done, starting Main Menu');
      this.scene.start('MainMenu', { prevScene: this.scene.key });
    }
  }
}
