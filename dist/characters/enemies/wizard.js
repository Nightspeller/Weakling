define(["require", "exports", "phaser", "./generalEnemy", "../../entities/action"], function (require, exports, Phaser, generalEnemy_1, action_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Wizard extends generalEnemy_1.default {
        constructor() {
            super();
            this.aiTurn = (disposition) => {
                const pickedActionAndTargets = {
                    action: 'END TURN', targets: [],
                };
                // this will loop through the actions in order they specified and will execute first available action
                // swiftMind will be skipped if already applied.
                this.availableActions.every((actionId) => {
                    const action = new action_1.default(actionId);
                    const isAvailable = this.isActionAvailable(action);
                    if (isAvailable) {
                        if (actionId === 'swiftMind') {
                            const isIntelligenceUp = this.currentEffects.some((effect) => effect.effectId === 'intelligenceUp');
                            if (isIntelligenceUp) {
                                return true;
                            }
                        }
                        pickedActionAndTargets.action = action;
                        // @ts-ignore
                        pickedActionAndTargets.targets = this.pickActionTargets(action, disposition);
                        return false;
                    }
                    return true;
                });
                return pickedActionAndTargets;
            };
            this.spriteParams = {
                texture: 'wizard-idle', frame: 0, width: 231, height: 190, flip: true,
            };
            this.level = 1;
            this.name = 'Wizard';
            this.characteristicsModifiers = {
                strength: [{ source: 'base', value: 10 }],
                agility: [{ source: 'base', value: 3 }],
                intelligence: [{ source: 'base', value: 10 }],
                initiative: [{ source: 'base', value: Phaser.Math.Between(10, 20) }],
                health: [{ source: 'base', value: 10 }],
                manna: [{ source: 'base', value: 10 }],
                energy: [{ source: 'base', value: 5 }],
                armor: [{ source: 'base', value: 12 }],
                dodge: [{ source: 'base', value: 10 }],
                fireResistance: [{ source: 'base', value: 0 }],
                coldResistance: [{ source: 'base', value: 5 }],
                acidResistance: [{ source: 'base', value: 0 }],
                electricityResistance: [{ source: 'base', value: 0 }],
                poisonResistance: [{ source: 'base', value: 0 }],
                magicResistance: [{ source: 'base', value: 0 }],
                weaponDamage: [{ source: 'base', value: 3 }],
            };
            this.parameters = {
                health: 10,
                manna: 10,
                energy: 5,
            };
            this._recalculateCharacteristics();
            this.actionPointsBase = { physical: 0, magical: 1, misc: 0 };
            this.actionPointsIncrement = { physical: 0, magical: 1, misc: 1 };
            this.availableActions = ['magicMissile', 'swiftMind', 'meditate'];
            this.animations.idle = 'wizard_idle';
            this.animations.move = 'wizard_move';
            this.animations.attack = 'wizard_attack2';
            this.animations.buff = 'wizard_attack1';
            this.animations.death = 'wizard_death';
            this.animations.hit = 'wizard_hit';
        }
    }
    exports.default = Wizard;
});
//# sourceMappingURL=wizard.js.map