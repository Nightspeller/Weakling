import { Boar } from "./boar.js";
import { effects } from "../actionsAndEffects/effects.js";
import { Adventurer } from "./adventurer.js";
import { Wizard } from "./wizard.js";
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
        this.battleEnded = false;
        this.scene.drawDisposition(this);
        this.startRound();
    }
    startRound() {
        this.currentPhase = this.currentPhase !== undefined ? 'battle' : 'preparation';
        console.log(`---------------------------%cSTART ${this.currentPhase} ROUND%c---------------------------`, 'color: red', 'color: auto');
        [...this.playerCharacters, ...this.enemyCharacters].forEach(char => char.startRound(this.currentPhase));
        this.calculateTurnOrder();
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
        var _a;
        this.currentCharacter = this.turnOrder[0];
        console.log(`%cTurn started for ${(_a = this.currentCharacter) === null || _a === void 0 ? void 0 : _a.name}`, 'color: green');
        this.currentCharacter.startTurn(this.scene);
        if (this.currentCharacter instanceof Adventurer) {
            this.scene.drawMakingTurnGraphics(this.currentCharacter);
            this.scene.drawActionPoints(this.currentCharacter);
            this.scene.drawActionInterface(this);
        }
        else {
            this.currentCharacter.aiTurn(this).then(() => this.endTurn());
        }
    }
    endTurn() {
        if (this.battleEnded)
            return;
        console.log('%cTurn ended', 'color: green');
        this.currentCharacter.endTurn();
        this.calculateTurnOrder();
        if (this.turnOrder.length !== 0) {
            this.startTurn();
        }
        else {
            this.endRound();
        }
    }
    calculateTurnOrder() {
        if (this.currentPhase === 'preparation') {
            this.turnOrder = [...this.playerCharacters]
                .filter(char => !char.actedThisRound && char.isAlive)
                .sort((a, b) => Math.random() - 1)
                .sort((a, b) => b.currentCharacteristics.attributes.initiative - a.currentCharacteristics.attributes.initiative);
        }
        else {
            this.turnOrder = [...this.playerCharacters, ...this.enemyCharacters]
                .filter(char => !char.actedThisRound && char.isAlive)
                .sort((a, b) => Math.random() - 1)
                .sort((a, b) => b.currentCharacteristics.attributes.initiative - a.currentCharacteristics.attributes.initiative);
        }
        this.scene.drawTurnOrder(this);
    }
    shouldContinueFight() {
        //what if everybody are dead?
        if (!this.enemyCharacters.some(char => char.isAlive)) {
            console.log('Adventurer party won the battle');
            this.scene.exitBattle();
            this.battleEnded = true;
        }
        if (!this.playerCharacters.some(char => char.isAlive)) {
            console.log('Adventurer party lost the battle');
            this.scene.exitBattle();
            this.battleEnded = true;
        }
    }
    processAction(source, target, action) {
        console.log(`%c${source.name} %ctries to perform %c${action.actionName} %con %c${target.name}`, 'color: red', 'color: auto', 'color: green', 'color: auto', 'color: red');
        if (source.actionPoints[action.type] < action.actionCost) {
            console.log(`Action was not performed because ${source.actionPoints[action.type]} is not enough - ${action.actionCost} is needed.`);
            return false;
        }
        else {
            source.actionPoints[action.type] = source.actionPoints[action.type] - action.actionCost;
            this._checkForTriggers(source, target, action);
            if (action.actionId === 'accessInventory') {
                if (source instanceof Adventurer) {
                    this.scene.switchToScene('Inventory', {}, false);
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
                    this.scene.playDeathAnimation(target);
                    target.isAlive = false;
                    this.calculateTurnOrder();
                }
                if (source.currentCharacteristics.parameters.currentHealth <= 0) {
                    this.scene.playDeathAnimation(source);
                    source.isAlive = false;
                    this.calculateTurnOrder();
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
    wildBoar: Boar,
    wizard: Wizard
};
//# sourceMappingURL=disposition.js.map