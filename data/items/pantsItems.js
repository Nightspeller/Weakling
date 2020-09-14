import { backpackSlotNames, containerSlotNames } from "./itemSlots.js";
export const pantsItems = {
    'leather-pants': {
        itemId: 'leather-pants',
        displayName: 'Leather pants',
        description: 'Basic leather pants',
        possibleSlots: ['pants', ...backpackSlotNames, ...containerSlotNames],
        sprite: { texture: 'icon-item-set', frame: 123 },
        stackable: false,
        modified: false,
        specifics: {
            additionalCharacteristics: [
                { 'armor': 1 },
                { 'agility': 1 }
            ],
            size: ['xs', 's', 'm'],
        },
        sellPrice: 7,
        buyPrice: 14
    },
};
//# sourceMappingURL=pantsItems.js.map