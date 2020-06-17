import { GeneralLocation } from "./generalLocation.js";
import Npc from "../entities/npc.js";
import { frettAfterTrueNameCalledDialog, frettDialog, frettHowCanIHelpYouDialog, frettObservedReadingAndInterestDialog, frettObservedReadingDialog, frettRepeatStoryDialog } from "../data/dialogs/caltor/frettDialog.js";
export class BooksStoreScene extends GeneralLocation {
    constructor() {
        super({ key: 'BooksStore' });
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('booksStore');
        const frett = new Npc({
            scene: this,
            mapObjectName: "Frett",
            initDialog: frettDialog,
            interactionCallback: param => {
            }
        });
        this._dialogToUse(frett);
        this.events.on('wake', (scene) => {
            this._dialogToUse(frett);
        });
    }
    _dialogToUse(frett) {
        var _a, _b, _c, _d, _e;
        if ((_a = this.player.getQuestById('theSelflessSpirit')) === null || _a === void 0 ? void 0 : _a.currentStates.includes('falseNameLearned')) {
            frett.setDialog(frettObservedReadingDialog);
        }
        if ((_b = this.player.getQuestById('theSelflessSpirit')) === null || _b === void 0 ? void 0 : _b.currentStates.includes('falseNameCalled')) {
            frett.setDialog(frettObservedReadingAndInterestDialog, (param) => {
                if (param === 'trueNameLearned') {
                    this.player.updateQuest('theSelflessSpirit', 'trueNameLearned');
                }
                frett.setDialog(frettRepeatStoryDialog);
            });
        }
        if ((_c = this.player.getQuestById('theSelflessSpirit')) === null || _c === void 0 ? void 0 : _c.currentStates.includes('trueNameLearned')) {
            frett.setDialog(frettHowCanIHelpYouDialog);
        }
        if ((_d = this.player.getQuestById('theSelflessSpirit')) === null || _d === void 0 ? void 0 : _d.currentStates.includes('trueNameCalled')) {
            frett.setDialog(frettAfterTrueNameCalledDialog, (param) => {
                if (param === 'bookObtained') {
                    this.player.addItemToInventory('jeremaya-book', 1, undefined, this);
                    this.player.updateQuest('theSelflessSpirit', 'oathLearned');
                    frett.setDialog(frettHowCanIHelpYouDialog);
                }
            });
        }
        if ((_e = this.player.getQuestById('theSelflessSpirit')) === null || _e === void 0 ? void 0 : _e.currentStates.includes('oathLearned')) {
            frett.setDialog(frettHowCanIHelpYouDialog);
        }
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=booksStore.js.map