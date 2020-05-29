import {backpackSlotNames, containerSlotNames} from "./itemSlots.js";

export const handsItems: { [key: string]: ItemData } = {
    'wooden-sword-weapon': {
        itemId: 'wooden-sword-weapon',
        displayName: 'Wooden sword',
        description: 'Usually used for training rather than real fight, it is still better than nothing.',
        possibleSlots: ['rightHand', 'leftHand', ...backpackSlotNames, ...containerSlotNames],
        sprite: {key: 'icon-item-set', frame: 80},
        stackable: false,
        modified: false,
        specifics: {
            damage: 5,
            additionalCharacteristics: [
                {'defences.dodge': 1}
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
        possibleSlots: ['rightHand', 'leftHand', ...backpackSlotNames, ...containerSlotNames],
        sprite: {key: 'icon-item-set', frame: 87},
        stackable: false,
        modified: false,
        specifics: {
            damage: 10,
            additionalCharacteristics: [
                {'defences.dodge': 2}
            ],
            size: ['xs', 's', 'm', 'l', 'xl', 'xxxl']
        },
        sellPrice: 5,
        buyPrice: 10
    },
    'spirit-sword': {
        itemId: 'spirit-sword',
        displayName: 'Spirit sword',
        description: 'The sword left by the great hero, the protector of poor and weak - it can be used only for the good deeds.',
        possibleSlots: ['rightHand', 'leftHand', ...backpackSlotNames, ...containerSlotNames],
        sprite: {key: 'icon-item-set', frame: 84},
        stackable: false,
        modified: false,
        specifics: {
            damage: 15,
            additionalCharacteristics: [
                {'defences.magicResistance': 5}
            ],
            size: ['xs', 's', 'm', 'l', 'xl', 'xxxl']
        },
        sellPrice: 50,
        buyPrice: 100
    },
    'spear-weapon': {
        itemId: 'spear-weapon',
        displayName: 'Wooden spear',
        description: 'Wooden spear with the stone tip - main weapon of Kobolds',
        possibleSlots: ['rightHand', ...backpackSlotNames, ...containerSlotNames],
        sprite: {key: 'spear-weapon', frame: null},
        stackable: false,
        modified: false,
        specifics: {
            damage: 10,
            additionalCharacteristics: [
                {'defences.dodge': 2}
            ],
            size: ['xs', 's', 'm', 'l', 'xl', 'xxxl']
        },
        sellPrice: 5,
        buyPrice: 10
    },
};
