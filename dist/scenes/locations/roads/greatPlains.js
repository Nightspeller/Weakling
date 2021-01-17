define(["require", "exports", "../generalLocation"], function (require, exports, generalLocation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GreatPlainsScene extends generalLocation_1.default {
        constructor() {
            super({ key: 'GreatPlains' });
        }
        preload() {
            super.preload();
        }
        init(data) {
            super.init(data);
        }
        create() {
            super.create('greatPlains');
        }
        update() {
            super.update();
        }
    }
    exports.default = GreatPlainsScene;
});
//# sourceMappingURL=greatPlains.js.map