import * as Phaser from 'phaser';
import { tilesetConfig } from '../../../config/constants';

const standardCharacterTextures = ['cat-1', 'cat-2', 'cat-3', 'dog-1', 'dog-2', 'dog-3',
  'female05-4', 'female10-3', 'female17-1', 'female17-2', 'female18-4', 'female19-1', 'female19-3', 'female20-3', 'female22-2', 'female24-1',
  'male1-1', 'male3-1', 'male9-1', 'male9-2', 'male9-3', 'male9-4', 'male10-1', 'male10-2', 'male12-1', 'male13-1', 'male14-2', 'male16-1', 'male16-2', 'male17-3', 'male17-4', 'male19-1',
  'soldier04-3', 'soldier06-1'];

export function preloadWorldCharactersAssets(scene: Phaser.Scene) {
  standardCharacterTextures.forEach((texture) => {
    scene.load.spritesheet(texture, `assets/images-extruded/characters/world-map/neutral/${texture}.png`, tilesetConfig);
  });
}

export function createWorldCharactersAnimations(scene: Phaser.Scene) {
  standardCharacterTextures.forEach((npc) => {
    scene.anims.create({
      key: `${npc}-idle-up`,
      frames: [{ key: npc, frame: 10 }],
    });
    scene.anims.create({
      key: `${npc}-idle-down`,
      frames: [{ key: npc, frame: 1 }],
    });
    scene.anims.create({
      key: `${npc}-idle-left`,
      frames: [{ key: npc, frame: 4 }],
    });
    scene.anims.create({
      key: `${npc}-idle-right`,
      frames: [{ key: npc, frame: 7 }],
    });
    scene.anims.create({
      key: `${npc}-walk-up`,
      frames: scene.anims.generateFrameNames(npc, { start: 9, end: 11 }),
      frameRate: 8,
      repeat: -1,
    });
    scene.anims.create({
      key: `${npc}-walk-down`,
      frames: scene.anims.generateFrameNames(npc, { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1,
    });
    scene.anims.create({
      key: `${npc}-walk-left`,
      frames: scene.anims.generateFrameNames(npc, { start: 3, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });
    scene.anims.create({
      key: `${npc}-walk-right`,
      frames: scene.anims.generateFrameNames(npc, { start: 6, end: 8 }),
      frameRate: 8,
      repeat: -1,
    });
  });
}
