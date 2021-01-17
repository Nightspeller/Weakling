define(["require", "exports", "../generalLocation", "../../../triggers/npcs/honeywood/gregNpc", "../../../triggers/npcs/honeywood/mashaNpc", "../../../triggers/npcs/honeywood/limeNpc", "../../../triggers/npcs/honeywood/ajikaNpc"], function (require, exports, generalLocation_1, gregNpc_1, mashaNpc_1, limeNpc_1, ajikaNpc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HoneywoodScene extends generalLocation_1.default {
        constructor() {
            super({ key: 'Honeywood' });
        }
        preload() {
            super.preload();
        }
        init(data) {
            super.init(data);
        }
        create() {
            super.create('honeywood');
            new gregNpc_1.default({ scene: this });
            new mashaNpc_1.default({ scene: this });
            new limeNpc_1.default({ scene: this });
            new ajikaNpc_1.default({ scene: this });
        }
        update() {
            super.update();
        }
    }
    exports.default = HoneywoodScene;
});
//# sourceMappingURL=honeywood.js.map