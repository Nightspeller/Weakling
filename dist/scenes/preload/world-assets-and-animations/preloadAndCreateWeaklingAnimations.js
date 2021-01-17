define(["require", "exports", "../../../config/constants"], function (require, exports, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createWeaklingAnimations = exports.preloadWeaklingAssets = void 0;
    function preloadWeaklingAssets(scene) {
        scene.load.spritesheet('martha-pink', 'assets/images-extruded/characters/world-map/party/martha-pink.png', constants_1.tilesetConfig);
        scene.load.spritesheet('martha-blond', 'assets/images-extruded/characters/world-map/party/martha-blond.png', constants_1.tilesetConfig);
        scene.load.spritesheet('martha-green', 'assets/images-extruded/characters/world-map/party/martha-green.png', constants_1.tilesetConfig);
        scene.load.spritesheet('jeremy-pink', 'assets/images-extruded/characters/world-map/party/jeremy-pink.png', constants_1.tilesetConfig);
        scene.load.spritesheet('jeremy-blond', 'assets/images-extruded/characters/world-map/party/jeremy-blond.png', constants_1.tilesetConfig);
        scene.load.spritesheet('jeremy-green', 'assets/images-extruded/characters/world-map/party/jeremy-green.png', constants_1.tilesetConfig);
    }
    exports.preloadWeaklingAssets = preloadWeaklingAssets;
    function createWeaklingAnimations(scene, texture) {
        scene.anims.create({
            key: 'walk_down',
            frames: scene.anims.generateFrameNames(texture, { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
        });
        scene.anims.create({
            key: 'walk_up',
            frames: scene.anims.generateFrameNames(texture, { start: 18, end: 20 }),
            frameRate: 10,
            repeat: -1,
        });
        scene.anims.create({
            key: 'walk_right',
            frames: scene.anims.generateFrameNames(texture, { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });
        scene.anims.create({
            key: 'walk_left',
            frames: scene.anims.generateFrameNames(texture, { start: 12, end: 14 }),
            frameRate: 10,
            repeat: -1,
        });
        scene.anims.create({
            key: 'attack_down',
            frames: scene.anims.generateFrameNames(texture, { start: 3, end: 5 }),
            frameRate: 5,
        });
        scene.anims.create({
            key: 'attack_up',
            frames: scene.anims.generateFrameNames(texture, { start: 21, end: 23 }),
            frameRate: 5,
        });
        scene.anims.create({
            key: 'attack_right',
            frames: scene.anims.generateFrameNames(texture, { start: 9, end: 11 }),
            frameRate: 5,
        });
        scene.anims.create({
            key: 'attack_left',
            frames: scene.anims.generateFrameNames(texture, { start: 15, end: 17 }),
            frameRate: 5,
        });
        scene.anims.create({
            key: 'idle_up',
            frames: [{ key: texture, frame: 19 }],
            frameRate: 10,
            repeat: -1,
        });
        scene.anims.create({
            key: 'idle_down',
            frames: [{ key: texture, frame: 1 }],
            frameRate: 10,
            repeat: -1,
        });
        scene.anims.create({
            key: 'idle_left',
            frames: [{ key: texture, frame: 13 }],
            frameRate: 10,
            repeat: -1,
        });
        scene.anims.create({
            key: 'idle_right',
            frames: [{ key: texture, frame: 7 }],
            frameRate: 10,
            repeat: -1,
        });
    }
    exports.createWeaklingAnimations = createWeaklingAnimations;
});
//# sourceMappingURL=preloadAndCreateWeaklingAnimations.js.map