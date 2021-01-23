import * as Phaser from 'phaser';
import GeneralEnemy from './generalEnemy';
import Disposition from '../../scenes/battle/disposition';
import Adventurer from '../adventurers/adventurer';
import Action from '../../entities/action';
import { ActionData } from '../../types/my-types';

export default class Boar extends GeneralEnemy {
  constructor() {
    super();
    this.spriteParams = {
      texture: 'boar-avatar', frame: null, width: 96, height: 96,
    };
    this.level = 1;
    this.name = 'Wild Boar';
    this.characteristicsModifiers = {
      strength: [{ source: 'base', value: 10 }],
      agility: [{ source: 'base', value: 10 }],
      intelligence: [{ source: 'base', value: 3 }],
      initiative: [{ source: 'base', value: Phaser.Math.Between(20, 30) }],
      health: [{ source: 'base', value: 20 }],
      manna: [{ source: 'base', value: 0 }],
      energy: [{ source: 'base', value: 10 }],
      armor: [{ source: 'base', value: 12 }],
      dodge: [{ source: 'base', value: 10 }],
      fireResistance: [{ source: 'base', value: 0 }],
      coldResistance: [{ source: 'base', value: 5 }],
      acidResistance: [{ source: 'base', value: 0 }],
      electricityResistance: [{ source: 'base', value: 0 }],
      poisonResistance: [{ source: 'base', value: 0 }],
      magicResistance: [{ source: 'base', value: 0 }],
      weaponDamage: [{ source: 'base', value: 3 }],
    };
    this.parameters = {
      health: 20,
      manna: 0,
      energy: 10,
    };
    this._recalculateCharacteristics();
    this.actionPointsBase = { physical: 1, magical: 0, misc: 0 };
    this.actionPointsIncrement = { physical: 1, magical: 0, misc: 1 };

    this.availableActions = ['enrage', 'wildRush', 'catchBreath'];
  }

  public aiTurn = (disposition: Disposition): { action: ActionData | 'END TURN', targets: (Adventurer | GeneralEnemy)[] } => {
    const pickedActionAndTargets: { action: ActionData | 'END TURN', targets: (Adventurer | GeneralEnemy)[] } = {
      action: 'END TURN', targets: [],
    };

    // this will loop through the actions in order they specified and will execute first available action
    // enrage will be skipped if already applied.
    this.availableActions.every((actionId) => {
      const action = new Action(actionId);
      const isAvailable = this.isActionAvailable(action);
      if (isAvailable) {
        if (actionId === 'enrage') {
          const isEnraged = this.currentEffects.some((effect) => effect.effectId === 'intelligenceDown');
          if (isEnraged) {
            return true;
          }
        }
        pickedActionAndTargets.action = action;
        // @ts-ignore
        pickedActionAndTargets.targets = this.pickActionTargets(action, disposition);
        return false;
      }
      return true;
    });

    return pickedActionAndTargets;
  };
}
