define(["require", "exports", "../generalNpc", "../../../data/dialogs/tavern/farmerJoeDialog", "../../../characters/adventurers/player"], function (require, exports, generalNpc_1, farmerJoeDialog_1, player_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FarmerJoeNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            const currentStates = player_1.playerInstance.getQuestById('boarsAtTheFields')?.currentStates;
            const dialog = currentStates?.includes('started') ? farmerJoeDialog_1.farmerJoeDialogQuestObtained : farmerJoeDialog_1.farmerJoeDialogQuestNotObtained;
            super({
                scene,
                name: 'Farmer Joe',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: dialog,
                interactionCallback: (param) => {
                    if (param === 'questAccepted') {
                        player_1.playerInstance.addQuest('boarsAtTheFields');
                        player_1.playerInstance.updateQuest('boarsAtTheFields', 'noRewardNegotiated');
                        if (player_1.playerInstance.defeatedEnemies.includes('caltor/Boars 1') && player_1.playerInstance.defeatedEnemies.includes('caltor/Boars 2')) {
                            player_1.playerInstance.updateQuest('boarsAtTheFields', 'boarsKilled');
                        }
                        this.setDialog(farmerJoeDialog_1.farmerJoeDialogQuestDiscussedNoReward);
                    }
                    if (param === 'questAcceptedForReward') {
                        player_1.playerInstance.addQuest('boarsAtTheFields');
                        player_1.playerInstance.updateQuest('boarsAtTheFields', 'rewardNegotiated');
                        player_1.playerInstance.getQuestById('boarsAtTheFields')
                            .questReward
                            .items
                            .push({ itemId: 'copper-pieces', quantity: 10 });
                        if (player_1.playerInstance.defeatedEnemies.includes('caltor/Boars 1') && player_1.playerInstance.defeatedEnemies.includes('caltor/Boars 2')) {
                            player_1.playerInstance.updateQuest('boarsAtTheFields', 'boarsKilled');
                        }
                        this.setDialog(farmerJoeDialog_1.farmerJoeDialogQuestDiscussed);
                    }
                    if (param === 'questRejected' && player_1.playerInstance.getQuestById('boarsAtTheFields')
                        ?.currentStates
                        .includes('started')) {
                        if (player_1.playerInstance.defeatedEnemies.includes('caltor/Boars 1') && player_1.playerInstance.defeatedEnemies.includes('caltor/Boars 2')) {
                            player_1.playerInstance.updateQuest('boarsAtTheFields', 'boarsKilled');
                        }
                    }
                },
                items: [
                    { itemId: 'copper-pieces', quantity: 30 },
                    { itemId: 'cabbage', quantity: 5 },
                    { itemId: 'cabbage-seeds', quantity: 5 },
                    { itemId: 'pumpkin', quantity: 5 },
                    { itemId: 'apple', quantity: 5 },
                    { itemId: 'cheese', quantity: 2 },
                ],
            });
            this.preInteractionCallback = () => {
                const currentStates = player_1.playerInstance.getQuestById('boarsAtTheFields')?.currentStates;
                if ((currentStates?.includes('noRewardNegotiated') || currentStates?.includes('rewardNegotiated'))
                    && currentStates?.includes('boarsKilled') && !currentStates?.includes('completed')) {
                    this.setDialog(farmerJoeDialog_1.farmerJoeDialogPigsDead, (param) => {
                        if (param === 'completeQuest') {
                            player_1.playerInstance.updateQuest('boarsAtTheFields', 'completed');
                            this.setDialog(farmerJoeDialog_1.farmerJoeDialogAftermath, (params) => {
                                if (params === 'openShop') {
                                    this.startTrade();
                                }
                            });
                        }
                    });
                }
            };
        }
    }
    exports.default = FarmerJoeNpc;
});
//# sourceMappingURL=farmerJoeNpc.js.map