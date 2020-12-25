import {optionsInstance} from "../../config/optionsConfig.js";
import {DEBUG} from "../../config/constants.js";
import {createAnimations, preloadAnimationsSpriteSheets} from "./preloadAndCreateAnimations.js";
import {preloadTilesetAssets} from "./preloadTilesetAssets.js";
import {preloadWorldCharactersAssets} from "./preloadWorldCharactersAssets.js";
import {preloadTiledLocationMaps} from "./preloadTiledLocationMaps.js";
import {preloadInventoryAndItemsAssets} from "./preloadInventoryAndItemsAssets.js";
import {preloadAudioAssets} from "./preloadAudioAssets.js";
import {drawLoadingProgressBar} from "./drawLoadingProgressBar.js";

export class PreloadScene extends Phaser.Scene {

    constructor() {
        super({key: 'Preload'});
    }

    preload() {
        drawLoadingProgressBar(this);

        preloadTilesetAssets(this);
        preloadWorldCharactersAssets(this);
        preloadInventoryAndItemsAssets(this);
        preloadAnimationsSpriteSheets(this);
        preloadTiledLocationMaps(this);
        preloadAudioAssets(this);

        // Interface
        this.load.image('interface-24x19', 'assets/images-extruded/interface/interface-24x19.png');

        this.load.image('main-menu-background', 'assets/images/interface/main-menu-background.jpg');
    }

    create() {
        optionsInstance.setSoundManager(this);
        if (DEBUG) optionsInstance.toggleMusic();

        // @ts-ignore
        createAnimations(this);
        console.log('Preload done, calling Main Menu');
        if (DEBUG) {
            //this.scene.start("Battle", {enemies: [{"type": "ghost-knight"}, {"type": "skeleton"}, {"type": "wizard"}, {"type": "wildBoar"}], background: 'cave-background', prevScene: "Caltor"});
            this.scene.start("Honeywood", {prevScene: this.scene.key});
        } else {
            this.scene.start("MainMenu", {prevScene: this.scene.key});
        }
    }
}
