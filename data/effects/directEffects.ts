export const directEffects: { [key: string]: EffectData } = {
    getHealth: {
        effectId: 'getHealth',
        name: 'Healing',
        description: 'Healing is done',
        type: 'direct',
        targetCharacteristic: 'parameters.currentHealth',
        baseDuration: -1,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: {texture: null, frame: null},
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'value',
                value: 5*this.strength
            };
        },
    },
    pureDamage: {
        effectId: 'pureDamage',
        name: null,
        description: null,
        type: 'direct',
        targetCharacteristic: 'parameters.currentHealth',
        baseDuration: null,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: {texture: 'icons', frame: 0},
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'value',
                value: -5*this.strength
            };
        }
    },
    physicalDamage: {
        effectId: 'physicalDamage',
        name: null,
        description: null,
        type: 'direct',
        targetCharacteristic: 'parameters.currentHealth',
        baseDuration: null,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: {texture: 'icons', frame: 0},
        applicationCheck: (source, target, action) => {
            let hitChance: number;
            const agility = source.currentCharacteristics.attributes.agility;
            const dodge = target.currentCharacteristics.defences.dodge;
            if (agility > dodge * 1.5) {
                hitChance = 90;
            } else if (agility < dodge * 0.5) {
                hitChance = 10;
            } else {
                hitChance = Math.round(80 * (agility / dodge) ) - 30;
            }
            const hitRoll = Phaser.Math.Between(0,100);
            if (hitChance >= hitRoll) {
                console.log(`%cHit!   %c${agility} agility vs ${dodge} dodge, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`, 'color: red', 'color: auto')
                log(`Hit!   ${agility} agility vs ${dodge} dodge, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`);
            } else {
                console.log(`%cMiss.. %c${agility} agility vs ${dodge} dodge, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`, 'color: red', 'color: auto');
                log(`Miss.. ${agility} agility vs ${dodge} dodge, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`);
            }
            return hitChance >= hitRoll;
        },
        setModifier: function (source, target, action) {
            const damage = source.getAttackDamage();
            let penetration = source.currentCharacteristics.attributes.strength / target.currentCharacteristics.defences.armor;
            penetration = penetration < 1 ? penetration : 1;
            const resultDamage = Math.round(damage * penetration);
            console.log(`%c${resultDamage} damage is done. %c${source.currentCharacteristics.attributes.strength} strength vs ${target.currentCharacteristics.defences.armor} armor, leads to penetration of ${Math.round(penetration * 100)}%. Weapon attack power was ${damage}, thus final damage is ~${resultDamage}`, 'color: red', 'color: auto')
            log(`${resultDamage} damage is done. ${source.currentCharacteristics.attributes.strength} strength vs ${target.currentCharacteristics.defences.armor} armor, leads to penetration of ${Math.round(penetration * 100)}%. Weapon attack power was ${damage}, thus final damage is ~${resultDamage}`);
            this.modifier = {
                type: 'value',
                value: -resultDamage
            };
        }
    },
    magicalDamage: {
        effectId: 'magicalDamage',
        name: null,
        description: null,
        type: 'direct',
        targetCharacteristic: 'parameters.currentHealth',
        baseDuration: null,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: {texture: 'icons', frame: 0},
        applicationCheck: (source, target, action) => {
            let hitChance: number;
            const intelligence = source.currentCharacteristics.attributes.intelligence;
            const magicResistance = target.currentCharacteristics.defences.magicResistance;
            if (intelligence > magicResistance * 1.5) {
                hitChance = 90;
            } else if (intelligence < magicResistance * 0.5) {
                hitChance = 10;
            } else {
                hitChance = Math.round(80 * (intelligence / magicResistance) ) - 30;
            }
            const hitRoll = Phaser.Math.Between(0,100);
            if (hitChance >= hitRoll) {
                console.log(`%cHit!   %c${intelligence} intelligence vs ${magicResistance} magicResistance, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`, 'color: red', 'color: auto')
                log(`Hit!   ${intelligence} intelligence vs ${magicResistance} magicResistance, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`);
            } else {
                console.log(`%cMiss.. %c${intelligence} intelligence vs ${magicResistance} magicResistance, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`, 'color: red', 'color: auto');
                log(`Miss.. ${intelligence} intelligence vs ${magicResistance} magicResistance, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`);
            }
            return hitChance >= hitRoll;
        },
        setModifier: function (source, target, action) {
            const damage = source.getAttackDamage();
            console.log(`%c${damage}%c damage is done.`, 'color: red', 'color: auto');
            log(`${damage} damage is done.`);
            this.modifier = {
                type: 'value',
                value: -damage
            };
        }
    },
    restoreManna: {
        effectId: 'restoreManna',
        name: 'Restore manna',
        description: 'Restore some manna',
        type: 'direct',
        targetCharacteristic: 'parameters.currentManna',
        baseDuration: null,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: {texture: 'icons', frame: 0},
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'value',
                value: +2*this.strength
            };
        },
    },
    getEnergy: {
        effectId: 'getEnergy',
        name: 'Restore energy',
        description: 'Restore some energy',
        type: 'direct',
        targetCharacteristic: 'parameters.currentEnergy',
        baseDuration: null,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: {texture: 'icons', frame: 0},
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'value',
                value: +3*this.strength
            };
        },
    },
    subtractEnergy: {
        effectId: 'subtractEnergy',
        name: 'Subtract energy',
        description: 'Energy usually is subtracted while using abilities or drained by enemies',
        type: 'direct',
        targetCharacteristic: 'parameters.currentEnergy',
        baseDuration: null,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: {texture: 'icons', frame: 0},
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action: ActionData) {
            this.modifier = {
                type: 'value',
                value: -action.parametersCost.energy
            };
        },
    },
    subtractManna: {
        effectId: 'subtractManna',
        name: 'Subtract manna',
        description: 'Manna usually is subtracted while using abilities or drained by enemies',
        type: 'direct',
        targetCharacteristic: 'parameters.currentManna',
        baseDuration: null,
        durationLeft: null,
        strength: null,
        source: null,
        statusImage: {texture: 'icons', frame: 0},
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action: ActionData) {
            this.modifier = {
                type: 'value',
                value: -action.parametersCost.manna
            };
        },
    },
};

function log(entree: string) {
    const logElement = document.getElementsByClassName('battle-log')[0];
    // @ts-ignore
    logElement.style.display = 'block';
    const entreeElement = document.createElement('div');
    entreeElement.innerText = entree;
    logElement.appendChild(entreeElement);
}
