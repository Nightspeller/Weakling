import * as Phaser from 'phaser';

import Adventurer from './adventurer';
import { DEBUG } from '../../config/constants';
import questsData from '../../data/quests/questsData';
import { Quest, SpriteParameters } from '../../types/my-types';
import achievementsData from '../../data/achievementsData';

export class Player extends Adventurer {
  public worldImageSpriteParams: { texture: string; frame: number };
  public party: Adventurer[];
  private quests: Quest[];
  public achievements: ({ name: string; description: string; icon: SpriteParameters; achieved: boolean; progress?: [number, number] })[];
  public defeatedEnemies: string[];

  constructor() {
    super();
    this.name = 'Weakling';
    this.spriteParams = {
      texture: 'weakling-battle', frame: 'weakling-battle-animations/idle/1', width: 96 * 1.5, height: 96 * 1.5,
    };
    this.worldImageSpriteParams = { texture: 'jeremy-green', frame: 1 };
    this.quests = [];
    this.defeatedEnemies = [];
    this.characteristicsModifiers = {
      strength: [{ source: 'base', value: 10 }],
      agility: [{ source: 'base', value: 10 }],
      intelligence: [{ source: 'base', value: 10 }],
      initiative: [{ source: 'base', value: Phaser.Math.Between(30, 30) }],
      health: [{ source: 'base', value: 5 }],
      manna: [{ source: 'base', value: 5 }],
      energy: [{ source: 'base', value: 10 }],
      armor: [{ source: 'base', value: 10 }],
      dodge: [{ source: 'base', value: 10 }],
      fireResistance: [{ source: 'base', value: 10 }],
      coldResistance: [{ source: 'base', value: 10 }],
      acidResistance: [{ source: 'base', value: 10 }],
      electricityResistance: [{ source: 'base', value: 10 }],
      poisonResistance: [{ source: 'base', value: 10 }],
      magicResistance: [{ source: 'base', value: 10 }],
      weaponDamage: [{ source: 'base', value: 1 }],
    };
    this.parameters = { health: 5, manna: 5, energy: 10 };

    this._recalculateCharacteristics();

    this.animations.idle = 'weakling_idle';
    this.animations.move = 'weakling_move';
    this.animations.meleeAttack = 'weakling_melee_attack';
    this.animations.rangedAttack = 'weakling_ranged_attack';
    this.animations.meleeCast = 'weakling_cast';
    this.animations.rangedCast = 'weakling_cast';
    this.animations.castBuff = 'weakling_buff';
    this.animations.death = 'weakling_death';
    this.animations.hit = 'weakling_hit';

    if (DEBUG) {
      this.characteristics.health = 50;
      this.parameters.health = 50;

      this.addItemToInventory('copper-pieces', 1000);
      this.addItemToInventory('allpowerful-necklace');
      this.addItemToInventory('mirror-of-travel');
      this.addItemToInventory('fancy-belt', 1, 'belt');
      this.addItemToInventory('leather-armor', 1, 'body');
      this.addItemToInventory('simple-bow', 1, 'rightHand');
      this.addItemToInventory('wooden-arrow', 2, 'leftHand');
      this.addItemToInventory('smoldering-ring', 1, 'ringRight');
      /* this.addItemToInventory('fire-marble', 3, "tail");
          this.addItemToInventory('trap-kit'); */
      this.addItemToInventory('apple', 5);
      this.addItemToInventory('carrot', 3);
      this.addItemToInventory('fire-marble', 3, 'tail');

      /* this.addQuest('theSelflessSpirit');
           this.updateQuest('theSelflessSpirit', 'falseNameLearned');
           this.updateQuest('theSelflessSpirit', 'falseNameCalled'); */
      // this.updateQuest('theSelflessSpirit', 'trueNameLearned');
      // this.updateQuest('theSelflessSpirit', 'trueNameCalled');
    }

    this.availableActions = ['meditate', 'accessInventory', 'retreat', 'swiftMind',
      'fireProtection', 'drainingSoil', 'warmUp', 'meleeAttack', 'wait', 'catchBreath'];

    this.party = [this];

    this.addQuest('bigCaltorTrip');

    this.achievements = achievementsData;
  }

  public addQuest(questId: string) {
    if (!this.quests.find((existingQuest) => existingQuest.questId === questId)) {
      this.quests.unshift(questsData[questId]);
    } else {
      console.log('Trying to add quest which is already added');
    }
  }

  public updateQuest(questId: string, state: string) {
    const questToUpdateIndex = this.quests.findIndex((existingQuest) => existingQuest.questId === questId);
    if (questToUpdateIndex === -1) {
      console.log('Trying update non-existing or not obtained quest');
    } else if (this.quests[questToUpdateIndex].currentStates.includes(state)) {
      console.log('Trying to add state which is already added.');
    } else {
      this.quests[questToUpdateIndex].currentStates.push(state);
      if (state === 'completed') {
        this.addXp(this.quests[questToUpdateIndex].questReward.xp);
        // TODO: support inventory overflow..somehow...
        this.quests[questToUpdateIndex].questReward.items.forEach((item) => this.addItemToInventory(item.itemId, item.quantity));
      }
    }

    let shouldGetAchievement = true;
    this.quests.forEach((quest) => {
      if (quest.currentStates.includes('completed') === false) shouldGetAchievement = false;
    });
    if (this.quests.length === Object.keys(questsData).length && shouldGetAchievement) {
      this.updateAchievement('Checked, checked aaaand checked!', undefined, true);
    }
  }

  public getQuestById(questId: string) {
    return this.quests.find((quest) => quest.questId === questId);
  }

  public getQuests() {
    return this.quests;
  }

  public updateAchievement(name: string, newDescription: string, achieved: boolean, progressIncrement?: number) {
    const achievement = this.achievements.find((achievementInArray) => achievementInArray.name === name);
    if (achievement === undefined) throw new Error(`Trying to update non-existing achievement: ${name}`);
    if (newDescription) achievement.description = newDescription;
    if (achieved) achievement.achieved = achieved;
    if (progressIncrement) {
      achievement.progress[0] += progressIncrement;
      if (achievement.progress[0] >= achievement.progress[1]) {
        achievement.progress[0] = achievement.progress[1];
        achievement.achieved = true;
      }
    }

    let shouldGetFinalAchievement = true;
    this.achievements.forEach((achievementInArray) => {
      if (achievementInArray.achieved === false) shouldGetFinalAchievement = false;
    });
    if (shouldGetFinalAchievement) {
      this.updateAchievement('It is done', undefined, true);
      alert('Congratulations! Impressive! You actually finished the game, or at least the part of it which is currently ready. '
        + 'It\'s hard to overstate my satisfaction!'
        + ' Feel free to come back later to play it again, hopefully with much more content added!');
    }

    return achievement;
  }
}

export const playerInstance = new Player();
