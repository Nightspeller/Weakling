import {Player} from "../characters/adventurers/player.js";

export function preloadAnimationsShpritesheets(scene: Phaser.Scene) {
    scene.load.spritesheet("light-pillar", "assets/images/animations/light-pillar/light-pillar-yellow.png", {
        frameWidth: 192,
        frameHeight: 192
    });
    scene.load.spritesheet("light-pillar-back", "assets/images/animations/light-pillar/light-pillar-yellow-back.png", {
        frameWidth: 192,
        frameHeight: 192
    });
    scene.load.spritesheet("light-pillar-front", "assets/images/animations/light-pillar/light-pillar-yellow-front.png", {
        frameWidth: 192,
        frameHeight: 192
    });
    scene.load.spritesheet("eyeball-idle", "assets/images/characters/battle/party/eyeball/Flight.png", {
        frameWidth: 150,
        frameHeight: 150
    });
    scene.load.spritesheet("eyeball-attack", "assets/images/characters/battle/party/eyeball/Attack.png", {
        frameWidth: 150,
        frameHeight: 150
    });
    scene.load.spritesheet("eyeball-hit", "assets/images/characters/battle/party/eyeball/Hit.png", {
        frameWidth: 150,
        frameHeight: 150
    });
    scene.load.spritesheet("eyeball-death", "assets/images/characters/battle/party/eyeball/Death.png", {
        frameWidth: 150,
        frameHeight: 150
    });
    scene.load.spritesheet("wizard-idle", "assets/images/characters/battle/enemies/Wizard/Idle.png", {
        frameWidth: 231,
        frameHeight: 190
    });
    scene.load.spritesheet("wizard-move", "assets/images/characters/battle/enemies/Wizard/Run.png", {
        frameWidth: 231,
        frameHeight: 190
    });
    scene.load.spritesheet("wizard-attack1", "assets/images/characters/battle/enemies/Wizard/Attack1.png", {
        frameWidth: 231,
        frameHeight: 190
    });
    scene.load.spritesheet("wizard-attack2", "assets/images/characters/battle/enemies/Wizard/Attack2.png", {
        frameWidth: 231,
        frameHeight: 190
    });
    scene.load.spritesheet("wizard-hit", "assets/images/characters/battle/enemies/Wizard/Hit.png", {
        frameWidth: 231,
        frameHeight: 190
    });
    scene.load.spritesheet("wizard-death", "assets/images/characters/battle/enemies/Wizard/Death.png", {
        frameWidth: 231,
        frameHeight: 190
    });
    scene.load.spritesheet("ghost-knight-idle", "assets/images/characters/battle/enemies/ghost-knight/Idle.png", {
        frameWidth: 180,
        frameHeight: 180
    });
    scene.load.spritesheet("ghost-knight-move", "assets/images/characters/battle/enemies/ghost-knight/Run.png", {
        frameWidth: 180,
        frameHeight: 180
    });
    scene.load.spritesheet("ghost-knight-attack1", "assets/images/characters/battle/enemies/ghost-knight/Attack1.png", {
        frameWidth: 180,
        frameHeight: 180
    });
    scene.load.spritesheet("ghost-knight-attack2", "assets/images/characters/battle/enemies/ghost-knight/Attack2.png", {
        frameWidth: 180,
        frameHeight: 180
    });
    scene.load.spritesheet("ghost-knight-hit", "assets/images/characters/battle/enemies/ghost-knight/Hit.png", {
        frameWidth: 180,
        frameHeight: 180
    });
    scene.load.spritesheet("ghost-knight-death", "assets/images/characters/battle/enemies/ghost-knight/Death.png", {
        frameWidth: 180,
        frameHeight: 180
    });
    scene.load.spritesheet("doors2-upscaled", "assets/images/tilesets/doors2-upscaled.png", {
        frameWidth: 32,
        frameHeight: 96
    });
}

export function createAnimations(scene: Phaser.Scene & {player: Player}) {
    scene.anims.create({
        key: 'open_door',
        frames: scene.anims.generateFrameNames('doors2-upscaled', {start: 6, end: 8}),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'walk_down',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'walk_up',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 18, end: 20}),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'walk_right',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 6, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'walk_left',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 12, end: 14}),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'attack_down',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 3, end: 5}),
        frameRate: 5
    });
    scene.anims.create({
        key: 'attack_up',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 21, end: 23}),
        frameRate: 5
    });
    scene.anims.create({
        key: 'attack_right',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 9, end: 11}),
        frameRate: 5
    });
    scene.anims.create({
        key: 'attack_left',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 15, end: 17}),
        frameRate: 5
    });
    scene.anims.create({
        key: 'idle_up',
        frames: [{key: scene.player.worldImageSpriteParams.texture, frame: 19}],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'idle_down',
        frames: [{key: scene.player.worldImageSpriteParams.texture, frame: 1}],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'idle_left',
        frames: [{key: scene.player.worldImageSpriteParams.texture, frame: 13}],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'idle_right',
        frames: [{key: scene.player.worldImageSpriteParams.texture, frame: 7}],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'light_pillar_animation',
        frames: scene.anims.generateFrameNames('light-pillar'),
        duration: 500,
        showOnStart: true,
        hideOnComplete: true
    });
    scene.anims.create({
        key: 'light_pillar_animation_back',
        frames: scene.anims.generateFrameNames('light-pillar-back'),
        duration: 500,
        showOnStart: true,
        hideOnComplete: true
    });
    scene.anims.create({
        key: 'light_pillar_animation_front',
        frames: scene.anims.generateFrameNames('light-pillar-front'),
        duration: 500,
        showOnStart: true,
        hideOnComplete: true
    });
    scene.anims.create({
        key: 'wizard_idle',
        frames: scene.anims.generateFrameNames('wizard-idle'),
        frameRate: 5,
        repeat: -1
    });
    scene.anims.create({
        key: 'wizard_move',
        frames: scene.anims.generateFrameNames('wizard-move'),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'wizard_attack1',
        frames: scene.anims.generateFrameNames('wizard-attack1'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'wizard_attack2',
        frames: scene.anims.generateFrameNames('wizard-attack2'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'wizard_hit',
        frames: scene.anims.generateFrameNames('wizard-hit'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'wizard_death',
        frames: scene.anims.generateFrameNames('wizard-death'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'ghost-knight_idle',
        frames: scene.anims.generateFrameNames('ghost-knight-idle'),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'ghost-knight_move',
        frames: scene.anims.generateFrameNames('ghost-knight-move'),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'ghost-knight_attack1',
        frames: scene.anims.generateFrameNames('ghost-knight-attack1'),
        frameRate: 5,
        repeat: 0
    });
    scene.anims.create({
        key: 'ghost-knight_attack2',
        frames: scene.anims.generateFrameNames('ghost-knight-attack2'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'ghost-knight_hit',
        frames: scene.anims.generateFrameNames('ghost-knight-hit'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'ghost-knight_death',
        frames: scene.anims.generateFrameNames('ghost-knight-death'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'eyeball_idle',
        frames: scene.anims.generateFrameNames('eyeball-idle'),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'eyeball_attack1',
        frames: scene.anims.generateFrameNames('eyeball-attack'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'eyeball_buff',
        frames: scene.anims.generateFrameNames('eyeball-attack').reverse(),
        frameRate: 5,
        repeat: 0
    });
    scene.anims.create({
        key: 'eyeball_hit',
        frames: scene.anims.generateFrameNames('eyeball-hit'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'eyeball_death',
        frames: scene.anims.generateFrameNames('eyeball-death'),
        frameRate: 10,
        repeat: 0
    });
}
