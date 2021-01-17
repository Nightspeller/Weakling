define(["require", "exports", "../generalLocation"], function (require, exports, generalLocation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CryptScene extends generalLocation_1.default {
        constructor() {
            super({ key: 'Crypt' });
        }
        preload() {
            super.preload();
        }
        init(data) {
            super.init(data);
        }
        create() {
            super.create('crypt');
        }
        update() {
            super.update();
        }
    }
    exports.default = CryptScene;
});
//# sourceMappingURL=crypt.js.map