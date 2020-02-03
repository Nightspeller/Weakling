import {Disposition} from "./disposition";

export default class GeneralEntity {
    public spriteParams: SpriteParameters;
    public level: number;
    public name: string;
    public baseCharacteristics: CharacteristicsSet;
    public currentCharacteristics: CharacteristicsSet;
    public currentEffects: Effect[];
    public availableActions: any[];
    public actedThisRound: boolean;
    public actionPoints: { magical: number; physical: number; misc: number };
    public isAlive: boolean;
    private characteristicsModifiers: any;
    public animations: { [key: string]: string };

    constructor() {
        this.spriteParams = {texture: null, frame: null, width: null, height: null};
        this.animations = {};
        this.level = null;
        this.currentEffects = [];
        this.availableActions = [];
        this.actedThisRound = false;
        this.isAlive = true;
        this.baseCharacteristics = {
            attributes: {
                strength: null,
                agility: null,
                intelligence: null,
                initiative: null
            },
            parameters: {
                health: null,
                currentHealth: null,
                manna: null,
                currentManna: null,
                energy: null,
                currentEnergy: null,
            },
            defences: {
                armor: null,
                dodge: null,
                fireResistance: null,
                coldResistance: null,
                acidResistance: null,
                electricityResistance: null,
                poisonResistance: null,
                magicResistance: null,
            }
        };
        this.currentCharacteristics = JSON.parse(JSON.stringify(this.baseCharacteristics));
        this.actionPoints = {physical: 0, magical: 0, misc: 0};
    }

    public applyEffect(effect: Effect) {
        const existingEffectIndex = this.currentEffects.findIndex(elem => (elem.source === effect.source && elem.effectId === effect.effectId));
        if (existingEffectIndex !== -1) {
            this.currentEffects[existingEffectIndex].currentLevel = effect.currentLevel;
            this.currentEffects[existingEffectIndex].durationLeft = effect.baseDuration;
        } else {
            this.currentEffects.push(effect);
        }
        this.recalculateCharacteristics();
    }

    private round(num: number, decimals = 2, noLessThanZeno = true) {
        const rounded = Math.round((num + Number.EPSILON) * 10 ^ decimals) / 10 ^ decimals;
        if (noLessThanZeno) {
            return  rounded < 0 ? 0 : rounded;
        } else {
            return rounded;
        }
    }

    public recalculateCharacteristics() {
        this.characteristicsModifiers = {
            attributes: {
                strength: 0,
                agility: 0,
                intelligence: 0,
                initiative: 0
            },
            parameters: {
                health: 0,
                manna: 0,
                energy: 0,
            },
            defences: {
                armor: 0,
                dodge: 0,
                fireResistance: 0,
                coldResistance: 0,
                acidResistance: 0,
                electricityResistance: 0,
                poisonResistance: 0,
                magicResistance: 0,
            }
        };
        this.currentEffects.forEach((effect, i) => {
            if (effect.type === 'passive') {
                const target = effect.targetCharacteristic.split('.');
                if (effect.modifier.type === 'value') {
                    this.characteristicsModifiers[target[0]][target[1]] = this.round(this.characteristicsModifiers[target[0]][target[1]] + effect.modifier.value);
                }
                if (effect.modifier.type === 'percent') {
                    this.characteristicsModifiers[target[0]][target[1]] = this.round(this.characteristicsModifiers[target[0]][target[1]] + this.baseCharacteristics[target[0]][target[1]] * (effect.modifier.value / 100));
                }
            }
            if (effect.type === 'direct') {
                const target = effect.targetCharacteristic.split('.');
                if (effect.modifier.type === 'value') {
                    this.currentCharacteristics[target[0]][target[1]] = this.round(this.currentCharacteristics[target[0]][target[1]] + effect.modifier.value);
                }
                if (effect.modifier.type === 'percent') {
                    this.currentCharacteristics[target[0]][target[1]] = this.round(this.currentCharacteristics[target[0]][target[1]] + this.currentCharacteristics[target[0]][target[1]] * (effect.modifier.value / 100));
                }
                this.currentEffects.splice(i, 1);
            }
        });
        Object.entries(this.characteristicsModifiers).forEach(([firstKey, value]) => {
            Object.entries(value).forEach(([secondKey, value]) => {
                this.currentCharacteristics[firstKey][secondKey] = this.baseCharacteristics[firstKey][secondKey] + this.characteristicsModifiers[firstKey][secondKey]
            })
        });
        this.applyItems();
    }

    public applyItems() {

    }

    public getAttackDamage() {
        return 1;
    }

    private recalculateEffects() {
        this.currentEffects = this.currentEffects.filter((effect, i) => {
            if (effect.durationLeft === 1) {
                return false
            } else {
                if (effect.durationLeft !== -1) {
                    effect.durationLeft--;
                }
                return true;
            }
        });
    }

    public startRound(roundType: 'preparation' | 'battle') {

    }

    public endRound() {
        this.recalculateEffects();
        this.recalculateCharacteristics();
    }

    public startTurn(scene: Phaser.Scene) {

    }

    public endTurn() {
        if (this.isAlive) {
            this.actedThisRound = true;
        }
    }

    public async aiTurn(disposition: Disposition) {
    };
}
