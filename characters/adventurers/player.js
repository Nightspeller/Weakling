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
            this.addItemToInventory('mirror-of-travel');
            this.addItemToInventory('smoldering-ring', 1, 'ringRight');
            this.addItemToInventory('rope-belt', 1, 'belt');
            this.addItemToInventory('fancy-belt');
            this.addItemToInventory('primula-flower', 4);
            this.addItemToInventory('pinky-pie-sapling', 3);
            this.addItemToInventory('yellow-fingers-sapling', 3);
            this.addItemToInventory('carrot', 3);
            this.addItemToInventory('small-weak-healing-potion', 2);
            this.addItemToInventory('pinky-pie-sapling');
            this.addItemToInventory('yellow-fingers-sapling');
            this.addItemToInventory('primula-sapling');
            this.addItemToInventory('rocky-rose-sapling');
            this.addItemToInventory('fancy-belt');
            this.addItemToInventory('sourgrass', 6);
            this.addItemToInventory('medium-weak-strength-potion', 2);
            this.addItemToInventory('leather-armor', 1);
            this.addItemToInventory('small-bottle', 3);
            this.addItemToInventory('medium-bottle', 3);
            this.addItemToInventory('big-bottle', 3);
            this.addItemToInventory('giant-bottle', 3);
            this.addItemToInventory('wooden-sword-weapon', 1, 'rightHand');
            this.addItemToInventory('rocky-rose-flower', 6);
            this.addItemToInventory('hargkakhs-key');
            /* this.addQuest('theSelflessSpirit');
             this.updateQuest('theSelflessSpirit', 'falseNameLearned');
             this.updateQuest('theSelflessSpirit', 'falseNameCalled');*/
            //this.updateQuest('theSelflessSpirit', 'trueNameLearned');
            //this.updateQuest('theSelflessSpirit', 'trueNameCalled');
        }
        this.addBaseModifiers();
        this.applyItems();
        this.name = 'Weakling';
        this.availableActions = ['meditate', 'accessInventory', 'retreat', 'swiftMind', 'fireProtection', 'drainingSoil', 'warmUp', 'meleeAttack'];
        this.party = [this];
        if (DEBUG)
            this.party = [this, elderInstance];
        this.addQuest('bigCaltorTrip');
    }
    addQuest(questId) {
        if (!this.quests.find(existingQuest => existingQuest.questId === questId)) {
            this.quests.unshift(questsData[questId]);
        }
        else {
            console.log('Trying to add quest which is already added');
        }
    }
    updateQuest(questId, state) {
        let questToUpdateIndex = this.quests.findIndex(existingQuest => existingQuest.questId === questId);
        if (questToUpdateIndex === -1) {
            console.log("Trying update non-existing or not obtained quest");
        }
        else {
            if (this.quests[questToUpdateIndex].currentStates.includes(state)) {
                console.log("Trying to add state which is already added.");
            }
            else {
                this.quests[questToUpdateIndex].currentStates.push(state);
            }
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