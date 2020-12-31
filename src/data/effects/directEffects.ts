/* eslint-disable */
// @ts-nocheck

import * as Phaser from 'phaser';
import generalCharacter from '../../characters/generalCharacter';
import { ActionData, EffectData } from '../../types/my-types';

const directEffects: { [key: string]: EffectData } = {
  addHealth: {
    effectId: 'addHealth',
    name: 'Healing',
    description: 'Healing is done',
    type: 'direct',
    targetCharacteristic: 'health',
    baseDuration: -1,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: null, frame: null },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'value',
        value: 5 * this.strength,
      };
    },
  },
  subtractHealth: {
    effectId: 'subtractHealth',
    name: null,
    description: null,
    type: 'direct',
    targetCharacteristic: 'health',
    baseDuration: null,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 0 },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'value',
        value: -5 * this.strength,
      };
    },
  },
  physicalDamage: {
    effectId: 'physicalDamage',
    name: null,
    description: null,
    type: 'direct',
    targetCharacteristic: 'health',
    baseDuration: null,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 0 },
    applicationCheck: (source: generalCharacter, target: generalCharacter, action) => {
      let hitChance: number;
      const { agility } = source.characteristics;
      const { dodge } = target.characteristics;
      if (agility > dodge * 1.5) {
        hitChance = 90;
      } else if (agility < dodge * 0.5) {
        hitChance = 10;
      } else {
        hitChance = Math.round(80 * (agility / dodge)) - 30;
      }
      const hitRoll = Phaser.Math.Between(0, 100);
      if (hitChance >= hitRoll) {
        console.log(`%cHit!   %c${agility} agility vs ${dodge} dodge, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`, 'color: red', 'color: auto');
        log(`Hit!   ${agility} agility vs ${dodge} dodge, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`);
      } else {
        console.log(`%cMiss.. %c${agility} agility vs ${dodge} dodge, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`, 'color: red', 'color: auto');
        log(`Miss.. ${agility} agility vs ${dodge} dodge, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`);
      }
      return hitChance >= hitRoll;
    },
    setModifier(source: generalCharacter, target: generalCharacter, action) {
      const damage = source.getAttackDamage();
      let penetration = source.characteristics.strength / target.characteristics.armor;
      penetration = penetration < 1 ? penetration : 1;
      const resultDamage = Math.round(damage * penetration);
      console.log(`%c${resultDamage} damage is done. %c${source.characteristics.strength} strength vs ${target.characteristics.armor} armor, leads to penetration of ${Math.round(penetration * 100)}%. Weapon attack power was ${damage}, thus final damage is ~${resultDamage}`, 'color: red', 'color: auto');
      log(`${resultDamage} damage is done. ${source.characteristics.strength} strength vs ${target.characteristics.armor} armor, leads to penetration of ${Math.round(penetration * 100)}%. Weapon attack power was ${damage}, thus final damage is ~${resultDamage}`);
      this.modifier = {
        type: 'value',
        value: -resultDamage,
      };
    },
  },
  magicalDamage: {
    effectId: 'magicalDamage',
    name: null,
    description: null,
    type: 'direct',
    targetCharacteristic: 'health',
    baseDuration: null,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 0 },
    applicationCheck: (source: generalCharacter, target: generalCharacter, action) => {
      let hitChance: number;
      const { intelligence } = source.characteristics;
      const { magicResistance } = target.characteristics;
      if (intelligence > magicResistance * 1.5) {
        hitChance = 90;
      } else if (intelligence < magicResistance * 0.5) {
        hitChance = 10;
      } else {
        hitChance = Math.round(80 * (intelligence / magicResistance)) - 30;
      }
      const hitRoll = Phaser.Math.Between(0, 100);
      if (hitChance >= hitRoll) {
        console.log(`%cHit!   %c${intelligence} intelligence vs ${magicResistance} magicResistance, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`, 'color: red', 'color: auto');
        log(`Hit!   ${intelligence} intelligence vs ${magicResistance} magicResistance, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`);
      } else {
        console.log(`%cMiss.. %c${intelligence} intelligence vs ${magicResistance} magicResistance, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`, 'color: red', 'color: auto');
        log(`Miss.. ${intelligence} intelligence vs ${magicResistance} magicResistance, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`);
      }
      return hitChance >= hitRoll;
    },
    setModifier(source: generalCharacter, target: generalCharacter, action) {
      const damage = source.getAttackDamage();
      console.log(`%c${damage}%c damage is done.`, 'color: red', 'color: auto');
      log(`${damage} damage is done.`);
      this.modifier = {
        type: 'value',
        value: -damage,
      };
    },
  },
  addManna: {
    effectId: 'addManna',
    name: 'Restore manna',
    description: 'Restore some manna',
    type: 'direct',
    targetCharacteristic: 'manna',
    baseDuration: null,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 0 },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'value',
        value: +2 * this.strength,
      };
    },
  },
  addEnergy: {
    effectId: 'addEnergy',
    name: 'Restore energy',
    description: 'Restore some energy',
    type: 'direct',
    targetCharacteristic: 'energy',
    baseDuration: null,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 0 },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'value',
        value: +3 * this.strength,
      };
    },
  },
  subtractEnergy: {
    effectId: 'subtractEnergy',
    name: 'Subtract energy',
    description: 'Energy usually is subtracted while using abilities or drained by enemies',
    type: 'direct',
    targetCharacteristic: 'energy',
    baseDuration: null,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 0 },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action: ActionData) {
      this.modifier = {
        type: 'value',
        value: -action.parametersCost.energy,
      };
    },
  },
  subtractManna: {
    effectId: 'subtractManna',
    name: 'Subtract manna',
    description: 'Manna usually is subtracted while using abilities or drained by enemies',
    type: 'direct',
    targetCharacteristic: 'manna',
    baseDuration: null,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 0 },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action: ActionData) {
      this.modifier = {
        type: 'value',
        value: -action.parametersCost.manna,
      };
    },
  },
};

function log(entree: string) {
  const logElement = document.getElementsByClassName('battle-log')[0] as HTMLElement;
  logElement.style.display = 'block';
  const entreeElement = document.createElement('div');
  entreeElement.innerText = entree;
  logElement.appendChild(entreeElement);
}

export default directEffects;
