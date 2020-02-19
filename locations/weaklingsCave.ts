import {GeneralLocation} from "./generalLocation.js";

export class WeaklingsCaveScene extends GeneralLocation {
    private chest: Phaser.Physics.Arcade.Image;

    constructor() {
        super({key: 'WeaklingsCave'});
    }

    public preload() {
        this.preparePlugins();
    }

    public init() {
    }

    public create() {
        this.prepareMap('weaklingsCave', 304, 128);

        const chest1trigger = this.triggers.find(trigger => trigger.name === 'Chest 1');
        const destroyCallback = chest1trigger.callback;
        chest1trigger.callback = () => {
            destroyCallback();
            this.player.addItemToInventory('fancy-belt');
        }
    }

    public update() {
        this.updatePlayer();
    }
}
