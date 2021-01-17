define(["require", "exports", "../../../config/constants"], function (require, exports, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createWorldCharactersAnimations = exports.preloadWorldCharactersAssets = void 0;
    const standardCharacterTextures = ['cat-1', 'cat-2', 'cat-3', 'dog-1', 'dog-2', 'dog-3',
        'female05-4', 'female17-1', 'female17-2', 'female18-4', 'female19-1', 'female19-3', 'female20-3',
        'male3-1', 'male10-1', 'male12-1', 'male13-1', 'male14-2', 'male17-3', 'male17-4',
        'soldier04-3', 'soldier06-1'];
    function preloadWorldCharactersAssets(scene) {
        standardCharacterTextures.forEach((texture) => {
            scene.load.spritesheet(texture, `assets/images-extruded/characters/world-map/neutral/${texture}.png`, constants_1.tilesetConfig);
        });
    }
    exports.preloadWorldCharactersAssets = preloadWorldCharactersAssets;
    function createWorldCharactersAnimations(scene) {
        standardCharacterTextures.forEach((npc) => {
            scene.anims.create({
                key: `${npc}-idle-up`,
                frames: [{ key: npc, frame: 10 }],
            });
            scene.anims.create({
                key: `${npc}-idle-down`,
                frames: [{ key: npc, frame: 1 }],
            });
            scene.anims.create({
                key: `${npc}-idle-left`,
                frames: [{ key: npc, frame: 4 }],
            });
            scene.anims.create({
                key: `${npc}-idle-right`,
                frames: [{ key: npc, frame: 7 }],
            });
        });
    }
    exports.createWorldCharactersAnimations = createWorldCharactersAnimations;
});
//# sourceMappingURL=preloadAndCreateWorldCharacters.js.map