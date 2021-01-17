define(["require", "exports", "../generalNpc", "../../../data/dialogs/village/nahkhaDialog"], function (require, exports, generalNpc_1, nahkhaDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NahkhaNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Nahkha',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: nahkhaDialog_1.nahkhaBeforeTheElderDialog,
                interactionCallback: () => {
                },
            });
            this.preInteractionCallback = () => {
                if (scene.player.getQuestById('bigCaltorTrip').currentStates.includes('talkedToElder') === true
                    && scene.player.getQuestById('bigCaltorTrip').currentStates.includes('basketsObtained') === false) {
                    this.setDialog(nahkhaDialog_1.nahkhaAfterTheElderDialog, (param) => {
                        if (param === 'basketsObtained') {
                            this.setDialog(nahkhaDialog_1.nahkhaAfterGoodsObtainedDialog);
                            scene.player.addItemToInventory('basket', 10, undefined, scene);
                            scene.player.updateQuest('bigCaltorTrip', 'basketsObtained');
                        }
                    });
                }
            };
        }
    }
    exports.default = NahkhaNpc;
});
//# sourceMappingURL=nahkhaNpc.js.map