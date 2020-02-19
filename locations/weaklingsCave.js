import { GeneralLocation } from "./generalLocation.js";
export class WeaklingsCaveScene extends GeneralLocation {
    constructor() {
        super({ key: 'WeaklingsCave' });
    }
    preload() {
        this.preparePlugins();
    }
    init() {
    }
    create() {
        this.prepareMap('weaklingsCave', 304, 128);
        const chest1trigger = this.triggers.find(trigger => trigger.name === 'Chest 1');
        const destroyCallback = chest1trigger.callback;
        chest1trigger.callback = () => {
            destroyCallback();
            this.player.addItemToInventory('fancy-belt');
        };
    }
    update() {
        this.updatePlayer();
    }
}
//# sourceMappingURL=weaklingsCave.js.map