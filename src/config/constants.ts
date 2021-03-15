export const DEBUG = localStorage.getItem('DEBUG') === 'true' || window.location.host.includes('localhost');

export const BATTLE_CHAR_WIDTH = 96;
export const BATTLE_CHAR_HEIGHT = 96;
export const ACTION_POINT_WIDTH = 16;
export const ACTION_POINT_HEIGHT = 16;

export const TILE_SIZE = 32;

export const GAME_W = TILE_SIZE * 25; // 800
export const GAME_H = TILE_SIZE * 20; // 640

export const aspectRatio = GAME_W / GAME_H; // 1.25

const windowWidth = window.innerWidth - 20; // -20 pixel for scroll bar - there should be a better solution though
const windowHeight = window.innerHeight;

export const GAME_ZOOM = windowWidth > windowHeight * aspectRatio ? windowHeight / GAME_H : windowWidth / GAME_W;

export const PLAYER_WORLD_SPEED = 150;
export const PLAYER_RUN_WORLD_SPEED = 250;

// Inventory

export const INVENTORY_ITEM_DESCRIPTION_W = 32 * 10;
export const INVENTORY_ITEM_DESCRIPTION_H = 32 * 11;
export const INVENTORY_ITEM_SCALE = 1.8;

export const tilesetConfig = {
  frameWidth: 32,
  frameHeight: 32,
  margin: 1,
  spacing: 2,
};

export const tilesetConfig80x96 = {
  frameWidth: 80,
  frameHeight: 96,
  margin: 1,
  spacing: 2,
};
