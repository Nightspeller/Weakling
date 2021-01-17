import { backpackSlotNames, containerSlotNames } from './itemSlots';
import { ItemData } from '../../types/my-types';

const glovesItems: { [key: string]: ItemData } = {
  'work-gloves': {
    itemId: 'work-gloves',
    displayName: 'Work gloves',
    description: 'Rough-made and simple, but think and reliable gloves ideal for heavy-lifting',
    possibleSlots: ['gloves', ...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/clothes/gloves/leather-gloves' },
    stackable: false,
    modified: false,
    specifics: {
      additionalCharacteristics: [
        { strength: 1 },
      ],
      size: ['xs', 's', 'm'],
    },
    sellPrice: 5,
    buyPrice: 10,
  },
  'leather-gloves': {
    itemId: 'leather-gloves',
    displayName: 'Leather gloves',
    description: 'Basic leather gloves',
    possibleSlots: ['gloves', ...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/clothes/gloves/leather-gloves' },
    stackable: false,
    modified: false,
    specifics: {
      additionalCharacteristics: [
        { strength: 1 },
        { health: 1 },
      ],
      size: ['xs', 's', 'm'],
    },
    sellPrice: 10,
    buyPrice: 20,
  },
};

export default glovesItems;
