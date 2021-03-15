import * as Phaser from 'phaser';
import GeneralEnemy from './generalEnemy';
import Disposition from '../../scenes/battle/disposition';
import Adventurer from '../adventurers/adventurer';
import Action from '../../entities/action';
import { ActionData } from '../../types/my-types';

export default class GreenOoze extends GeneralEnemy {
  constructor() {
    super();
    this.spriteParams = {
      texture: 'green-ooze-idle', frame: 0, width: 160, height: 160, flip: false,
    };
    this.level = 1;
    this.name = 'Green ooze';
    this.characteristicsModifiers = {
      strength: [{ source: 'base', value: 10 }],
      agility: [{ source: 'base', value: 15 }],
      intelligence: [{ source: 'base', value: 5 }],
      initiative: [{ source: 'base', value: Phaser.Math.Between(10, 20) }],
      health: [{ source: 'base', value: 20 }],
      manna: [{ source: 'base', value: 0 }],
      energy: [{ source: 'base', value: 15 }],
      armor: [{ source: 'base', value: 12 }],
      dodge: [{ source: 'base', value: 10 }],
      fireResistance: [{ source: 'base', value: 0 }],
      coldResistance: [{ source: 'base', value: 0 }],
      acidResistance: [{ source: 'base', value: 10 }],
      electricityResistance: [{ source: 'base', value: 0 }],
      poisonResistance: [{ source: 'base', value: 10 }],
      magicResistance: [{ source: 'base', value: 0 }],
      weaponDamage: [{ source: 'base', value: 3 }],
    };
    this.parameters = {
      health: 20,
      manna: 0,
      energy: 15,
    };
    this._recalculateCharacteristics();

    this.actionPointsBase = { physical: 0, magical: 0, misc: 0 };
    this.actionPointsIncrement = { physical: 1, magical: 0, misc: 1 };

    this.availableActions = ['corrosiveSpit', 'corrosiveEnveloping', 'catchBreath'];

    this.animations.idle = 'green-ooze_idle';
    this.animations.move = 'green-ooze_move';
    this.animations.meleeAttack = 'green-ooze_attack1';
    this.animations.rangedAttack = 'green-ooze_attack1';
    this.animations.hit = 'green-ooze_hit';
    this.animations.death = 'green-ooze_death';
  }

  public aiTurn = (disposition: Disposition): { action: ActionData | 'END TURN', targets: (Adventurer | GeneralEnemy)[] } => {
    const pickedActionAndTargets: { action: ActionData | 'END TURN', targets: (Adventurer | GeneralEnemy)[] } = {
      action: 'END TURN', targets: [],
    };

    // this will loop through the actions in order they specified and will execute first available action
    // swiftMind will be skipped if already applied.
    // returns true to continue looping, looking for action. return false to break the loop
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
