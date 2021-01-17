define(["require", "exports", "../generalLocation", "../../../triggers/npcs/hermitsTower/hermitNpc"], function (require, exports, generalLocation_1, hermitNpc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HermitsTowerScene extends generalLocation_1.default {
        constructor() {
            super({ key: 'HermitsTower' });
        }
        preload() {
            super.preload();
        }
        init(data) {
            super.init(data);
        }
        create() {
            super.create('hermitsTower');
            new hermitNpc_1.default({ scene: this });
        }
        update() {
            super.update();
        }
    }
    exports.default = HermitsTowerScene;
});
//# sourceMappingURL=hermitsTower.js.map