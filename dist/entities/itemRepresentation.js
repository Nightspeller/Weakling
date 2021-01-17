define(["require", "exports", "phaser", "../config/constants"], function (require, exports, Phaser, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ItemRepresentation extends Phaser.GameObjects.Container {
        constructor(scene, x, y, texture, frame, item) {
            super(scene, x, y);
            this.item = item;
            const image = scene.add.image(0, 0, item.sprite.texture, item.sprite.frame)
                .setDisplaySize(64, 64).setScale(constants_1.INVENTORY_ITEM_SCALE);
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
            this.add([image, this.quantityText]);
            if (scene.scene.key === 'TraderOverlay') {
                this.priceTag = scene.add.image(0, 23, 'icons', 'icons/misc/price-tag-green').setScale(1.8, 1.2);
                this.coinIcon = scene.add.image(17, 23, 'icons', 'icons/coins/coin');
                this.itemPriceText = scene.add.text(10, 32, '', {
                    font: '14px monospace',
                    color: '#000000',
                    padding: {
                        left: 1,
                    },
                }).setOrigin(1, 1);
                this.add([this.priceTag, this.itemPriceText, this.coinIcon]);
            }
            this.setSize(64, 64)
                .setScrollFactor(0)
                .setInteractive();
            scene.add.existing(this);
        }
        setPriceTag(characterMoney, forWho) {
            if (forWho === 'player') {
                this.itemPriceText.setText(this.item.buyPrice.toString());
                this.setPriceTagColor(characterMoney >= this.item.buyPrice ? 'green' : 'red');
            }
            else if (forWho === 'npc') {
                if (this.item.sellPrice === 0) {
                    this.hidePriceInformation();
                }
                else {
                    this.itemPriceText.setText(this.item.sellPrice.toString());
                    this.setPriceTagColor(characterMoney >= this.item.sellPrice ? 'green' : 'red');
                }
            }
            else {
                throw new Error('invalid argument!');
            }
        }
        setPriceTagColor(color) {
            if (color === 'green') {
                this.priceTag.setFrame('icons/misc/price-tag-green');
            }
            else if (color === 'red') {
                this.priceTag.setFrame('icons/misc/price-tag-red');
            }
            else {
                throw new Error('Not a valid color. The price tag should either be green or red');
            }
        }
        hidePriceInformation() {
            this.coinIcon.setVisible(false);
            this.priceTag.setVisible(false);
            this.itemPriceText.setVisible(false);
        }
        updateQuantityCounter() {
            if (this.item.quantity <= 0)
                throw new Error(`Updating item representation while its quantity is ${this.item.quantity}`);
            if (this.item.quantity > 1) {
                this.quantityText.setVisible(true);
                this.quantityText.setText(this.item.quantity.toString());
            }
            else {
                this.quantityText.setVisible(false);
            }
        }
    }
    exports.default = ItemRepresentation;
});
//# sourceMappingURL=itemRepresentation.js.map