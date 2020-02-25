export const handsItems = {
    'wooden-sword-weapon': {
        itemId: 'wooden-sword-weapon',
        displayName: 'Wooden sword',
        description: 'Usually used for training rather than real fight, it is still better than nothing.',
        slot: ['rightHand', 'leftHand', 'backpack'],
        sprite: { key: 'icon-item-set', frame: 80 },
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            damage: 5,
            additionalCharacteristics: [
                { 'defences.dodge': 1 }
            ],
            size: ['xs', 's', 'm', 'l', 'xl', 'xxxl']
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'dagger-weapon': {
        itemId: 'dagger-weapon',
        displayName: 'Iron dagger',
        description: 'Simple, but quick to draw and use weapon, more common for street fights rather than epic battles.',
        slot: ['rightHand', 'leftHand', 'backpack'],
        sprite: { key: 'icon-item-set', frame: 87 },
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            damage: 10,
            additionalCharacteristics: [
                { 'defences.dodge': 2 }
            ],
            size: ['xs', 's', 'm', 'l', 'xl', 'xxxl']
        },
        sellPrice: 5,
        buyPrice: 10
    },
    'spear-weapon': {
        itemId: 'spear-weapon',
        displayName: 'Wooden spear',
        description: 'Wooden spear with the stone tip - main weapon of Kobolds',
        slot: ['rightHand', 'backpack'],
        sprite: { key: 'spear-weapon', frame: null },
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            damage: 10,
            additionalCharacteristics: [
                { 'defences.dodge': 2 }
            ],
            size: ['xs', 's', 'm', 'l', 'xl', 'xxxl']
        },
        sellPrice: 5,
        buyPrice: 10
    },
};
//# sourceMappingURL=handsItems.js.map