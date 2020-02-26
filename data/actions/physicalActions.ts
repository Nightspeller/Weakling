export const physicalActions: { [key: string]: ActionData } = {
    warmUp: {
        actionId: 'warmUp',
        phase: ['preparation', 'battle'],
        type: 'physical',
        actionName: 'Warm up',
        actionDescription: 'Sets you in your best physical shape for the upcoming battle',
        effectsDescriptions: [{
            effectId: 'strengthUp',
            strength: 1
        }, {
            effectId: 'agilityUp',
            strength: 1
        }],
        target: 'self',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
    },
    adjustArmor: {
        actionId: 'adjustArmor',
        phase: ['preparation', 'battle'],
        type: 'physical',
        actionName: 'Adjust armor',
        actionDescription: 'Making sure that your gear is in perfect shape and does not get in a way',
        effectsDescriptions: [{
            effectId: 'armorUp',
            strength: 1
        }, {
            effectId: 'dodgeUp',
            strength: 1
        }],
        target: 'self',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
    },
    setTrap: {
        actionId: 'setTrap',
        phase: ['preparation'],
        type: 'physical',
        actionName: 'Set a trap',
        actionDescription: 'Sets a trap on the most likely way of the selected opponent',
        effectsDescriptions: [{
            effectId: 'trapped',
            strength: 1
        }],
        target: 'enemy',
        actionCost: 0.5,
        noticeable: 0.1,
        animation: 'meleeAttack',
    },
    meleeAttack: {
        actionId: 'meleeAttack',
        phase: ['battle'],
        type: 'physical',
        actionName: 'Melee attack',
        actionDescription: 'Hits the opponent with equipped melee weapon',
        effectsDescriptions: [{
            effectId: 'physicalDamage',
            strength: 1
        }],
        target: 'enemy',
        actionCost: 1,
        noticeable: 1,
        animation: 'meleeAttack',
    },
    wildRush: {
        actionId: 'wildRush',
        phase: ['battle'],
        type: 'physical',
        actionName: 'Wild rush',
        actionDescription: 'Character rushes to attack it\'s target',
        effectsDescriptions: [{
            effectId: 'physicalDamage',
            strength: 1
        }],
        target: 'enemy',
        actionCost: 1,
        noticeable: 1,
        triggers: [
            {conditionId: 'trapped', probability: 0.75, conditionDisplayName: 'Trapped'},
            {conditionId: 'cursedSoil', probability: 0.75, conditionDisplayName: 'Cursed Soil'}
        ],
        animation: 'meleeAttack',
    },
};
