define(["require", "exports", "../generalLocation"], function (require, exports, generalLocation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NahkhasCaveScene extends generalLocation_1.default {
        constructor() {
            super({ key: 'NahkhasCave' });
        }
        preload() {
            super.preload();
        }
        init(data) {
            super.init(data);
        }
        create() {
            super.create('nahkhasCave');
        }
        update() {
            super.update();
        }
    }
    exports.default = NahkhasCaveScene;
});
//# sourceMappingURL=nahkhasCave.js.map