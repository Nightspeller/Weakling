import { backpackSlotNames, containerSlotNames } from './itemSlots';
import { ItemData } from '../../types/my-types';

const ringsItems: { [key: string]: ItemData } = {
  'smoldering-ring': {
    itemId: 'smoldering-ring',
    displayName: 'Smoldering ring',
    description: 'This ring looks like it is made of smoldering coal, but it does not burn you, just warming your finger ever so slightly.',
    possibleSlots: ['ringLeft', 'ringRight', ...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/rings/gold-ring-with-ruby' },
    stackable: false,
    modified: false,
    quantity: null,
    specifics: {
      additionalActions: ['fireball'],
    },
    sellPrice: 75,
    buyPrice: 150,
  },
  'minor-energy-ring': {
    itemId: 'minor-energy-ring',
    displayName: 'Minor energy ring',
    description: 'This ring has some simple enchantment on it, making it\'s bearer more energetic.',
    possibleSlots: ['ringLeft', 'ringRight', ...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/rings/gold-ring' },
    stackable: false,
    modified: false,
    quantity: null,
    specifics: {
      additionalCharacteristics: [
        { energy: 2 },
      ],
      size: ['xs', 's', 'm'],
    },
    sellPrice: 10,
    buyPrice: 20,
  },
};

export default ringsItems;
