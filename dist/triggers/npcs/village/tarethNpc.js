define(["require", "exports", "../generalNpc", "../../../data/dialogs/village/tarethDialog"], function (require, exports, generalNpc_1, tarethDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TarethNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Tareth',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: tarethDialog_1.tarethDialog,
                interactionCallback: () => {
                    this.setDialog(tarethDialog_1.tarethSecondDialog, (param) => {
                        if (param === 'potionGiven') {
                            this.setDialog(tarethDialog_1.tarethDoneDialog, ( /* param */) => {
                                scene.player.updateQuest('helpTheTareth', 'completed');
                            });
                            scene.player.updateQuest('helpTheTareth', 'potionGiven');
                        }
                        else {
                            scene.player.updateQuest('helpTheTareth', 'potionToMake');
                        }
                    });
                    scene.player.addQuest('helpTheTareth');
                },
            });
        }
    }
    exports.default = TarethNpc;
});
//# sourceMappingURL=tarethNpc.js.map