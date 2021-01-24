import GeneralLocation from './generalLocation';
import { DEBUG, GAME_W, TILE_SIZE } from '../../config/constants';

export default function drawInterface(scene: GeneralLocation) {
  const buttons = [{
    hoverText: 'Achievements (K)',
    icon: { texture: 'icons', frame: 'icons/coins/large-coin-with-crown' },
    onClick: () => { scene.switchToScene('Achievements', {}, false); },
    hotKeys: ['keyup-K'],
  }, {
    hoverText: 'Quest Journal (J)',
    icon: { texture: 'icons', frame: 'icons/books-and-scrolls/book-with-bookmark' },
    onClick: () => { scene.switchToScene('QuestLog', {}, false); },
    hotKeys: ['keyup-J'],
  }, {
    hoverText: 'Menu (O, ESC)',
    icon: { texture: 'icons', frame: 'icons/music/harp' },
    onClick: () => { scene.switchToScene('Options', {}, false); },
    hotKeys: ['keyup-O', 'keyup-ESC'],
  }, {
    hoverText: 'Inventory (I)',
    icon: { texture: 'icons', frame: 'icons/bags/green-bag' },
    onClick: () => { scene.switchToScene('Inventory', {}, false); },
    hotKeys: ['keyup-I'],
  }];

  // topMenuBackgroundGraphics
  scene.add.graphics()
    .setScrollFactor(0)
    .fillStyle(0xf0d191, 0.8)
    .fillRect(+GAME_W - TILE_SIZE / 2 - buttons.length * TILE_SIZE * 2, TILE_SIZE / 2, buttons.length * TILE_SIZE * 2, TILE_SIZE * 2)
    .lineStyle(3, 0x907748)
    .strokeRect(+GAME_W - TILE_SIZE / 2 - buttons.length * TILE_SIZE * 2, TILE_SIZE / 2, buttons.length * TILE_SIZE * 2, TILE_SIZE * 2)
    .setDepth(10 - 1);

  buttons.forEach((button, i) => {
    const buttonX = +GAME_W - (buttons.length - i) * TILE_SIZE * 2;
    const buttonY = TILE_SIZE;
    scene.add.graphics()
      .setScrollFactor(0)
      .fillStyle(0xf0d191, 0.8)
      .fillRect(buttonX, buttonY, TILE_SIZE, TILE_SIZE)
      .lineStyle(3, 0x907748)
      .strokeRect(buttonX, buttonY, TILE_SIZE, TILE_SIZE)
      .setDepth(10 - 1);
    const iconSprite = scene.add.sprite(buttonX, buttonY, button.icon.texture, button.icon.frame)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true })
      .setDepth(10 - 1)
      .on('pointerdown', button.onClick);

    const hoverText = scene.add.text(buttonX - TILE_SIZE, buttonY + TILE_SIZE, button.hoverText, {
      backgroundColor: 'lightgrey',
      color: 'black',
    }).setDepth(10).setVisible(false);
    iconSprite
      .on('pointerover', () => hoverText.setVisible(true))
      .on('pointerout', () => hoverText.setVisible(false));

    button.hotKeys.forEach((hotKey) => {
      scene.input.keyboard.off(hotKey);
      scene.input.keyboard.on(hotKey, button.onClick);
    });
  });

  if (DEBUG) {
    scene.add.graphics()
      .setScrollFactor(0)
      .fillStyle(0xf0d191, 0.8)
      .fillRect(TILE_SIZE, TILE_SIZE, TILE_SIZE, TILE_SIZE)
      .lineStyle(3, 0x907748)
      .strokeRect(TILE_SIZE, TILE_SIZE, TILE_SIZE, TILE_SIZE)
      .setDepth(10 - 1);
    const allItemsIconImage = scene.add.image(TILE_SIZE, TILE_SIZE, 'icons', 'icons/chests/overgrown-chest')
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true })
      .setDepth(10 - 1);
    allItemsIconImage.on('pointerdown', () => {
      scene.switchToScene('AllItems', {}, false);
    });
  }
}
