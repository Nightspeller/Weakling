export default class ItemRepresentation extends Phaser.GameObjects.Container {
    constructor(scene, x, y, texture, frame, item) {
        super(scene, x, y);
        this.item = item;
        const image = scene.add.image(0, 0, item.sprite.texture, item.sprite.frame).setDisplaySize(64, 64);
        this.add([image]);
        this.quantityText = scene.add.text(32, 32, item.quantity.toString(), {
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
        this.setSize(64, 64)
            .setScrollFactor(0)
            .setInteractive();
        scene.add.existing(this);
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