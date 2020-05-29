import { backpackSlotNames, containerSlotNames } from "./itemSlots.js";
export const headItems = {
    'rangers-hat': {
        itemId: 'rangers-hat',
        displayName: 'Ranger\'s hat',
        description: 'Classic ranger\'s hat - provides very little protection, but does not get in a way',
        possibleSlots: ['head', ...backpackSlotNames, ...containerSlotNames],
        sprite: { key: 'icon-item-set', frame: 112 },
        stackable: false,
        modified: false,
        specifics: {
            additionalCharacteristics: [
                { 'attributes.agility': 1 },
                { 'attributes.initiative': 1 },
                { 'defences.armor': 1 },
            ],
            size: ['xs', 's', 'm'],
        },
        sellPrice: 5,
        buyPrice: 10
    },
};
//# sourceMappingURL=headItems.js.map