import * as Phaser from 'phaser';
import { optionsInstance } from '../../config/optionsConfig';
import { DEBUG } from '../../config/constants';
import preloadTilesetAssets from './preloadTilesetAssets';
import preloadTiledLocationMaps from './preloadTiledLocationMaps';
import preloadInterfaceAndIconsAssets from './preloadInterfaceAndIconsAssets';
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
    preloadAudioAssets(this);
    preloadTilesetAssets(this);
    preloadInterfaceAndIconsAssets(this);
    preloadTiledLocationMaps(this);
    preloadTilesetAssets(this);
    preloadFonts(this);
  }

  create() {
    createBattleAnimations(this);
    createWorldAnimations(this);

    optionsInstance.setSoundManager(this);
    if (DEBUG) optionsInstance.toggleMusic();

    if (DEBUG) {
      const debugScene = 'WeaklingsCave';
      /* { type: 'ghost-knight' }, { type: 'skeleton' }, { type: 'wizard' }, { type: 'wildBoar' } */
      this.scene.start('Battle', {
        enemies: [{ type: 'ghost-knight' }],
        background: 'cave-background',
        prevScene: 'Caltor',
      });
      console.log(`Preload done, starting ${debugScene}`);
      // this.scene.start(debugScene, { prevScene: this.scene.key });
    } else {
      console.log('Preload done, starting Main Menu');
      this.scene.start('MainMenu', { prevScene: this.scene.key });
    }
  }
}
