export const magicalActions: { [key: string]: ActionData } = {
    healingTouch: {
        actionId: 'healingTouch',
        phase: ['preparation', 'battle'],
        type: 'magical',
        actionName: 'Healing touch',
        actionDescription: 'Primitive spell, which nevertheless does the trick - restores some health',
        effectsDescriptions: [{
            effectId: 'heal',
            strength: 1
        }],
        target: 'party',
        actionCost: 1,
        noticeable: 0,
        animation: 'meleeAttack',
        icon: {texture: 'icon-item-set', frame: 53},
        parametersCost: {manna: 3},
    },
    dustStorm: {
        actionId: 'dustStorm',
        phase: ['battle'],
        type: 'magical',
        actionName: 'Dust storm',
        actionDescription: 'One of a few aggressive spells Kobolds can master - used mostly to blind the enemy to run away',
        effectsDescriptions: [{
            effectId: 'physicalDamage',
            strength: 1
        }, {
            effectId: 'agilityDown',
            strength: 1
        }],
        target: 'allEnemies',
        actionCost: 1,
        noticeable: 0,
        animation: 'meleeAttack',
        icon: {texture: 'icon-item-set', frame: 336},
        parametersCost: {manna: 3},
    },
    drainingSoil: {
        actionId: 'drainingSoil',
        phase: ['preparation'],
        type: 'magical',
        actionName: 'Draining soil',
        actionDescription: 'Puts the curse on the most likely way of the selected opponent',
        effectsDescriptions: [{
            effectId: 'cursedSoil',
            strength: 1
        }],
        target: 'enemy',
        actionCost: 0.5,
        noticeable: 0,
        special: 'If the trap is on the way, trap gets cursed, both effects are +10%, if trap is placed on cursed land - gets cursed himself',
        animation: 'meleeAttack',
        icon: {texture: 'icon-item-set', frame: 368},
        parametersCost: {manna: 3},
    },
    fireProtection: {
        actionId: 'fireProtection',
        phase: ['preparation', 'battle'],
        type: 'magical',
        actionName: 'Fire protection',
        actionDescription: 'Creates the sphere of protection against the fire around the target',
        effectsDescriptions: [{
            effectId: 'fireResistanceUp',
            strength: 1
        }],
        target: 'self',
        actionCost: 1.5,
        noticeable: 0,
        animation: 'castBuff',
        icon: {texture: 'icon-item-set', frame: 57},
        parametersCost: {manna: 3},
    },
    swiftMind: {
        actionId: 'swiftMind',
        phase: ['preparation', 'battle'],
        type: 'magical',
        actionName: 'Swift mind',
        actionDescription: 'You think faster, allowing you to consider more options and quicker react on what is happening',
        effectsDescriptions: [{
            effectId: 'intelligenceUp',
            strength: 1
        }, {
            effectId: 'initiativeUp',
            strength: 1
        }],
        target: 'self',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
        icon: {texture: 'icon-item-set', frame: 19},
        parametersCost: {manna: 3},
    },
    magicMissile: {
        actionId: 'magicMissile',
        phase: ['battle'],
        type: 'magical',
        actionName: 'Magic Missile',
        actionDescription: 'One of the most basic, yet one of the most important spells in the spellbook of any wizard.',
        effectsDescriptions: [{
            effectId: 'magicalDamage',
            strength: 1
        }],
        target: 'enemy',
        actionCost: 1,
        noticeable: 1,
        triggers: [],
        animation: 'meleeAttack',
        icon: {texture: 'icon-item-set', frame: 336},
        parametersCost: {manna: 3},
    },
    fireball: {
        actionId: 'fireball',
        phase: ['battle'],
        type: 'magical',
        actionName: 'Fireball',
        actionDescription: 'Throws fireball to the enemies, damaging all of them',
        effectsDescriptions: [{
            effectId: 'magicalDamage',
            strength: 1
        }],
        target: 'allEnemies',
        actionCost: 2,
        noticeable: 1,
        triggers: [],
        animation: 'meleeAttack',
        icon: {texture: 'icons-additional', frame: 'magic-swirl'},
        parametersCost: {manna: 3},
    },
};
