import {PreloadScene} from './scenes/preload.js';
import {CaltorScene} from "./locations/caltor.js";
import {HouseScene} from "./locations/house.js";
import {VillageScene} from "./locations/village.js";
import {ShopScene} from "./overlay_scenes/shop.js";
import {HargkakhsCaveScene} from "./locations/hargkakhsCave.js";
import {CharacterPickerScene} from "./overlay_scenes/characterPicker.js";
import {BattleScene} from "./battle/battle.js";
import {DialogScene} from "./overlay_scenes/dialog.js";
import {TavernScene} from "./locations/tavern.js";
import {InventoryScene} from "./overlay_scenes/inventory.js";
import {HermitsTowerScene} from "./locations/hermitsTower.js";
import {MainMenuScene} from "./scenes/mainMenu.js";
import {DEBUG, GAME_H, GAME_W, GAME_ZOOM} from "./config/constants.js";
import {WeaklingsCaveScene} from "./locations/weaklingsCave.js";

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Weakling!',

    type: Phaser.AUTO,

    width: GAME_W,
    height: GAME_H,
// @ts-ignore
    pixelArt: true,
    zoom: GAME_ZOOM,

    physics: {
        default: 'arcade',
        arcade: {
            debug: DEBUG,
        },
    },

    parent: 'game',
    backgroundColor: '#000000',
    scene: [PreloadScene, MainMenuScene, CaltorScene, HouseScene, VillageScene, TavernScene, HargkakhsCaveScene, WeaklingsCaveScene, HermitsTowerScene, ShopScene, CharacterPickerScene, BattleScene, DialogScene, InventoryScene]
};

export const game = new Phaser.Game(gameConfig);
