define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createSkeletonAnimations = exports.preloadSkeletonAssets = void 0;
    function preloadSkeletonAssets(scene) {
        scene.load.spritesheet('skeleton-idle', 'assets/images/characters/battle/enemies/skeleton/Idle.png', {
            frameWidth: 150,
            frameHeight: 150,
        });
        scene.load.spritesheet('skeleton-move', 'assets/images/characters/battle/enemies/skeleton/Walk.png', {
            frameWidth: 150,
            frameHeight: 150,
        });
        scene.load.spritesheet('skeleton-attack', 'assets/images/characters/battle/enemies/skeleton/Attack.png', {
            frameWidth: 150,
            frameHeight: 150,
        });
        scene.load.spritesheet('skeleton-shield', 'assets/images/characters/battle/enemies/skeleton/Shield.png', {
            frameWidth: 150,
            frameHeight: 150,
        });
        scene.load.spritesheet('skeleton-hit', 'assets/images/characters/battle/enemies/skeleton/Take Hit.png', {
            frameWidth: 150,
            frameHeight: 150,
        });
        scene.load.spritesheet('skeleton-death', 'assets/images/characters/battle/enemies/skeleton/Death.png', {
            frameWidth: 150,
            frameHeight: 150,
        });
    }
    exports.preloadSkeletonAssets = preloadSkeletonAssets;
    function createSkeletonAnimations(scene) {
        scene.anims.create({
            key: 'skeleton_idle',
            frames: scene.anims.generateFrameNames('skeleton-idle'),
            frameRate: 3,
            repeat: -1,
        });
        scene.anims.create({
            key: 'skeleton_move',
            frames: scene.anims.generateFrameNames('skeleton-move'),
            frameRate: 15,
            repeat: -1,
        });
        scene.anims.create({
            key: 'skeleton_attack1',
            frames: scene.anims.generateFrameNames('skeleton-attack'),
            frameRate: 10,
            repeat: 0,
        });
        scene.anims.create({
            key: 'skeleton_attack2',
            frames: scene.anims.generateFrameNames('skeleton-shield'),
            frameRate: 10,
            repeat: 0,
        });
        scene.anims.create({
            key: 'skeleton_buff',
            frames: scene.anims.generateFrameNames('skeleton-attack')
                .reverse(),
            frameRate: 5,
            repeat: 0,
        });
        scene.anims.create({
            key: 'skeleton_hit',
            frames: scene.anims.generateFrameNames('skeleton-hit'),
            frameRate: 10,
            repeat: 0,
        });
        scene.anims.create({
            key: 'skeleton_death',
            frames: scene.anims.generateFrameNames('skeleton-death'),
            frameRate: 10,
            repeat: 0,
        });
    }
    exports.createSkeletonAnimations = createSkeletonAnimations;
});
//# sourceMappingURL=preloadAndCreateSkeletonAnimations.js.map