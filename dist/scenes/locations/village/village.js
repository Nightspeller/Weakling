define(["require", "exports", "../../../data/dialogs/introDialog", "../../../config/constants", "../../../triggers/npcs/village/moorshNpc", "../../../triggers/npcs/village/nahkhaNpc", "../../../triggers/npcs/village/elderNpc", "../../../triggers/npcs/village/mitikhhaNpc", "../../../triggers/npcs/village/whiskersNpc", "../../../triggers/npcs/village/tarethNpc", "../../../triggers/npcs/village/keithNpc", "../../../triggers/npcs/village/hargkakhNpc", "../generalLocation"], function (require, exports, introDialog_1, constants_1, moorshNpc_1, nahkhaNpc_1, elderNpc_1, mitikhhaNpc_1, whiskersNpc_1, tarethNpc_1, keithNpc_1, hargkakhNpc_1, generalLocation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VillageScene extends generalLocation_1.default {
        constructor() {
            super({ key: 'Village' });
        }
        preload() {
            super.preload();
        }
        init(data) {
            super.init(data);
        }
        create() {
            super.create('village');
            if (!constants_1.DEBUG) {
                this.switchToScene('Dialog', {
                    dialogTree: introDialog_1.introVillageDialog,
                    closeCallback: () => {
                    },
                }, false);
            }
            new elderNpc_1.default({ scene: this });
            new mitikhhaNpc_1.default({ scene: this });
            new whiskersNpc_1.default({ scene: this });
            new tarethNpc_1.default({ scene: this });
            new keithNpc_1.default({ scene: this });
            new nahkhaNpc_1.default({ scene: this });
            new moorshNpc_1.default({ scene: this });
            new hargkakhNpc_1.default({ scene: this });
        }
        update() {
            super.update();
        }
    }
    exports.default = VillageScene;
});
//# sourceMappingURL=village.js.map