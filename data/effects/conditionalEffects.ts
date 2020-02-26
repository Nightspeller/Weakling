export const conditionalEffects: { [key: string]: EffectData } = {
    trapped: {
        effectId: 'trapped',
        name: 'Trap prepared',
        description: 'Trap is set on the character\'s path',
        type: 'conditional',
        targetCharacteristic: 'parameters.currentHealth',
        baseDuration: -1,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: {texture: 'icons', frame: 174},
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'effect',
                value: ['pureDamage']
            };
        },
    },
    cursedSoil: {
        effectId: 'cursedSoil',
        name: 'Cursed soil',
        description: 'The soil is cursed on the character\'s path',
        type: 'conditional',
        baseDuration: -1,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: {texture: 'icons', frame: 283},
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'effect',
                value: ['pureDamage', 'agilityDown']
            };
        },
    },
};
