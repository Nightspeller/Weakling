export const weapons = {
    'fist-weapon': {
        weaponId: 'fist-weapon',
        damage: 10,
        slot: 'anyHand',
        sprite: { key: 'icon-item-set', frame: 95 },
        size: ['xs', 's', 'm', 'l', 'xl', 'xxxl']
    }
};
export const belts = {
    'rope-belt': {
        beltId: 'rope-belt',
        additionalCharacteristics: [],
        quickSlots: 1,
        slot: 'belt',
        sprite: { key: 'rope-belt', frame: null },
        size: ['xs', 's', 'm'],
    },
    'fancy-belt': {
        beltId: 'fancy-belt',
        additionalCharacteristics: [],
        quickSlots: 2,
        slot: 'belt',
        sprite: { key: 'icons', frame: 127 },
        size: ['xs', 's', 'm'],
    }
};
export const items = {
    'rope-belt': {
        itemId: 'rope-belt',
        slot: ['belt', 'backpack'],
        sprite: { key: 'rope-belt', frame: null },
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            additionalCharacteristics: [],
            quickSlots: 1,
            size: ['xs', 's', 'm'],
        }
    },
    'fancy-belt': {
        itemId: 'fancy-belt',
        slot: ['belt', 'backpack'],
        sprite: { key: 'icon-item-set', frame: 127 },
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            additionalCharacteristics: [
                { 'attributes.strength': 1 },
                { 'attributes.agility': 1 }
            ],
            quickSlots: 2,
            size: ['xs', 's', 'm'],
        }
    },
    'minor-healing-potion': {
        itemId: 'minor-healing-potion',
        slot: ['quickSlot', 'backpack'],
        sprite: { key: 'potion-sheet', frame: 0 },
        stackable: true,
        modified: false,
        currentSlot: null,
        quantity: 3,
        specifics: {
            additionalCharacteristics: [
                { 'parameters.currentHealth': 5 }
            ],
        }
    },
    'fist-weapon': {
        itemId: 'fist-weapon',
        slot: ['rightHand', 'leftHand', 'backpack'],
        sprite: { key: 'icon-item-set', frame: 95 },
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            damage: 5,
            additionalCharacteristics: [
                { 'defences.dodge': 1 }
            ],
            size: ['xs', 's', 'm', 'l', 'xl', 'xxxl']
        }
    },
    'dagger-weapon': {
        itemId: 'dagger-weapon',
        slot: ['rightHand', 'leftHand', 'backpack'],
        sprite: { key: 'icon-item-set', frame: 87 },
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            damage: 10,
            additionalCharacteristics: [
                { 'defences.dodge': 1 }
            ],
            size: ['xs', 's', 'm', 'l', 'xl', 'xxxl']
        }
    }
};
//# sourceMappingURL=items.js.map