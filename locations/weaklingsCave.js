import { GeneralLocation } from "./generalLocation.js";
import { chestDialog, introDialog } from "../dialogs/introDialog.js";
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
                dialogTree: chestDialog,
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