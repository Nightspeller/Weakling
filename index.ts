import {PreloadScene} from './scenes/preload.js';
import {CaltorScene} from "./scenes/caltor.js";
import {HouseScene} from "./scenes/house.js";
import {VillageScene} from "./scenes/village.js";
import {ShopScene} from "./scenes/shop.js";
import {HargkakhsCaveScene} from "./scenes/hargkakhsCave.js";
import {CharacterPickerScene} from "./scenes/characterPicker.js";
import {BattleScene} from "./battle/battle.js";
import {DialogScene} from "./scenes/dialog.js";
import {TavernScene} from "./scenes/tavern.js";
import {InventoryScene} from "./scenes/inventory.js";

const zoom = 1;

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Sample',

    type: Phaser.AUTO,

    width: 800 / zoom,
    height: 640 / zoom,
// @ts-ignore
    pixelArt: true,
    zoom: zoom,

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },

    parent: 'game',
    backgroundColor: '#000000',
    scene: [PreloadScene, CaltorScene, HouseScene, VillageScene, ShopScene, HargkakhsCaveScene, CharacterPickerScene, BattleScene, DialogScene, TavernScene, InventoryScene]
};

export const game = new Phaser.Game(gameConfig);