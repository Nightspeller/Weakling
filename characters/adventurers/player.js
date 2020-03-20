import { Adventurer } from "./adventurer.js";
import { elderInstance } from "./elder.js";
import { DEBUG } from "../../config/constants.js";
import { questsData } from "../../data/quests/questsData.js";
export class Player extends Adventurer {
    constructor() {
        super();
        this.spriteParams = { texture: 'weakling', frame: null, width: 96, height: 96 };
        this.worldImageSpriteParams = { texture: 'jeremy-green', frame: 1 };
        this.quests = [];
        this.baseCharacteristics = {
            attributes: {
                strength: 10,
                agility: 10,
                intelligence: 10,
                initiative: Phaser.Math.Between(0, 30)
            },
            parameters: {
                health: 5,
                currentHealth: 5,
                manna: 5,
                currentManna: 5,
                energy: 10,
                currentEnergy: 10,
            },
            defences: {
                armor: 10,
                dodge: 10,
                fireResistance: 10,
                coldResistance: 10,
                acidResistance: 10,
                electricityResistance: 10,
                poisonResistance: 10,
                magicResistance: 10,
            }
        };
        if (DEBUG) {
            this.baseCharacteristics.parameters.health = 50;
            this.baseCharacteristics.parameters.currentHealth = 50;
            this.addItemToInventory('copper-pieces', 1000);
            this.addItemToInventory('allpowerful-necklace');
            this.addItemToInventory('leather-armor', 1, 'body');
            this.addItemToInventory('trap-kit');
            this.addItemToInventory('spirit-sword');
            this.addItemToInventory('smoldering-ring', 1, 'ringRight');
            /*            this.addItemToInventory('pinky-pie-sapling');
                        this.addItemToInventory('yellow-fingers-sapling');
                        this.addItemToInventory('primula-sapling');
                        this.addItemToInventory('rocky-rose-sapling');
                        this.addItemToInventory('rope-belt', 1, 'belt');
                        this.addItemToInventory('fancy-belt');`
                        this.addItemToInventory('minor-healing-potion');
                        this.addItemToInventory('minor-healing-potion', 2);
                        this.addItemToInventory('leather-armor', 1, 'body');
                        this.addItemToInventory('wooden-sword-weapon', 1, 'rightHand');
                        this.addItemToInventory('wooden-sword-weapon');
                        this.addItemToInventory('rangers-hat');*/
        }
        this.addBaseModifiers();
        this.applyItems();
        this.name = 'Weakling';
        this.availableActions = ['meditate', 'accessInventory', /*'drinkWeakHealthPotion', */ 'swiftMind', 'fireProtection', 'drainingSoil', 'warmUp', 'meleeAttack'];
        this.party = [this];
        if (DEBUG)
            this.party = [this, elderInstance];
        this.addQuest(questsData['bigCaltorTrip']);
    }
    getAvailableActions() {
        let combinedActions = [...this.availableActions];
        this.inventory.forEach(item => {
            var _a, _b;
            if (((_a = item.specifics) === null || _a === void 0 ? void 0 : _a.additionalActions) && !item.currentSlot.includes('backpack')) {
                combinedActions = [...combinedActions, ...(_b = item.specifics) === null || _b === void 0 ? void 0 : _b.additionalActions];
            }
        });
        return [...new Set(combinedActions)];
    }
    addQuest(quest) {
        if (!this.quests.find(existingQuest => existingQuest.questId === quest.questId)) {
            this.quests.push(quest);
        }
        else {
            throw new Error('Trying to add quest which is already added');
        }
    }
    updateQuest(questId, params) {
        let questToUpdateIndex = this.quests.findIndex(existingQuest => existingQuest.questId === questId);
        if (questToUpdateIndex === -1) {
            throw "Trying update non-existing or not obtained quest";
        }
        else {
            this.quests[questToUpdateIndex] = { ...this.quests[questToUpdateIndex], ...params };
        }
    }
    getQuestById(questId) {
        return this.quests.find(quest => quest.questId === questId);
    }
    getQuests() {
        return this.quests;
    }
}
export const playerInstance = new Player();
//# sourceMappingURL=player.js.map