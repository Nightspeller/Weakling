import * as Phaser from 'phaser';

export function preloadGreenOozeAssets(scene: Phaser.Scene) {
  scene.load.spritesheet('green-ooze-idle', 'assets/images/characters/battle/enemies/green-ooze/idle.png', {
    frameWidth: 80,
    frameHeight: 80,
  });
  scene.load.spritesheet('green-ooze-attack', 'assets/images/characters/battle/enemies/green-ooze/attack.png', {
    frameWidth: 80,
    frameHeight: 80,
  });
  scene.load.spritesheet('green-ooze-move', 'assets/images/characters/battle/enemies/green-ooze/move.png', {
    frameWidth: 80,
    frameHeight: 80,
  });
  scene.load.spritesheet('green-ooze-hit', 'assets/images/characters/battle/enemies/green-ooze/hit.png', {
    frameWidth: 80,
    frameHeight: 80,
  });
  scene.load.spritesheet('green-ooze-death', 'assets/images/characters/battle/enemies/green-ooze/death.png', {
    frameWidth: 80,
    frameHeight: 80,
  });
}

export function createGreenOozeAnimations(scene: Phaser.Scene) {
  scene.anims.create({
    key: 'green-ooze_idle',
    frames: scene.anims.generateFrameNames('green-ooze-idle'),
    frameRate: 5,
    repeat: -1,
  });
  scene.anims.create({
    key: 'green-ooze_attack1',
    frames: scene.anims.generateFrameNames('green-ooze-attack'),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'green-ooze_move',
    frames: scene.anims.generateFrameNames('green-ooze-move'),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'green-ooze_hit',
    frames: scene.anims.generateFrameNames('green-ooze-hit'),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'green-ooze_death',
    frames: scene.anims.generateFrameNames('green-ooze-death'),
    frameRate: 10,
    repeat: 0,
  });
}
