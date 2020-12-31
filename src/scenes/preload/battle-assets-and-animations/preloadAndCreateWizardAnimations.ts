import * as Phaser from 'phaser';

export function preloadWizardAssets(scene: Phaser.Scene) {
  scene.load.spritesheet('wizard-idle', 'assets/images/characters/battle/enemies/Wizard/Idle.png', {
    frameWidth: 231,
    frameHeight: 190,
  });
  scene.load.spritesheet('wizard-move', 'assets/images/characters/battle/enemies/Wizard/Run.png', {
    frameWidth: 231,
    frameHeight: 190,
  });
  scene.load.spritesheet('wizard-attack1', 'assets/images/characters/battle/enemies/Wizard/Attack1.png', {
    frameWidth: 231,
    frameHeight: 190,
  });
  scene.load.spritesheet('wizard-attack2', 'assets/images/characters/battle/enemies/Wizard/Attack2.png', {
    frameWidth: 231,
    frameHeight: 190,
  });
  scene.load.spritesheet('wizard-hit', 'assets/images/characters/battle/enemies/Wizard/Hit.png', {
    frameWidth: 231,
    frameHeight: 190,
  });
  scene.load.spritesheet('wizard-death', 'assets/images/characters/battle/enemies/Wizard/Death.png', {
    frameWidth: 231,
    frameHeight: 190,
  });
}

export function createWizardAminations(scene: Phaser.Scene) {
  scene.anims.create({
    key: 'wizard_idle',
    frames: scene.anims.generateFrameNames('wizard-idle'),
    frameRate: 5,
    repeat: -1,
  });
  scene.anims.create({
    key: 'wizard_move',
    frames: scene.anims.generateFrameNames('wizard-move'),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: 'wizard_attack1',
    frames: scene.anims.generateFrameNames('wizard-attack1'),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'wizard_attack2',
    frames: scene.anims.generateFrameNames('wizard-attack2'),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'wizard_hit',
    frames: scene.anims.generateFrameNames('wizard-hit'),
    frameRate: 10,
    repeat: 0,
  });
  scene.anims.create({
    key: 'wizard_death',
    frames: scene.anims.generateFrameNames('wizard-death'),
    frameRate: 10,
    repeat: 0,
  });
}
