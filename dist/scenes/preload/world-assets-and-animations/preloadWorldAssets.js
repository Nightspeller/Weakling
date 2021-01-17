define(["require", "exports", "./preloadAndCreateWeaklingAnimations", "./preloadAndCreateWorldCharacters", "../../../config/constants"], function (require, exports, preloadAndCreateWeaklingAnimations_1, preloadAndCreateWorldCharacters_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createWorldAnimations = exports.preloadWorldAssets = void 0;
    function preloadWorldAssets(scene) {
        preloadDoorsAssets(scene);
        preloadAndCreateWeaklingAnimations_1.preloadWeaklingAssets(scene);
        preloadAndCreateWorldCharacters_1.preloadWorldCharactersAssets(scene);
        scene.load.spritesheet('shadow-1', 'assets/images-extruded/characters/world-map/shadows/shadow-1.png', constants_1.tilesetConfig);
        scene.load.spritesheet('fire', 'assets/images-extruded/animations/fire.png', constants_1.tilesetConfig);
    }
    exports.preloadWorldAssets = preloadWorldAssets;
    function createWorldAnimations(scene) {
        createDoorsAnimations(scene);
        preloadAndCreateWeaklingAnimations_1.createWeaklingAnimations(scene, 'jeremy-green');
        preloadAndCreateWorldCharacters_1.createWorldCharactersAnimations(scene);
    }
    exports.createWorldAnimations = createWorldAnimations;
    function preloadDoorsAssets(scene) {
        scene.load.spritesheet('doors2-upscaled', 'assets/images-extruded/tilesets/doors2-upscaled.png', {
            frameWidth: 32,
            frameHeight: 96,
            margin: 1,
            spacing: 2,
        });
    }
    function createDoorsAnimations(scene) {
        scene.anims.create({
            key: 'open_door',
            frames: scene.anims.generateFrameNames('doors2-upscaled', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: 0,
        });
    }
});
//# sourceMappingURL=preloadWorldAssets.js.map