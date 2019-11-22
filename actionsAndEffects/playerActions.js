export class PlayerActions {
    constructor() {
        this.actions = [{
                actionId: 'warmUp',
                phase: ['preparation', 'battle'],
                type: 'physical',
                actionName: 'Warm up',
                actionDescription: 'Sets you in your best physical shape for the upcoming battle',
                effect: [{
                        effectId: 'strengthUp',
                        source: 'warmUp',
                        level: 1
                    }, {
                        effectId: 'agilityUp',
                        source: 'warmUp',
                        level: 1
                    }],
                target: 'self',
                actionCost: '0.5',
                noticeable: '0'
            }, {
                actionId: 'adjustArmor',
                phase: ['preparation', 'battle'],
                type: 'physical',
                actionName: 'Adjust armor',
                actionDescription: 'Making sure that your gear is in perfect shape and does not get in a way',
                effect: [{
                        effectId: 'armorUp',
                        source: 'adjustArmor',
                        level: 1
                    }, {
                        effectId: 'dodgeUp',
                        source: 'adjustArmor',
                        level: 1
                    }],
                target: 'self',
                actionCost: '0.5',
                noticeable: '0'
            }, {
                actionId: 'setTrap',
                phase: ['preparation'],
                type: 'physical',
                actionName: 'Set a trap',
                actionDescription: 'Sets a trap on the most likely way of the selected opponent',
                effect: [{
                        effectId: 'trapped',
                        source: 'setTrap',
                        level: 1
                    }],
                target: 'enemy',
                actionCost: '0.5',
                noticeable: '0.1'
            }, {
                actionId: 'meleeAttack',
                phase: ['battle'],
                type: 'physical',
                actionName: 'Melee attack',
                actionDescription: 'Hits the opponent with equipped melee weapon',
                effect: [{
                        effectId: 'physicalDamage',
                        source: 'meleeAttack',
                        level: 1
                    }],
                target: 'enemy',
                actionCost: '1',
                noticeable: '1'
            }, {
                actionId: 'drainingSoil',
                phase: ['preparation'],
                type: 'magic',
                actionName: 'Draining soil',
                actionDescription: 'Puts the curse on the most likely way of the selected opponent',
                effect: [{
                        effectId: 'strengthDown',
                        source: 'drainingSoil',
                        level: 1
                    }, {
                        effectId: 'agilityDown',
                        source: 'drainingSoil',
                        level: 1
                    }],
                target: 'enemy',
                actionCost: '0.5',
                noticeable: '0',
                special: 'If the trap is on the way, trap gets cursed, both effects are +10%, if trap is placed on cursed land - gets cursed himself'
            }, {
                actionId: 'fireProtection',
                phase: ['preparation', 'battle'],
                type: 'magic',
                actionName: 'Fire protection',
                actionDescription: 'Creates the sphere of protection against the fire around the target',
                effect: [{
                        effectId: 'fireResistanceUp',
                        source: 'fireProtection',
                        level: 1
                    }],
                target: 'any',
                actionCost: '0.5',
                noticeable: '0'
            }, {
                actionId: 'swiftMind',
                phase: ['preparation', 'battle'],
                type: 'magic',
                actionName: 'Swift mind',
                actionDescription: 'You think faster, allowing you to consider more options and quicker react on what is happening',
                effect: [{
                        effectId: 'intelligence',
                        source: '',
                        level: 1
                    }, {
                        effectId: 'dodge',
                        source: '',
                        level: 1
                    }],
                target: 'self',
                actionCost: '0.5',
                noticeable: '0'
            }, {
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
                actionCost: '0.5',
                noticeable: '0'
            }, {
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
                actionCost: '0.5',
                noticeable: '0'
            }, {
                actionId: 'meditate',
                phase: ['preparation'],
                type: 'misc',
                actionName: 'Meditate',
                actionDescription: 'Clear your mind, balance and expand your energies',
                effect: [{
                        effectId: 'manna',
                        source: '',
                        level: 10
                    }, {
                        effectId: 'energy',
                        source: '',
                        level: 10
                    }],
                target: 'enemy',
                actionCost: '0.5',
                noticeable: '0'
            }];
    }
    getActionById(actionId) {
        return this.actions.find(action => action.actionId === actionId);
    }
}
//# sourceMappingURL=playerActions.js.map