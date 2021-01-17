define(["require", "exports", "phaser", "./config/constants", "./scenes/preload/preload", "./scenes/locations/caltor/caltor", "./scenes/locations/caltor/house", "./scenes/locations/village/village", "./scenes/overlays/item-manupulators/traderOverlayScene", "./scenes/locations/village/hargkakhsCave", "./scenes/overlays/characterPicker", "./scenes/battle/battle", "./scenes/overlays/dialog", "./scenes/locations/caltor/tavern", "./scenes/overlays/item-manupulators/inventoryOverlayScene", "./scenes/locations/caltor/hermitsTower", "./scenes/intro-and-main-menu/mainMenu", "./scenes/locations/village/weaklingsCave", "./scenes/locations/village/eldersCave", "./scenes/intro-and-main-menu/intro", "./scenes/locations/dungeon/dungeon", "./scenes/intro-and-main-menu/options", "./scenes/locations/roads/betweenVillageAndDungeon", "./scenes/locations/roads/betweenVillageAndCaltor", "./scenes/locations/village/nahkhasCave", "./scenes/overlays/questLog", "./scenes/locations/caltor/crypt", "./scenes/locations/village/backCave", "./scenes/locations/roads/greatPlains", "./scenes/locations/caltor/booksStore", "./scenes/overlays/item-manupulators/alchemyStandOverlay", "./scenes/overlays/item-manupulators/containerOverlayScene", "./scenes/locations/dungeon/dungeonLevel1", "./scenes/overlays/achievements", "./scenes/overlays/all-items", "./scenes/overlays/level-up-screen", "./scenes/locations/honeywood/honeywood"], function (require, exports, Phaser, constants_1, preload_1, caltor_1, house_1, village_1, traderOverlayScene_1, hargkakhsCave_1, characterPicker_1, battle_1, dialog_1, tavern_1, inventoryOverlayScene_1, hermitsTower_1, mainMenu_1, weaklingsCave_1, eldersCave_1, intro_1, dungeon_1, options_1, betweenVillageAndDungeon_1, betweenVillageAndCaltor_1, nahkhasCave_1, questLog_1, crypt_1, backCave_1, greatPlains_1, booksStore_1, alchemyStandOverlay_1, containerOverlayScene_1, dungeonLevel1_1, achievements_1, all_items_1, level_up_screen_1, honeywood_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.game = exports.LOCATION_SCENES = void 0;
    // import { TestPreloadScene } from './scenes/not-used/perf-test';
    exports.LOCATION_SCENES = [betweenVillageAndDungeon_1.default,
        betweenVillageAndCaltor_1.default,
        dungeon_1.default,
        dungeonLevel1_1.default,
        honeywood_1.default,
        caltor_1.default, house_1.default, tavern_1.default, hermitsTower_1.default, crypt_1.default, booksStore_1.default,
        village_1.default, hargkakhsCave_1.default, nahkhasCave_1.default, weaklingsCave_1.default, eldersCave_1.default, backCave_1.default,
        greatPlains_1.default];
    const gameConfig = {
        title: 'Weakling!!',
        type: Phaser.AUTO,
        width: constants_1.GAME_W,
        height: constants_1.GAME_H,
        zoom: constants_1.GAME_ZOOM,
        physics: {
            default: 'arcade',
            arcade: {
                debug: constants_1.DEBUG,
            },
        },
        render: {
            pixelArt: true,
        },
        parent: 'game',
        backgroundColor: '#000000',
        scene: [/* TestPreloadScene, */ preload_1.default,
            mainMenu_1.default,
            options_1.default,
            intro_1.default,
            ...exports.LOCATION_SCENES,
            characterPicker_1.default, traderOverlayScene_1.default, battle_1.default, dialog_1.default, inventoryOverlayScene_1.default,
            questLog_1.default, achievements_1.default, level_up_screen_1.default, all_items_1.default, alchemyStandOverlay_1.default, containerOverlayScene_1.default,
        ],
    };
    exports.game = new Phaser.Game(gameConfig);
    document.getElementById('game')
        ?.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    }, false);
});
//# sourceMappingURL=index.js.map