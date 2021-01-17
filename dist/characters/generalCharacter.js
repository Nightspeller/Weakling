define(["require", "exports", "phaser"], function (require, exports, Phaser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GeneralCharacter {
        constructor() {
            this.spriteParams = {
                texture: null, frame: null, width: null, height: null,
            };
            this.animations = {};
            this.level = null;
            this.currentEffects = [];
            this.availableActions = [];
            this.actedThisRound = false;
            this.isAlive = true;
            this.characteristics = {
                strength: null,
                agility: null,
                intelligence: null,
                initiative: null,
                health: null,
                manna: null,
                energy: null,
                armor: null,
                dodge: null,
                fireResistance: null,
                coldResistance: null,
                acidResistance: null,
                electricityResistance: null,
                poisonResistance: null,
                magicResistance: null,
                weaponDamage: null,
            };
            this.characteristicsModifiers = {
                strength: [{ source: 'base', value: null }],
                agility: [{ source: 'base', value: null }],
                intelligence: [{ source: 'base', value: null }],
                initiative: [{ source: 'base', value: null }],
                health: [{ source: 'base', value: null }],
                manna: [{ source: 'base', value: null }],
                energy: [{ source: 'base', value: null }],
                armor: [{ source: 'base', value: null }],
                dodge: [{ source: 'base', value: null }],
                fireResistance: [{ source: 'base', value: null }],
                coldResistance: [{ source: 'base', value: null }],
                acidResistance: [{ source: 'base', value: null }],
                electricityResistance: [{ source: 'base', value: null }],
                poisonResistance: [{ source: 'base', value: null }],
                magicResistance: [{ source: 'base', value: null }],
                weaponDamage: [{ source: 'base', value: 1 }],
            };
            this.parameters = {
                health: 0,
                manna: 0,
                energy: 0,
            };
            this.actionPoints = { physical: 0, magical: 0, misc: 0 };
            this.actionPointsBase = { physical: 0, magical: 0, misc: 0 };
            this.actionPointsIncrement = { physical: 0, magical: 0, misc: 0 };
        }
        addToParameter(parameter, value) {
            console.log(`Changing ${parameter} by ${value}`);
            if (this.parameters[parameter] + value > this.characteristics[parameter]) {
                this.parameters[parameter] = this.characteristics[parameter];
            }
            else {
                this.parameters[parameter] += value;
            }
            if (this.parameters[parameter] < 0)
                this.parameters[parameter] = 0;
            if (parameter === 'health' && this.parameters[parameter] === 0)
                this.isAlive = false;
        }
        _recalculateCharacteristics(characteristic) {
            if (characteristic) {
                // @ts-ignore
                this.characteristics[characteristic] = this.characteristicsModifiers[characteristic].reduce((acc, modifier) => ((acc + modifier.value) > 0 ? (acc + modifier.value) : 0), 0);
            }
            else {
                Object.keys(this.characteristics).forEach((characteristic) => {
                    // @ts-ignore
                    this.characteristics[characteristic] = this.characteristicsModifiers[characteristic].reduce((acc, modifier) => ((acc + modifier.value) > 0 ? (acc + modifier.value) : 0), 0);
                });
            }
            if (this.parameters.health > this.characteristics.health)
                this.parameters.health = this.characteristics.health;
            if (this.parameters.manna > this.characteristics.manna)
                this.parameters.manna = this.characteristics.manna;
            if (this.parameters.energy > this.characteristics.energy)
                this.parameters.energy = this.characteristics.energy;
        }
        setCharacteristicModifier(characteristic, modifier) {
            console.log(`Setting modifier for ${characteristic}`, modifier);
            if (Number.isInteger(modifier.value) === false)
                throw new Error('Non-integer modifier value is passed!');
            // @ts-ignore
            const existingModifiers = this.characteristicsModifiers[characteristic];
            // @ts-ignore
            const existingModifier = existingModifiers.find((existingModifier) => existingModifier.source === modifier.source);
            if (existingModifier) {
                existingModifier.value = modifier.value;
            }
            else {
                existingModifiers.push(modifier);
            }
            this._recalculateCharacteristics(characteristic);
        }
        removeCharacteristicModifier(characteristic, source) {
            console.log(`Removing modifier for ${characteristic}, source:`, source);
            // @ts-ignore
            // eslint-disable-next-line max-len
            this.characteristicsModifiers[characteristic] = this.characteristicsModifiers[characteristic].filter((modifier) => modifier.source !== source);
            this._recalculateCharacteristics(characteristic);
        }
        applyEffect(effect) {
            // eslint-disable-next-line max-len
            const existingEffectIndex = this.currentEffects.findIndex((elem) => (elem.source === effect.source && elem.effectId === effect.effectId));
            if (existingEffectIndex !== -1) {
                this.currentEffects[existingEffectIndex].strength = effect.strength;
                this.currentEffects[existingEffectIndex].durationLeft = effect.baseDuration;
            }
            else {
                if (effect.type !== 'conditional') {
                    if (effect.targetCharacteristic) {
                        const { targetCharacteristic } = effect;
                        // @ts-ignore - in case of traps effect modifier value is another effect!
                        const value = Math.round(effect.modifier.type === 'value' ? effect.modifier.value : this.characteristics[targetCharacteristic] * (effect.modifier.value / 100));
                        if (targetCharacteristic === 'health' || targetCharacteristic === 'manna' || targetCharacteristic === 'energy') {
                            this.addToParameter(targetCharacteristic, value);
                        }
                        else {
                            this.setCharacteristicModifier(targetCharacteristic, {
                                value,
                                source: effect,
                            });
                        }
                    }
                }
                if (effect.type !== 'direct') {
                    this.currentEffects.push(effect);
                }
            }
        }
        getAttackDamage() {
            return this.characteristics.weaponDamage;
        }
        recalculateEffects() {
            this.currentEffects = this.currentEffects.filter((effect) => {
                if (effect.durationLeft === 1) {
                    if (effect.targetCharacteristic) {
                        this.removeCharacteristicModifier(effect.targetCharacteristic, effect);
                    }
                    return false;
                }
                if (effect.durationLeft !== -1) {
                    effect.durationLeft -= 1;
                }
                return true;
            });
        }
        startRound(roundType) {
            if (roundType === 'preparation') {
                this.actionPoints = { ...this.actionPointsBase };
                this.currentEffects = [];
            }
            else {
                this.actionPoints.physical = Phaser.Math.Clamp(this.actionPoints.physical + this.actionPointsIncrement.physical, 0, 3);
                this.actionPoints.magical = Phaser.Math.Clamp(this.actionPoints.magical + this.actionPointsIncrement.magical, 0, 3);
                this.actionPoints.misc = Phaser.Math.Clamp(this.actionPoints.misc + this.actionPointsIncrement.misc, 0, 3);
            }
            if (this.isAlive) {
                this.actedThisRound = false;
            }
        }
        endRound() {
            this.recalculateEffects();
        }
        endTurn() {
            if (this.isAlive) {
                this.actedThisRound = true;
            }
        }
        getAvailableActions() {
            return this.availableActions;
        }
    }
    exports.default = GeneralCharacter;
});
//# sourceMappingURL=generalCharacter.js.map