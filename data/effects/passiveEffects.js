export const passiveEffects = {
    armorUp: {
        effectId: 'armorUp',
        name: 'Armor up',
        description: `Armor is increased`,
        type: 'passive',
        targetCharacteristic: 'defences.armor',
        baseDuration: 3,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: { texture: 'icons', frame: 119 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: +10 * this.strength
            };
        },
    },
    dodgeUp: {
        effectId: 'dodgeUp',
        name: 'Dodge up',
        description: 'Dodge is increased',
        type: 'passive',
        targetCharacteristic: 'defences.dodge',
        baseDuration: 3,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: { texture: 'icons', frame: 60 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: +10 * this.strength
            };
        },
    },
    addStrength: {
        effectId: 'addStrength',
        name: 'Strength up',
        description: 'Strength is increased',
        type: 'passive',
        targetCharacteristic: 'attributes.strength',
        baseDuration: 3,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: { texture: 'icons', frame: 20 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: +10 * this.strength
            };
        },
    },
    agilityUp: {
        effectId: 'agilityUp',
        name: 'Agility up',
        description: 'Agility is increased',
        type: 'passive',
        targetCharacteristic: 'attributes.agility',
        baseDuration: 3,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: { texture: 'icons', frame: 124 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: +10 * this.strength
            };
        },
    },
    intelligenceUp: {
        effectId: 'intelligenceUp',
        name: 'Intelligence up',
        description: 'Intelligence is increased',
        type: 'passive',
        targetCharacteristic: 'attributes.intelligence',
        baseDuration: 3,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: { texture: 'icons', frame: 19 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: +10 * this.strength
            };
        },
    },
    intelligenceDown: {
        effectId: 'intelligenceDown',
        name: 'Intelligence down',
        description: 'Intelligence is decreased',
        type: 'passive',
        targetCharacteristic: 'attributes.intelligence',
        baseDuration: 3,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: { texture: 'icons', frame: 62 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: -10 * this.strength
            };
        },
    },
    agilityDown: {
        effectId: 'agilityDown',
        name: 'Agility down',
        description: 'Agility is decreased',
        type: 'passive',
        targetCharacteristic: 'attributes.agility',
        baseDuration: 3,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: { texture: 'icons', frame: 35 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: -10 * this.strength
            };
        },
    },
    initiativeUp: {
        effectId: 'initiativeUp',
        name: 'Initiative up',
        description: 'Initiative is increased',
        type: 'passive',
        targetCharacteristic: 'attributes.initiative',
        baseDuration: 3,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: { texture: 'icons', frame: 36 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: +10 * this.strength
            };
        },
    },
    fireResistanceUp: {
        effectId: 'fireResistanceUp',
        name: 'Fire resistance up',
        description: 'Fire resistance is increased',
        type: 'passive',
        targetCharacteristic: 'defences.fireResistance',
        baseDuration: 3,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: { texture: 'icons', frame: 57 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: +10 * this.strength
            };
        },
    },
};
//# sourceMappingURL=passiveEffects.js.map