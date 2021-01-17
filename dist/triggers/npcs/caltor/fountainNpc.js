define(["require", "exports", "../generalNpc", "../../../data/dialogs/caltor/fountainSignDialog"], function (require, exports, generalNpc_1, fountainSignDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FountainNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Fountain sign',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: fountainSignDialog_1.fountainSignDialog,
                interactionCallback: () => {
                    if (scene.player.getQuestById('theSelflessSpirit')?.currentStates.includes('started')) {
                        scene.player.updateQuest('theSelflessSpirit', 'falseNameLearned');
                    }
                },
            });
            this.preInteractionCallback = () => {
                if (scene.player.getQuestById('theSelflessSpirit')?.currentStates.includes('trueNameLearned')
                    && !scene.player.getQuestById('theSelflessSpirit')?.currentStates.includes('deedsGlorified')) {
                    this.setDialog(fountainSignDialog_1.fountainVandalDialog, (param) => {
                        if (param === 'fountainVandalized') {
                            scene.player.updateQuest('theSelflessSpirit', 'deedsGlorified');
                            this.setDialog(fountainSignDialog_1.fountainChangedDialog, () => {
                            });
                        }
                    });
                }
            };
        }
    }
    exports.default = FountainNpc;
});
//# sourceMappingURL=fountainNpc.js.map