define(["require", "exports", "../generalNpc", "../../../data/dialogs/village/elderGreetingDialog", "../../../characters/adventurers/elder"], function (require, exports, generalNpc_1, elderGreetingDialog_1, elder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ElderNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Elder Guarthh',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: elderGreetingDialog_1.elderFirstTimeDialog,
                interactionCallback: () => {
                    scene.player.updateQuest('bigCaltorTrip', 'talkedToElder');
                    this.setDialog(elderGreetingDialog_1.elderSecondTimeDialog, (param) => {
                        if (param === 'readyToGo') {
                            this.destroy();
                            scene.player.party.push(elder_1.elderInstance);
                            scene.player.updateQuest('bigCaltorTrip', 'readyToGo');
                        }
                    });
                },
            });
        }
    }
    exports.default = ElderNpc;
});
//# sourceMappingURL=elderNpc.js.map