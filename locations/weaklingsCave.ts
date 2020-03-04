import {GeneralLocation} from "./generalLocation.js";
import {chest1Dialog, chest2Dialog, introDialog} from "../data/dialogs/introDialog.js";
import {DEBUG} from "../config/constants.js";

export class WeaklingsCaveScene extends GeneralLocation {
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

        const bgMusic = this.sound.add('keys-for-success', {loop: true, volume: 0.1});
        bgMusic['soundType'] = 'music';
        bgMusic.play();

        const chest1trigger = this.triggers.find(trigger => trigger.name === 'Chest 1');
        const destroyCallback = chest1trigger.callback;
        chest1trigger.callback = () => {
            destroyCallback();
            this.player.addItemToInventory('copper-pieces', 10);
            this.player.addItemToInventory('leather-armor');
            this.player.addItemToInventory('rangers-hat');
            this.switchToScene('Dialog', {
                dialogTree: chest1Dialog,
                speakerName: 'Narrator',
                closeCallback: (param) => {
                }
            }, false);
        };

        const chest2trigger = this.triggers.find(trigger => trigger.name === 'Chest 2');
        const destroy2Callback = chest2trigger.callback;
        chest2trigger.callback = () => {
            destroy2Callback();
            this.player.addItemToInventory('trap-kit');
            this.player.addItemToInventory('spear-weapon');
            this.switchToScene('Dialog', {
                dialogTree: chest2Dialog,
                speakerName: 'Narrator',
                closeCallback: (param) => {
                }
            }, false);
        };

        const secretTrigger = this.triggers.find(trigger => trigger.name === 'Sourgrass');
        const secretDestroyCallback = secretTrigger.callback;
        secretTrigger.callback = () => {
            secretDestroyCallback();
            this.player.addItemToInventory('sourgrass');
            this.player.addItemToInventory('pinky-pie-sapling');
            this.player.addItemToInventory('yellow-fingers-sapling');
        };

        if (!DEBUG) {
            this.switchToScene('Dialog', {
                dialogTree: introDialog,
                speakerName: 'Narrator',
                closeCallback: (param) => {
                }
            }, false);
        }
    }

    public update() {
        super.update();
    }
}
