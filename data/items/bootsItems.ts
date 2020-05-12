export const bootsItems: { [key: string]: ItemData } = {
    'leather-boots': {
        itemId: 'leather-boots',
        displayName: 'Leather boots',
        description: 'Basic leather boots',
        slot: ['boots', 'backpack'],
        sprite: {key: 'icon-item-set', frame: 130},
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            additionalCharacteristics: [
                {'defences.dodge': 1},
                {'parameters.energy': 1}
            ],
            size: ['xs', 's', 'm'],
        },
        sellPrice: 5,
        buyPrice: 10
    },
};
