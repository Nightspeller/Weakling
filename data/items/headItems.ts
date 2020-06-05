import {backpackSlotNames, containerSlotNames} from "./itemSlots.js";

export const headItems: { [key: string]: ItemData } = {
    'rangers-hat': {
        itemId: 'rangers-hat',
        displayName: 'Ranger\'s hat',
        description: 'Classic ranger\'s hat - provides very little protection, but does not get in a way',
        possibleSlots: ['head', ...backpackSlotNames, ...containerSlotNames],
        sprite: {texture: 'icon-item-set', frame: 112},
        stackable: false,
        modified: false,
        specifics: {
            additionalCharacteristics: [
                {'attributes.agility': 1},
                {'attributes.initiative': 1},
                {'defences.armor': 1},
            ],
            size: ['xs', 's', 'm'],
        },
        sellPrice: 5,
        buyPrice: 10
    },
};
