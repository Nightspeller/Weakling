import { backpackSlotNames, containerSlotNames } from './itemSlots';
import { ItemData } from '../../types/my-types';

const handsItems: { [key: string]: ItemData } = {
  'wooden-sword-weapon': {
    itemId: 'wooden-sword-weapon',
    displayName: 'Wooden sword',
    description: 'Usually used for training rather than real fight, it is still better than nothing.',
    possibleSlots: ['rightHand', 'leftHand', ...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/weapons/melee/wooden-sword' },
    stackable: false,
    modified: false,
    specifics: {
      additionalCharacteristics: [
        { dodge: 1 },
        { weaponDamage: 5 },
      ],
      size: ['xs', 's', 'm', 'l', 'xl', 'xxxl'],
    },
    sellPrice: 1,
    buyPrice: 2,
  },
  'dagger-weapon': {
    itemId: 'dagger-weapon',
    displayName: 'Iron dagger',
    description: 'Simple, but quick to draw and use weapon, more common for street fights rather than epic battles.',
    possibleSlots: ['rightHand', 'leftHand', ...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/weapons/melee/dagger-iron' },
    stackable: false,
    modified: false,
    specifics: {
      additionalCharacteristics: [
        { dodge: 2 },
        { weaponDamage: 10 },
      ],
      size: ['xs', 's', 'm', 'l', 'xl', 'xxxl'],
    },
    sellPrice: 5,
    buyPrice: 10,
  },
  'spirit-sword': {
    itemId: 'spirit-sword',
    displayName: 'Spirit sword',
    description: 'The sword left by the great hero, the protector of poor and weak - it can be used only for the good deeds.',
    possibleSlots: ['rightHand', 'leftHand', ...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/weapons/melee/sword-steel' },
    stackable: false,
    modified: false,
    specifics: {
      additionalCharacteristics: [
        { magicResistance: 5 },
        { weaponDamage: 15 },
      ],
      size: ['xs', 's', 'm', 'l', 'xl', 'xxxl'],
    },
    sellPrice: 50,
    buyPrice: 100,
  },
  'spear-weapon': {
    itemId: 'spear-weapon',
    displayName: 'Wooden spear',
    description: 'Wooden spear with the stone tip - main weapon of Kobolds',
    possibleSlots: ['rightHand', ...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/weapons/melee/wooden-spear' },
    stackable: false,
    modified: false,
    specifics: {
      additionalCharacteristics: [
        { dodge: 2 },
        { weaponDamage: 10 },
      ],
      size: ['xs', 's', 'm', 'l', 'xl', 'xxxl'],
    },
    sellPrice: 5,
    buyPrice: 10,
  },
  'simple-bow': {
    itemId: 'simple-bow',
    displayName: 'Simple bow',
    description: 'Simple bow, not very reliable, but easy to make or find.',
    possibleSlots: ['rightHand', ...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/weapons/ranged/bow-and-arrow' },
    stackable: false,
    modified: false,
    specifics: {
      additionalCharacteristics: [
        { weaponDamage: 10 },
      ],
      size: ['xs', 's', 'm', 'l', 'xl', 'xxxl'],
    },
    sellPrice: 20,
    buyPrice: 40,
  },
  'wooden-arrow': {
    itemId: 'wooden-arrow',
    displayName: 'Wooden arrow',
    description: 'The most basic arrow made entirely of wood.',
    possibleSlots: ['leftHand', ...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/weapons/ranged/arrow-evolving-green-1' },
    stackable: true,
    modified: false,
    specifics: {
      additionalCharacteristics: [
        { weaponDamage: 10 },
      ],
      additionalActions: ['rangeAttack'],
      size: ['xs', 's', 'm', 'l', 'xl', 'xxxl'],
    },
    sellPrice: 2,
    buyPrice: 4,
  },
};

export default handsItems;
