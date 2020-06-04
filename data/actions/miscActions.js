export const miscActions = {
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
            } /*, {
                effectId: 'saturation',
                strength: 1
            }*/
        ],
        target: 'self',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
        icon: { texture: 'icon-item-set', frame: 352 },
        parametersCost: {},
    },
    drinkMediumWeakStrengthPotion: {
        actionId: 'drinkMediumWeakStrengthPotion',
        phase: ['preparation', 'battle'],
        type: 'misc',
        actionName: 'Drink medium weak strength potion',
        consumes: 'medium-weak-strength-potion',
        actionDescription: 'Drink medium weak strength potion to get some strength',
        effectsDescriptions: [{
                effectId: 'strengthUp',
                strength: 1
            } /*, {
                effectId: 'saturation',
                strength: 1
            }*/
        ],
        target: 'self',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
        icon: { texture: 'icon-item-set', frame: 157 },
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
        icon: { texture: 'icon-item-set', frame: 167 },
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
        icon: { texture: 'icon-item-set', frame: 5 },
        parametersCost: {},
    },
    accessInventory: {
        actionId: 'accessInventory',
        phase: ['preparation', 'battle'],
        type: 'misc',
        actionName: 'Access inventory',
        actionDescription: 'Sometimes even in the heat of the battle you absolutely have to do it',
        effectsDescriptions: [],
        target: 'self',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
        icon: { texture: 'icon-item-set', frame: 137 },
        parametersCost: {},
    },
    retreat: {
        actionId: 'retreat',
        phase: ['preparation', 'battle'],
        type: 'misc',
        actionName: 'Retreat!',
        actionDescription: 'For Kobolds, retreat is just a fancy way to say RUN AWAY!',
        effectsDescriptions: [],
        target: 'self',
        actionCost: 3,
        noticeable: 1,
        animation: 'castBuff',
        icon: { texture: 'icon-item-set', frame: 72 },
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
        icon: { texture: 'icon-item-set', frame: 59 },
        parametersCost: { energy: 3 },
    },
};
//# sourceMappingURL=miscActions.js.map