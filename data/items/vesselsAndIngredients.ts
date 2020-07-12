import {backpackSlotNames, componentSlotNames, containerSlotNames} from "./itemSlots.js";

export const vesselsAndIngredients: { [key: string]: ItemData } = {
    'small-bottle': {
        itemId: 'small-bottle',
        displayName: 'Small empty bottle',
        description: 'Small and cheap empty bottle, nothing special',
        possibleSlots: ['vesselSlot', ...backpackSlotNames, ...containerSlotNames],
        sprite: {texture: 'icon-item-set', frame: 306},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
    'medium-bottle': {
        itemId: 'medium-bottle',
        displayName: 'Medium empty bottle',
        description: 'Medium empty bottle',
        possibleSlots: ['vesselSlot', ...backpackSlotNames, ...containerSlotNames],
        sprite: {texture: 'icon-item-set', frame: 305},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
    'big-bottle': {
        itemId: 'big-bottle',
        displayName: 'Big empty bottle',
        description: 'Big empty bottle',
        possibleSlots: ['vesselSlot', ...backpackSlotNames, ...containerSlotNames],
        sprite: {texture: 'icon-item-set', frame: 304},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
    'giant-bottle': {
        itemId: 'giant-bottle',
        displayName: 'Giant empty bottle',
        description: 'Giant empty bottle',
        possibleSlots: ['vesselSlot', ...backpackSlotNames, ...containerSlotNames],
        sprite: {texture: 'icon-item-set', frame: 307},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
    'coal': {
        itemId: 'coal',
        displayName: 'Coal',
        description: 'A piece of coal which can be used for alchemy or just to paint something on the wall.',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'base', frame: 69},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
    'sourgrass': {
        itemId: 'sourgrass',
        displayName: 'Sourgrass',
        description: 'Common grass growing in this area. Consumed by herbivore animals, and sometimes as a spice by humans.',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'icon-item-set', frame: 189},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
    'bone': {
        itemId: 'bone',
        displayName: 'Bone',
        description: 'Bone of some unlucky creature',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'icon-item-set', frame: 281},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 2,
        buyPrice: 4
    },
    'bone-dust': {
        itemId: 'bone-dust',
        displayName: 'Bone dust',
        description: 'Calcium-reach powder made out of bones',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'icon-item-set', frame: 331},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 2,
        buyPrice: 4
    },
    'purplecup-mushroom': {
        itemId: 'purplecup-mushroom',
        displayName: 'Purplecup mushroom',
        description: 'Delicious mushroom growing deep in the caverns.',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'base', frame: 57},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 3,
        buyPrice: 6
    },
    'purplecup-spore': {
        itemId: 'purplecup-spore',
        displayName: 'Spores of Purplecups',
        description: 'Spores of Purplecups mushrooms - can be crown into full mushroom',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'icon-item-set', frame: 192},
        stackable: true,
        modified: false,
        specifics: {
            plantable: 'purplecup-mushroom'
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'longshroom-mushroom': {
        itemId: 'longshroom-mushroom',
        displayName: 'Longshroom mushroom',
        description: 'Funny looking and very tasty mushrooms, perfect for a stew.',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'base-addition', frame: 230},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 3,
        buyPrice: 6
    },
    'longshroom-spore': {
        itemId: 'longshroom-spore',
        displayName: 'Spores of Longshroom',
        description: 'Spores of Longshroom mushrooms - can be crown into full mushroom',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'icon-item-set', frame: 192},
        stackable: true,
        modified: false,
        specifics: {
            plantable: 'longshroom-mushroom'
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'apple': {
        itemId: 'apple',
        displayName: 'Apple',
        description: `It is an apple. That's about it.`,
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'icon-item-set', frame: 224},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
    'primula-flower': {
        itemId: 'primula-flower',
        displayName: 'Primula',
        description: 'Beautiful blue flower',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'base', frame: 54},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
    'rocky-rose-flower': {
        itemId: 'rocky-rose-flower',
        displayName: 'Rocky Rose flower',
        description: 'The flower of Rocky Rose',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'base', frame: 172},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
    'yellow-fingers-flower': {
        itemId: 'yellow-fingers-flower',
        displayName: 'Yellow Fingers flower',
        description: 'The flower of Yellow Fingers flower',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'base', frame: 55},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
    'pinky-pie-flower': {
        itemId: 'pinky-pie-flower',
        displayName: 'Pinky Pie flower',
        description: 'The flower of Pinky Pie flower',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'base', frame: 53},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
    'primula-sapling': {
        itemId: 'primula-sapling',
        displayName: 'Primula sapling',
        description: 'The sapling of blue Primula',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'base-addition', frame: 234},
        stackable: true,
        modified: false,
        specifics: {
            plantable: 'primula-flower'
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'rocky-rose-sapling': {
        itemId: 'rocky-rose-sapling',
        displayName: 'Rocky Rose sapling',
        description: 'The sapling of Rocky Rose',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'base-addition', frame: 234},
        stackable: true,
        modified: false,
        specifics: {
            plantable: 'rocky-rose-flower'
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'yellow-fingers-sapling': {
        itemId: 'yellow-fingers-sapling',
        displayName: 'Yellow Fingers sapling',
        description: 'The sapling of Yellow Fingers flower',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'base-addition', frame: 234},
        stackable: true,
        modified: false,
        specifics: {
            plantable: 'yellow-fingers-flower'
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'pinky-pie-sapling': {
        itemId: 'pinky-pie-sapling',
        displayName: 'Pinky Pie sapling',
        description: 'The sapling of Pinky Pie flower',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'base-addition', frame: 234},
        stackable: true,
        modified: false,
        specifics: {
            plantable: 'pinky-pie-flower'
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'garlic-seeds': {
        itemId: 'carrot-seeds',
        displayName: 'Garlic seeds',
        description: 'The seeds of the garlic',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'icon-item-set', frame: 198},
        stackable: true,
        modified: false,
        specifics: {
            plantable: 'garlic'
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'garlic': {
        itemId: 'garlic',
        displayName: 'Garlic',
        description: 'Nice grown garlic',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'icon-item-set', frame: 232},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
    'carrot-seeds': {
        itemId: 'carrot-seeds',
        displayName: 'Carrot seeds',
        description: 'The seeds of the carrots',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'icon-item-set', frame: 198},
        stackable: true,
        modified: false,
        specifics: {
            plantable: 'carrot'
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'carrot': {
        itemId: 'carrot',
        displayName: 'Carrot',
        description: 'Nice grown carrot',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'icon-item-set', frame: 230},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 4,
        buyPrice: 8
    },
    'cabbage-seeds': {
        itemId: 'cabbage-seeds',
        displayName: 'Cabbage seeds',
        description: 'The seeds of the cabbage',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'icon-item-set', frame: 198},
        stackable: true,
        modified: false,
        specifics: {
            plantable: 'cabbage'
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'cabbage': {
        itemId: 'cabbage',
        displayName: 'Cabbage',
        description: 'Nice grown cabbage',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'base', frame: 167},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
    'pumpkin-seeds': {
        itemId: 'pumpkin-seeds',
        displayName: 'Pumpkin seeds',
        description: 'The seeds of the pumpkin',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'icon-item-set', frame: 198},
        stackable: true,
        modified: false,
        specifics: {
            plantable: 'pumpkin'
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'pumpkin': {
        itemId: 'pumpkin',
        displayName: 'Pumpkin',
        description: 'Nice grown pumpkin',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'base', frame: 166},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
    'strawberry-seeds': {
        itemId: 'strawberry-seeds',
        displayName: 'Strawberry seeds',
        description: 'The seeds of the strawberry',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'icon-item-set', frame: 198},
        stackable: true,
        modified: false,
        specifics: {
            plantable: 'strawberry'
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'strawberry': {
        itemId: 'strawberry',
        displayName: 'Strawberry',
        description: 'Nice grown strawberry',
        possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
        sprite: {texture: 'icon-item-set', frame: 228},
        stackable: true,
        modified: false,
        specifics: {},
        sellPrice: 1,
        buyPrice: 2
    },
};
