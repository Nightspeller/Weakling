import { GeneralLocation } from "./generalLocation.js";
export class HargkakhsCaveScene extends GeneralLocation {
    constructor() {
        super({ key: 'HargkakhsCave' });
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('hargkakhsCave');
        const chestTrigger = this.triggers.find(trigger => trigger.name === 'Chest');
        const destroyCallback = chestTrigger.callback;
        chestTrigger.callback = () => {
            const key = this.player.inventory.find(item => { var _a; return ((_a = item.specifics) === null || _a === void 0 ? void 0 : _a.opens) === 'hargkakhsChest'; });
            if (key) {
                destroyCallback();
                this.player.removeItemFromInventory(key);
            }
        };
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=hargkakhsCave.js.map