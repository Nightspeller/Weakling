define(["require", "exports", "../generalNpc", "../../../data/dialogs/backCave/eyeballDialog", "../../../characters/adventurers/eyeball"], function (require, exports, generalNpc_1, eyeballDialog_1, eyeball_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EyeballNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Eyeball',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: eyeballDialog_1.eyeballFirstTimeDialog,
                interactionCallback: (param) => {
                    if (param === 'fastEnd') {
                        this.setDialog(eyeballDialog_1.eyeballSecondTimeDialog);
                    }
                    if (param === 'wantsToHelp') {
                        scene.player.addQuest('scaredyBat');
                        this.setDialog(eyeballDialog_1.eyeballSecondTimeDialog);
                    }
                    if (param === 'eyeballJoined') {
                        scene.player.updateQuest('scaredyBat', 'completed');
                        this.destroy();
                        scene.player.party.push(eyeball_1.eyeballInstance);
                    }
                },
            });
            this.image.body.setSize(32, 32)
                .setOffset(65, 65);
            this.preInteractionCallback = () => {
                if (scene.player.getQuestById('scaredyBat')?.currentStates.includes('purplecupFed')) {
                    this.setDialog(eyeballDialog_1.eyeballSecondTimeOfferPurplecupDialog);
                }
            };
        }
    }
    exports.default = EyeballNpc;
});
//# sourceMappingURL=eyeballNpc.js.map