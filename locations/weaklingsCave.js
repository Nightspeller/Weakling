import { GeneralLocation } from "./generalLocation.js";
import { chest1Dialog, chest2Dialog, introDialog } from "../dialogs/introDialog.js";
export class WeaklingsCaveScene extends GeneralLocation {
    constructor() {
        super({ key: 'WeaklingsCave' });
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('weaklingsCave', 304, 128);
        const chest1trigger = this.triggers.find(trigger => trigger.name === 'Chest 1');
        const destroyCallback = chest1trigger.callback;
        chest1trigger.callback = () => {
            destroyCallback();
            this.player.addItemToInventory('leather-armor');
            this.player.addItemToInventory('rangers-hat');
            this.player.addItemToInventory('copper-pieces', 10);
            this.switchToScene('Dialog', {
                dialogTree: chest1Dialog,
                closeCallback: (param) => { }
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
                closeCallback: (param) => { }
            }, false);
        };
        this.switchToScene('Dialog', {
            dialogTree: introDialog,
            closeCallback: (param) => { }
        }, false);
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=weaklingsCave.js.map