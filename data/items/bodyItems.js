import { backpackSlotNames, containerSlotNames } from "./itemSlots.js";
export const bodyItems = {
    'leather-armor': {
        itemId: 'leather-armor',
        displayName: 'Leather armor',
        description: 'Basic leather armor',
        possibleSlots: ['body', ...backpackSlotNames, ...containerSlotNames],
        sprite: { texture: 'icon-item-set', frame: 118 },
        stackable: false,
        modified: false,
        specifics: {
            additionalCharacteristics: [
                { 'armor': 2 },
                { 'dodge': 1 }
            ],
            additionalActions: ['adjustArmor'],
            size: ['xs', 's', 'm'],
        },
        sellPrice: 10,
        buyPrice: 20
    },
};
//# sourceMappingURL=bodyItems.js.map