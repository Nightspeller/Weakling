import * as Phaser from 'phaser';

export function preloadCyclopsBatAssets(scene: Phaser.Scene) {
  scene.load.spritesheet('eyeball-idle', 'assets/images/characters/battle/party/eyeball/Flight.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
  scene.load.spritesheet('eyeball-attack', 'assets/images/characters/battle/party/eyeball/Attack.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
  scene.load.spritesheet('eyeball-hit', 'assets/images/characters/battle/party/eyeball/Hit.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
  scene.load.spritesheet('eyeball-death', 'assets/images/characters/battle/party/eyeball/Death.png', {
    frameWidth: 150,
    frameHeight: 150,
  });
}

export function createCyclopsBatAnimations(scene: Phaser.Scene) {
  scene.anims.create({
    key: 'eyeball_idle',
    frames: scene.anims.generateFrameNames('eyeball-idle'),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'eyeball_attack1',
    frames: scene.anims.generateFrameNames('eyeball-attack'),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'eyeball_buff',
    frames: scene.anims.generateFrameNames('eyeball-attack')
      .reverse(),
    frameRate: 5,
    repeat: 0,
  });
  scene.anims.create({
    key: 'eyeball_hit',
    frames: scene.anims.generateFrameNames('eyeball-hit'),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'eyeball_death',
    frames: scene.anims.generateFrameNames('eyeball-death'),
    frameRate: 10,
    repeat: 0,
  });
}
