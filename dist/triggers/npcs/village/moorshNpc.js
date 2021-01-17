define(["require", "exports", "../generalNpc", "../../../data/dialogs/village/moorshDialog"], function (require, exports, generalNpc_1, moorshDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MoorshNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Moorsh',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: moorshDialog_1.moorshDialog,
                interactionCallback: (param) => {
                    if (param === 'boneQuestAccepted') {
                        this.setDialog(moorshDialog_1.moorshSecondAcceptedDialog, (param) => {
                            if (param === 'sporesObtained') {
                                scene.player.updateQuest('bonesPicking', 'completed');
                                scene.player.addItemToInventory('purplecup-spore', 2, undefined, scene);
                                scene.player.addItemToInventory('longshroom-spore', 2, undefined, scene);
                                this.setDialog(moorshDialog_1.moorshThirdDialog, (param) => {
                                    if (param === 'openStore')
                                        this.startTrade();
                                });
                            }
                        });
                        scene.player.addQuest('bonesPicking');
                    }
                    else {
                        this.setDialog(moorshDialog_1.moorshSecondNotAcceptedDialog);
                    }
                },
                items: [
                    { itemId: 'purplecup-spore', quantity: 5 },
                    { itemId: 'longshroom-spore', quantity: 5 },
                    { itemId: 'rocky-rose-sapling', quantity: 2 },
                    { itemId: 'yellow-fingers-sapling', quantity: 3 },
                    { itemId: 'pinky-pie-sapling', quantity: 2 },
                ],
            });
        }
    }
    exports.default = MoorshNpc;
});
//# sourceMappingURL=moorshNpc.js.map