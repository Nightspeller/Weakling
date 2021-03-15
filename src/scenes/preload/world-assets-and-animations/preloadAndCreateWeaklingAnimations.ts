import * as Phaser from 'phaser';
import { tilesetConfig, tilesetConfig80x96 } from '../../../config/constants';

type playerTexture = 'martha-pink' | 'martha-blond' | 'martha-green' | 'jeremy-pink' | 'jeremy-blond' | 'jeremy-green';

export function preloadWeaklingAssets(scene: Phaser.Scene) {
  scene.load.spritesheet('martha-pink', 'assets/images-extruded/characters/world-map/party/martha-pink.png', tilesetConfig);
  scene.load.spritesheet('martha-blond', 'assets/images-extruded/characters/world-map/party/martha-blond.png', tilesetConfig);
  scene.load.spritesheet('martha-green', 'assets/images-extruded/characters/world-map/party/martha-green.png', tilesetConfig);
  scene.load.spritesheet('jeremy-pink', 'assets/images-extruded/characters/world-map/party/jeremy-pink.png', tilesetConfig);
  scene.load.spritesheet('jeremy-blond', 'assets/images-extruded/characters/world-map/party/jeremy-blond.png', tilesetConfig);
  scene.load.spritesheet('jeremy-green', 'assets/images-extruded/characters/world-map/party/jeremy-green-kobold-version.png', tilesetConfig80x96);
}

export function createWeaklingAnimations(scene: Phaser.Scene, texture: playerTexture) {
  scene.anims.create({
    key: 'walk_down',
    frames: scene.anims.generateFrameNames(texture, { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walk_up',
    frames: scene.anims.generateFrameNames(texture, { start: 24, end: 31 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'walk_right',
    frames: scene.anims.generateFrameNames(texture, { start: 16, end: 23 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'walk_left',
    frames: scene.anims.generateFrameNames(texture, { start: 8, end: 15 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'attack_down',
    frames: scene.anims.generateFrameNames(texture, { start: 56, end: 63 }),
    frameRate: 10,
  });
  scene.anims.create({
    key: 'attack_up',
    frames: scene.anims.generateFrameNames(texture, { start: 66, end: 72 }),
    frameRate: 10,
  });
  scene.anims.create({
    key: 'attack_right',
    frames: scene.anims.generateFrameNames(texture, { start: 44, end: 53 }),
    frameRate: 10,
  });
  scene.anims.create({
    key: 'attack_left',
    frames: scene.anims.generateFrameNames(texture, { start: 34, end: 43 }),
    frameRate: 10,
  });

  scene.anims.create({
    key: 'damaged',
    frames: scene.anims.generateFrameNames(texture, { start: 32, end: 33 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'idle_up',
    frames: scene.anims.generateFrameNames(texture, { start: 24, end: 24 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'idle_down',
    frames: scene.anims.generateFrameNames(texture, { start: 0, end: 0 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'idle_left',
    frames: scene.anims.generateFrameNames(texture, { start: 8, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'idle_right',
    frames: scene.anims.generateFrameNames(texture, { start: 16, end: 16 }),
    frameRate: 10,
    repeat: -1,
  });
}
