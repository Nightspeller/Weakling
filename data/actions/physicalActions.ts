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
        icon: {texture: 'icon-item-set', frame: 20},
        parametersCost: {energy: 3},
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
        icon: {texture: 'icon-item-set', frame: 119},
        parametersCost: {energy: 3},
    },
    setTrap: {
        actionId: 'setTrap',
        phase: ['preparation', 'battle'],
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
        icon: {texture: 'icon-item-set', frame: 174},
        parametersCost: {energy: 3},
    },
    meleeAttack: {
        actionId: 'meleeAttack',
        phase: ['battle', "preparation"],
        type: 'misc',
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
        icon: {texture: 'icon-item-set', frame: 95},
        parametersCost: {energy: 3},
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
        icon: {texture: 'icon-item-set', frame: 95},
        parametersCost: {energy: 3},
    },
};
