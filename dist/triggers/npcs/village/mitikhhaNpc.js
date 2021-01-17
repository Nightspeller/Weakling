define(["require", "exports", "../generalNpc", "../../../data/dialogs/village/mitikhhaDialog"], function (require, exports, generalNpc_1, mitikhhaDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MitikhhaNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Mitikhha',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: mitikhhaDialog_1.mitikhhaDialog,
                interactionCallback: () => {
                    this.setDialog(mitikhhaDialog_1.mitikhhaSecondDialog);
                },
            });
            this.preInteractionCallback = () => {
                if (scene.player.getQuestById('bigCaltorTrip').currentStates.includes('goodsSold')) {
                    this.setDialog(mitikhhaDialog_1.mitikhhaWelcomeBackDialog, () => {
                        this.destroy();
                    });
                    scene.player.updateQuest('bigCaltorTrip', 'completed');
                }
            };
        }
    }
    exports.default = MitikhhaNpc;
});
//# sourceMappingURL=mitikhhaNpc.js.map