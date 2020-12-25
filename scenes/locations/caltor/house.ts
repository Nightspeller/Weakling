import {GeneralLocation} from "../generalLocation.js";
import {Trigger} from "../../../entities/trigger.js";

export class HouseScene extends GeneralLocation {
    constructor() {
        super({key: 'House'});
    }

    public preload() {
       super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
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
                this.switchToScene('CharacterPicker', {}, false)
            }
        });
    }

    public update() {
        super.update();
    }
}
