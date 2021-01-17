define(["require", "exports", "../generalLocation", "../../../triggers/npcs/betweenVillageAndCaltor/graveNpc"], function (require, exports, generalLocation_1, graveNpc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BetweenVillageAndCaltorScene extends generalLocation_1.default {
        constructor() {
            super({ key: 'BetweenVillageAndCaltor' });
        }
        preload() {
            super.preload();
        }
        init(data) {
            super.init(data);
        }
        create() {
            super.create('betweenVillageAndCaltor');
            new graveNpc_1.default({ scene: this });
        }
        update() {
            super.update();
        }
    }
    exports.default = BetweenVillageAndCaltorScene;
});
//# sourceMappingURL=betweenVillageAndCaltor.js.map