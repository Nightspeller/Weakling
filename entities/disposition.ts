import {Boar} from "./boar.js";
import GeneralEntity from "./generalEntity.js";
import {effects} from "../actionsAndEffects/effects.js";
import EnemyEntity from "./enemyEntity.js";
import {Adventurer} from "./adventurer.js";
import {Wizard} from "./wizard.js";
import {BattleScene} from "../battle/battle.js";

export class Disposition {
    public playerCharacters: Adventurer[];
    public enemyCharacters: EnemyEntity[];
    public currentCharacter: Adventurer | EnemyEntity;
    public location: string;
    public currentPhase: 'preparation' | 'battle';
    public turnOrder: (Adventurer | EnemyEntity)[];
    public scene: BattleScene;
    private battleEnded: boolean;

    constructor(playerCharacters: Adventurer[], enemyCharacters: string[], location: string, scene: BattleScene) {
        this.scene = scene;
        this.playerCharacters = playerCharacters;
        this.enemyCharacters = enemyCharacters.map((char, index) => {
            const enemy = new enemiesList[char];
            enemy.name = `${enemy.name} ${index + 1}`;
            return enemy;
        });
        this.location = location;
        this.battleEnded = false;
    }

    public startRound() {
        this.currentPhase = this.currentPhase !== undefined ? 'battle' : 'preparation';
        console.log(`---------------------------%cSTART ${this.currentPhase} ROUND%c---------------------------`, 'color: red', 'color: auto');
        this.log(`---------------------------START ${this.currentPhase} ROUND---------------------------`);
        [...this.playerCharacters, ...this.enemyCharacters].forEach(char => char.startRound(this.currentPhase));
        this.calculateTurnOrder();
        this.startTurn();
    }

    public endRound() {
        console.log('---------------------------%cEND ROUND%c---------------------------', 'color: red', 'color: auto');
        this.log('---------------------------END ROUND---------------------------');
        [...this.playerCharacters, ...this.enemyCharacters].forEach(char => {
            if (char.isAlive) {
                char.endRound();
            }
        });
        this.startRound();
    }

    private startTurn() {
        this.currentCharacter = this.turnOrder[0];
        console.log(`%cTurn started for ${this.currentCharacter?.name}`, 'color: green');
        this.log(`Turn started for ${this.currentCharacter?.name}`);
        this.scene.collectActions(this.currentCharacter);
    }

    public endTurn() {
        if (this.battleEnded) return;
        console.log(`%c${this.currentCharacter.name}'s turn ended`, 'color: green');
        this.log(`${this.currentCharacter.name}'s turn ended`);
        this.currentCharacter.endTurn();
        this.calculateTurnOrder();
        if (this.turnOrder.length !== 0) {
            this.startTurn();
        } else {
            this.endRound();
        }
    }

    calculateTurnOrder() {
        if (this.currentPhase === 'preparation') {
            this.turnOrder = [...this.playerCharacters]
                .filter(char => !char.actedThisRound && char.isAlive)
                .sort((a, b) => Math.random() - 1)
                .sort((a, b) => b.currentCharacteristics.attributes.initiative - a.currentCharacteristics.attributes.initiative);
        } else {
            this.turnOrder = [...this.playerCharacters, ...this.enemyCharacters]
                .filter(char => !char.actedThisRound && char.isAlive)
                .sort((a, b) => Math.random() - 1)
                .sort((a, b) => b.currentCharacteristics.attributes.initiative - a.currentCharacteristics.attributes.initiative);
        }
        this.scene.drawTurnOrder(this.turnOrder);
    }

    private shouldContinueBattle() {
        //what if everybody are dead?
        if (!this.enemyCharacters.some(char => char.isAlive)) {
            console.log('Adventurer party won the battle');
            this.log('Adventurer party won the battle');
            this.scene.exitBattle();
            this.battleEnded = true;
        }
        if (!this.playerCharacters.some(char => char.isAlive)) {
            console.log('Adventurer party lost the battle');
            this.log('Adventurer party lost the battle');
            this.scene.exitBattle();
            this.battleEnded = true;
        }
    }

