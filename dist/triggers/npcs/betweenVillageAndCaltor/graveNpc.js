define(["require", "exports", "../generalNpc", "../../../data/dialogs/betweenVillageAndCaltor/graveDialog"], function (require, exports, generalNpc_1, graveDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GraveNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Grave',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: graveDialog_1.graveDialog,
                interactionCallback: ( /* param */) => {
                    scene.player.addQuest('theSelflessSpirit');
                },
            });
            this.preInteractionCallback = () => {
                if (scene.player.getQuestById('theSelflessSpirit')) {
                    scene.triggers.forEach((trigger) => {
                        if (trigger.name === 'Primula'
                            && trigger.image.x > 640 && trigger.image.x < 736
                            && trigger.image.y > 288 && trigger.image.y < 384) {
                            scene.player.updateQuest('theSelflessSpirit', 'deathMoaned');
                        }
                    });
                }
                if (scene.player.getQuestById('theSelflessSpirit')
                    ?.currentStates
                    .includes('falseNameLearned')) {
                    this.setDialog(graveDialog_1.graveDialogWithFalseName, (param) => {
                        if (param === 'falseNameCalled') {
                            scene.player.updateQuest('theSelflessSpirit', 'falseNameCalled');
                            scene.switchToScene('Battle', {
                                enemies: [{ type: 'ghost-knight' }],
                                background: 'field-background',
                            });
                        }
                    });
                }
                if (scene.player.getQuestById('theSelflessSpirit')
                    ?.currentStates
                    .includes('trueNameLearned')) {
                    this.setDialog(graveDialog_1.graveDialogWithTrueName, (param) => {
                        if (param === 'trueNameCalled') {
                            scene.player.updateQuest('theSelflessSpirit', 'trueNameCalled');
                        }
                    });
                }
                if (scene.player.getQuestById('theSelflessSpirit')
                    ?.currentStates
                    .includes('deedsGlorified')) {
                    this.setDialog(graveDialog_1.graveDialogWithGlorification, (param) => {
                        // eslint-disable-next-line no-empty
                        if (param === 'deedsGlorified') { }
                    });
                }
                if (scene.player.getQuestById('theSelflessSpirit')
                    ?.currentStates
                    .includes('trueNameCalled')
                    && scene.player.getQuestById('theSelflessSpirit')
                        ?.currentStates
                        .includes('deedsGlorified')
                    && scene.player.getQuestById('theSelflessSpirit')
                        ?.currentStates
                        .includes('deathMoaned')) {
                    this.setDialog(graveDialog_1.readyToTakeTheOath, (param) => {
                        if (param === 'oathTaken') {
                            scene.player.updateAchievement('Spirit them away', undefined, true);
                            scene.player.updateQuest('theSelflessSpirit', 'completed');
                        }
                    });
                }
            };
        }
    }
    exports.default = GraveNpc;
});
//# sourceMappingURL=graveNpc.js.map