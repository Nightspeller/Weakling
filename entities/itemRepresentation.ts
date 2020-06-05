import Item from "./item.js";

export default class ItemRepresentation extends Phaser.GameObjects.Container {
    public item: Item;
    private quantityText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string | number, item: Item) {
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

    public updateQuantityCounter() {
        if (this.item.quantity <= 0) throw `Updating item representation while its quantity is ${this.item.quantity}`;
        if (this.item.quantity > 1) {
            this.quantityText.setVisible(true);
            this.quantityText.setText(this.item.quantity.toString())
        } else {
            this.quantityText.setVisible(false);
        }
    }
}
