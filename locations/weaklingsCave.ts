import {GeneralLocation} from "./generalLocation.js";
import {introDialog} from "../dialogs/introDialog.js";

export class WeaklingsCaveScene extends GeneralLocation {
    private chest: Phaser.Physics.Arcade.Image;

    constructor() {
        super({key: 'WeaklingsCave'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('weaklingsCave', 304, 128);

        const chest1trigger = this.triggers.find(trigger => trigger.name === 'Chest 1');
        const destroyCallback = chest1trigger.callback;
        chest1trigger.callback = () => {
            destroyCallback();
            this.player.addItemToInventory('fancy-belt');
        };

        this.switchToScene('Dialog', {
            dialogTree: introDialog,
            closeCallback: (param) => {}
        }, false);
    }

    public update() {
        this.updatePlayer();
    }
}
