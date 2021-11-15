import * as Phaser from 'phaser';

import GeneralLocation from './generalLocation';
import {
  DEBUG, GAME_H, GAME_W, TILE_SIZE,
} from '../../config/constants';

export default class WorldMapUIScene extends Phaser.Scene {
  private locationScene: GeneralLocation;
  private cursorCoordinatesText: Phaser.GameObjects.Text;
  private openScrollSound: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private closeScrollSound: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private hoverTextSound: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private selectTextSound: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  constructor() {
    super('WorldMapUIScene');
  }

  create(locationScene: GeneralLocation) {
    // This is a hack needed to avoid UI scene being show during overlay scenes, it checks if current active scene is a Location Scene.
    // Without it, it will happen when one overlay quickly switched to another one - like when dialog switched to location and then instantly to Trader inventory or container
    // It caused by fact that events, like scene.launch and scene.stop, are async and not guaranteed to be received in order emitted...
    // UPD: switched 0 index to 1 since the first active scene now will be BackgroundSound scene - this hack will come back to bite me, i feel it :-(
    if (!(this.scene.manager.getScenes(true)[1] instanceof GeneralLocation)) {
      console.log('Trying to create UI scene while no Location Scene is running - aborting');
      this.scene.stop('WorldMapUIScene');
      return;
    }

    const worldMapUIButtons = ['Achievements', 'QuestLog', 'Options', 'Inventory', 'AllItems'];

    console.log('creating UI');
    this.scene.moveAbove(locationScene.scene.key, 'WorldMapUIScene');
    this.locationScene = locationScene;
    const buttons = [{
      hoverText: 'Achievements (K)',
      icon: { texture: 'icons', frame: 'icons/coins/large-coin-with-crown' },
      onClick: () => { this.selectTextSound.play(); this.locationScene.switchToScene(worldMapUIButtons[0], {}, false); },
      hotKeys: ['keyup-K'],
    }, {
      hoverText: 'Quest Journal (J)',
      icon: { texture: 'icons', frame: 'icons/books-and-scrolls/book-with-bookmark' },
      onClick: () => { this.selectTextSound.play(); this.locationScene.switchToScene(worldMapUIButtons[1], {}, false); },
      hotKeys: ['keyup-J'],
    }, {
      hoverText: 'Options (O, ESC)',
      icon: { texture: 'icons', frame: 'icons/music/harp' },
      onClick: () => { this.selectTextSound.play(); this.locationScene.switchToScene(worldMapUIButtons[2], {}, false); },
      hotKeys: ['keyup-O', 'keyup-ESC'],
    }, {
      hoverText: 'Inventory (I)',
      icon: { texture: 'icons', frame: 'icons/bags/green-bag' },
      onClick: () => { this.selectTextSound.play(); this.locationScene.switchToScene(worldMapUIButtons[3], {}, false); },
      hotKeys: ['keyup-I'],
    }];

    this.openScrollSound = this.sound.add('paper-scroll-open', { volume: 0.5 });
    this.closeScrollSound = this.sound.add('paper-scroll-close', { volume: 0.5 });
    this.hoverTextSound = this.sound.add('hover', { volume: 0.7 });
    this.selectTextSound = this.sound.add('world-map-ui-button-select', { volume: 0.1 });

    if (!worldMapUIButtons.includes(this.locationScene.currSceneKey)
    && this.locationScene.currSceneKey !== 'Dialog') {
      // Only the locations that have a related paper scroll
      const locationNames = ['caltor', 'greatplains', 'honeywood', 'dungeon'];

      if (locationNames.includes(this.locationScene.scene.key.toLowerCase())) {
        this.showPaperScroll(this.locationScene.scene.key.toLowerCase());
      }
    }

    let iconBaseSize = TILE_SIZE;

    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS || this.sys.game.device.os.iPad || this.sys.game.device.os.iPhone) {
      iconBaseSize *= 1.5;
    }

