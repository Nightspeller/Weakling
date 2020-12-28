import { backpackSlotNames, containerSlotNames } from './itemSlots';
import { ItemData } from '../../types/my-types';

const bootsItems: { [key: string]: ItemData } = {
  'leather-boots': {
    itemId: 'leather-boots',
    displayName: 'Leather boots',
    description: 'Basic leather boots',
    possibleSlots: ['boots', ...backpackSlotNames, ...containerSlotNames],
    sprite: {
      texture: 'icon-item-set',
      frame: 130,
    },
    stackable: false,
    modified: false,
    specifics: {
      additionalCharacteristics: [
        { dodge: 1 },
        { energy: 1 },
      ],
      size: ['xs', 's', 'm'],
    },
    sellPrice: 5,
    buyPrice: 10,
  },
};

export default bootsItems;
