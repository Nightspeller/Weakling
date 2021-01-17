define(["require", "exports", "phaser", "../../config/optionsConfig", "../../config/constants", "./preloadTilesetAssets", "./preloadTiledLocationMaps", "./preloadInterfaceAndIconsAssets", "./preloadAudioAssets", "./drawLoadingProgressBar", "./battle-assets-and-animations/preloadBattleAssets", "./world-assets-and-animations/preloadWorldAssets", "./preloadFonts"], function (require, exports, Phaser, optionsConfig_1, constants_1, preloadTilesetAssets_1, preloadTiledLocationMaps_1, preloadInterfaceAndIconsAssets_1, preloadAudioAssets_1, drawLoadingProgressBar_1, preloadBattleAssets_1, preloadWorldAssets_1, preloadFonts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PreloadScene extends Phaser.Scene {
        constructor() {
            super({ key: 'Preload' });
        }
        preload() {
            drawLoadingProgressBar_1.default(this);
            preloadBattleAssets_1.preloadBattleAssets(this);
            preloadWorldAssets_1.preloadWorldAssets(this);
            preloadAudioAssets_1.default(this);
            preloadTilesetAssets_1.default(this);
            preloadInterfaceAndIconsAssets_1.default(this);
            preloadTiledLocationMaps_1.default(this);
            preloadTilesetAssets_1.default(this);
            preloadFonts_1.default(this);
        }
        create() {
            preloadBattleAssets_1.createBattleAnimations(this);
            preloadWorldAssets_1.createWorldAnimations(this);
            optionsConfig_1.optionsInstance.setSoundManager(this);
            if (constants_1.DEBUG)
                optionsConfig_1.optionsInstance.toggleMusic();
            if (constants_1.DEBUG) {
                const debugScene = 'WeaklingsCave';
                this.scene.start('Battle', { enemies: [{ type: 'ghost-knight' }, { type: 'skeleton' }, { type: 'wizard' }, { type: 'wildBoar' }], background: 'cave-background', prevScene: 'Caltor' });
                console.log(`Preload done, starting ${debugScene}`);
                // this.scene.start(debugScene, { prevScene: this.scene.key });
            }
            else {
                console.log('Preload done, starting Main Menu');
                this.scene.start('MainMenu', { prevScene: this.scene.key });
            }
        }
    }
    exports.default = PreloadScene;
});
//# sourceMappingURL=preload.js.map