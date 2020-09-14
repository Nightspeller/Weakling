import { backpackSlotNames, containerSlotNames } from "./itemSlots.js";
export const ringsItems = {
    'smoldering-ring': {
        itemId: 'smoldering-ring',
        displayName: 'Smoldering ring',
        description: 'This ring looks like it is made of smoldering coal, but it does not burn you, just warming your finger ever so slightly.',
        possibleSlots: ['ringLeft', 'ringRight', ...backpackSlotNames, ...containerSlotNames],
        sprite: { texture: 'icon-item-set', frame: 133 },
        stackable: false,
        modified: false,
        quantity: null,
        specifics: {
            additionalActions: ['fireball']
        },
        sellPrice: 75,
        buyPrice: 150
    },
    'minor-energy-ring': {
        itemId: 'minor-energy-ring',
        displayName: 'Minor energy ring',
        description: `This ring has some simple enchantment on it, making it's bearer more energetic.`,
        possibleSlots: ['ringLeft', 'ringRight', ...backpackSlotNames, ...containerSlotNames],
        sprite: { texture: 'icon-item-set', frame: 132 },
        stackable: false,
        modified: false,
        quantity: null,
        specifics: {
            additionalCharacteristics: [
                { 'energy': 2 },
            ],
            size: ['xs', 's', 'm'],
        },
        sellPrice: 10,
        buyPrice: 20
    },
};
//# sourceMappingURL=ringsItems.js.map