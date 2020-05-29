import { backpackSlotNames, containerSlotNames } from "./itemSlots.js";
export const beltItems = {
    'rope-belt': {
        itemId: 'rope-belt',
        displayName: 'Rope',
        description: 'Simple rope used as a belt',
        possibleSlots: ['belt', ...backpackSlotNames, ...containerSlotNames],
        sprite: { key: 'rope-belt', frame: null },
        stackable: false,
        modified: false,
        specifics: {
            additionalCharacteristics: [],
            quickSlots: 2,
            size: ['xs', 's', 'm'],
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'fancy-belt': {
        itemId: 'fancy-belt',
        displayName: 'Fancy belt',
        description: 'This belt is made of high quality skin and has a lot of little pockets to use',
        possibleSlots: ['belt', ...backpackSlotNames, ...containerSlotNames],
        sprite: { key: 'icon-item-set', frame: 127 },
        stackable: false,
        modified: false,
        specifics: {
            additionalCharacteristics: [
                { 'attributes.strength': 1 },
                { 'attributes.agility': 1 }
            ],
            quickSlots: 3,
            size: ['xs', 's', 'm'],
        },
        sellPrice: 15,
        buyPrice: 30
    },
};
//# sourceMappingURL=beltItems.js.map