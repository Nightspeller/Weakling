import { backpackSlotNames, containerSlotNames } from './itemSlots';
import { ItemData } from '../../types/my-types';

const bagItems: { [key: string]: ItemData } = {
  'basic-sack': {
    itemId: 'basic-sack',
    displayName: 'Basic sack',
    description: 'Small and lightweight bag designed to carry just a few items.',
    possibleSlots: ['bag', ...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/bags/weaved-basket' },
    stackable: false,
    modified: false,
    specifics: {
      additionalCharacteristics: [
        { health: 1 },
      ],
      size: ['xs', 's', 'm'],
    },
    sellPrice: 1,
    buyPrice: 2,
  },
};

export default bagItems;
