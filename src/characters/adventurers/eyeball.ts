import * as Phaser from 'phaser';
import Adventurer from './adventurer';
import { DEBUG } from '../../config/constants';

export class Eyeball extends Adventurer {
  constructor() {
    super();
    this.spriteParams = {
      texture: 'eyeball-idle', frame: null, width: 300, height: 300,
    };
    this.characteristicsModifiers = {
      strength: [{ source: 'base', value: 10 }],
      agility: [{ source: 'base', value: 10 }],
      intelligence: [{ source: 'base', value: 15 }],
      initiative: [{ source: 'base', value: Phaser.Math.Between(0, 30) + 10 }],
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
    if (DEBUG) {
      this.characteristics.health = 50;
      this.parameters.health = 50;
    }

    this.name = 'Eyeball';

    this.availableActions = ['meditate', 'dustStorm', 'healingTouch', 'drainingSoil', 'adjustArmor', 'warmUp', 'meleeAttack', 'wait', 'catchBreath'];

    this.animations.idle = 'eyeball_idle';
    this.animations.move = 'eyeball_idle';
    this.animations.meleeAttack = 'eyeball_attack1';
    this.animations.castBuff = 'eyeball_buff';
    this.animations.death = 'eyeball_death';
    this.animations.hit = 'eyeball_hit';
  }
}

export const eyeballInstance = new Eyeball();
