import { Boar } from "../../characters/enemies/boar.js";
import { Adventurer } from "../../characters/adventurers/adventurer.js";
import { Wizard } from "../../characters/enemies/wizard.js";
import Effect from "../../entities/effect.js";
import { GhostKnight } from "../../characters/enemies/ghost-knight.js";
import { Skeleton } from "../../characters/enemies/skeleton.js";
import { playerInstance } from "../../characters/adventurers/player.js";
import Item from "../../entities/item.js";
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
    }
    startRound() {
        this.currentPhase = this.currentPhase !== undefined ? 'battle' : 'preparation';
        console.log(`---------------------------%cSTART ${this.currentPhase} ROUND%c---------------------------`, 'color: red', 'color: auto');
        this.log(`---------------------------START ${this.currentPhase} ROUND---------------------------`);
        [...this.playerCharacters, ...this.enemyCharacters].forEach(char => char.startRound(this.currentPhase));
        this.calculateTurnOrder();
        this.startTurn();
    }
    endRound() {
        console.log('---------------------------%cEND ROUND%c---------------------------', 'color: red', 'color: auto');
        this.log('---------------------------END ROUND---------------------------');
        [...this.playerCharacters, ...this.enemyCharacters].forEach(char => {
            if (char.isAlive) {
                char.endRound();
            }
        });
        this.startRound();
    }
    startTurn() {
        var _a, _b;
        this.currentCharacter = this.turnOrder[0];
        console.log(`%cTurn started for ${(_a = this.currentCharacter) === null || _a === void 0 ? void 0 : _a.name}`, 'color: green');
        this.log(`Turn started for ${(_b = this.currentCharacter) === null || _b === void 0 ? void 0 : _b.name}`);
        this.startAction();
    }
    startAction() {
        this.scene.collectActions(this.currentCharacter).then(({ action, targets }) => {
            if (action === 'END TURN') {
                this.endTurn();
            }
            else {
                const results = this.processAction(this.currentCharacter, targets, action);
                this.calculateTurnOrder();
                this.scene.animateAction(results).then(() => {
                    this.shouldContinueBattle();
                    if (!this.battleEnded) {
                        if (!this.currentCharacter.isAlive) {
                            this.endTurn();
                        }
                        else {
                            if (results.attempted === false) {
                                this.endTurn();
                            }
                            else {
                                this.startAction();
                            }
                        }
                    }
                });
            }
        });
    }
    endTurn() {
        if (this.battleEnded)
            return;
        console.log(`%c${this.currentCharacter.name}'s turn ended`, 'color: green');
        this.log(`${this.currentCharacter.name}'s turn ended`);
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
                .sort((a, b) => b.characteristics.initiative - a.characteristics.initiative);
        }
        else {
            this.turnOrder = [...this.playerCharacters, ...this.enemyCharacters]
                .filter(char => !char.actedThisRound && char.isAlive)
                .sort((a, b) => Math.random() - 1)
                .sort((a, b) => b.characteristics.initiative - a.characteristics.initiative);
        }
        this.scene.drawTurnOrder(this.turnOrder);
    }
    shouldContinueBattle() {
        //what if everybody are dead?
        if (!this.enemyCharacters.some(char => char.isAlive)) {
            console.log('Adventurer party won the battle');
            this.log('Adventurer party won the battle');
            this.scene.exitBattle(true);
            this.battleEnded = true;
        }
        if (!this.playerCharacters.some(char => char.isAlive)) {
            console.log('Adventurer party lost the battle');
            this.log('Adventurer party lost the battle');
            this.scene.exitBattle(false);
            this.battleEnded = true;
        }
    }
    processAction(source, targets, action) {
        var _a, _b, _c, _d;
        const targetsNames = targets.map(target => target.name).join(', ');
        console.log(`%c${source.name} %ctries to perform %c${action.actionName} %con %c${targetsNames}`, 'color: red', 'color: auto', 'color: green', 'color: auto', 'color: red');
        this.log(`${source.name} tries to perform ${action.actionName} on ${targetsNames}`);
        let actionResults = {
            attempted: false,
            succeeded: [],
            triggeredTraps: [],
            source: source,
            targets: targets,
            action: action
        };
        if (source.actionPoints[action.type] < action.actionCost) {
            console.log(`Action was not performed because ${source.actionPoints[action.type]} ${action.type} action points is not enough - ${action.actionCost} is needed.`);
            this.log(`Action was not performed because ${source.actionPoints[action.type]} ${action.type} action points is not enough - ${action.actionCost} is needed.`);
            return actionResults;
        }
        if (action.parametersCost.manna && source.parameters.manna < action.parametersCost.manna) {
            console.log(`Action was not performed because ${source.parameters} manna is not enough - ${action.parametersCost.manna} is needed.`);
            this.log(`Action was not performed because ${source.parameters} manna is not enough - ${action.parametersCost.manna} is needed.`);
            return actionResults;
        }
        if (action.parametersCost.energy && source.parameters.energy < action.parametersCost.energy) {
            console.log(`Action was not performed because ${source.parameters.energy} energy is not enough - ${action.parametersCost.energy} is needed.`);
            this.log(`Action was not performed because ${source.parameters.energy} energy is not enough - ${action.parametersCost.energy} is needed.`);
            return actionResults;
        }
        actionResults.attempted = true;
        if ((_a = action.parametersCost) === null || _a === void 0 ? void 0 : _a.energy) {
            source.addToParameter('energy', -action.parametersCost.energy);
        }
        if ((_b = action.parametersCost) === null || _b === void 0 ? void 0 : _b.manna) {
            source.addToParameter('manna', -action.parametersCost.manna);
        }
        source.actionPoints[action.type] = source.actionPoints[action.type] - action.actionCost;
        actionResults.triggeredTraps = this._checkForTriggers(source, action);
        if (action.actionId === 'accessInventory') {
            if (source instanceof Adventurer) {
                actionResults.succeeded.push(true);
                this.scene.scene.pause('Battle');
                this.scene.scene.run('Inventory', { prevScene: 'Battle' });
            }
            return actionResults;
        }
        if (action.actionId === 'retreat') {
            console.log('Adventurer party retreated!');
            this.log('Adventurer party retreated!');
            this.scene.exitBattle(false);
            this.battleEnded = true;
            if (this.currentPhase === 'preparation')
                playerInstance.updateAchievement('See battle, Boo? Run, Boo, run!', undefined, true);
            return actionResults;
        }
        if (action.consumes !== undefined && source instanceof Adventurer) {
            const consumedItem = (_c = source.getInventoryItemById(action.consumes, true)) === null || _c === void 0 ? void 0 : _c.item;
            source.removeItemFromInventory(consumedItem, 1);
            (_d = consumedItem.specifics.recovers) === null || _d === void 0 ? void 0 : _d.forEach(item => {
                if (playerInstance.addItemToInventory(item.itemId, item.quality) === undefined) {
                    this.scene.droppedItems.push(new Item(item.itemId, item.quality));
                }
            });
        }
        action.effects.forEach(effect => {
            targets.forEach((target, index) => {
                if (effect.applicationCheck(source, target, action)) {
                    effect.setModifier(source, target, action);
                    target.applyEffect(effect);
                    actionResults.succeeded[index] = true;
                }
            });
        });
        return actionResults;
    }
    _checkForTriggers(source, action) {
        var _a;
        let triggeredTraps = [];
        let sourceEffectsLength = source.currentEffects.length;
        for (let index = 0; index < sourceEffectsLength; index++) {
            let effect = source.currentEffects[index];
            if (effect.type === 'conditional') {
                (_a = action.triggers) === null || _a === void 0 ? void 0 : _a.forEach(trigger => {
                    if (trigger.conditionId === effect.effectId) {
                        const triggerRoll = Math.random();
                        console.log(`Trigger probability of ${trigger.probability} vs trigger roll of ${triggerRoll}`);
                        this.log(`Trigger probability of ${trigger.probability} vs trigger roll of ${triggerRoll}`);
                        if (triggerRoll < trigger.probability) {
                            console.log('Triggered!', 'applying new effects,', effect.modifier.value);
                            this.log('Triggered! Applying new effects');
                            triggeredTraps.push(effect);
                            source.currentEffects.splice(index, 1);
                            index--;
                            sourceEffectsLength--;
                            if (effect.modifier.type === 'effect') {
                                effect.modifier.value.forEach(effectOfTheTrigger => {
                                    const trapEffect = new Effect(effectOfTheTrigger);
                                    trapEffect.strength = effect.strength;
                                    trapEffect.source = effect.source;
                                    trapEffect.setModifier();
                                    source.applyEffect(trapEffect);
                                });
                            }
                        }
                        else {
                            console.log('Avoided!');
                            this.log('Avoided!');
                        }
                    }
                });
            }
        }
        return triggeredTraps;
    }
    log(entree) {
        const logElement = document.getElementsByClassName('battle-log')[0];
        // @ts-ignore
        logElement.style.display = 'block';
        const entreeElement = document.createElement('div');
        entreeElement.innerText = entree;
        logElement.appendChild(entreeElement);
    }
}
const enemiesList = {
    'wildBoar': Boar,
    'wizard': Wizard,
    'ghost-knight': GhostKnight,
    'skeleton': Skeleton
};
//# sourceMappingURL=disposition.js.map