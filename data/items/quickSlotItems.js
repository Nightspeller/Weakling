export const quickSlotItems = {
    'minor-healing-potion': {
        itemId: 'minor-healing-potion',
        displayName: 'Minor healing potion',
        description: 'Very basic healing potion.',
        slot: ['quickSlot', 'backpack'],
        sprite: { key: 'potion-sheet', frame: 0 },
        stackable: true,
        modified: false,
        currentSlot: null,
        quantity: null,
        specifics: {
            useEffects: [
                { 'parameters.currentHealth': 5 }
            ],
        },
        sellPrice: 2,
        buyPrice: 4
    },
    'trap-kit': {
        itemId: 'trap-kit',
        displayName: 'Trap kit',
        description: 'Simple trap kit',
        slot: ['quickSlot', 'backpack'],
        sprite: { key: 'icon-item-set', frame: 174 },
        stackable: true,
        modified: false,
        currentSlot: null,
        quantity: null,
        specifics: {
            additionalActions: ['setTrap']
        },
        sellPrice: 5,
        buyPrice: 10
    },
    'beer': {
        itemId: 'beer',
        displayName: 'Beer',
        description: 'Local beer.',
        slot: ['quickSlot', 'backpack'],
        sprite: { key: 'icon-item-set', frame: 254 },
        stackable: true,
        modified: false,
        currentSlot: null,
        quantity: null,
        specifics: {
            useEffects: [
                { 'parameters.currentHealth': 1 }
            ],
        },
        sellPrice: 2,
        buyPrice: 3
    },
};
//# sourceMappingURL=quickSlotItems.js.map