export const enemyActions = {
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
            { conditionId: 'trapped', probability: 0.75, conditionDisplayName: 'Trapped' },
            { conditionId: 'cursedSoil', probability: 0.75, conditionDisplayName: 'Cursed Soil' }
        ]
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
        noticeable: 1
    },
};
//# sourceMappingURL=enemyActions.js.map