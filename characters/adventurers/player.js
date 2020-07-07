import { Adventurer } from "./adventurer.js";
import { DEBUG } from "../../config/constants.js";
import { questsData } from "../../data/quests/questsData.js";
export class Player extends Adventurer {
    constructor() {
        super();
        this.name = 'Weakling';
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
            this.baseCharacteristics.parameters.health = 10;
            this.baseCharacteristics.parameters.currentHealth = 10;
            //fillInventoryWithPotions(this,'type', 'strength');
            this.addItemToInventory('copper-pieces', 1000);
            this.addItemToInventory('allpowerful-necklace');
            this.addItemToInventory('mirror-of-travel');
            this.addItemToInventory('fancy-belt', 1, 'belt');
            this.addItemToInventory('leather-armor', 1, 'body');
            this.addItemToInventory('spirit-sword', 1, 'rightHand');
            this.addItemToInventory('smoldering-ring', 1, 'ringRight');
            this.addItemToInventory('fire-marble', 3, "tail");
            this.addItemToInventory('trap-kit');
            this.addItemToInventory('basic-sack');
            /* this.addQuest('theSelflessSpirit');
             this.updateQuest('theSelflessSpirit', 'falseNameLearned');
             this.updateQuest('theSelflessSpirit', 'falseNameCalled');*/
            //this.updateQuest('theSelflessSpirit', 'trueNameLearned');
            //this.updateQuest('theSelflessSpirit', 'trueNameCalled');
        }
        this.addBaseModifiers();
        this.applyItems();
        this.availableActions = ['meditate', 'accessInventory', 'retreat', 'swiftMind', 'fireProtection', 'drainingSoil', 'warmUp', 'meleeAttack'];
        this.party = [this];
        this.addQuest('bigCaltorTrip');
        this.achievements = [{
                name: 'Fully prepared',
                description: 'Equip items at every slot',
                icon: { texture: 'icon-item-set', frame: 137 },
                achieved: false
            }, {
                name: 'My little hobby',
                description: 'Make 10 potions or mixtures',
                icon: { texture: 'icon-item-set', frame: 188 },
                progress: [0, 10],
                achieved: false
            }, {
                name: 'Let it go',
                description: 'Drop an item - it might be more useful than it seems!',
                icon: { texture: 'icon-item-set', frame: 205 },
                achieved: false
            }, {
                name: 'Welcome to the Farmville',
                description: 'Grow 6 plants',
                icon: { texture: 'icon-item-set', frame: 197 },
                progress: [0, 6],
                achieved: false
            }, {
                name: 'Did you just assume?..',
                description: 'Change your gender',
                icon: { texture: 'icon-item-set', frame: 263 },
                achieved: false
            }, {
                name: 'Spirit them away',
                description: 'Obtain the Spirit Sword',
                icon: { texture: 'icon-item-set', frame: 84 },
                achieved: false
            }, {
                name: 'See battle, Boo? Run, Boo, run!',
                description: 'Run away from the battle before it begins',
                icon: { texture: 'edited', frame: 'Running' },
                achieved: false
            }, {
                name: 'Weak, but not useless',
                description: 'Defeat 5 enemy groups',
                icon: { texture: 'icon-item-set', frame: 48 },
                progress: [0, 5],
                achieved: false
            }, {
                name: 'Checked, checked aaaand checked!',
                description: 'Complete all the quests',
                icon: { texture: 'icon-item-set', frame: 216 },
                achieved: false
            }, {
                name: 'It is done',
                description: 'Finish the game by collecting all achievements',
                icon: { texture: 'icon-item-set', frame: 199 },
                achieved: false
            }];
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
                if (state === 'completed') {
                    this.addXp(this.quests[questToUpdateIndex].questReward.xp);
                    //TODO: support inventory overflow..somehow...
                    this.quests[questToUpdateIndex].questReward.items.forEach(item => this.addItemToInventory(item.itemId, item.quantity));
                }
            }
        }
        let shouldGetAchievement = true;
        this.quests.forEach(quest => {
            if (quest.currentStates.includes('completed') === false)
                shouldGetAchievement = false;
        });
        if (this.quests.length === Object.keys(questsData).length && shouldGetAchievement)
            this.updateAchievement('Checked, checked aaaand checked!', undefined, true);
    }
    getQuestById(questId) {
        return this.quests.find(quest => quest.questId === questId);
    }
    getQuests() {
        return this.quests;
    }
    updateAchievement(name, newDescription, achieved, progressIncrement) {
        const achievement = this.achievements.find(achievement => achievement.name === name);
        if (achievement === undefined)
            throw `Trying to update non-existing achievement: ${name}`;
        if (newDescription)
            achievement.description = newDescription;
        if (achieved)
            achievement.achieved = achieved;
        if (progressIncrement) {
            achievement.progress[0] += progressIncrement;
            if (achievement.progress[0] >= achievement.progress[1]) {
                achievement.progress[0] = achievement.progress[1];
                achievement.achieved = true;
            }
        }
        let shouldGetFinalAchievement = true;
        this.achievements.forEach(achievement => {
            if (achievement.achieved === false)
                shouldGetFinalAchievement = false;
        });
        if (shouldGetFinalAchievement) {
            this.updateAchievement('It is done', undefined, true);
            alert(`Congratulations! Impressive! You actually finished the game, or at least the part of it which is currently ready. It's hard to overstate my satisfaction! Feel free to come back later to play it again, hopefully with much more content added!`);
        }
        return achievement;
    }
}
export const playerInstance = new Player();
//# sourceMappingURL=player.js.map