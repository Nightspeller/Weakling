export const glovesItems = {
    'work-gloves': {
        itemId: 'work-gloves',
        displayName: 'Work gloves',
        description: 'Rough-made and simple, but think and reliable gloves ideal for heavy-lifting',
        slot: ['gloves', 'backpack'],
        sprite: { key: 'icon-item-set', frame: 128 },
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            additionalCharacteristics: [
                { 'attributes.strength': 1 }
            ],
            size: ['xs', 's', 'm'],
        },
        sellPrice: 5,
        buyPrice: 10
    },
    'leather-gloves': {
        itemId: 'leather-gloves',
        displayName: 'Leather gloves',
        description: 'Basic leather gloves',
        slot: ['body', 'gloves'],
        sprite: { key: 'icon-item-set', frame: 128 },
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            additionalCharacteristics: [
                { 'attributes.strength': 1 },
                { 'parameters.health': 1 }
            ],
            size: ['xs', 's', 'm'],
        },
        sellPrice: 10,
        buyPrice: 20
    },
};
//# sourceMappingURL=glovesItems.js.map