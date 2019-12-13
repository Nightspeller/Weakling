import { Boar } from "./boar.js";
import { effects } from "../actionsAndEffects/effects.js";
import Player from "./player.js";
import EnemyEntity from "./enemyEntity.js";
export class Disposition {
    constructor(playerCharacters, enemyCharacters, location, scene) {
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
    startRound() {
        this.currentPhase = this.currentPhase !== undefined ? 'battle' : 'preparation';
        console.log(`---------------------------%cSTART ${this.currentPhase} ROUND%c---------------------------`, 'color: red', 'color: auto');
        [...this.playerCharacters, ...this.enemyCharacters].forEach(char => char.actedThisRound = false);
        this.turnOrder = this.calculateTurnOrder();
        this.turnOrder.forEach(char => char.startRound(this.currentPhase));
        this.startTurn();
    }
    endRound() {
        console.log('---------------------------%cEND ROUND%c---------------------------', 'color: red', 'color: auto');
        [...this.playerCharacters, ...this.enemyCharacters].forEach(char => {
            if (char.isAlive) {
                char.endRound();
            }
        });
        this.startRound();
    }
    startTurn() {
        this.currentCharacter = this.turnOrder[0];
        //this.scene.inventory.showInventory(this.currentCharacter);
        this.scene.drawDisposition(this);
        if (this.currentCharacter instanceof EnemyEntity) {
            this.aiTurn().then(() => {
                this.endTurn();
            });
        }
    }
    endTurn() {
        console.log('Ending TURN on the scene');
        this.currentCharacter.actedThisRound = true;
        this.turnOrder.shift();
        if (this.turnOrder.length !== 0) {
            this.startTurn();
        }
        else {
            this.endRound();
        }
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
    async aiTurn() {
        await this.currentCharacter.aiTurn(this);
    }
    shouldContinueFight() {
        if (!this.enemyCharacters.some(char => char.isAlive)) {
            console.log('Player party won the battle');
            this.scene.scene.start("WorldMap");
        }
        if (!this.playerCharacters.some(char => char.isAlive)) {
            console.log('Player party lost the battle');
            this.scene.scene.start("WorldMap");
        }
    }
    processAction(source, target, action) {
        console.log(`%c${source.name} %ctries to perform %c${action.actionName} %con %c${target.name}`, 'color: red', 'color: auto', 'color: green', 'color: auto', 'color: red');
        if (source.actionPoints[action.type] < action.actionCost) {
            return false;
        }
        else {
            source.actionPoints[action.type] = source.actionPoints[action.type] - action.actionCost;
            this._checkForTriggers(source, target, action);
            if (action.actionId === 'accessInventory') {
                if (source instanceof Player) {
                    this.scene.inventory.showInventory(source);
                }
            }
            else {
                action.effect.forEach(effectDescription => {
                    const effect = { ...effects[effectDescription.effectId] };
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
    _checkForTriggers(source, target, action) {
        var _a;
        let sourceEffectsLength = source.currentEffects.length;
        for (let index = 0; index < sourceEffectsLength; index++) {
            let effect = source.currentEffects[index];
            if (effect.type === 'conditional') {
                (_a = action.triggers) === null || _a === void 0 ? void 0 : _a.forEach(trigger => {
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
                                    const trapEffect = { ...effects[effectOfTheTrigger] };
                                    trapEffect.durationLeft = trapEffect.baseDuration;
                                    trapEffect.source = effect.source;
                                    trapEffect.setModifier();
                                    source.applyEffect(trapEffect);
                                });
                            }
                        }
                        else {
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
//# sourceMappingURL=disposition.js.map