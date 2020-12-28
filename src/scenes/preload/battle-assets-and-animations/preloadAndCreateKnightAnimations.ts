import * as Phaser from 'phaser';

export function preloadKnightAssets(scene: Phaser.Scene) {
  scene.load.spritesheet('knight-idle', 'assets/images/characters/battle/enemies/ghost-knight/Idle.png', {
    frameWidth: 180,
    frameHeight: 180,
  });
  scene.load.spritesheet('knight-move', 'assets/images/characters/battle/enemies/ghost-knight/Run.png', {
    frameWidth: 180,
    frameHeight: 180,
  });
  scene.load.spritesheet('knight-attack1', 'assets/images/characters/battle/enemies/ghost-knight/Attack1.png', {
    frameWidth: 180,
    frameHeight: 180,
  });
  scene.load.spritesheet('knight-attack2', 'assets/images/characters/battle/enemies/ghost-knight/Attack2.png', {
    frameWidth: 180,
    frameHeight: 180,
  });
  scene.load.spritesheet('knight-hit', 'assets/images/characters/battle/enemies/ghost-knight/Hit.png', {
    frameWidth: 180,
    frameHeight: 180,
  });
  scene.load.spritesheet('knight-death', 'assets/images/characters/battle/enemies/ghost-knight/Death.png', {
    frameWidth: 180,
    frameHeight: 180,
  });
}

export function createKnightAnimations(scene: Phaser.Scene) {
  scene.anims.create({
    key: 'knight_idle',
    frames: scene.anims.generateFrameNames('knight-idle'),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'knight_move',
    frames: scene.anims.generateFrameNames('knight-move'),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'knight_attack1',
    frames: scene.anims.generateFrameNames('knight-attack1'),
    frameRate: 5,
    repeat: 0,
  });
  scene.anims.create({
    key: 'knight_attack2',
    frames: scene.anims.generateFrameNames('knight-attack2'),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'knight_hit',
    frames: scene.anims.generateFrameNames('knight-hit'),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'knight_death',
    frames: scene.anims.generateFrameNames('knight-death'),
    frameRate: 10,
    repeat: 0,
  });
}
