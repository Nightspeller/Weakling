import {GeneralLocation} from "./generalLocation.js";

export class HargkakhsCaveScene extends GeneralLocation {
    private chest: Phaser.Physics.Arcade.Image;

    constructor() {
        super({key: 'HargkakhsCave'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('hargkakhsCave');

        const chestTrigger = this.triggers.find(trigger => trigger.name === 'Chest');
        const destroyCallback = chestTrigger.callback;
        chestTrigger.callback = () => {
            const key = this.player.inventory.find(item => item.specifics?.opens === 'hargkakhsChest');
            if (key) {
                destroyCallback();
                this.player.removeItemFromInventory(key);
            }
        };
    }

    public update() {
        super.update();
    }
}
