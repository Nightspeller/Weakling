import * as Phaser from 'phaser';

import GeneralLocation from './generalLocation';
import {
  DEBUG, GAME_W, TILE_SIZE,
} from '../../config/constants';

export default class WorldMapUIScene extends Phaser.Scene {
  private locationScene: GeneralLocation;
  private cursorCoordinatesText: Phaser.GameObjects.Text;
  constructor() {
    super('WorldMapUIScene');
  }

  create(locationScene: GeneralLocation) {
    // This is a hack needed to avoid UI scene being show during overlay scenes, it checks if current active scene is a Location Scene.
    // Without it, it will happen when one overlay quickly switched to another one - like when dialog switched to location and then instantly to Trader inventory or container
    // It caused by fact that events, like scene.launch and scene.stop, are async and not guaranteed to be received in order emitted...
    if (!(this.scene.manager.getScenes(true)[0] instanceof GeneralLocation)) {
      // console.log('Trying to create UI scene while no Location Scene is running - aborting');
      this.scene.stop('WorldMapUIScene');
      return;
    }
    console.log('creating UI');
    this.scene.moveAbove(locationScene.scene.key, 'WorldMapUIScene');
    this.locationScene = locationScene;
    const buttons = [{
      hoverText: 'Achievements (K)',
      icon: { texture: 'icons', frame: 'icons/coins/large-coin-with-crown' },
      onClick: () => { this.locationScene.switchToScene('Achievements', {}, false); },
      hotKeys: ['keyup-K'],
    }, {
      hoverText: 'Quest Journal (J)',
      icon: { texture: 'icons', frame: 'icons/books-and-scrolls/book-with-bookmark' },
      onClick: () => { this.locationScene.switchToScene('QuestLog', {}, false); },
      hotKeys: ['keyup-J'],
    }, {
      hoverText: 'Menu (O, ESC)',
      icon: { texture: 'icons', frame: 'icons/music/harp' },
      onClick: () => { this.locationScene.switchToScene('Options', {}, false); },
      hotKeys: ['keyup-O', 'keyup-ESC'],
    }, {
      hoverText: 'Inventory (I)',
      icon: { texture: 'icons', frame: 'icons/bags/green-bag' },
      onClick: () => { this.locationScene.switchToScene('Inventory', {}, false); },
      hotKeys: ['keyup-I'],
    }];

    // topMenuBackgroundGraphics
    this.add.graphics()
      .setScrollFactor(0)
      .fillStyle(0xf0d191, 0.8)
      .fillRect(+GAME_W - TILE_SIZE / 2 - buttons.length * TILE_SIZE * 2, TILE_SIZE / 2, buttons.length * TILE_SIZE * 2, TILE_SIZE * 2)
      .lineStyle(3, 0x907748)
      .strokeRect(+GAME_W - TILE_SIZE / 2 - buttons.length * TILE_SIZE * 2, TILE_SIZE / 2, buttons.length * TILE_SIZE * 2, TILE_SIZE * 2)
      .setDepth(10 - 1);

    buttons.forEach((button, i) => {
      const buttonX = +GAME_W - (buttons.length - i) * TILE_SIZE * 2;
      const buttonY = TILE_SIZE;
      this.add.graphics()
        .setScrollFactor(0)
        .fillStyle(0xf0d191, 0.8)
        .fillRect(buttonX, buttonY, TILE_SIZE, TILE_SIZE)
        .lineStyle(3, 0x907748)
        .strokeRect(buttonX, buttonY, TILE_SIZE, TILE_SIZE)
        .setDepth(10 - 1);
      const iconSprite = this.add.sprite(buttonX, buttonY, button.icon.texture, button.icon.frame)
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setDisplaySize(TILE_SIZE, TILE_SIZE)
        .setInteractive({ useHandCursor: true })
        .setDepth(10 - 1)
        .on('pointerdown', button.onClick);

      // TODO: figure out why hover text does not work on half of the locations..
      const hoverText = this.add.text(buttonX - TILE_SIZE, buttonY + TILE_SIZE, button.hoverText, {
        backgroundColor: 'lightgrey',
        color: 'black',
      }).setDepth(10).setVisible(false);
      iconSprite
        .on('pointerover', () => hoverText.setVisible(true))
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
        .fillRect(TILE_SIZE, TILE_SIZE, TILE_SIZE, TILE_SIZE)
        .lineStyle(3, 0x907748)
        .strokeRect(TILE_SIZE, TILE_SIZE, TILE_SIZE, TILE_SIZE)
        .setDepth(10 - 1);
      const allItemsIconImage = this.add.image(TILE_SIZE, TILE_SIZE, 'icons', 'icons/chests/overgrown-chest')
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setDisplaySize(TILE_SIZE, TILE_SIZE)
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
}
