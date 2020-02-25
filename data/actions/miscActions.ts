export const miscActions: { [key: string]: ActionData } = {
    drinkWeakHealthPotion: {
        actionId: 'drinkWeakHealthPotion',
        phase: ['preparation', 'battle'],
        type: 'misc',
        actionName: 'Drink weak health potion',
        requires: 'weakHealthPotion',
        actionDescription: 'Drink weak health potion to restore some hp ',
        effect: [{
            effectId: 'health',
            source: '',
            level: 10
        }, {
            effectId: 'saturation',
            source: '',
            level: 1
        }],
        target: 'self',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
    },
    inspectEnemy: {
        actionId: 'inspectEnemy',
        phase: ['preparation', 'battle'],
        type: 'misc',
        actionName: 'Inspect enemy',
        actionDescription: 'Spend some time learning about your enemy to make better decisions later',
        effect: [{
            effectId: 'intelligence',
            source: '',
            level: 1
        }],
        target: 'enemy',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
    },
    meditate: {
        actionId: 'meditate',
        phase: ['preparation'],
        type: 'misc',
        actionName: 'Meditate',
        actionDescription: 'Clear your mind, balance and expand your energies',
        effect: [{
            effectId: 'restoreManna',
            source: 'meditate',
            level: 1
        }, {
            effectId: 'restoreEnergy',
            source: 'meditate',
            level: 1
        }],
        target: 'self',
        actionCost: 1,
        noticeable: 0,
        animation: 'castBuff',
    },
    accessInventory: {
        actionId: 'accessInventory',
        phase: ['preparation', 'battle'],
        type: 'misc',
        actionName: 'Access inventory',
        actionDescription: 'Sometimes even in the heat of the battle you absolutely have to do it',
        effect: [{
            effectId: 'openInventory',
            source: 'accessInventory',
            level: 1
        }],
        target: 'self',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
    },
    enrage: {
        actionId: 'enrage',
        phase: ['battle'],
        type: 'misc',
        actionName: 'Enrage',
        actionDescription: 'Character gets really angry, loosing the ability to think straight, but gaining extra strength',
        effect: [{
            effectId: 'strengthUp',
            source: 'enrage',
            level: 1
        }, {
            effectId: 'intelligenceDown',
            source: 'enrage',
            level: 1
        }],
        target: 'self',
        actionCost: 0.5,
        noticeable: 1,
        animation: 'castBuff',
    },
};
