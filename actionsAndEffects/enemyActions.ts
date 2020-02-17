export const enemyActions: { [key: string]: Action } = {
    wildRush: {
        actionId: 'wildRush',
        phase: ['battle'],
        type: 'physical',
        actionName: 'Wild rush',
        actionDescription: 'Character rushes to attack it\'s target',
        effect: [{
            effectId: 'physicalDamage',
            source: 'wildRush',
            level: 1
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
    magicMissile: {
        actionId: 'magicMissile',
        phase: ['battle'],
        type: 'magical',
        actionName: 'Magic Missile',
        actionDescription: 'One of the most basic, yet one of the most important spells in the spellbook of any wizard.',
        effect: [{
            effectId: 'magicalDamage',
            source: 'magicMissile',
            level: 1
        }],
        target: 'enemy',
        actionCost: 1,
        noticeable: 1,
        triggers: [],
        animation: 'meleeAttack',
    },
    swiftMind: {
        actionId: 'swiftMind',
        phase: ['preparation', 'battle'],
        type: 'magical',
        actionName: 'Swift mind',
        actionDescription: 'You think faster, allowing you to consider more options and quicker react on what is happening',
        effect: [{
            effectId: 'intelligenceUp',
            source: 'swiftMind',
            level: 1
        }, {
            effectId: 'initiativeUp',
            source: 'swiftMind',
            level: 1
        }],
        target: 'self',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
    }
};
