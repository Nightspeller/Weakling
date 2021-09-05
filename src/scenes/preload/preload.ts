import * as Phaser from 'phaser';
import { optionsInstance } from '../../config/optionsConfig';
import { DEBUG } from '../../config/constants';
import preloadTilesetAssets from './preloadTilesetAssets';
import preloadTiledLocationMaps from './preloadTiledLocationMaps';
import { preloadInterfaceAssets, createInterfaceAnimations } from './interface-assets-and-animations/preloadInterfaceAssets';
import preloadAudioAssets from './preloadAudioAssets';
import drawLoadingProgressBar from './drawLoadingProgressBar';
import { preloadBattleAssets, createBattleAnimations } from './battle-assets-and-animations/preloadBattleAssets';
import { preloadWorldAssets, createWorldAnimations } from './world-assets-and-animations/preloadWorldAssets';
import preloadFonts from './preloadFonts';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Preload' });
  }

  preload() {
    drawLoadingProgressBar(this);

    preloadBattleAssets(this);
    preloadWorldAssets(this);
    preloadInterfaceAssets(this);

    preloadAudioAssets(this);
    preloadTilesetAssets(this);
    preloadTiledLocationMaps(this);
    preloadTilesetAssets(this);
    preloadFonts(this);
  }

  create() {
    createBattleAnimations(this);
    createWorldAnimations(this);
    createInterfaceAnimations(this);

    optionsInstance.setSoundManager(this);
    // if (DEBUG) optionsInstance.toggleMusic();

    this.scene.launch('BackgroundSound', this);

    if (DEBUG) {
      const debugScene = 'MainMenu';
      /* this.scene.start('Battle', {
        enemies: [{ type: 'ghost-knight' }, { type: 'ghost-knight' }, { type: 'skeleton' }, { type: 'wizard' }, { type: 'wildBoar' }],
        background: 'cave-background',
        prevScene: 'Caltor',
      }); */
      console.log(`Preload done, starting ${debugScene}`);
      this.scene.start(debugScene, { prevScene: this.scene.key });
    } else {
      console.log('Preload done, starting Main Menu');
      this.scene.start('MainMenu', { prevScene: this.scene.key });
    }
  }
}
