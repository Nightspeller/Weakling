export default class ItemRepresentation extends Phaser.GameObjects.Container {
    constructor(scene, x, y, texture, frame, item) {
        super(scene, x, y);
        this.item = item;
        const image = scene.add.image(0, 0, item.sprite.texture, item.sprite.frame).setDisplaySize(64, 64).setScale(1.3);
        this.add([image]);
        this.quantityText = scene.add.text(32, -15, item.quantity.toString(), {
            font: '14px monospace',
            color: '#000000',
            backgroundColor: '#f0d191',
            padding: {
                left: 2,
            },
        }).setOrigin(1, 1);
        this.add([this.quantityText]);
        if (item.quantity === 1) {
            this.quantityText.setVisible(false);
        }
        if (scene.scene.key === 'TraderOverlay') {
            this.priceTag = scene.add.image(0, 23, 'price-tag-icons', 3).setScale(1.8, 1.2);
            this.coinIcon = scene.add.image(17, 23, 'price-tag-icons', 0).setScale(1.2);
            this.itemPriceText = scene.add.text(10, 32, '', {
                font: '14px monospace',
                color: '#000000',
                padding: {
                    left: 1
                },
            }).setOrigin(1, 1);
        }
        this.add([this.priceTag]);
        this.add([this.itemPriceText]);
        this.add([this.coinIcon]);
        this.setSize(64, 64)
            .setScrollFactor(0)
            .setInteractive();
        scene.add.existing(this);
    }
    setPriceTag(characterMoney, forWho) {
        if (forWho === "player") {
            this.itemPriceText.setText(this.item.buyPrice.toString());
            this.setPriceTagColor(characterMoney >= this.item.buyPrice ? 'green' : 'red');
        }
        else if (forWho === "npc") {
            if (this.item.sellPrice === 0) {
                this.hidePriceInformation();
            }
            else {
                this.itemPriceText.setText(this.item.sellPrice.toString());
                this.setPriceTagColor(characterMoney >= this.item.sellPrice ? "green" : "red");
            }
        }
        else {
            throw Error("invalid argument!");
        }
    }
    setPriceTagColor(color) {
        if (color === "green") {
            this.priceTag.setFrame(3);
        }
        else if (color === "red") {
            this.priceTag.setFrame(4);
        }
        else {
            throw Error("Not a valid color. The price tag should either be green or red");
        }
    }
    hidePriceInformation() {
        this.coinIcon.setVisible(false);
        this.priceTag.setVisible(false);
        this.itemPriceText.setVisible(false);
    }
    updateQuantityCounter() {
        if (this.item.quantity <= 0)
            throw `Updating item representation while its quantity is ${this.item.quantity}`;
        if (this.item.quantity > 1) {
            this.quantityText.setVisible(true);
            this.quantityText.setText(this.item.quantity.toString());
        }
        else {
            this.quantityText.setVisible(false);
        }
    }
}
//# sourceMappingURL=itemRepresentation.js.map