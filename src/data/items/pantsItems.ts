import { backpackSlotNames, containerSlotNames } from './itemSlots';
import { ItemData } from '../../types/my-types';

const pantsItems: { [key: string]: ItemData } = {
  'leather-pants': {
    itemId: 'leather-pants',
    displayName: 'Leather pants',
    description: 'Basic leather pants',
    possibleSlots: ['pants', ...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/clothes/pants/leather-shorts' },
    stackable: false,
    modified: false,
    specifics: {
      additionalCharacteristics: [
        { armor: 1 },
        { agility: 1 },
      ],
      size: ['xs', 's', 'm'],
    },
    sellPrice: 7,
    buyPrice: 14,
  },
};

export default pantsItems;
