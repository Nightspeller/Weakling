define(["require", "exports", "./preloadAndCreateSkeletonAnimations", "./preloadAndCreateKnightAnimations", "./preloadAndCreateWizardAnimations", "./preloadAndCreateCyclopsBatAnimations"], function (require, exports, preloadAndCreateSkeletonAnimations_1, preloadAndCreateKnightAnimations_1, preloadAndCreateWizardAnimations_1, preloadAndCreateCyclopsBatAnimations_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createBattleAnimations = exports.preloadBattleAssets = void 0;
    function preloadBattleAssets(preloadScene) {
        // Battle characters images
        preloadScene.load.image('weakling', 'assets/images/characters/battle/party/weakling.png');
        preloadScene.load.image('elder', 'assets/images/characters/battle/party/elder.png');
        preloadScene.load.image('boar-avatar', 'assets/images/characters/battle/enemies/boar.png');
        preloadScene.load.image('dead-character', 'assets/images/characters/battle/dead-character.png');
        preloadScene.load.image('cave-background', 'assets/images/interface/cave-background.png');
        preloadScene.load.image('field-background', 'assets/images/interface/field-background.png');
        preloadScene.load.spritesheet('action-points', 'assets/images/interface/action-points.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
        preloadScene.load.image('hit', 'assets/images/animations/hit.png');
        preloadCastAssets(preloadScene);
        preloadAndCreateSkeletonAnimations_1.preloadSkeletonAssets(preloadScene);
        preloadAndCreateKnightAnimations_1.preloadKnightAssets(preloadScene);
        preloadAndCreateWizardAnimations_1.preloadWizardAssets(preloadScene);
        preloadAndCreateCyclopsBatAnimations_1.preloadCyclopsBatAssets(preloadScene);
    }
    exports.preloadBattleAssets = preloadBattleAssets;
    function createBattleAnimations(scene) {
        createCastAnimations(scene);
        preloadAndCreateSkeletonAnimations_1.createSkeletonAnimations(scene);
        preloadAndCreateKnightAnimations_1.createKnightAnimations(scene);
        preloadAndCreateWizardAnimations_1.createWizardAminations(scene);
        preloadAndCreateCyclopsBatAnimations_1.createCyclopsBatAnimations(scene);
    }
    exports.createBattleAnimations = createBattleAnimations;
    function preloadCastAssets(scene) {
        scene.load.spritesheet('light-pillar', 'assets/images/animations/light-pillar/light-pillar-yellow.png', {
            frameWidth: 192,
            frameHeight: 192,
        });
        scene.load.spritesheet('light-pillar-back', 'assets/images/animations/light-pillar/light-pillar-yellow-back.png', {
            frameWidth: 192,
            frameHeight: 192,
        });
        scene.load.spritesheet('light-pillar-front', 'assets/images/animations/light-pillar/light-pillar-yellow-front.png', {
            frameWidth: 192,
            frameHeight: 192,
        });
    }
    function createCastAnimations(scene) {
        scene.anims.create({
            key: 'light_pillar_animation',
            frames: scene.anims.generateFrameNames('light-pillar'),
            duration: 500,
            showOnStart: true,
            hideOnComplete: true,
        });
        scene.anims.create({
            key: 'light_pillar_animation_back',
            frames: scene.anims.generateFrameNames('light-pillar-back'),
            duration: 500,
            showOnStart: true,
            hideOnComplete: true,
        });
        scene.anims.create({
            key: 'light_pillar_animation_front',
            frames: scene.anims.generateFrameNames('light-pillar-front'),
            duration: 500,
            showOnStart: true,
            hideOnComplete: true,
        });
    }
});
//# sourceMappingURL=preloadBattleAssets.js.map