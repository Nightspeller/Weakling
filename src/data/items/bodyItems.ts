import { backpackSlotNames, containerSlotNames } from './itemSlots';
import { ItemData } from '../../types/my-types';

const bodyItems: { [key: string]: ItemData } = {
  'leather-armor': {
    itemId: 'leather-armor',
    displayName: 'Leather armor',
    description: 'Basic leather armor',
    possibleSlots: ['body', ...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/clothes/chests/armor-leather' },
    stackable: false,
    modified: false,
    specifics: {
      additionalCharacteristics: [
        { armor: 2 },
        { dodge: 1 },
      ],
      additionalActions: ['adjustArmor'],
      size: ['xs', 's', 'm'],
    },
    sellPrice: 10,
    buyPrice: 20,
  },
};

export default bodyItems;
