define(["require", "exports", "../generalLocation", "../../../triggers/trigger"], function (require, exports, generalLocation_1, trigger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HouseScene extends generalLocation_1.default {
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
            const charPickerMapObject = this.getMapObject('Character Picker');
            new trigger_1.default({
                scene: this,
                name: charPickerMapObject.name,
                triggerX: charPickerMapObject.x,
                triggerY: charPickerMapObject.y,
                triggerW: charPickerMapObject.width,
                triggerH: charPickerMapObject.height,
                callback: () => {
                    this.switchToScene('CharacterPicker', {}, false);
                },
            });
        }
        update() {
            super.update();
        }
    }
    exports.default = HouseScene;
});
//# sourceMappingURL=house.js.map