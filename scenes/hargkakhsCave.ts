import {Location} from "../entities/location.js";

export class HargkakhsCaveScene extends Location {
    private chest: Phaser.Physics.Arcade.Image;

    constructor() {
        super({key: 'HargkakhsCave'});
    }

    public preload() {
       this.preparePlugins();
    }

    public init() {
    }

    public create() {
        this.prepareMap('hargkakhsCave', 304, 192);

        this.layers.find(layer => layer.layer.name === 'EmptyChest').setVisible(false);

        const exitObject = this.map.findObject("Objects", obj => obj.name === "Exit");
        const exit = this.physics.add
            .image(exitObject['x'] + 304, exitObject['y'] + 192, null)
            .setOrigin(0, 0)
            .setDisplaySize(exitObject['width'], exitObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, exit, () => this.switchToScene("Village"));

        const chestObject = this.map.findObject("Objects", obj => obj.name === "Chest");
        this.chest = this.physics.add
            .image(chestObject['x'] + 304, chestObject['y'] + 192, null)
            .setOrigin(0, 0)
            .setDisplaySize(chestObject['width'], chestObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.overlap(this.playerImage, this.chest, () => {
        });
    }

    public update() {
        this.updatePlayer();
        if (this.chest.body?.embedded && this.keys.space.isDown) {
            const key = this.player.inventory.find(item => item.specifics?.opens === 'hargkakhsChest');
            if (key) {
                this.layers.find(layer => layer.layer.name === 'EmptyChest').setVisible(true);
                this.player.addItemToInventory('fancy-belt');
                this.player.addItemToInventory('work-gloves');
                this.player.removeItemFromInventory(key);
                this.chest.destroy(true);
            }
        }
    }
}