    // topMenuBackgroundGraphics
    this.add.graphics()
      .setScrollFactor(0)
      .fillStyle(0xf0d191, 0.8)
      .fillRect(+GAME_W - iconBaseSize / 2 - buttons.length * iconBaseSize * 2, iconBaseSize / 2,
        buttons.length * iconBaseSize * 2, iconBaseSize * 2)
      .lineStyle(3, 0x907748)
      .strokeRect(+GAME_W - iconBaseSize / 2 - buttons.length * iconBaseSize * 2, iconBaseSize / 2,
        buttons.length * iconBaseSize * 2, iconBaseSize * 2)
      .setDepth(10 - 1);

    buttons.forEach((button, i) => {
      const buttonX = +GAME_W - (buttons.length - i) * iconBaseSize * 2;
      const buttonY = iconBaseSize;
      this.add.graphics()
        .setScrollFactor(0)
        .fillStyle(0xf0d191, 0.8)
        .fillRect(buttonX, buttonY, iconBaseSize, iconBaseSize)
        .lineStyle(3, 0x907748)
        .strokeRect(buttonX, buttonY, iconBaseSize, iconBaseSize)
        .setDepth(10 - 1);
      const iconSprite = this.add.sprite(buttonX, buttonY, button.icon.texture, button.icon.frame)
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setDisplaySize(iconBaseSize, iconBaseSize)
        .setInteractive({ useHandCursor: true })
        .setDepth(10 - 1)
        .on('pointerdown', button.onClick);

      // TODO: figure out why hover text does not work on half of the locations..
      const hoverText = this.add.text(buttonX - iconBaseSize, buttonY + iconBaseSize, button.hoverText, {
        backgroundColor: 'lightgrey',
        color: 'black',
      }).setDepth(10).setVisible(false);
      iconSprite
        .on('pointerover', () => {
          hoverText.setVisible(true);
          this.hoverTextSound.play();
        })
        .on('pointerout', () => hoverText.setVisible(false));

      button.hotKeys.forEach((hotKey) => {
        this.input.keyboard.off(hotKey);
        this.input.keyboard.on(hotKey, button.onClick);
      });
    });

    if (DEBUG) {
      this.add.graphics()
        .setScrollFactor(0)
        .fillStyle(0xf0d191, 0.8)
        .fillRect(iconBaseSize, iconBaseSize, iconBaseSize, iconBaseSize)
        .lineStyle(3, 0x907748)
        .strokeRect(iconBaseSize, iconBaseSize, iconBaseSize, iconBaseSize)
        .setDepth(10 - 1);
      const allItemsIconImage = this.add.image(iconBaseSize, iconBaseSize, 'icons', 'icons/chests/overgrown-chest')
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setDisplaySize(iconBaseSize, iconBaseSize)
        .setInteractive({ useHandCursor: true })
        .setDepth(10 - 1);
      allItemsIconImage.on('pointerdown', () => {
        this.locationScene.switchToScene('AllItems', {}, false);
      });

      this.cursorCoordinatesText = this.add.text(0, 0, '', {
        color: 'black',
        backgroundColor: '#f0d191',
      })
        .setDepth(1000)
        .setScrollFactor(0)
        .setOrigin(0, 0);
    }
  }

  update() {
    if (DEBUG) {
      const cursorX = Math.round(this.input.mousePointer.x);
      const cursorY = Math.round(this.input.mousePointer.y);
      this.cursorCoordinatesText.setText(`${cursorX} ${cursorY}`);
    }
  }

  private showPaperScroll(location: string) {
    const paperScroll = this.physics.add.sprite(
      GAME_W * 0.9, GAME_H * 0.2,
      'paper-scrolls', 0,
    ).setScale(2.3).on('animationcomplete', () => {
      timedEvent.paused = false;
    }, this);

    const timedEvent = this.time.addEvent({
      delay: 3000,
      paused: true,
      callback: () => {
        paperScroll.anims.play(`scroll-${location}-close`);
        this.closeScrollSound.play();
      },
      loop: false,
      repeat: 0,
    });

    paperScroll.anims.play(`scroll-${location}-open`);
    this.openScrollSound.play();
  }
}
