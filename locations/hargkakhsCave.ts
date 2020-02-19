import {GeneralLocation} from "./generalLocation.js";

export class HargkakhsCaveScene extends GeneralLocation {
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
        this.prepareMap('hargkakhsCave', 304, 128);

        const chestTrigger = this.triggers.find(trigger => trigger.name === 'Chest');
        const destroyCallback = chestTrigger.callback;
        chestTrigger.callback = () => {
            const key = this.player.inventory.find(item => item.specifics?.opens === 'hargkakhsChest');
            if (key) {
                destroyCallback();
                this.player.addItemToInventory('fancy-belt');
                this.player.addItemToInventory('work-gloves');
                this.player.removeItemFromInventory(key);
            }
        };
    }

    public update() {
        this.updatePlayer();
    }
}
