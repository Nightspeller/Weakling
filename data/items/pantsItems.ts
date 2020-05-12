export const pantsItems: { [key: string]: ItemData } = {
    'leather-pants': {
        itemId: 'leather-pants',
        displayName: 'Leather pants',
        description: 'Basic leather pants',
        slot: ['pants', 'backpack'],
        sprite: {key: 'icon-item-set', frame: 123},
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            additionalCharacteristics: [
                {'defences.armor': 1},
                {'attributes.agility': 1}
            ],
            size: ['xs', 's', 'm'],
        },
        sellPrice: 7,
        buyPrice: 14
    },
};
