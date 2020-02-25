export const beltItems: { [key: string]: ItemData } = {
    'rope-belt': {
        itemId: 'rope-belt',
        displayName: 'Rope',
        description: 'Simple rope used as a belt',
        slot: ['belt', 'backpack'],
        sprite: {key: 'rope-belt', frame: null},
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            additionalCharacteristics: [],
            quickSlots: 1,
            size: ['xs', 's', 'm'],
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'fancy-belt': {
        itemId: 'fancy-belt',
        displayName: 'Fancy belt',
        description: 'This belt is made of high quality skin and has a lot of little pockets to use',
        slot: ['belt', 'backpack'],
        sprite: {key: 'icon-item-set', frame: 127},
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            additionalCharacteristics: [
                {'attributes.strength': 1},
                {'attributes.agility': 1}
            ],
            quickSlots: 2,
            size: ['xs', 's', 'm'],
        },
        sellPrice: 15,
        buyPrice: 30
    },
};