    public processAction(source: Adventurer | EnemyEntity, target: Adventurer | EnemyEntity, action: Action) {
        console.log(`%c${source.name} %ctries to perform %c${action.actionName} %con %c${target.name}`, 'color: red', 'color: auto', 'color: green', 'color: auto', 'color: red');
        this.log(`${source.name} tries to perform ${action.actionName} on ${target.name}`);
        if (source.actionPoints[action.type] < action.actionCost) {
            console.log(`Action was not performed because ${source.actionPoints[action.type]} is not enough - ${action.actionCost} is needed.`);
            this.log(`Action was not performed because ${source.actionPoints[action.type]} is not enough - ${action.actionCost} is needed.`);
            return false;
        } else {
            source.actionPoints[action.type] = source.actionPoints[action.type] - action.actionCost;
            this._checkForTriggers(source, target, action);
            if (action.actionId === 'accessInventory') {
                if (source instanceof Adventurer) {
                    this.scene.switchToScene('Inventory', {}, false);
                }
            } else {
                action.effect.forEach(effectDescription => {
                    const effect = {...effects[effectDescription.effectId]};
                    effect.currentLevel = effectDescription.level;
                    effect.durationLeft = effect.baseDuration;
                    effect.source = effectDescription.source;
                    if (effect.applicationCheck(source, target, action)) {
                        effect.setModifier(source, target, action);
                        target.applyEffect(effect);
                    }
                });
                if (target.currentCharacteristics.parameters.currentHealth <= 0) {
                    this.scene.playAnimation(target, 'death');
                    target.isAlive = false;
                }
                if (source.currentCharacteristics.parameters.currentHealth <= 0) {
                    this.scene.playAnimation(source, 'death');
                    source.isAlive = false;
                }
            }
        }
        this.shouldContinueBattle();
        if (!this.currentCharacter.isAlive) {
            this.endTurn();
        }
        this.calculateTurnOrder();
    }

    private _checkForTriggers(source: GeneralEntity, target: GeneralEntity, action: Action) {
        let sourceEffectsLength = source.currentEffects.length;
        for (let index = 0; index < sourceEffectsLength; index++) {
            let effect = source.currentEffects[index];
            if (effect.type === 'conditional') {
                action.triggers?.forEach(trigger => {
                    if (trigger.conditionId === effect.effectId) {
                        const triggerRoll = Math.random();
                        console.log(`Trigger probability of ${trigger.probability} vs trigger roll of ${triggerRoll}`);
                        this.log(`Trigger probability of ${trigger.probability} vs trigger roll of ${triggerRoll}`);
                        if (triggerRoll < trigger.probability) {
                            console.log('Triggered!', 'applying new effects,', effect.modifier.value);
                            this.log('Triggered! Applying new effects');
                            source.currentEffects.splice(index, 1);
                            index--;
                            sourceEffectsLength--;
                            if (effect.modifier.type === 'effect') {
                                effect.modifier.value.forEach(effectOfTheTrigger => {
                                    const trapEffect = {...effects[effectOfTheTrigger]};
                                    trapEffect.durationLeft = trapEffect.baseDuration;
                                    trapEffect.source = effect.source;
                                    trapEffect.setModifier();
                                    source.applyEffect(trapEffect);
                                });
                            }
                        } else {
                            console.log('Avoided!');
                            this.log('Avoided!');
                        }
                    }
                });
            }
        }
    }

    public log(entree: string) {
        const logElement = document.getElementsByClassName('battle-log')[0];
        // @ts-ignore
        logElement.style.display = 'block';
        const entreeElement = document.createElement('div');
        entreeElement.innerText = entree;
        logElement.appendChild(entreeElement);
    }
}

const enemiesList = {
    wildBoar: Boar,
    wizard: Wizard
};
