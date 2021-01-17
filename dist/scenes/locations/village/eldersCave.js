define(["require", "exports", "../generalLocation", "../../../triggers/npcs/eldersCave/liatshNpc"], function (require, exports, generalLocation_1, liatshNpc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EldersCaveScene extends generalLocation_1.default {
        constructor() {
            super({ key: 'EldersCave' });
        }
        preload() {
            super.preload();
        }
        init(data) {
            super.init(data);
        }
        create() {
            super.create('eldersCave');
            new liatshNpc_1.default({ scene: this });
        }
        update() {
            super.update();
        }
    }
    exports.default = EldersCaveScene;
});
//# sourceMappingURL=eldersCave.js.map