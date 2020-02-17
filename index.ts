import {PreloadScene} from './scenes/preload.js';
import {CaltorScene} from "./locations/caltor.js";
import {HouseScene} from "./locations/house.js";
import {VillageScene} from "./locations/village.js";
import {ShopScene} from "./scenes/shop.js";
import {HargkakhsCaveScene} from "./locations/hargkakhsCave.js";
import {CharacterPickerScene} from "./scenes/characterPicker.js";
import {BattleScene} from "./battle/battle.js";
import {DialogScene} from "./scenes/dialog.js";
import {TavernScene} from "./locations/tavern.js";
import {InventoryScene} from "./scenes/inventory.js";
import {HermitsTowerScene} from "./locations/hermitsTower.js";
import {GAME_H, GAME_W, GAME_ZOOM} from "./config/constants.js";

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
            debug: true,
        },
    },

    parent: 'game',
    backgroundColor: '#000000',
    scene: [PreloadScene, CaltorScene, HouseScene, VillageScene, TavernScene, HargkakhsCaveScene, HermitsTowerScene, ShopScene, CharacterPickerScene, BattleScene, DialogScene, InventoryScene]
};

export const game = new Phaser.Game(gameConfig);
