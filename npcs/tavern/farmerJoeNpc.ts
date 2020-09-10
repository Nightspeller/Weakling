import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../locations/generalLocation.js";
import {
    farmerJoeDialogAftermath,
    farmerJoeDialogPigsDead,
    farmerJoeDialogQuestDiscussed, farmerJoeDialogQuestDiscussedNoReward,
    farmerJoeDialogQuestNotObtained,
    farmerJoeDialogQuestObtained
} from "../../data/dialogs/tavern/farmerJoeDialog.js";
import {playerInstance} from "../../characters/adventurers/player.js";

export class FarmerJoeNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        const currentStates = playerInstance.getQuestById('boarsAtTheFields')?.currentStates;
        let dialog = currentStates?.includes('started') ? farmerJoeDialogQuestObtained : farmerJoeDialogQuestNotObtained;
        super({
            scene,
            name: 'Farmer Joe',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: dialog,
            interactionCallback: (param) => {
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
                    playerInstance.getQuestById('boarsAtTheFields').questReward.items.push({itemId: 'copper-pieces', quantity: 10})
                    if (playerInstance.defeatedEnemies.includes('caltor/Boars 1') && playerInstance.defeatedEnemies.includes('caltor/Boars 2')) {
                        playerInstance.updateQuest('boarsAtTheFields', 'boarsKilled');
                    }
                    this.setDialog(farmerJoeDialogQuestDiscussed);
                }
                if (param === 'questRejected' && playerInstance.getQuestById('boarsAtTheFields')?.currentStates.includes('started')) {
                    if (playerInstance.defeatedEnemies.includes('caltor/Boars 1') && playerInstance.defeatedEnemies.includes('caltor/Boars 2')) {
                        playerInstance.updateQuest('boarsAtTheFields', 'boarsKilled');
                    }
                }
            },
            items: [
                {itemId: 'copper-pieces', quantity: 30},
                {itemId: 'cabbage', quantity: 5},
                {itemId: 'cabbage-seeds', quantity: 5},
                {itemId: 'pumpkin', quantity: 5},
                {itemId: 'apple', quantity: 5},
                {itemId: 'cheese', quantity: 2},
            ],
        });

        this.preInteractionCallback = () => {
            const currentStates = playerInstance.getQuestById('boarsAtTheFields')?.currentStates;
            if (
                (currentStates?.includes('noRewardNegotiated') || currentStates?.includes('rewardNegotiated')) &&
                currentStates?.includes('boarsKilled') && !currentStates?.includes('completed')
            ) {
                this.setDialog(farmerJoeDialogPigsDead, (param) => {
                    if (param === 'completeQuest') {
                        playerInstance.updateQuest('boarsAtTheFields', 'completed')
                        this.setDialog(farmerJoeDialogAftermath, (params) => {
                            if (params === 'openShop') {
                                this.startTrade();
                            }
                        })
                    }
                })
            }
        }
    }
}
