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
    public characteristicsModifiers: any;
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
        this.characteristicsModifiers = {
            attributes: {
                strength: [],
                agility: [],
                intelligence: [],
                initiative: []
            },
            parameters: {
                health: [],
                currentHealth: [],
                manna: [],
                currentManna: [],
                energy: [],
                currentEnergy: [],
            },
            defences: {
                armor: [],
                dodge: [],
                fireResistance: [],
                coldResistance: [],
                acidResistance: [],
                electricityResistance: [],
                poisonResistance: [],
                magicResistance: [],
            }
        };
        this.actionPoints = {physical: 0, magical: 0, misc: 0};
    }

    public applyEffect(effect: Effect) {
        const existingEffectIndex = this.currentEffects.findIndex(elem => (elem.source === effect.source && elem.effectId === effect.effectId));
        if (existingEffectIndex !== -1) {
            this.currentEffects[existingEffectIndex].currentLevel = effect.currentLevel;
            this.currentEffects[existingEffectIndex].durationLeft = effect.baseDuration;
        } else {
            if (effect.type !== "conditional") {
                let [group, subgroup] = effect.targetCharacteristic.split('.');
                this.characteristicsModifiers[group][subgroup].push({
                    // @ts-ignore - in case of traps effect modifier value is another effect!
                    value: Math.round(effect.modifier.type === 'value' ? effect.modifier.value : this.baseCharacteristics[group][subgroup] * (effect.modifier.value / 100)),
                    source: effect
                });
            }
            if (effect.type !== 'direct') {
                this.currentEffects.push(effect);
            }
        }
        this.recalculateCharacteristics();
    }

    public recalculateCharacteristics() {
        Object.entries(this.characteristicsModifiers).forEach(([group, value]) => {
            Object.entries(value).forEach(([subgroup, value]) => {
                this.currentCharacteristics[group][subgroup] = this.characteristicsModifiers[group][subgroup].reduce((acc, modifier) => {
                    if (group === 'parameters' && subgroup.includes('current')) {
                        const maxValue = this.currentCharacteristics.parameters[subgroup.split('current')[1].toLowerCase()];
                        return Phaser.Math.Clamp(acc + modifier.value, 0, maxValue);
                    }
                    return (acc + modifier.value) > 0 ? (acc + modifier.value) : 0;
                }, 0);
            })
        });
    }

    protected addBaseModifiers() {
        Object.entries(this.baseCharacteristics).forEach(([group, value]) => {
            Object.entries(value).forEach(([subgroup, value]) => {
                this.characteristicsModifiers[group][subgroup].push({
                    // @ts-ignore
                    value: this.baseCharacteristics[group][subgroup],
                    source: 'base'
                });
            })
        });
        this.recalculateCharacteristics();
    }

    public getAttackDamage() {
        return 1;
    }

    private recalculateEffects() {
        this.currentEffects = this.currentEffects.filter((effect, i) => {
            if (effect.durationLeft === 1) {
                const [group, subgroup] = effect.targetCharacteristic.split('.');
                this.characteristicsModifiers[group][subgroup] = this.characteristicsModifiers[group][subgroup].filter(modifier => modifier.source !== effect);
                return false
            } else {
                if (effect.durationLeft !== -1) {
                    effect.durationLeft--;
                }
                return true;
            }
        });
    }
    // Params are not properly displayed on first render

    public startRound(roundType: 'preparation' | 'battle') {
        if (roundType === 'preparation'){
            this.characteristicsModifiers = {
                attributes: {
                    strength: [],
                    agility: [],
                    intelligence: [],
                    initiative: []
                },
                parameters: {
                    health: [],
                    currentHealth: [],
                    manna: [],
                    currentManna: [],
                    energy: [],
                    currentEnergy: [],
                },
                defences: {
                    armor: [],
                    dodge: [],
                    fireResistance: [],
                    coldResistance: [],
                    acidResistance: [],
                    electricityResistance: [],
                    poisonResistance: [],
                    magicResistance: [],
                }
            };
            this.actionPoints = {physical: 0, magical: 0, misc: 0};
            this.currentEffects = [];
            this.addBaseModifiers();
        }
    }

    public endRound() {
        this.recalculateEffects();
        this.recalculateCharacteristics();
    }

    public endTurn() {
        if (this.isAlive) {
            this.actedThisRound = true;
        }
    }
}
