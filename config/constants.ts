export const DEBUG = window.location.host.includes('localhost');

export const BATTLE_CHAR_WIDTH = 96;
export const BATTLE_CHAR_HEIGHT = 96;
export const ACTION_POINT_WIDTH = 16;
export const ACTION_POINT_HEIGHT = 16;

export const aspectRatio = 1.25; // 800 / 640

export const GAME_W = 800;
export const GAME_H = 640;

const windowWidth = window.innerWidth - 20;// -20 pixel for scroll bar - there should be a better solution though
const windowHeight = window.innerHeight;

export const GAME_ZOOM = windowWidth > windowHeight * aspectRatio ? windowHeight / GAME_H : windowWidth / GAME_W;

export const PLAYER_WORLD_SPEED = 150;
export const PLAYER_RUN_WORLD_SPEED = 250;

// Inventory

export const INVENTORY_ITEM_DESCRIPTION_W = 32*10;
export const INVENTORY_ITEM_DESCRIPTION_H = 32*11;
