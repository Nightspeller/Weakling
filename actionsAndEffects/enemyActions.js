export default {
    wildRush: {
        target: 'playerCharacter',
        effect: [{
                targetCharacteristic: 'currentHealth',
                modifier: 10
            }],
        actionId: 'wildRush',
        actionCost: 1,
        actionDescription: 'Character rushes to attack it\'s target',
        type: 'physical',
        actionName: 'Wild rush',
    },
    enrage: {
        target: 'self',
        effect: [{
                targetCharacteristic: 'strength',
                modifier: 10
            }, {
                targetCharacteristic: 'intelligence',
                modifier: -10
            },],
        actionId: 'enrage',
        actionCost: 0.5,
        actionDescription: 'Character gets really angry, loosing ability to think straight, but gaining extra strength',
        type: 'misc',
        actionName: 'Enrage',
    },
};
//# sourceMappingURL=enemyActions.js.map