export const items: { [key: string]: Item } = {
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
    'leather-armor': {
        itemId: 'leather-armor',
        displayName: 'Leather armor',
        description: 'Basic leather armor',
        slot: ['body', 'backpack'],
        sprite: {key: 'icon-item-set', frame: 118},
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            additionalCharacteristics: [
                {'defences.armor': 2},
                {'defences.dodge': 1}
            ],
            size: ['xs', 's', 'm'],
        },
        sellPrice: 10,
        buyPrice: 20
    },
    'allpowerful-necklace': {
        itemId: 'allpowerful-necklace',
        displayName: 'All-powerful necklace',
        description: 'Unbelievably rare and powerful artifact, which improves it\'s owner in pretty much every way',
        slot: ['neck', 'backpack'],
        sprite: {key: 'allpowerful-necklace', frame: null},
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            additionalCharacteristics: [
                {'attributes.strength': 10},
                {'attributes.agility': 10},
                {'attributes.intelligence': 10},
                {'attributes.initiative': 10},
                {'parameters.health': 10},
                /*{'parameters.currentHealth': 10},*/
                {'parameters.manna': 10},
                /*{'parameters.currentManna': 10},*/
                {'parameters.energy': 10},
                /*{'parameters.currentEnergy': 10},*/
                {'defences.armor': 10},
                {'defences.dodge': 10},
                {'defences.fireResistance': 10},
                {'defences.coldResistance': 10},
                {'defences.acidResistance': 10},
                {'defences.electricityResistance': 10},
                {'defences.poisonResistance': 10},
                {'defences.magicResistance': 10},
            ],
            size: ['xs', 's', 'm'],
        },
        sellPrice: 100,
        buyPrice: 200
    },
    'rangers-hat': {
        itemId: 'rangers-hat',
        displayName: 'Ranger\'s hat',
        description: 'Classic ranger\'s hat - provides very little protection, but does not get in a way',
        slot: ['head', 'backpack'],
        sprite: {key: 'icon-item-set', frame: 112},
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            additionalCharacteristics: [
                {'attributes.agility': 1},
                {'attributes.initiative': 1},
                {'defences.armor': 1},
            ],
            size: ['xs', 's', 'm'],
        },
        sellPrice: 5,
        buyPrice: 10
    },
    'minor-healing-potion': {
        itemId: 'minor-healing-potion',
        displayName: 'Minor healing potion',
        description: 'Very basic healing potion.',
        slot: ['quickSlot', 'backpack'],
        sprite: {key: 'potion-sheet', frame: 0},
        stackable: true,
        modified: false,
        currentSlot: null,
        quantity: 3,
        specifics: {
            useEffects: [
                {'parameters.currentHealth': 5}
            ],
        },
        sellPrice: 2,
        buyPrice: 4
    },
    'wooden-sword-weapon': {
        itemId: 'wooden-sword-weapon',
        displayName: 'Wooden sword',
        description: 'Usually used for training rather than real fight, it is still better than nothing.',
        slot: ['rightHand', 'leftHand', 'backpack'],
        sprite: {key: 'icon-item-set', frame: 80},
        stackable: false,
        modified: false,
        currentSlot: null,
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
        slot: ['rightHand', 'leftHand', 'backpack'],
        sprite: {key: 'icon-item-set', frame: 87},
        stackable: false,
        modified: false,
        currentSlot: null,
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
    'invisibility-cape': {
        itemId: 'invisibility-cape',
        displayName: 'Invisibility cloak',
        description: 'Once per battle allows you to become invisible for your enemies',
        slot: ['cape', 'backpack'],
        sprite: {key: 'icon-item-set', frame: 126},
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            skills: ['invisibility'],
            additionalCharacteristics: [
                {'defences.magicResistance': 2}
            ],
            size: ['xs', 's', 'm', 'l', 'xl', 'xxxl']
        },
        sellPrice: 30,
        buyPrice: 60
    },
    'basket': {
        itemId: 'basket',
        displayName: 'Basket',
        description: 'Accurately made, sturdy baskets made by aunt Nahkha for sale',
        slot: ['backpack'],
        sprite: {key: 'icon-item-set', frame: 160},
        stackable: true,
        modified: false,
        currentSlot: null,
        specifics: { },
        sellPrice: 5,
        buyPrice: 10
    },
    'copper-pieces': {
        itemId: 'copper-pieces',
        displayName: 'Copper pieces',
        description: 'Basic currency of Ardhon',
        slot: ['backpack'],
        sprite: {key: 'icon-item-set', frame: 200},
        stackable: true,
        modified: false,
        currentSlot: null,
        specifics: {},
        sellPrice: 1,
        buyPrice: 1
    }
};