define(["require", "exports", "../generalNpc", "../../../data/dialogs/caltor/frettDialog"], function (require, exports, generalNpc_1, frettDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FrettNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Frett',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: frettDialog_1.frettDialog,
                interactionCallback: ( /* param */) => { },
            });
            this.preInteractionCallback = () => {
                if (scene.player.getQuestById('theSelflessSpirit')?.currentStates.includes('falseNameLearned')) {
                    this.setDialog(frettDialog_1.frettObservedReadingDialog);
                }
                if (scene.player.getQuestById('theSelflessSpirit')?.currentStates.includes('falseNameCalled')) {
                    this.setDialog(frettDialog_1.frettObservedReadingAndInterestDialog, (param) => {
                        if (param === 'trueNameLearned') {
                            scene.player.updateQuest('theSelflessSpirit', 'trueNameLearned');
                        }
                        this.setDialog(frettDialog_1.frettRepeatStoryDialog);
                    });
                }
                if (scene.player.getQuestById('theSelflessSpirit')?.currentStates.includes('trueNameLearned')) {
                    this.setDialog(frettDialog_1.frettHowCanIHelpYouDialog);
                }
                if (scene.player.getQuestById('theSelflessSpirit')?.currentStates.includes('trueNameCalled')) {
                    this.setDialog(frettDialog_1.frettAfterTrueNameCalledDialog, (param) => {
                        if (param === 'bookObtained') {
                            scene.player.addItemToInventory('jeremaya-book', 1, undefined, scene);
                            scene.player.updateQuest('theSelflessSpirit', 'oathLearned');
                            this.setDialog(frettDialog_1.frettHowCanIHelpYouDialog);
                        }
                    });
                }
                if (scene.player.getQuestById('theSelflessSpirit')?.currentStates.includes('oathLearned')) {
                    this.setDialog(frettDialog_1.frettHowCanIHelpYouDialog);
                }
            };
        }
    }
    exports.default = FrettNpc;
});
//# sourceMappingURL=frettNpc.js.map