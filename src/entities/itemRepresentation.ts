import * as Phaser from 'phaser';
import Item from './item';
import { INVENTORY_ITEM_SCALE } from '../config/constants';

export default class ItemRepresentation extends Phaser.GameObjects.Container {
  public item: Item;
  private quantityText: Phaser.GameObjects.Text;
  private itemPriceText?: Phaser.GameObjects.Text;
  private priceTag?: Phaser.GameObjects.Image;
  private coinIcon?: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string | number, item: Item) {
    super(scene, x, y);
    this.item = item;

    const image = scene.add.image(0, 0, item.sprite.texture, item.sprite.frame)
      .setDisplaySize(64, 64).setScale(1.3);
    this.quantityText = scene.add.text(32, -15, item.quantity.toString(), {
      font: '14px monospace',
      color: '#000000',
      backgroundColor: '#f0d191',
      padding: {
        left: 2,
      },
    }).setOrigin(1, 1);

    if (item.quantity === 1) {
      this.quantityText.setVisible(false);
    }

    if (scene.scene.key === 'TraderOverlay') {
      this.priceTag = scene.add.image(0, 23, 'price-tag-icons', 3).setScale(1.8, 1.2);
      this.coinIcon = scene.add.image(17, 23, 'price-tag-icons', 0).setScale(INVENTORY_ITEM_SCALE);
      this.itemPriceText = scene.add.text(10, 32, '', {
        font: '14px monospace',
        color: '#000000',
        padding: {
          left: 1,
        },
      }).setOrigin(1, 1);
    }
    this.add([image, this.quantityText, this.priceTag, this.itemPriceText, this.coinIcon]);

    this.setSize(64, 64)
      .setScrollFactor(0)
      .setInteractive();

    scene.add.existing(this);
  }

  public setPriceTag(characterMoney: number, forWho: 'player' | 'npc') {
    if (forWho === 'player') {
      this.itemPriceText.setText(this.item.buyPrice.toString());
      this.setPriceTagColor(characterMoney >= this.item.buyPrice ? 'green' : 'red');
    } else if (forWho === 'npc') {
      if (this.item.sellPrice === 0) {
        this.hidePriceInformation();
      } else {
        this.itemPriceText.setText(this.item.sellPrice.toString());
        this.setPriceTagColor(characterMoney >= this.item.sellPrice ? 'green' : 'red');
      }
    } else {
      throw new Error('invalid argument!');
    }
  }

  public setPriceTagColor(color: 'green' | 'red') {
    if (color === 'green') {
      this.priceTag.setFrame(3);
    } else if (color === 'red') {
      this.priceTag.setFrame(4);
    } else {
      throw new Error('Not a valid color. The price tag should either be green or red');
    }
  }

  public hidePriceInformation() {
    this.coinIcon.setVisible(false);
    this.priceTag.setVisible(false);
    this.itemPriceText.setVisible(false);
  }

  public updateQuantityCounter() {
    if (this.item.quantity <= 0) throw new Error(`Updating item representation while its quantity is ${this.item.quantity}`);
    if (this.item.quantity > 1) {
      this.quantityText.setVisible(true);
      this.quantityText.setText(this.item.quantity.toString());
    } else {
      this.quantityText.setVisible(false);
    }
  }
}
