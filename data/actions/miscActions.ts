export const miscActions: { [key: string]: ActionData } = {
    drinkSmallWeakHealthPotion: {
        actionId: 'drinkSmallWeakHealthPotion',
        phase: ['preparation', 'battle'],
        type: 'misc',
        actionName: 'Drink small weak health potion',
        consumes: 'small-weak-healing-potion',
        actionDescription: 'Drink small weak health potion to restore some hp ',
        effectsDescriptions: [{
            effectId: 'heal',
            strength: 1
        }/*, {
            effectId: 'saturation',
            strength: 1
        }*/],
        target: 'self',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
        icon: {texture: 'icon-item-set', frame: 352},
        parametersCost: {},
    },
    inspectEnemy: {
        actionId: 'inspectEnemy',
        phase: ['preparation', 'battle'],
        type: 'misc',
        actionName: 'Inspect enemy',
        actionDescription: 'Spend some time learning about your enemy to make better decisions later',
        effectsDescriptions: [{
            effectId: 'intelligence',
            strength: 1
        }],
        target: 'enemy',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
        icon: {texture: 'icon-item-set', frame: 167},
        parametersCost: {},
    },
    meditate: {
        actionId: 'meditate',
        phase: ['preparation'],
        type: 'misc',
        actionName: 'Meditate',
        actionDescription: 'Clear your mind, balance and expand your energies',
        effectsDescriptions: [{
            effectId: 'restoreManna',
            strength: 1
        }, {
            effectId: 'restoreEnergy',
            strength: 1
        }],
        target: 'self',
        actionCost: 1,
        noticeable: 0,
        animation: 'castBuff',
        icon: {texture: 'icon-item-set', frame: 5},
        parametersCost: {},
    },
    accessInventory: {
        actionId: 'accessInventory',
        phase: ['preparation', 'battle'],
        type: 'misc',
        actionName: 'Access inventory',
        actionDescription: 'Sometimes even in the heat of the battle you absolutely have to do it',
        effectsDescriptions: [{
            effectId: 'openInventory',
            strength: 1
        }],
        target: 'self',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
        icon: {texture: 'icon-item-set', frame: 160},
        parametersCost: {},
    },
    enrage: {
        actionId: 'enrage',
        phase: ['battle'],
        type: 'misc',
        actionName: 'Enrage',
        actionDescription: 'Character gets really angry, loosing the ability to think straight, but gaining extra strength',
        effectsDescriptions: [{
            effectId: 'strengthUp',
            strength: 1
        }, {
            effectId: 'intelligenceDown',
            strength: 1
        }],
        target: 'self',
        actionCost: 0.5,
        noticeable: 1,
        animation: 'castBuff',
        icon: {texture: 'icon-item-set', frame: 59},
        parametersCost: {energy: 3},
    },
};
