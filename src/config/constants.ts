export const DEBUG = localStorage.getItem('DEBUG') === 'true' || window.location.host.includes('localhost');

export const BATTLE_CHAR_WIDTH = 96;
export const BATTLE_CHAR_HEIGHT = 96;
export const ACTION_POINT_WIDTH = 16;
export const ACTION_POINT_HEIGHT = 16;

export const TILE_SIZE = 32;

export const GAME_W = TILE_SIZE * 40; // 1280 (/2 = 640)
export const GAME_H = TILE_SIZE * 22.5; // 720 (/2 = 360)

export const aspectRatio = GAME_W / GAME_H; // 16/9 = 1.777(7)

const windowWidth = window.innerWidth - 20; // -20 pixel for scroll bar - there should be a better solution though
const windowHeight = window.innerHeight;

export const GAME_ZOOM = windowWidth > windowHeight * aspectRatio ? windowHeight / GAME_H : windowWidth / GAME_W;
export const LOCATION_SCENE_CAMERA_ZOOM = 2;

export const PLAYER_WORLD_SPEED = 150;
export const PLAYER_RUN_WORLD_SPEED = 250;

// Inventory

export const INVENTORY_WINDOW_X = 16;
export const INVENTORY_WINDOW_Y = 16;

export const INVENTORY_BACKPACK_X = 500;
export const INVENTORY_BACKPACK_Y = 16; // Relative to inventory background, meaning 16 + 16 = 32 from the top of the game window

export const INVENTORY_CONTAINER_X = 500;
export const INVENTORY_CONTAINER_Y = 16 + 64 * 5 + 32; // Relative to inventory background, meaning 16 + 64*5 + 32 = 368 from the top of the game window

export const INVENTORY_CHARACTERISTICS_X = 500 + 64 * 5 + 100;
export const INVENTORY_CHARACTERISTICS_Y = INVENTORY_WINDOW_Y + 16;

export const INVENTORY_ITEM_DESCRIPTION_W = 32 * 10;
export const INVENTORY_ITEM_DESCRIPTION_H = 32 * 11;
export const INVENTORY_ITEM_SCALE = 1.8;

// Dialog scene

export const DIALOG_WINDOW_X = 32;
export const DIALOG_WINDOW_WIDTH = GAME_W - DIALOG_WINDOW_X * 2;
export const DIALOG_WINDOW_HEIGHT = GAME_H / 2.5;
export const DIALOG_WINDOW_Y = GAME_H - DIALOG_WINDOW_HEIGHT - 32;

export const tilesetConfig = {
  frameWidth: 32,
  frameHeight: 32,
  margin: 1,
  spacing: 2,
};

export const tilesetConfig64x64 = {
  frameWidth: 64,
  frameHeight: 64,
  margin: 1,
  spacing: 2,
};

export const tilesetConfig80x96 = {
  frameWidth: 80,
  frameHeight: 96,
  margin: 1,
  spacing: 2,
};
