import {backpackSlotNames, containerSlotNames, quickSlotNames} from "./itemSlots.js";

export const quickSlotItems: { [key: string]: ItemData } = {
    'medium-weak-strength-potion': {
        itemId: 'medium-weak-strength-potion',
        displayName: 'Medium weak strength potion',
        description: 'Very basic strength potion, medium size.',
        possibleSlots: [...quickSlotNames, ...backpackSlotNames, ...containerSlotNames],
        sprite: {key: 'icon-item-set', frame: 157},
        stackable: true,
        modified: false,
        quantity: null,
        specifics: {
            useEffects: [
                {'attributes.strength': 2}
            ],
            additionalActions: ['drinkMediumWeakStrengthPotion']
        },
        sellPrice: 2,
        buyPrice: 4
    },
    'small-weak-healing-potion': {
        itemId: 'small-weak-healing-potion',
        displayName: 'Minor weak healing potion',
        description: 'Very basic healing potion.',
        possibleSlots: [...quickSlotNames, ...backpackSlotNames, ...containerSlotNames],
        sprite: {key: 'icon-item-set', frame: 352},
        stackable: true,
        modified: false,
        quantity: null,
        specifics: {
            useEffects: [
                {'parameters.currentHealth': 5}
            ],
            additionalActions: ['drinkSmallWeakHealthPotion']
        },
        sellPrice: 2,
        buyPrice: 4
    },
    'medium-weak-healing-potion': {
        itemId: 'medium-weak-healing-potion',
        displayName: 'Medium weak healing potion',
        description: 'Very basic healing potion, medium size.',
        possibleSlots: [...quickSlotNames, ...backpackSlotNames, ...containerSlotNames],
        sprite: {key: 'icon-item-set', frame: 156},
        stackable: true,
        modified: false,
        quantity: null,
        specifics: {
            useEffects: [
                {'parameters.currentHealth': 10}
            ],
        },
        sellPrice: 2,
        buyPrice: 4
    },
    'big-weak-healing-potion': {
        itemId: 'big-weak-healing-potion',
        displayName: 'Big weak healing potion',
        description: 'Very basic healing potion, big size.',
        possibleSlots: [...quickSlotNames, ...backpackSlotNames, ...containerSlotNames],
        sprite: {key: 'icon-item-set', frame: 144},
        stackable: true,
        modified: false,
        quantity: null,
        specifics: {
            useEffects: [
                {'parameters.currentHealth': 15}
            ],
        },
        sellPrice: 2,
        buyPrice: 4
    },
    'giant-weak-healing-potion': {
        itemId: 'giant-weak-healing-potion',
        displayName: 'Giant weak healing potion',
        description: 'Very basic healing potion, giant size.',
        possibleSlots: [...quickSlotNames, ...backpackSlotNames, ...containerSlotNames],
        sprite: {key: 'icon-item-set', frame: 308},
        stackable: true,
        modified: false,
        quantity: null,
        specifics: {
            useEffects: [
                {'parameters.currentHealth': 20}
            ],
        },
        sellPrice: 2,
        buyPrice: 4
    },
    'trap-kit': {
        itemId: 'trap-kit',
        displayName: 'Trap kit',
        description: 'Simple trap kit',
        possibleSlots: [...quickSlotNames, ...backpackSlotNames, ...containerSlotNames],
        sprite: {key: 'icon-item-set', frame: 174},
        stackable: true,
        modified: false,
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
        possibleSlots: [...quickSlotNames, ...backpackSlotNames, ...containerSlotNames],
        sprite:  {key: 'icon-item-set', frame: 254},
        stackable: true,
        modified: false,
        quantity: null,
        specifics: {
            useEffects: [
                {'parameters.currentHealth': 1}
            ],
        },
        sellPrice: 2,
        buyPrice: 3
    },
};
