define(["require", "exports", "../generalLocation"], function (require, exports, generalLocation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DungeonScene extends generalLocation_1.default {
        constructor() {
            super({ key: 'Dungeon' });
        }
        preload() {
            super.preload();
        }
        init(data) {
            super.init(data);
        }
        create() {
            super.create('dungeon');
        }
        update() {
            super.update();
        }
    }
    exports.default = DungeonScene;
});
//# sourceMappingURL=dungeon.js.map