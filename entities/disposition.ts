import {Boar} from "./boar.js";
import GeneralEntity from "./generalEntity.js";
import {effects} from "../actionsAndEffects/effects.js";
import Player from "./player.js";
import {weapons} from "../actionsAndEffects/items.js";
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
        //this.scene.inventory.showInventory(this.currentCharacter);
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

    public processAction(source: GeneralEntity, target: GeneralEntity, action: Action) {
        console.log(`%c${source.name} %ctries to perform %c${action.actionName} %con %c${target.name}`, 'color: red', 'color: auto', 'color: green', 'color: auto', 'color: red');
        if (source.actionPoints[action.type] < action.actionCost) {
            return false;
        } else {
            source.actionPoints[action.type] = source.actionPoints[action.type] - action.actionCost;
            this._checkForTriggers(source, target, action);
            if (action.actionId === 'accessInventory') {
                if (source instanceof Player) {
                    this.scene.inventory.showInventory(source);
                }
            } else {
                action.effect.forEach(effectDescription => {
                    const effect = effects[effectDescription.effectId];
                    effect.currentLevel = effectDescription.level;
                    effect.durationLeft = effect.baseDuration;
                    effect.source = effectDescription.source;
                    if (effect.applicationCheck(source, target, action)) {
                        effect.setModifier(source, target, action);
                        target.applyEffect(effect);
                    }
                });
                if (target.currentCharacteristics.parameters.currentHealth <= 0) {
                    target.isAlive = false;
                }
                if (source.currentCharacteristics.parameters.currentHealth <= 0) {
                    source.isAlive = false;
                }
            }
        }
        this.scene.drawDisposition(this);
        this.shouldContinueFight();
    }

    private _checkForTriggers(source: GeneralEntity, target: GeneralEntity, action: Action) {
        let sourceEffectsLength = source.currentEffects.length;
        for (let index = 0; index < sourceEffectsLength; index++) {
            let effect = source.currentEffects[index];
            if (effect.type === 'conditional') {
                console.log(`Conditional effect %c${effect.effectId} %cis getting checked`, 'color: red', 'color: auto', effect);
                action.triggers?.forEach(trigger => {
                    if (trigger.conditionId === effect.effectId) {
                        const triggerRoll = Math.random();
                        console.log(`Trigger probability of ${trigger.probability} vs trigger roll of ${triggerRoll}`);
                        if (triggerRoll < trigger.probability) {
                            console.log('Triggered!', 'applying new effects,', effect.modifier.value);
                            source.currentEffects.splice(index, 1);
                            index--;
                            sourceEffectsLength--;
                            if (effect.modifier.type === 'effect') {
                                effect.modifier.value.forEach(effectOfTheTrigger => {
                                    const trapEffect = effects[effectOfTheTrigger];
                                    trapEffect.setModifier();
                                    source.applyEffect(trapEffect);
                                });
                            }
                        } else {
                            console.log('Avoided!');
                        }
                    }
                });
            }
        }
    }
}

const enemiesList = {
    wildBoar: Boar
};