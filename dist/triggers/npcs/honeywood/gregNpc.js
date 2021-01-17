define(["require", "exports", "../generalNpc", "../../../data/dialogs/honeywood/gregDialog"], function (require, exports, generalNpc_1, gregDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GregNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Greg',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: gregDialog_1.gregDialog,
                interactionCallback: (param) => {
                    if (param === 'jobAccepted') {
                        scene.player.addQuest('gatherTheGarlic');
                        this.setDialog(gregDialog_1.gregQuestAcceptedDialog);
                    }
                    if (param === 'garlicGathered') {
                        scene.player.updateQuest('gatherTheGarlic', 'completed');
                        this.setDialog(gregDialog_1.gregAfterQuestFinishedDialog);
                    }
                    if (param === 'garlicGatheredOpenShop') {
                        scene.player.updateQuest('gatherTheGarlic', 'completed');
                        this.setDialog(gregDialog_1.gregAfterQuestFinishedDialog);
                        this.startTrade();
                    }
                    if (param === 'openShop') {
                        this.startTrade();
                    }
                },
                items: [
                    { itemId: 'garlic', quantity: 10 },
                    { itemId: 'garlic-seeds', quantity: 10 },
                ],
            });
        }
    }
    exports.default = GregNpc;
});
//# sourceMappingURL=gregNpc.js.map