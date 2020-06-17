import { GeneralLocation } from "./generalLocation.js";
import Npc from "../entities/npc.js";
import { graveDialog, graveDialogWithFalseName, graveDialogWithGlorification, graveDialogWithTrueName, readyToTakeTheOath } from "../data/dialogs/betweenVillageAndCaltor/graveDialog.js";
export class BetweenVillageAndCaltorScene extends GeneralLocation {
    constructor() {
        super({ key: 'BetweenVillageAndCaltor' });
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('betweenVillageAndCaltor');
        const grave = new Npc({
            scene: this,
            mapObjectName: 'Grave',
            initDialog: graveDialog,
            interactionCallback: (param) => {
                this.player.addQuest('theSelflessSpirit');
            }
        });
        this.events.on('resume', (scene, data) => {
            if (this.player.getQuestById('theSelflessSpirit')) {
                this.triggers.find(trigger => {
                    if (trigger.name === 'Primula' &&
                        trigger.image.x > 640 && trigger.image.x < 736 &&
                        trigger.image.y > 288 && trigger.image.y < 384) {
                        this.player.updateQuest('theSelflessSpirit', 'deathMoaned');
                    }
                });
            }
        });
        this.events.on('wake', (scene) => {
            var _a, _b, _c, _d, _e, _f;
            if ((_a = this.player.getQuestById('theSelflessSpirit')) === null || _a === void 0 ? void 0 : _a.currentStates.includes('falseNameLearned')) {
                grave.setDialog(graveDialogWithFalseName, (param) => {
                    if (param === 'falseNameCalled') {
                        this.player.updateQuest('theSelflessSpirit', 'falseNameCalled');
                        this.switchToScene('Battle', { enemies: [{ "type": "ghost-knight" }] });
                    }
                });
            }
            if ((_b = this.player.getQuestById('theSelflessSpirit')) === null || _b === void 0 ? void 0 : _b.currentStates.includes('trueNameLearned')) {
                grave.setDialog(graveDialogWithTrueName, (param) => {
                    if (param === 'trueNameCalled') {
                        this.player.updateQuest('theSelflessSpirit', 'trueNameCalled');
                    }
                });
            }
            if ((_c = this.player.getQuestById('theSelflessSpirit')) === null || _c === void 0 ? void 0 : _c.currentStates.includes('deedsGlorified')) {
                grave.setDialog(graveDialogWithGlorification, (param) => {
                    if (param === 'deedsGlorified') {
                        //this.player.addItemToInventory('spirit-sword');
                    }
                });
            }
            if (((_d = this.player.getQuestById('theSelflessSpirit')) === null || _d === void 0 ? void 0 : _d.currentStates.includes('trueNameCalled')) && ((_e = this.player.getQuestById('theSelflessSpirit')) === null || _e === void 0 ? void 0 : _e.currentStates.includes('deedsGlorified')) && ((_f = this.player.getQuestById('theSelflessSpirit')) === null || _f === void 0 ? void 0 : _f.currentStates.includes('deathMoaned'))) {
                grave.setDialog(readyToTakeTheOath, (param) => {
                    if (param === 'oathTaken') {
                        this.player.addItemToInventory('spirit-sword', 1, undefined, this);
                    }
                });
            }
        });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=betweenVillageAndCaltor.js.map