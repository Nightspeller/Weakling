import { backpackSlotNames, containerSlotNames } from './itemSlots';
import { ItemData } from '../../types/my-types';

const neckItems: { [key: string]: ItemData } = {
  'allpowerful-necklace': {
    itemId: 'allpowerful-necklace',
    displayName: 'All-powerful necklace',
    description: 'Unbelievably rare and powerful artifact, which improves it\'s owner in pretty much every way',
    possibleSlots: ['neck', ...backpackSlotNames, ...containerSlotNames],
    sprite: {
      texture: 'allpowerful-necklace',
      frame: null,
    },
    stackable: false,
    modified: false,
    specifics: {
      additionalCharacteristics: [
        { strength: 10 },
        { agility: 10 },
        { intelligence: 10 },
        { initiative: 10 },
        { health: 10 },
        { manna: 10 },
        { energy: 10 },
        { armor: 10 },
        { dodge: 10 },
        { fireResistance: 10 },
        { coldResistance: 10 },
        { acidResistance: 10 },
        { electricityResistance: 10 },
        { poisonResistance: 10 },
        { magicResistance: 10 },
      ],
      size: ['xs', 's', 'm'],
    },
    sellPrice: 100,
    buyPrice: 200,
  },
  'minor-azure-necklace': {
    itemId: 'minor-azure-necklace',
    displayName: 'Minor azure necklace',
    description: 'This simple necklace has a tiny azure stone in it, said to make it\'s owner smarter',
    possibleSlots: ['neck', ...backpackSlotNames, ...containerSlotNames],
    sprite: {
      texture: 'icon-item-set',
      frame: 135,
    },
    stackable: false,
    modified: false,
    specifics: {
      additionalCharacteristics: [
        { intelligence: 1 },
        { manna: 1 },
      ],
      size: ['xs', 's', 'm'],
    },
    sellPrice: 10,
    buyPrice: 20,
  },
};

export default neckItems;
