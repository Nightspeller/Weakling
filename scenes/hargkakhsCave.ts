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

        this.createTrigger('Exit', () => {
            this.switchToScene('Village')
        }, 'Objects', null, null, 'collide', 304, 192);

        this.chest = this.createTrigger('Chest', () => {
        }, 'Objects', null, null, 'collide', 304, 192);
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