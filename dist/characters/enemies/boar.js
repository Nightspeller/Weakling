define(["require", "exports", "phaser", "./generalEnemy", "../../entities/action"], function (require, exports, Phaser, generalEnemy_1, action_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Boar extends generalEnemy_1.default {
        constructor() {
            super();
            this.aiTurn = (disposition) => {
                const pickedActionAndTargets = {
                    action: 'END TURN', targets: [],
                };
                // this will loop through the actions in order they specified and will execute first available action
                // enrage will be skipped if already applied.
                this.availableActions.every((actionId) => {
                    const action = new action_1.default(actionId);
                    const isAvailable = this.isActionAvailable(action);
                    if (isAvailable) {
                        if (actionId === 'enrage') {
                            const isEnraged = this.currentEffects.some((effect) => effect.effectId === 'intelligenceDown');
                            if (isEnraged) {
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
                texture: 'boar-avatar', frame: null, width: 96, height: 96,
            };
            this.level = 1;
            this.name = 'Wild Boar';
            this.characteristicsModifiers = {
                strength: [{ source: 'base', value: 10 }],
                agility: [{ source: 'base', value: 10 }],
                intelligence: [{ source: 'base', value: 3 }],
                initiative: [{ source: 'base', value: Phaser.Math.Between(20, 30) }],
                health: [{ source: 'base', value: 20 }],
                manna: [{ source: 'base', value: 0 }],
                energy: [{ source: 'base', value: 10 }],
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
                health: 20,
                manna: 0,
                energy: 10,
            };
            this._recalculateCharacteristics();
            this.actionPointsBase = { physical: 1, magical: 0, misc: 0 };
            this.actionPointsIncrement = { physical: 1, magical: 0, misc: 1 };
            this.availableActions = ['enrage', 'wildRush', 'catchBreath'];
        }
    }
    exports.default = Boar;
});
//# sourceMappingURL=boar.js.map