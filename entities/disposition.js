import { Boar } from "./boar.js";
import GeneralEntity from "./generalEntity.js";
import { effects } from "../actionsAndEffects/effects.js";
import Player from "./player.js";
import { weapons } from "../actionsAndEffects/weapons.js";
export class Disposition {
    constructor(playerCharacters, enemyCharacters, location) {
        this.playerCharacters = playerCharacters;
        this.enemyCharacters = enemyCharacters.map((char, index) => {
            const enemy = new enemiesList[char];
            enemy.name = `${enemy.name} ${index + 1}`;
            return enemy;
        });
        this.location = location;
        this.playerCharactersPositions = {
            frontTop: this.playerCharacters[0] || null,
            backTop: this.playerCharacters[1] || null,
            frontBottom: this.playerCharacters[2] || null,
            backBottom: this.playerCharacters[3] || null,
        };
        this.enemyCharactersPositions = {
            frontTop: this.enemyCharacters[0] || null,
            backTop: this.enemyCharacters[1] || null,
            frontBottom: this.enemyCharacters[2] || null,
            backBottom: this.enemyCharacters[3] || null,
        };
    }
    startRound() {
        this.currentPhase = this.currentPhase !== undefined ? 'battle' : 'preparation';
        console.log('Starting new round on the disposition', this.currentPhase);
        [...this.playerCharacters, ...this.enemyCharacters].forEach(char => char.actedThisRound = false);
        this.turnOrder = this.calculateTurnOrder();
        this.currentCharactersTurn = this.turnOrder[0];
    }
    calculateTurnOrder() {
        if (this.currentPhase === 'preparation') {
            return [...this.playerCharacters]
                .filter(char => !char.actedThisRound && char.isAlive)
                .sort((a, b) => Math.random() - 1)
                .sort((a, b) => b.currentCharacteristics.attributes.initiative - a.currentCharacteristics.attributes.initiative);
        }
        else {
            return [...this.playerCharacters, ...this.enemyCharacters]
                .filter(char => !char.actedThisRound && char.isAlive)
                .sort((a, b) => Math.random() - 1)
                .sort((a, b) => b.currentCharacteristics.attributes.initiative - a.currentCharacteristics.attributes.initiative);
        }
    }
    aiTurn() {
        this.turnOrder[0].aiTurn(this);
    }
    processAction(source, target /* | GeneralEntity[]*/, action) {
        console.log(`%c${source.name} %cperforms %c${action.actionName} %con %c${target.name}`, 'color: red', 'color: auto', 'color: green', 'color: auto', 'color: red');
        if (action.target === 'self') {
            action.effect.forEach(effectDescription => {
                const effect = effects[effectDescription.effectId];
                effect.currentLevel = effectDescription.level;
                effect.durationLeft = effect.baseDuration;
                effect.source = effectDescription.source;
                source.applyEffect(effect);
            });
        }
        if (action.target === 'enemy') {
            action.effect.forEach(effectDescription => {
                const effect = effects[effectDescription.effectId];
                effect.currentLevel = effectDescription.level;
                effect.durationLeft = effect.baseDuration;
                effect.source = effectDescription.source;
                if (target instanceof GeneralEntity) {
                    if (effect.type === 'direct') {
                        if (effect.effectId === 'physicalDamage') {
                            let hitChance;
                            if (source.currentCharacteristics.attributes.agility > target.currentCharacteristics.defences.dodge * 1.5) {
                                hitChance = 0.9;
                            }
                            else if (source.currentCharacteristics.attributes.agility < target.currentCharacteristics.defences.dodge * 0.5) {
                                hitChance = 0.1;
                            }
                            else {
                                hitChance = 0.8 * (source.currentCharacteristics.attributes.agility / target.currentCharacteristics.defences.dodge) - 0.3;
                            }
                            const hitRoll = Math.random();
                            console.log(hitChance, hitRoll);
                            if (hitChance >= hitRoll) {
                                console.log('HIT!');
                                if (source instanceof Player) {
                                    const weapon = weapons[source.inventory.equipped.rightHand];
                                    const penetration = source.currentCharacteristics.attributes.strength / target.currentCharacteristics.defences.armor > 1 ? 1 : source.currentCharacteristics.attributes.strength / target.currentCharacteristics.defences.armor;
                                    console.log('Weapon Damage', weapon.damage);
                                    console.log('Penetration', penetration, weapon.damage * penetration);
                                    effect.modifierValue = weapon.damage * penetration;
                                }
                                else {
                                    const weaponDamage = effect.levels[effect.currentLevel];
                                    const penetration = source.currentCharacteristics.attributes.strength / target.currentCharacteristics.defences.armor > 1 ? 1 : source.currentCharacteristics.attributes.strength / target.currentCharacteristics.defences.armor;
                                    console.log('Weapon Damage', weaponDamage);
                                    console.log('Penetration', penetration, weaponDamage * penetration);
                                    effect.modifierValue = weaponDamage * penetration;
                                }
                                target.applyEffect(effect);
                                if (target.currentCharacteristics.parameters.currentHealth <= 0) {
                                    target.isAlive = false;
                                }
                            }
                            else {
                                console.log('Miss..');
                            }
                        }
                    }
                    if (effect.type === 'passive') {
                        target.applyEffect(effect);
                    }
                    if (effect.type === 'conditional') {
                        target.applyEffect(effect);
                    }
                }
                else {
                    console.log('incorrect target passed');
                }
            });
        }
    }
}
const enemiesList = {
    wildBoar: Boar
};
//# sourceMappingURL=disposition.js.map