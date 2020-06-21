import GeneralNpc from "../generalNpc.js";
import { graveDialog, graveDialogWithFalseName, graveDialogWithGlorification, graveDialogWithTrueName, readyToTakeTheOath } from "../../data/dialogs/betweenVillageAndCaltor/graveDialog.js";
export class GraveNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        super({
            scene,
            name: 'Grave',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: graveDialog,
            interactionCallback: (param) => {
                scene.player.addQuest('theSelflessSpirit');
            }
        });
        this.preInteractionCallback = () => {
            var _a, _b, _c, _d, _e, _f;
            if (scene.player.getQuestById('theSelflessSpirit')) {
                scene.triggers.find(trigger => {
                    if (trigger.name === 'Primula' &&
                        trigger.image.x > 640 && trigger.image.x < 736 &&
                        trigger.image.y > 288 && trigger.image.y < 384) {
                        scene.player.updateQuest('theSelflessSpirit', 'deathMoaned');
                    }
                });
            }
            if ((_a = scene.player.getQuestById('theSelflessSpirit')) === null || _a === void 0 ? void 0 : _a.currentStates.includes('falseNameLearned')) {
                this.setDialog(graveDialogWithFalseName, (param) => {
                    if (param === 'falseNameCalled') {
                        scene.player.updateQuest('theSelflessSpirit', 'falseNameCalled');
                        scene.switchToScene('Battle', { enemies: [{ "type": "ghost-knight" }] });
                    }
                });
            }
            if ((_b = scene.player.getQuestById('theSelflessSpirit')) === null || _b === void 0 ? void 0 : _b.currentStates.includes('trueNameLearned')) {
                this.setDialog(graveDialogWithTrueName, (param) => {
                    if (param === 'trueNameCalled') {
                        scene.player.updateQuest('theSelflessSpirit', 'trueNameCalled');
                    }
                });
            }
            if ((_c = scene.player.getQuestById('theSelflessSpirit')) === null || _c === void 0 ? void 0 : _c.currentStates.includes('deedsGlorified')) {
                this.setDialog(graveDialogWithGlorification, (param) => {
                    if (param === 'deedsGlorified') {
                    }
                });
            }
            if (((_d = scene.player.getQuestById('theSelflessSpirit')) === null || _d === void 0 ? void 0 : _d.currentStates.includes('trueNameCalled')) && ((_e = scene.player.getQuestById('theSelflessSpirit')) === null || _e === void 0 ? void 0 : _e.currentStates.includes('deedsGlorified')) && ((_f = scene.player.getQuestById('theSelflessSpirit')) === null || _f === void 0 ? void 0 : _f.currentStates.includes('deathMoaned'))) {
                this.setDialog(readyToTakeTheOath, (param) => {
                    if (param === 'oathTaken') {
                        scene.player.addItemToInventory('spirit-sword', 1, undefined, scene);
                    }
                });
            }
        };
    }
}
//# sourceMappingURL=graveNpc.js.map