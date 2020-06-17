import {GeneralLocation} from "./generalLocation.js";
import Npc from "../entities/npc.js";
import {
    frettAfterTrueNameCalledDialog,
    frettDialog, frettHowCanIHelpYouDialog,
    frettObservedReadingAndInterestDialog, frettObservedReadingDialog,
    frettRepeatStoryDialog
} from "../data/dialogs/caltor/frettDialog.js";

export class BooksStoreScene extends GeneralLocation {
    constructor() {
        super({key: 'BooksStore'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
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

    private _dialogToUse(frett: Npc) {
        if (this.player.getQuestById('theSelflessSpirit')?.currentStates.includes('falseNameLearned')) {
            frett.setDialog(frettObservedReadingDialog);
        }

        if (this.player.getQuestById('theSelflessSpirit')?.currentStates.includes('falseNameCalled')) {
            frett.setDialog(frettObservedReadingAndInterestDialog, (param) => {
                if (param === 'trueNameLearned') {
                    this.player.updateQuest('theSelflessSpirit', 'trueNameLearned');
                }
                frett.setDialog(frettRepeatStoryDialog);
            });
        }

        if (this.player.getQuestById('theSelflessSpirit')?.currentStates.includes('trueNameLearned')) {
            frett.setDialog(frettHowCanIHelpYouDialog);
        }

        if (this.player.getQuestById('theSelflessSpirit')?.currentStates.includes('trueNameCalled')) {
            frett.setDialog(frettAfterTrueNameCalledDialog, (param) => {
                if (param === 'bookObtained') {
                    this.player.addItemToInventory('jeremaya-book', 1, undefined, this);
                    this.player.updateQuest('theSelflessSpirit', 'oathLearned');
                    frett.setDialog(frettHowCanIHelpYouDialog);
                }
            });
        }

        if (this.player.getQuestById('theSelflessSpirit')?.currentStates.includes('oathLearned')) {
            frett.setDialog(frettHowCanIHelpYouDialog);
        }
    }

    public update() {
        super.update();
    }
}
