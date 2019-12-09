import {Boar} from "./boar.js";
import GeneralEntity from "./generalEntity.js";
import {effects} from "../actionsAndEffects/effects.js";
import Player from "./player.js";
import {weapons} from "../actionsAndEffects/weapons.js";
import {enemyActions} from "../actionsAndEffects/enemyActions.js";
import generalEntity from "./generalEntity.js";
import EnemyEntity from "./enemyEntity.js";
import {FightScene} from "../scenes/fight.js";

export class Disposition {
    public playerCharacters: any[];
    public enemyCharacters: any[];
    public currentCharacter: GeneralEntity;
    public location: string;
    public playerCharactersPositions: { frontTop: Player; frontBottom: Player; backTop: Player; backBottom: Player };
    public enemyCharactersPositions: { frontTop: EnemyEntity; frontBottom: EnemyEntity; backTop: EnemyEntity; backBottom: EnemyEntity };
    public currentPhase: 'preparation' | 'battle';
    public turnOrder: generalEntity[];
    private scene: FightScene;

    constructor(playerCharacters, enemyCharacters, location, scene: FightScene) {
        this.scene = scene;
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

        this.startRound();
    }

    public startRound() {
        this.currentPhase = this.currentPhase !== undefined ? 'battle' : 'preparation';
        console.log('Starting new round on the disposition', this.currentPhase);
        [...this.playerCharacters, ...this.enemyCharacters].forEach(char => char.actedThisRound = false);
        this.turnOrder = this.calculateTurnOrder();
        this.turnOrder.forEach(char => char.startRound(this.currentPhase));
        this.startTurn();
    }

    private startTurn() {
        this.currentCharacter = this.turnOrder[0];
        this.scene.drawDisposition(this);
        if (this.currentCharacter instanceof EnemyEntity) {
            this.aiTurn();
            this.endTurn();
        }
    }

    public endTurn() {
        console.log('Ending TURN on the scene');
        this.currentCharacter.actedThisRound = true;
        this.turnOrder.shift();
        if (this.turnOrder.length !== 0) {
            this.startTurn()
        } else {
            console.log('Turn order is empty, round is over');
            this.startRound();
        }
    }

    calculateTurnOrder() {
        if (this.currentPhase === 'preparation') {
            return [...this.playerCharacters]
                .filter(char => !char.actedThisRound && char.isAlive)
                .sort((a, b) => Math.random() - 1)
                .sort((a, b) => b.currentCharacteristics.attributes.initiative - a.currentCharacteristics.attributes.initiative);
        } else {
            return [...this.playerCharacters, ...this.enemyCharacters]
                .filter(char => !char.actedThisRound && char.isAlive)
                .sort((a, b) => Math.random() - 1)
                .sort((a, b) => b.currentCharacteristics.attributes.initiative - a.currentCharacteristics.attributes.initiative);
        }
    }

    public aiTurn() {
        this.currentCharacter.aiTurn(this);
    }

    private shouldContinueFight() {
        if (!this.enemyCharacters.some(char => char.isAlive)) {
            console.log('Player party won the battle');
            this.scene.scene.start("WorldMap");
        }
        if (!this.playerCharacters.some(char => char.isAlive)) {
            console.log('Player party lost the battle');
            this.scene.scene.start("WorldMap");
        }
    }

    public processAction(source: GeneralEntity, target: GeneralEntity/* | GeneralEntity[]*/, action: Action) {
        console.log(`%c${source.name} %ctries to perform %c${action.actionName} %con %c${target.name}`, 'color: red', 'color: auto', 'color: green', 'color: auto', 'color: red');
        if (source.actionPoints[action.type] < action.actionCost) {
            return false;
        } else {
            source.actionPoints[action.type] = source.actionPoints[action.type] - action.actionCost;
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
                                let hitChance: number;
                                if (source.currentCharacteristics.attributes.agility > target.currentCharacteristics.defences.dodge * 1.5) {
                                    hitChance = 0.9;
                                } else if (source.currentCharacteristics.attributes.agility < target.currentCharacteristics.defences.dodge * 0.5) {
                                    hitChance = 0.1;
                                } else {
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
                                    } else {
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
                                } else {
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

                    } else {
                        console.log('incorrect target passed');
                    }
                });

            }
        }
        this.scene.drawDisposition(this);
        this.shouldContinueFight();
    }
}

const enemiesList = {
    wildBoar: Boar
};