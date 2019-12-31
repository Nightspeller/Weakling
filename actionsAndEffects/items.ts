export const items: { [key: string]: Item } = {
    'rope-belt': {
        itemId: 'rope-belt',
        slot: ['belt', 'backpack'],
        sprite: {key: 'rope-belt', frame: null},
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
        }
    },
    'leather-armor': {
        itemId: 'leather-armor',
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
        }
    },
    'allpowerful-necklace': {
        itemId: 'allpowerful-necklace',
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
        }
    },
    'minor-healing-potion': {
        itemId: 'minor-healing-potion',
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
        }
    },
    'wooden-sword-weapon': {
        itemId: 'wooden-sword-weapon',
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
        }
    },
    'dagger-weapon': {
        itemId: 'dagger-weapon',
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
        }
    }
};