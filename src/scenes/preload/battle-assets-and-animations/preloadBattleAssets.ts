import * as Phaser from 'phaser';
import { createSkeletonAnimations, preloadSkeletonAssets } from './preloadAndCreateSkeletonAnimations';
import { createKnightAnimations, preloadKnightAssets } from './preloadAndCreateKnightAnimations';
import { createWizardAminations, preloadWizardAssets } from './preloadAndCreateWizardAnimations';
import { preloadCyclopsBatAssets, createCyclopsBatAnimations } from './preloadAndCreateCyclopsBatAnimations';
import { createWeaklingAnimations, preloadWeaklingAssets } from './preloadAndCreateWeaklingAnimations';
import { createGreenOozeAnimations, preloadGreenOozeAssets } from './preloadAndCreateGreenOozeAnimations';

export function preloadBattleAssets(preloadScene: Phaser.Scene) {
  // Battle characters images
  preloadScene.load.image('elder', 'assets/images/characters/battle/party/elder.png');
  preloadScene.load.image('boar-avatar', 'assets/images/characters/battle/enemies/boar.png');
  preloadScene.load.image('dead-character', 'assets/images/characters/battle/dead-character.png');

  preloadScene.load.image('cave-background', 'assets/images/interface/cave-background.png');
  preloadScene.load.image('field-background', 'assets/images/interface/field-background.png');

  preloadScene.load.spritesheet('action-points', 'assets/images/interface/action-points.png', {
    frameWidth: 16,
    frameHeight: 16,
  });

  preloadScene.load.image('hit', 'assets/images/animations/hit.png');

  preloadCastAssets(preloadScene);
  preloadSkeletonAssets(preloadScene);
  preloadKnightAssets(preloadScene);
  preloadWizardAssets(preloadScene);
  preloadCyclopsBatAssets(preloadScene);
  preloadWeaklingAssets(preloadScene);
  preloadGreenOozeAssets(preloadScene);
}

export function createBattleAnimations(scene: Phaser.Scene) {
  createCastAnimations(scene);
  createSkeletonAnimations(scene);
  createKnightAnimations(scene);
  createWizardAminations(scene);
  createCyclopsBatAnimations(scene);
  createWeaklingAnimations(scene);
  createGreenOozeAnimations(scene);
}

function preloadCastAssets(scene: Phaser.Scene) {
  scene.load.spritesheet('light-pillar', 'assets/images/animations/light-pillar/light-pillar-yellow.png', {
    frameWidth: 192,
    frameHeight: 192,
  });
  scene.load.spritesheet('light-pillar-back', 'assets/images/animations/light-pillar/light-pillar-yellow-back.png', {
    frameWidth: 192,
    frameHeight: 192,
  });
  scene.load.spritesheet('light-pillar-front', 'assets/images/animations/light-pillar/light-pillar-yellow-front.png', {
    frameWidth: 192,
    frameHeight: 192,
  });
}

function createCastAnimations(scene: Phaser.Scene) {
  scene.anims.create({
    key: 'light_pillar_animation',
    frames: scene.anims.generateFrameNames('light-pillar'),
    duration: 500,
    showOnStart: true,
    hideOnComplete: true,
  });
  scene.anims.create({
    key: 'light_pillar_animation_back',
    frames: scene.anims.generateFrameNames('light-pillar-back'),
    duration: 500,
    showOnStart: true,
    hideOnComplete: true,
  });
  scene.anims.create({
    key: 'light_pillar_animation_front',
    frames: scene.anims.generateFrameNames('light-pillar-front'),
    duration: 500,
    showOnStart: true,
    hideOnComplete: true,
  });
}
