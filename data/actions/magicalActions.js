export const magicalActions = {
    healingTouch: {
        actionId: 'healingTouch',
        phase: ['preparation', 'battle'],
        type: 'magical',
        actionName: 'Healing touch',
        actionDescription: 'Primitive spell, which nevertheless does the trick - restores some health',
        effect: [{
                effectId: 'heal',
                source: 'healingTouch',
                level: 1
            }],
        target: 'party',
        actionCost: 1,
        noticeable: 0,
        animation: 'meleeAttack',
    },
    dustStorm: {
        actionId: 'dustStorm',
        phase: ['battle'],
        type: 'magical',
        actionName: 'Dust storm',
        actionDescription: 'One of a few aggressive spells Kobolds can master - used mostly to blind the enemy to run away',
        effect: [{
                effectId: 'physicalDamage',
                source: 'dustStorm',
                level: 1
            }, {
                effectId: 'agilityDown',
                source: 'dustStorm',
                level: 1
            }],
        target: 'allEnemies',
        actionCost: 1,
        noticeable: 0,
        animation: 'meleeAttack',
    },
    drainingSoil: {
        actionId: 'drainingSoil',
        phase: ['preparation'],
        type: 'magical',
        actionName: 'Draining soil',
        actionDescription: 'Puts the curse on the most likely way of the selected opponent',
        effect: [{
                effectId: 'cursedSoil',
                source: 'drainingSoil',
                level: 1
            }],
        target: 'enemy',
        actionCost: 0.5,
        noticeable: 0,
        special: 'If the trap is on the way, trap gets cursed, both effects are +10%, if trap is placed on cursed land - gets cursed himself',
        animation: 'meleeAttack',
    },
    fireProtection: {
        actionId: 'fireProtection',
        phase: ['preparation', 'battle'],
        type: 'magical',
        actionName: 'Fire protection',
        actionDescription: 'Creates the sphere of protection against the fire around the target',
        effect: [{
                effectId: 'fireResistanceUp',
                source: 'fireProtection',
                level: 1
            }],
        target: 'self',
        actionCost: 1.5,
        noticeable: 0,
        animation: 'castBuff',
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
};
//# sourceMappingURL=magicalActions.js.map