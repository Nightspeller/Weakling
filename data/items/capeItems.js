import { backpackSlotNames, containerSlotNames } from "./itemSlots.js";
export const capeItems = {
    'invisibility-cape': {
        itemId: 'invisibility-cape',
        displayName: 'Invisibility cloak',
        description: 'Once per battle allows you to become invisible for your enemies',
        possibleSlots: ['cape', ...backpackSlotNames, ...containerSlotNames],
        sprite: { texture: 'icon-item-set', frame: 126 },
        stackable: false,
        modified: false,
        specifics: {
            skills: ['invisibility'],
            additionalCharacteristics: [
                { 'magicResistance': 2 }
            ],
            size: ['xs', 's', 'm', 'l', 'xl', 'xxxl']
        },
        sellPrice: 30,
        buyPrice: 60
    },
};
//# sourceMappingURL=capeItems.js.map