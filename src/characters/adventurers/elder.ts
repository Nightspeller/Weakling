import * as Phaser from 'phaser';
import Adventurer from './adventurer';
import { DEBUG } from '../../config/constants';

export default class Elder extends Adventurer {
  constructor() {
    super();
    this.spriteParams = {
      texture: 'elder', frame: null, width: 96, height: 96,
    };
    this.characteristicsModifiers = {
      strength: [{ source: 'base', value: 5 }],
      agility: [{ source: 'base', value: 10 }],
      intelligence: [{ source: 'base', value: 15 }],
      initiative: [{ source: 'base', value: Phaser.Math.Between(0, 30) + 10 }],
      health: [{ source: 'base', value: 5 }],
      manna: [{ source: 'base', value: 10 }],
      energy: [{ source: 'base', value: 5 }],
      armor: [{ source: 'base', value: 10 }],
      dodge: [{ source: 'base', value: 10 }],
      fireResistance: [{ source: 'base', value: 10 }],
      coldResistance: [{ source: 'base', value: 10 }],
      acidResistance: [{ source: 'base', value: 10 }],
      electricityResistance: [{ source: 'base', value: 10 }],
      poisonResistance: [{ source: 'base', value: 10 }],
      magicResistance: [{ source: 'base', value: 10 }],
      weaponDamage: [{ source: 'base', value: 5 }],
    };
    this.parameters = { health: 5, manna: 10, energy: 5 };

    this._recalculateCharacteristics();

    if (DEBUG) {
      this.characteristics.health = 50;
      this.parameters.health = 50;
    }

    this.name = 'Elder Guarthh';

    this.availableActions = ['meditate', 'dustStorm', 'healingTouch', 'drainingSoil', 'adjustArmor', 'warmUp', 'meleeAttack', 'wait', 'catchBreath'];
  }
}

export const elderInstance = new Elder();
