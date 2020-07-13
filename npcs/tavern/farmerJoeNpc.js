import GeneralNpc from "../generalNpc.js";
import { farmerJoeDialogAftermath, farmerJoeDialogPigsDead, farmerJoeDialogQuestDiscussed, farmerJoeDialogQuestDiscussedNoReward, farmerJoeDialogQuestNotObtained, farmerJoeDialogQuestObtained } from "../../data/dialogs/tavern/farmerJoeDialog.js";
import { playerInstance } from "../../characters/adventurers/player.js";
export class FarmerJoeNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        var _a;
        const currentStates = (_a = playerInstance.getQuestById('boarsAtTheFields')) === null || _a === void 0 ? void 0 : _a.currentStates;
        let dialog = (currentStates === null || currentStates === void 0 ? void 0 : currentStates.includes('started')) ? farmerJoeDialogQuestObtained : farmerJoeDialogQuestNotObtained;
        super({
            scene,
            name: 'Farmer Joe',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: dialog,
            interactionCallback: (param) => {
                var _a;
                if (param === 'questAccepted') {
                    playerInstance.addQuest('boarsAtTheFields');
                    playerInstance.updateQuest('boarsAtTheFields', 'noRewardNegotiated');
                    if (playerInstance.defeatedEnemies.includes('caltor/Boars 1') && playerInstance.defeatedEnemies.includes('caltor/Boars 2')) {
                        playerInstance.updateQuest('boarsAtTheFields', 'boarsKilled');
                    }
                    this.setDialog(farmerJoeDialogQuestDiscussedNoReward);
                }
                if (param === 'questAcceptedForReward') {
                    playerInstance.addQuest('boarsAtTheFields');
                    playerInstance.updateQuest('boarsAtTheFields', 'rewardNegotiated');
                    playerInstance.getQuestById('boarsAtTheFields').questReward.items.push({ itemId: 'copper-pieces', quantity: 10 });
                    if (playerInstance.defeatedEnemies.includes('caltor/Boars 1') && playerInstance.defeatedEnemies.includes('caltor/Boars 2')) {
                        playerInstance.updateQuest('boarsAtTheFields', 'boarsKilled');
                    }
                    this.setDialog(farmerJoeDialogQuestDiscussed);
                }
                if (param === 'questRejected' && ((_a = playerInstance.getQuestById('boarsAtTheFields')) === null || _a === void 0 ? void 0 : _a.currentStates.includes('started'))) {
                    playerInstance.addQuest('boarsAtTheFields');
                    if (playerInstance.defeatedEnemies.includes('caltor/Boars 1') && playerInstance.defeatedEnemies.includes('caltor/Boars 2')) {
                        playerInstance.updateQuest('boarsAtTheFields', 'boarsKilled');
                    }
                    this.setDialog(farmerJoeDialogQuestDiscussed);
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
            var _a;
            const currentStates = (_a = playerInstance.getQuestById('boarsAtTheFields')) === null || _a === void 0 ? void 0 : _a.currentStates;
            if (((currentStates === null || currentStates === void 0 ? void 0 : currentStates.includes('noRewardNegotiated')) || (currentStates === null || currentStates === void 0 ? void 0 : currentStates.includes('rewardNegotiated'))) && (currentStates === null || currentStates === void 0 ? void 0 : currentStates.includes('boarsKilled')) && !(currentStates === null || currentStates === void 0 ? void 0 : currentStates.includes('completed'))) {
                this.setDialog(farmerJoeDialogPigsDead, (param) => {
                    if (param === 'completeQuest') {
                        playerInstance.updateQuest('boarsAtTheFields', 'completed');
                        this.setDialog(farmerJoeDialogAftermath, (params) => {
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
//# sourceMappingURL=farmerJoeNpc.js.map