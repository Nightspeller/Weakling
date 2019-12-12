import Player from "../entities/player.js";
import {weapons} from "./items.js";

export const effects: { [key: string]: Effect } = {
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
        statusImage: {texture: 'icons', frame: 119},
        applicationCheck: (source, target, action) => true,
        setModifier: function(source, target, action) {
            this.modifier = {
                type: 'percent',
                value: + 33
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
        statusImage: {texture: 'icons', frame: 60},
        applicationCheck: (source, target, action) => true,
        setModifier: function(source, target, action) {
            this.modifier = {
                type: 'percent',
                value: + 33
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
        statusImage: {texture: 'icons', frame: 20},
        applicationCheck: (source, target, action) => true,
        setModifier: function(source, target, action) {
            this.modifier = {
                type: 'percent',
                value: + 33
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
        statusImage: {texture: 'icons', frame: 124},
        applicationCheck: (source, target, action) => true,
        setModifier: function(source, target, action) {
            this.modifier = {
                type: 'percent',
                value: + 33
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
        statusImage: {texture: 'icons', frame: 19},
        applicationCheck: (source, target, action) => true,
        setModifier: function(source, target, action) {
            this.modifier = {
                type: 'percent',
                value: + 33
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
        statusImage: {texture: 'icons', frame: 62},
        applicationCheck: (source, target, action) => true,
        setModifier: function(source, target, action) {
            this.modifier = {
                type: 'percent',
                value: - 33
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
        statusImage: {texture: 'icons', frame: 35},
        applicationCheck: (source, target, action) => true,
        setModifier: function(source, target, action) {
            this.modifier = {
                type: 'percent',
                value: - 33
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
        statusImage: {texture: 'icons', frame: 36},
        applicationCheck: (source, target, action) => true,
        setModifier: function(source, target, action) {
            this.modifier = {
                type: 'percent',
                value: + 33
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
        statusImage: {texture: 'icons', frame: 57},
        applicationCheck: (source, target, action) => true,
        setModifier: function(source, target, action) {
            this.modifier = {
                type: 'percent',
                value: + 33
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
        statusImage: {texture: 'icons', frame: 174},
        applicationCheck: (source, target, action) => true,
        setModifier: function(source, target, action) {
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
        statusImage: {texture: 'icons', frame: 283},
        applicationCheck: (source, target, action) => true,
        setModifier: function(source, target, action) {
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
        statusImage: {texture: 'icons', frame: 0},
        applicationCheck: (source, target, action) => true,
        setModifier: function(source, target, action) {
            this.modifier = {
                type: 'value',
                value: - 5
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
        statusImage: {texture: 'icons', frame: 0},
        applicationCheck: (source, target, action) => {
            let hitChance: number;
            if (source.currentCharacteristics.attributes.agility > target.currentCharacteristics.defences.dodge * 1.5) {
                hitChance = 0.9;
            } else if (source.currentCharacteristics.attributes.agility < target.currentCharacteristics.defences.dodge * 0.5) {
                hitChance = 0.1;
            } else {
                hitChance = 0.8 * (source.currentCharacteristics.attributes.agility / target.currentCharacteristics.defences.dodge) - 0.3;
            }
            const hitRoll = Math.random();
            hitChance >= hitRoll ? console.log('%cHit!', 'color: red') : console.log('%cMiss..', 'color: red');
            return hitChance >= hitRoll;
        },
        setModifier: function(source, target, action) {
            let weapon;
            if (source instanceof Player) {
                weapon = weapons[source.inventory.equipped.rightHand];
            } else {
                weapon = source.weapon;
            }
            let penetration = source.currentCharacteristics.attributes.strength / target.currentCharacteristics.defences.armor;
            penetration = penetration < 1 ? penetration : 1;
            this.modifier = {
                type: 'value',
                value: - (weapon.damage * penetration)
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
        statusImage: {texture: 'icons', frame: 0},
        applicationCheck: (source, target, action) => true,
        setModifier: function(source, target, action) {
            this.modifier = {
                type: 'value',
                value: + 2
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
        levels: {
            1: 3,
            2: 4,
            3: 5
        },
        durationLeft: null,
        currentLevel: null,
        source: null,
        statusImage: {texture: 'icons', frame: 0},
        applicationCheck: (source, target, action) => true,
        setModifier: function(source, target, action) {
            this.modifier = {
                type: 'value',
                value: + 3
            };
        },
    },
};