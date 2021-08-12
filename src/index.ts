import * as Phaser from 'phaser';

import {
  DEBUG, GAME_H, GAME_W,
} from './config/constants';
import PreloadScene from './scenes/preload/preload';
import CaltorScene from './scenes/locations/caltor/caltor';
import HouseScene from './scenes/locations/caltor/house';
import VillageScene from './scenes/locations/village/village';
import TraderOverlayScene from './scenes/overlays/item-manupulators/traderOverlayScene';
import HargkakhsCaveScene from './scenes/locations/village/hargkakhsCave';
import CharacterPickerScene from './scenes/overlays/characterPicker';
import BattleScene from './scenes/battle/battle';
import DialogScene from './scenes/overlays/dialog';
import FishingScene from './scenes/overlays/fishing';
import TavernScene from './scenes/locations/caltor/tavern';
import InventoryOverlayScene from './scenes/overlays/item-manupulators/inventoryOverlayScene';
import HermitsTowerScene from './scenes/locations/caltor/hermitsTower';
import MainMenuScene from './scenes/intro-and-main-menu/mainMenu';
import WeaklingsCaveScene from './scenes/locations/village/weaklingsCave';
import EldersCaveScene from './scenes/locations/village/eldersCave';
import IntroScene from './scenes/intro-and-main-menu/intro';
import DungeonScene from './scenes/locations/dungeon/dungeon';
import OptionsScene from './scenes/intro-and-main-menu/options';
import BetweenVillageAndDungeonScene from './scenes/locations/roads/betweenVillageAndDungeon';
import BetweenVillageAndCaltorScene from './scenes/locations/roads/betweenVillageAndCaltor';
import Forest from './scenes/locations/roads/forest';
import NahkhasCaveScene from './scenes/locations/village/nahkhasCave';
import QuestLogScene from './scenes/overlays/questLog';
import CryptScene from './scenes/locations/caltor/crypt';
import BackCaveScene from './scenes/locations/village/backCave';
import GreatPlainsScene from './scenes/locations/roads/greatPlains';
import WindmillScene from './scenes/locations/roads/windmill';
import BooksStoreScene from './scenes/locations/caltor/booksStore';
import AlchemyStandScene from './scenes/overlays/item-manupulators/alchemyStandOverlay';
import ContainerOverlayScene from './scenes/overlays/item-manupulators/containerOverlayScene';
import DungeonLevel1Scene from './scenes/locations/dungeon/dungeonLevel1';
import AchievementsScene from './scenes/overlays/achievements';
import AllItemsScene from './scenes/overlays/all-items';
import LevelUpScreenScene from './scenes/overlays/level-up-screen';
import HoneywoodScene from './scenes/locations/honeywood/honeywood';
import WorldMapUIScene from './scenes/locations/worldMapUIScene';
import AboutScene from './scenes/intro-and-main-menu/about';
import { MyWebAudioSoundManager } from './sound-manager/soundManager';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

// import { TestPreloadScene } from './scenes/not-used/perf-test';

export const LOCATION_SCENES = [
  WorldMapUIScene,
  BetweenVillageAndDungeonScene,
  BetweenVillageAndCaltorScene,
  Forest,
  DungeonScene,
  DungeonLevel1Scene,
  HoneywoodScene,
  CaltorScene, HouseScene, TavernScene, HermitsTowerScene, CryptScene, BooksStoreScene,
  VillageScene, HargkakhsCaveScene, NahkhasCaveScene, WeaklingsCaveScene, EldersCaveScene, BackCaveScene,
  GreatPlainsScene, WindmillScene] as any[];

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Weakling!!',

  type: Phaser.AUTO,

  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_W,
    height: GAME_H,
  },

  physics: {
    default: 'arcade',
    arcade: {
      debug: DEBUG,
    },
  },

  render: {
    pixelArt: true,
  },

  scene: [/* TestPreloadScene, */PreloadScene,
    MainMenuScene, OptionsScene, IntroScene, AboutScene,
    ...LOCATION_SCENES,
    CharacterPickerScene, TraderOverlayScene, BattleScene, DialogScene, FishingScene, InventoryOverlayScene,
    QuestLogScene, AchievementsScene, LevelUpScreenScene, AllItemsScene, AlchemyStandScene, ContainerOverlayScene,
  ],
};

export const game = new Phaser.Game(gameConfig);
/* game.sound = new MyWebAudioSoundManager(game); */

document.getElementById('game')
  ?.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  }, false);
