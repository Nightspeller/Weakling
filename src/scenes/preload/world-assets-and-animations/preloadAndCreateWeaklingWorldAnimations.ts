import * as Phaser from 'phaser';
import { tilesetConfig } from '../../../config/constants';

type playerTexture = 'martha-pink' | 'martha-blond' | 'martha-green' | 'jeremy-pink' | 'jeremy-blond' | 'jeremy-green';

export function preloadWeaklingAssets(scene: Phaser.Scene) {
  scene.load.spritesheet('martha-pink', 'assets/images-extruded/characters/world-map/party/martha-pink.png', tilesetConfig);
  scene.load.spritesheet('martha-blond', 'assets/images-extruded/characters/world-map/party/martha-blond.png', tilesetConfig);
  scene.load.spritesheet('martha-green', 'assets/images-extruded/characters/world-map/party/martha-green.png', tilesetConfig);
  scene.load.spritesheet('jeremy-pink', 'assets/images-extruded/characters/world-map/party/jeremy-pink.png', tilesetConfig);
  scene.load.spritesheet('jeremy-blond', 'assets/images-extruded/characters/world-map/party/jeremy-blond.png', tilesetConfig);
  scene.load.spritesheet('jeremy-green', 'assets/images-extruded/characters/world-map/party/jeremy-green.png', tilesetConfig);
  scene.load.atlas('weakling-world',
    'assets/images-extruded/characters/world-map/party/weakling-world.png',
    'assets/images-extruded/characters/world-map/party/weakling-world.json');
}

export function createWeaklingAnimations(scene: Phaser.Scene, texture: playerTexture) {
  scene.anims.create({
    key: 'walk_down',
    frames: scene.anims.generateFrameNames('weakling-world', {
      prefix: 'weakling-world-animations/walk-down/',
      start: 1,
      end: 8,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walk_up',
    frames: scene.anims.generateFrameNames('weakling-world', {
      prefix: 'weakling-world-animations/walk-up/',
      start: 1,
      end: 8,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walk_right',
    frames: scene.anims.generateFrameNames('weakling-world', {
      prefix: 'weakling-world-animations/walk-right/',
      start: 1,
      end: 8,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walk_left',
    frames: scene.anims.generateFrameNames('weakling-world', {
      prefix: 'weakling-world-animations/walk-left/',
      start: 1,
      end: 8,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'attack_down',
    frames: scene.anims.generateFrameNames('weakling-world', {
      prefix: 'weakling-world-animations/attack-down/',
      start: 1,
      end: 6,
      zeroPad: 0,
    }),
    frameRate: 10,
  });
  scene.anims.create({
    key: 'attack_up',
    frames: scene.anims.generateFrameNames('weakling-world', {
      prefix: 'weakling-world-animations/attack-up/',
      start: 1,
      end: 6,
      zeroPad: 0,
    }),
    frameRate: 10,
  });
  scene.anims.create({
    key: 'attack_right',
    frames: scene.anims.generateFrameNames('weakling-world', {
      prefix: 'weakling-world-animations/attack-right/',
      start: 1,
      end: 8,
      zeroPad: 0,
    }),
    frameRate: 10,
  });
  scene.anims.create({
    key: 'attack_left',
    frames: scene.anims.generateFrameNames('weakling-world', {
      prefix: 'weakling-world-animations/attack-left/',
      start: 1,
      end: 8,
      zeroPad: 0,
    }),
    frameRate: 10,
  });

  scene.anims.create({
    key: 'damaged',
    frames: scene.anims.generateFrameNames('weakling-world', {
      prefix: 'weakling-world-animations/hit/',
      start: 1,
      end: 2,
      zeroPad: 0,
    }),
    frameRate: 10,
  });

  scene.anims.create({
    key: 'idle_down',
    frames: scene.anims.generateFrameNames('weakling-world', {
      prefix: 'weakling-world-animations/walk-down/',
      start: 1,
      end: 1,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'idle_up',
    frames: scene.anims.generateFrameNames('weakling-world', {
      prefix: 'weakling-world-animations/walk-up/',
      start: 1,
      end: 1,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'idle_right',
    frames: scene.anims.generateFrameNames('weakling-world', {
      prefix: 'weakling-world-animations/walk-right/',
      start: 1,
      end: 1,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'idle_left',
    frames: scene.anims.generateFrameNames('weakling-world', {
      prefix: 'weakling-world-animations/walk-left/',
      start: 1,
      end: 1,
      zeroPad: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
}
