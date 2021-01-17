define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tilesetConfig = exports.INVENTORY_ITEM_SCALE = exports.INVENTORY_ITEM_DESCRIPTION_H = exports.INVENTORY_ITEM_DESCRIPTION_W = exports.PLAYER_RUN_WORLD_SPEED = exports.PLAYER_WORLD_SPEED = exports.GAME_ZOOM = exports.GAME_H = exports.GAME_W = exports.aspectRatio = exports.ACTION_POINT_HEIGHT = exports.ACTION_POINT_WIDTH = exports.BATTLE_CHAR_HEIGHT = exports.BATTLE_CHAR_WIDTH = exports.DEBUG = void 0;
    exports.DEBUG = localStorage.getItem('DEBUG') === 'true' || window.location.host.includes('localhost');
    exports.BATTLE_CHAR_WIDTH = 96;
    exports.BATTLE_CHAR_HEIGHT = 96;
    exports.ACTION_POINT_WIDTH = 16;
    exports.ACTION_POINT_HEIGHT = 16;
    exports.aspectRatio = 1.25; // 800 / 640
    exports.GAME_W = 800;
    exports.GAME_H = 640;
    const windowWidth = window.innerWidth - 20; // -20 pixel for scroll bar - there should be a better solution though
    const windowHeight = window.innerHeight;
    exports.GAME_ZOOM = windowWidth > windowHeight * exports.aspectRatio ? windowHeight / exports.GAME_H : windowWidth / exports.GAME_W;
    exports.PLAYER_WORLD_SPEED = 150;
    exports.PLAYER_RUN_WORLD_SPEED = 250;
    // Inventory
    exports.INVENTORY_ITEM_DESCRIPTION_W = 32 * 10;
    exports.INVENTORY_ITEM_DESCRIPTION_H = 32 * 11;
    exports.INVENTORY_ITEM_SCALE = 1.8;
    exports.tilesetConfig = {
        frameWidth: 32,
        frameHeight: 32,
        margin: 1,
        spacing: 2,
    };
});
//# sourceMappingURL=constants.js.map