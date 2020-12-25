import { DEBUG, GAME_H, GAME_W, GAME_ZOOM } from "./config/constants.js";
import { PreloadScene } from './scenes/preload/preload.js';
import { CaltorScene } from "./scenes/locations/caltor/caltor.js";
import { HouseScene } from "./scenes/locations/caltor/house.js";
import { VillageScene } from "./scenes/locations/village/village.js";
import { TraderOverlayScene } from "./scenes/overlays/item-manupulators/traderOverlayScene.js";
import { HargkakhsCaveScene } from "./scenes/locations/village/hargkakhsCave.js";
import { CharacterPickerScene } from "./scenes/overlays/characterPicker.js";
import { BattleScene } from "./scenes/battle/battle.js";
import { DialogScene } from "./scenes/overlays/dialog.js";
import { TavernScene } from "./scenes/locations/caltor/tavern.js";
import { InventoryOverlayScene } from "./scenes/overlays/item-manupulators/inventoryOverlayScene.js";
import { HermitsTowerScene } from "./scenes/locations/caltor/hermitsTower.js";
import { MainMenuScene } from "./scenes/intro-and-main-menu/mainMenu.js";
import { WeaklingsCaveScene } from "./scenes/locations/village/weaklingsCave.js";
import { EldersCaveScene } from "./scenes/locations/village/eldersCave.js";
import { IntroScene } from "./scenes/intro-and-main-menu/intro.js";
import { DungeonScene } from "./scenes/locations/dungeon/dungeon.js";
import { OptionsScene } from "./scenes/intro-and-main-menu/options.js";
import { BetweenVillageAndDungeonScene } from "./scenes/locations/roads/betweenVillageAndDungeon.js";
import { BetweenVillageAndCaltorScene } from "./scenes/locations/roads/betweenVillageAndCaltor.js";
import { NahkhasCaveScene } from "./scenes/locations/village/nahkhasCave.js";
import { QuestLogScene } from "./scenes/overlays/questLog.js";
import { CryptScene } from "./scenes/locations/caltor/crypt.js";
import { BackCaveScene } from "./scenes/locations/village/backCave.js";
import { GreatPlainsScene } from "./scenes/locations/roads/greatPlains.js";
import { BooksStoreScene } from "./scenes/locations/caltor/booksStore.js";
import { AlchemyStandScene } from "./scenes/overlays/item-manupulators/alchemyStandOverlay.js";
import { ContainerOverlayScene } from "./scenes/overlays/item-manupulators/containerOverlayScene.js";
import { DungeonLevel1Scene } from "./scenes/locations/dungeon/dungeonLevel1.js";
import { AchievementsScene } from "./scenes/overlays/achievements.js";
import { AllItemsScene } from "./scenes/overlays/all-items.js";
import { LevelUpScreenScene } from "./scenes/overlays/level-up-screen.js";
import { HoneywoodScene } from "./scenes/locations/honeywood/honeywood.js";
export const LOCATION_SCENES = [BetweenVillageAndDungeonScene,
    BetweenVillageAndCaltorScene,
    DungeonScene,
    DungeonLevel1Scene,
    HoneywoodScene,
    CaltorScene, HouseScene, TavernScene, HermitsTowerScene, CryptScene, BooksStoreScene,
    VillageScene, HargkakhsCaveScene, NahkhasCaveScene, WeaklingsCaveScene, EldersCaveScene, BackCaveScene,
    GreatPlainsScene];
const gameConfig = {
    title: 'Weakling!',
    type: Phaser.AUTO,
    width: GAME_W,
    height: GAME_H,
    zoom: GAME_ZOOM,
    physics: {
        default: 'arcade',
        arcade: {
            debug: DEBUG,
        },
    },
    render: {
        pixelArt: true,
    },
    parent: 'game',
    backgroundColor: '#000000',
    scene: [/*TestPreloadScene, */ PreloadScene,
        MainMenuScene,
        OptionsScene,
        IntroScene,
        ...LOCATION_SCENES,
        CharacterPickerScene, TraderOverlayScene, BattleScene, DialogScene, InventoryOverlayScene, QuestLogScene, AchievementsScene, LevelUpScreenScene, AllItemsScene, AlchemyStandScene, ContainerOverlayScene
    ]
};
export const game = new Phaser.Game(gameConfig);
document.getElementById('game').addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);
//# sourceMappingURL=index.js.map