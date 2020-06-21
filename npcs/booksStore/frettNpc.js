import GeneralNpc from "../generalNpc.js";
import { frettAfterTrueNameCalledDialog, frettDialog, frettHowCanIHelpYouDialog, frettObservedReadingAndInterestDialog, frettObservedReadingDialog, frettRepeatStoryDialog } from "../../data/dialogs/caltor/frettDialog.js";
export class FrettNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        super({
            scene,
            name: 'Frett',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: frettDialog,
            interactionCallback: (param) => {
            }
        });
        this.preInteractionCallback = () => {
            var _a, _b, _c, _d, _e;
            if ((_a = scene.player.getQuestById('theSelflessSpirit')) === null || _a === void 0 ? void 0 : _a.currentStates.includes('falseNameLearned')) {
                this.setDialog(frettObservedReadingDialog);
            }
            if ((_b = scene.player.getQuestById('theSelflessSpirit')) === null || _b === void 0 ? void 0 : _b.currentStates.includes('falseNameCalled')) {
                this.setDialog(frettObservedReadingAndInterestDialog, (param) => {
                    if (param === 'trueNameLearned') {
                        scene.player.updateQuest('theSelflessSpirit', 'trueNameLearned');
                    }
                    this.setDialog(frettRepeatStoryDialog);
                });
            }
            if ((_c = scene.player.getQuestById('theSelflessSpirit')) === null || _c === void 0 ? void 0 : _c.currentStates.includes('trueNameLearned')) {
                this.setDialog(frettHowCanIHelpYouDialog);
            }
            if ((_d = scene.player.getQuestById('theSelflessSpirit')) === null || _d === void 0 ? void 0 : _d.currentStates.includes('trueNameCalled')) {
                this.setDialog(frettAfterTrueNameCalledDialog, (param) => {
                    if (param === 'bookObtained') {
                        scene.player.addItemToInventory('jeremaya-book', 1, undefined, scene);
                        scene.player.updateQuest('theSelflessSpirit', 'oathLearned');
                        this.setDialog(frettHowCanIHelpYouDialog);
                    }
                });
            }
            if ((_e = scene.player.getQuestById('theSelflessSpirit')) === null || _e === void 0 ? void 0 : _e.currentStates.includes('oathLearned')) {
                this.setDialog(frettHowCanIHelpYouDialog);
            }
        };
    }
}
//# sourceMappingURL=frettNpc.js.map