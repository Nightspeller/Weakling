import * as Phaser from 'phaser';

export function preloadWeaklingAssets(scene: Phaser.Scene) {
  scene.load.atlas('weakling-battle',
    'assets/images-extruded/characters/battle/party/weakling/weakling-battle.png',
    'assets/images-extruded/characters/battle/party/weakling/weakling-battle.json');
}

export function createWeaklingAnimations(scene: Phaser.Scene) {
  scene.anims.create({
    key: 'weakling_idle',
    frames: scene.anims.generateFrameNames('weakling-battle', {
      prefix: 'weakling-battle-animations/idle/',
      start: 1,
      end: 1,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'weakling_move',
    frames: scene.anims.generateFrameNames('weakling-battle', {
      prefix: 'weakling-battle-animations/move/',
      start: 1,
      end: 3,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'weakling_attack1',
    frames: scene.anims.generateFrameNames('weakling-battle', {
      prefix: 'weakling-battle-animations/attack1/',
      start: 1,
      end: 3,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'weakling_buff',
    frames: scene.anims.generateFrameNames('weakling-battle', {
      prefix: 'weakling-battle-animations/buff/',
      start: 1,
      end: 11,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'weakling_cast',
    frames: scene.anims.generateFrameNames('weakling-battle', {
      prefix: 'weakling-battle-animations/cast/',
      start: 1,
      end: 9,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'weakling_hit',
    frames: scene.anims.generateFrameNames('weakling-battle', {
      prefix: 'weakling-battle-animations/hit/',
      start: 1,
      end: 2,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'weakling_death',
    frames: scene.anims.generateFrameNames('weakling-battle', {
      prefix: 'weakling-battle-animations/death/',
      start: 1,
      end: 15,
      zeroPad: 1,
    }),
    frameRate: 10,
    repeat: 0,
  });
}
