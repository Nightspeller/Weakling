export const effects = {
    armorUp: {
        effectId: 'armorUp',
        name: 'Armor up',
        description: `Armor is increased`,
        type: 'passive',
        targetCharacteristic: 'defences.armor',
        baseDuration: 3,
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 119 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: +33
            };
        },
    },
    dodgeUp: {
        effectId: 'dodgeUp',
        name: 'Dodge up',
        description: 'Dodge is increased',
        type: 'passive',
        targetCharacteristic: 'defences.dodge',
        baseDuration: 3,
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 60 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: +33
            };
        },
    },
    strengthUp: {
        effectId: 'strengthUp',
        name: 'Strength up',
        description: 'Strength is increased',
        type: 'passive',
        targetCharacteristic: 'attributes.strength',
        baseDuration: 3,
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 20 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: +33
            };
        },
    },
    agilityUp: {
        effectId: 'agilityUp',
        name: 'Agility up',
        description: 'Agility is increased',
        type: 'passive',
        targetCharacteristic: 'attributes.agility',
        baseDuration: 3,
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 124 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: +33
            };
        },
    },
    intelligenceUp: {
        effectId: 'intelligenceUp',
        name: 'Intelligence up',
        description: 'Intelligence is increased',
        type: 'passive',
        targetCharacteristic: 'attributes.intelligence',
        baseDuration: 3,
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 19 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: +33
            };
        },
    },
    intelligenceDown: {
        effectId: 'intelligenceDown',
        name: 'Intelligence down',
        description: 'Intelligence is decreased',
        type: 'passive',
        targetCharacteristic: 'attributes.intelligence',
        baseDuration: 3,
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 62 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: -33
            };
        },
    },
    agilityDown: {
        effectId: 'agilityDown',
        name: 'Agility down',
        description: 'Agility is decreased',
        type: 'passive',
        targetCharacteristic: 'attributes.agility',
        baseDuration: 3,
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 35 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: -33
            };
        },
    },
    initiativeUp: {
        effectId: 'initiativeUp',
        name: 'Initiative up',
        description: 'Initiative is increased',
        type: 'passive',
        targetCharacteristic: 'attributes.initiative',
        baseDuration: 3,
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 36 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: +33
            };
        },
    },
    fireResistanceUp: {
        effectId: 'fireResistanceUp',
        name: 'Fire resistance up',
        description: 'Fire resistance is increased',
        type: 'passive',
        targetCharacteristic: 'defences.fireResistance',
        baseDuration: 3,
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 57 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'percent',
                value: +33
            };
        },
    },
    heal: {
        effectId: 'heal',
        name: 'Healing',
        description: 'Healing is done',
        type: 'direct',
        targetCharacteristic: 'parameters.currentHealth',
        baseDuration: -1,
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: { texture: null, frame: null },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'value',
                value: 2
            };
        },
    },
    trapped: {
        effectId: 'trapped',
        name: 'Trap prepared',
        description: 'Trap is set on the character\'s path',
        type: 'conditional',
        targetCharacteristic: 'parameters.currentHealth',
        baseDuration: -1,
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 174 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'effect',
                value: ['pureDamage']
            };
        },
    },
    cursedSoil: {
        effectId: 'cursedSoil',
        name: 'Cursed soil',
        description: 'The soil is cursed on the character\'s path',
        type: 'conditional',
        baseDuration: -1,
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 283 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'effect',
                value: ['pureDamage', 'agilityDown']
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
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 0 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'value',
                value: -5
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
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 0 },
        applicationCheck: (source, target, action) => {
            let hitChance;
            const agility = source.currentCharacteristics.attributes.agility;
            const dodge = target.currentCharacteristics.defences.dodge;
            if (agility > dodge * 1.5) {
                hitChance = 90;
            }
            else if (agility < dodge * 0.5) {
                hitChance = 10;
            }
            else {
                hitChance = Math.round(80 * (agility / dodge)) - 30;
            }
            const hitRoll = Phaser.Math.Between(0, 100);
            if (hitChance >= hitRoll) {
                console.log(`%cHit!   %c${agility} agility vs ${dodge} dodge, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`, 'color: red', 'color: auto');
                log(`Hit!   ${agility} agility vs ${dodge} dodge, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`);
            }
            else {
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
            console.log(`%c${resultDamage} damage is done. %c${source.currentCharacteristics.attributes.strength} strength vs ${target.currentCharacteristics.defences.armor} armor, leads to penetration of ${Math.round(penetration * 100)}%. Weapon attack power was ${damage}, thus final damage is ~${resultDamage}`, 'color: red', 'color: auto');
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
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 0 },
        applicationCheck: (source, target, action) => {
            let hitChance;
            const intelligence = source.currentCharacteristics.attributes.intelligence;
            const magicResistance = target.currentCharacteristics.defences.magicResistance;
            if (intelligence > magicResistance * 1.5) {
                hitChance = 90;
            }
            else if (intelligence < magicResistance * 0.5) {
                hitChance = 10;
            }
            else {
                hitChance = Math.round(80 * (intelligence / magicResistance)) - 30;
            }
            const hitRoll = Phaser.Math.Between(0, 100);
            if (hitChance >= hitRoll) {
                console.log(`%cHit!   %c${intelligence} intelligence vs ${magicResistance} magicResistance, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`, 'color: red', 'color: auto');
                log(`Hit!   ${intelligence} intelligence vs ${magicResistance} magicResistance, leads to hit chance of ${hitChance}%. Roll was ${100 - hitRoll}, for success had to be >= then ${100 - hitChance}`);
            }
            else {
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
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 0 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'value',
                value: +2
            };
        },
    },
    restoreEnergy: {
        effectId: 'restoreEnergy',
        name: 'Restore energy',
        description: 'Restore some energy',
        type: 'direct',
        targetCharacteristic: 'parameters.currentEnergy',
        baseDuration: null,
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: { texture: 'icons', frame: 0 },
        applicationCheck: (source, target, action) => true,
        setModifier: function (source, target, action) {
            this.modifier = {
                type: 'value',
                value: +3
            };
        },
    },
};
function log(entree) {
    const logElement = document.getElementsByClassName('battle-log')[0];
    // @ts-ignore
    logElement.style.display = 'block';
    const entreeElement = document.createElement('div');
    entreeElement.innerText = entree;
    logElement.appendChild(entreeElement);
}
//# sourceMappingURL=effects.js.map