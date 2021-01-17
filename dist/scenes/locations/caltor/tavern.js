define(["require", "exports", "../generalLocation", "../../../triggers/npcs/tavern/bartenderNpc", "../../../triggers/npcs/tavern/farmerJoeNpc"], function (require, exports, generalLocation_1, bartenderNpc_1, farmerJoeNpc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TavernScene extends generalLocation_1.default {
        constructor() {
            super({ key: 'Tavern' });
        }
        preload() {
            super.preload();
        }
        init(data) {
            super.init(data);
        }
        create() {
            super.create('tavern');
            new bartenderNpc_1.default({ scene: this });
            new farmerJoeNpc_1.default({ scene: this });
        }
        update() {
            super.update();
        }
    }
    exports.default = TavernScene;
});
//# sourceMappingURL=tavern.js.map