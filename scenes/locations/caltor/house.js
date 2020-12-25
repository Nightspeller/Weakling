import { GeneralLocation } from "../generalLocation.js";
import { Trigger } from "../../../entities/trigger.js";
export class HouseScene extends GeneralLocation {
    constructor() {
        super({ key: 'House' });
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('house');
        const charPickerMapObject = this.getMapObject(`Character Picker`);
        new Trigger({
            scene: this,
            name: charPickerMapObject.name,
            triggerX: charPickerMapObject.x,
            triggerY: charPickerMapObject.y,
            triggerW: charPickerMapObject.width,
            triggerH: charPickerMapObject.height,
            callback: () => {
                this.switchToScene('CharacterPicker', {}, false);
            }
        });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=house.js.map