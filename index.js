import { DEBUG, GAME_H, GAME_W, GAME_ZOOM } from "./config/constants.js";
import { PreloadScene } from './scenes/preload.js';
import { CaltorScene } from "./locations/caltor.js";
import { HouseScene } from "./locations/house.js";
import { VillageScene } from "./locations/village.js";
import { TraderOverlayScene } from "./overlay_scenes/item-manupulators/traderOverlayScene.js";
import { HargkakhsCaveScene } from "./locations/hargkakhsCave.js";
import { CharacterPickerScene } from "./overlay_scenes/characterPicker.js";
import { BattleScene } from "./battle/battle.js";
import { DialogScene } from "./overlay_scenes/dialog.js";
import { TavernScene } from "./locations/tavern.js";
import { InventoryOverlayScene } from "./overlay_scenes/item-manupulators/inventoryOverlayScene.js";
import { HermitsTowerScene } from "./locations/hermitsTower.js";
import { MainMenuScene } from "./scenes/mainMenu.js";
import { WeaklingsCaveScene } from "./locations/weaklingsCave.js";
import { EldersCaveScene } from "./locations/eldersCave.js";
import { IntroScene } from "./scenes/intro.js";
import { DungeonScene } from "./locations/dungeon.js";
import { OptionsScene } from "./scenes/options.js";
import { BetweenVillageAndDungeonScene } from "./locations/betweenVillageAndDungeon.js";
import { BetweenVillageAndCaltorScene } from "./locations/betweenVillageAndCaltor.js";
import { NahkhasCaveScene } from "./locations/nahkhasCave.js";
import { QuestLogScene } from "./overlay_scenes/questLog.js";
import { CryptScene } from "./locations/crypt.js";
import { BackCaveScene } from "./locations/backCave.js";
import { GreatPlainsScene } from "./locations/greatPlains.js";
import { BooksStoreScene } from "./locations/booksStore.js";
import { AlchemyStandScene } from "./overlay_scenes/item-manupulators/alchemyStandOverlay.js";
import { ContainerOverlayScene } from "./overlay_scenes/item-manupulators/containerOverlayScene.js";
export const LOCATION_SCENES = [BetweenVillageAndDungeonScene,
    BetweenVillageAndCaltorScene,
    DungeonScene,
    CaltorScene, HouseScene, TavernScene, HermitsTowerScene, CryptScene, BooksStoreScene,
    VillageScene, HargkakhsCaveScene, NahkhasCaveScene, WeaklingsCaveScene, EldersCaveScene, BackCaveScene,
    GreatPlainsScene];
const gameConfig = {
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
    scene: [PreloadScene,
        MainMenuScene,
        OptionsScene,
        IntroScene,
        ...LOCATION_SCENES,
        CharacterPickerScene, TraderOverlayScene, BattleScene, DialogScene, InventoryOverlayScene, QuestLogScene, AlchemyStandScene, ContainerOverlayScene
    ]
};
export const game = new Phaser.Game(gameConfig);
document.getElementById('game').addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);
//# sourceMappingURL=index.js.map