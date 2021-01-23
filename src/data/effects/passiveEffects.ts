/* eslint-disable */
// @ts-nocheck

import { EffectData } from '../../types/my-types';

const passiveEffects: { [key: string]: EffectData } = {
  waiting: {
    effectId: 'waiting',
    name: 'Waiting',
    description: 'This character patiently waits for others to finish their turns',
    type: 'passive',
    baseDuration: 1,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 'icons/misc/hourglass' },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {  },
  },
  terrified: {
    effectId: 'terrified',
    name: 'Terrified',
    description: 'This character is terrified - it can\'t fact their terror in combat',
    type: 'passive',
    baseDuration: 1,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 'icons/icons-and-status-effects/terrifying-smile' },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.baseDuration = this.strength;
    },
  },
  drunk: {
    effectId: 'drunk',
    name: 'Drunk',
    description: 'This character is drunk - his agility is reduced',
    type: 'passive',
    targetCharacteristic: 'agility',
    baseDuration: 3,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 'icons/icons-and-status-effects/spaced-out' },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'percent',
        value: -10 * this.strength,
      };
    },
  },
  armorUp: {
    effectId: 'armorUp',
    name: 'Armor up',
    description: 'Armor is increased',
    type: 'passive',
    targetCharacteristic: 'armor',
    baseDuration: 3,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 'icons/clothes/chests/cuirass' },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'percent',
        value: +10 * this.strength,
      };
    },
  },
  dodgeUp: {
    effectId: 'dodgeUp',
    name: 'Dodge up',
    description: 'Dodge is increased',
    type: 'passive',
    targetCharacteristic: 'dodge',
    baseDuration: 3,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 'icons/icons-and-status-effects/evade' },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'percent',
        value: +10 * this.strength,
      };
    },
  },
  addStrength: {
    effectId: 'addStrength',
    name: 'Strength up',
    description: 'Strength is increased',
    type: 'passive',
    targetCharacteristic: 'strength',
    baseDuration: 3,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 'icons/icons-and-status-effects/strength' },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'percent',
        value: +10 * this.strength,
      };
    },
  },
  agilityUp: {
    effectId: 'agilityUp',
    name: 'Agility up',
    description: 'Agility is increased',
    type: 'passive',
    targetCharacteristic: 'agility',
    baseDuration: 3,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 'icons/icons-and-status-effects/swiftness' },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'percent',
        value: +10 * this.strength,
      };
    },
  },
  intelligenceUp: {
    effectId: 'intelligenceUp',
    name: 'Intelligence up',
    description: 'Intelligence is increased',
    type: 'passive',
    targetCharacteristic: 'intelligence',
    baseDuration: 3,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 'icons/icons-and-status-effects/brain' },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'percent',
        value: +10 * this.strength,
      };
    },
  },
  intelligenceDown: {
    effectId: 'intelligenceDown',
    name: 'Intelligence down',
    description: 'Intelligence is decreased',
    type: 'passive',
    targetCharacteristic: 'intelligence',
    baseDuration: 3,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 'icons/icons-and-status-effects/spaced-out' },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'percent',
        value: -10 * this.strength,
      };
    },
  },
  agilityDown: {
    effectId: 'agilityDown',
    name: 'Agility down',
    description: 'Agility is decreased',
    type: 'passive',
    targetCharacteristic: 'agility',
    baseDuration: 3,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 'icons/pointers-and-arrows/red-arrow-down-right' },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'percent',
        value: -10 * this.strength,
      };
    },
  },
  initiativeUp: {
    effectId: 'initiativeUp',
    name: 'Initiative up',
    description: 'Initiative is increased',
    type: 'passive',
    targetCharacteristic: 'initiative',
    baseDuration: 3,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 'icons/pointers-and-arrows/green-curved-arrow-up' },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'percent',
        value: +10 * this.strength,
      };
    },
  },
  fireResistanceUp: {
    effectId: 'fireResistanceUp',
    name: 'Fire resistance up',
    description: 'Fire resistance is increased',
    type: 'passive',
    targetCharacteristic: 'fireResistance',
    baseDuration: 3,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 'icons/spells-and-magic/fire-circle' },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'percent',
        value: +10 * this.strength,
      };
    },
  },

};

export default passiveEffects;
