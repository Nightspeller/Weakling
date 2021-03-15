import * as Phaser from 'phaser';
import GeneralEnemy from './generalEnemy';
import Disposition from '../../scenes/battle/disposition';
import Adventurer from '../adventurers/adventurer';
import Action from '../../entities/action';
import { ActionData } from '../../types/my-types';

export default class Skeleton extends GeneralEnemy {
  constructor() {
    super();
    this.spriteParams = {
      texture: 'skeleton-idle', frame: 0, width: 280, height: 280, flip: true,
    };
    this.level = 1;

    this.name = 'Skeleton';
    this.characteristicsModifiers = {
      strength: [{ source: 'base', value: 20 }],
      agility: [{ source: 'base', value: 20 }],
      intelligence: [{ source: 'base', value: 10 }],
      initiative: [{ source: 'base', value: Phaser.Math.Between(0, 30) }],
      health: [{ source: 'base', value: 20 }],
      manna: [{ source: 'base', value: 10 }],
      energy: [{ source: 'base', value: 20 }],
      armor: [{ source: 'base', value: 12 }],
      dodge: [{ source: 'base', value: 10 }],
      fireResistance: [{ source: 'base', value: 0 }],
      coldResistance: [{ source: 'base', value: 5 }],
      acidResistance: [{ source: 'base', value: 0 }],
      electricityResistance: [{ source: 'base', value: 0 }],
      poisonResistance: [{ source: 'base', value: 0 }],
      magicResistance: [{ source: 'base', value: 0 }],
      weaponDamage: [{ source: 'base', value: 1 }],
    };
    this.parameters = {
      health: 20,
      manna: 10,
      energy: 20,
    };
    this._recalculateCharacteristics();
    this.actionPointsBase = { physical: 1, magical: 0, misc: 0 };
    this.actionPointsIncrement = { physical: 1, magical: 0.5, misc: 1 };

    this.availableActions = ['meleeAttack', 'fear', 'catchBreath'];

    this.animations.idle = 'skeleton_idle';
    this.animations.move = 'skeleton_move';
    this.animations.meleeAttack = 'skeleton_attack2';
    this.animations.castBuff = 'skeleton_attack1';
    this.animations.death = 'skeleton_death';
    this.animations.hit = 'skeleton_hit';
  }

  public aiTurn = (disposition: Disposition): { action: ActionData | 'END TURN', targets: (Adventurer | GeneralEnemy)[] } => {
    const pickedActionAndTargets: { action: ActionData | 'END TURN', targets: (Adventurer | GeneralEnemy)[] } = {
      action: 'END TURN', targets: [],
    };

    // this will loop through the actions in order they specified and will execute first available action
    this.availableActions.every((actionId) => {
      const action = new Action(actionId);
      const isAvailable = this.isActionAvailable(action);
      if (isAvailable) {
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
