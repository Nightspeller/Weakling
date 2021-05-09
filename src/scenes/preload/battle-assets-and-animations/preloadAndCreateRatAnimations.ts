import * as Phaser from 'phaser';

export function preloadRatAssets(scene: Phaser.Scene) {
  scene.load.atlas('rat-battle',
    'assets/images-extruded/characters/battle/enemies/rat/rat-battle.png',
    'assets/images-extruded/characters/battle/enemies/rat/rat-battle.json');
}

export function createRatAnimations(scene: Phaser.Scene) {
  scene.anims.create({
    key: 'rat_idle',
    frames: scene.anims.generateFrameNames('rat-battle', {
      prefix: 'rat-battle-animations/idle/',
      start: 1,
      end: 10,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'rat_move',
    frames: scene.anims.generateFrameNames('rat-battle', {
      prefix: 'rat-battle-animations/move/',
      start: 1,
      end: 10,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'rat_melee_attack',
    frames: scene.anims.generateFrameNames('rat-battle', {
      prefix: 'rat-battle-animations/attack/',
      start: 1,
      end: 10,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'rat_buff',
    frames: scene.anims.generateFrameNames('rat-battle', {
      prefix: 'rat-battle-animations/buff/',
      start: 1,
      end: 10,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'rat_hit',
    frames: scene.anims.generateFrameNames('rat-battle', {
      prefix: 'rat-battle-animations/buff/',
      start: 1,
      end: 10,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'rat_death',
    frames: scene.anims.generateFrameNames('rat-battle', {
      prefix: 'rat-battle-animations/death/',
      start: 1,
      end: 10,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: 0,
  });
}
