export const effects: {[key: string]: Effect} = {
    armorUp: {
        effectId: 'armorUp',
        type: 'passive',
        targetCharacteristic: 'defences.armor',
        baseDuration: 3,
        levels: {
            1: +1.33,
            2: +1.66,
            3: +2
        },
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: {texture: 'icons', frame: 119},
    },
    dodgeUp: {
        effectId: 'dodgeUp',
        type: 'passive',
        targetCharacteristic: 'defences.dodge',
        baseDuration: 3,
        levels: {
            1: +1.33,
            2: +1.66,
            3: +2
        },
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: {texture: 'icons', frame: 60},
    },
    strengthUp: {
        effectId: 'strengthUp',
        type: 'passive',
        targetCharacteristic: 'attributes.strength',
        baseDuration: 3,
        levels: {
            1: +1.33,
            2: +1.66,
            3: +2
        },
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: {texture: 'icons', frame: 20},
    },
    agilityUp: {
        effectId: 'agilityUp',
        type: 'passive',
        targetCharacteristic: 'attributes.agility',
        baseDuration: 3,
        levels: {
            1: +1.33,
            2: +1.66,
            3: +2
        },
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: {texture: 'icons', frame: 124},
    },
    trapped: {
        effectId: 'trapped',
        type: 'conditional',
        targetCharacteristic: 'parameters.currentHealth',
        baseDuration: -1,
        levels: {
            1: +1.33,
            2: +1.66,
            3: +2
        },
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: {texture: 'icons', frame: 174},
    },
    physicalDamage: {
        effectId: 'physicalDamage',
        type: 'direct',
        targetCharacteristic: 'parameters.currentHealth',
        baseDuration: null,
        levels: {
            1: +1.33,
            2: +1.66,
            3: +2
        },
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: {texture: 'icons', frame: 0},
    }
};