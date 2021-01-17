define(["require", "exports", "../../characters/enemies/boar", "../../characters/adventurers/adventurer", "../../characters/enemies/wizard", "../../entities/effect", "../../characters/enemies/ghost-knight", "../../characters/enemies/skeleton", "../../characters/adventurers/player", "../../entities/item"], function (require, exports, boar_1, adventurer_1, wizard_1, effect_1, ghost_knight_1, skeleton_1, player_1, item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Disposition {
        constructor(playerCharacters, enemyCharacters, location, scene) {
            this.scene = scene;
            this.playerCharacters = playerCharacters;
            this.enemyCharacters = enemyCharacters.map((char, index) => {
                const enemy = new enemiesList[char]();
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
            [...this.playerCharacters, ...this.enemyCharacters].forEach((char) => char.startRound(this.currentPhase));
            this.calculateTurnOrder();
            this.startTurn();
        }
        endRound() {
            console.log('---------------------------%cEND ROUND%c---------------------------', 'color: red', 'color: auto');
            this.log('---------------------------END ROUND---------------------------');
            [...this.playerCharacters, ...this.enemyCharacters].forEach((char) => {
                if (char.isAlive) {
                    char.endRound();
                }
            });
            this.startRound();
        }
        startTurn() {
            this.currentCharacter = this.turnOrder[0];
            console.log(`%cTurn started for ${this.currentCharacter?.name}`, 'color: green');
            this.log(`Turn started for ${this.currentCharacter?.name}`);
            this.startAction();
        }
        startAction() {
            this.scene.collectActions(this.currentCharacter)
                .then(({ action, targets }) => {
                if (action === 'END TURN') {
                    this.endTurn();
                }
                else {
                    const results = this.processAction(this.currentCharacter, targets, action);
                    this.calculateTurnOrder();
                    this.scene.animateAction(results)
                        .then(() => {
                        this.shouldContinueBattle();
                        if (!this.battleEnded) {
                            if (!this.currentCharacter.isAlive) {
                                this.endTurn();
                            }
                            else if (results.action.actionId !== 'wait') {
                                this.startAction();
                            }
                            else {
                                this.startTurn();
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
                    .filter((char) => !char.actedThisRound && char.isAlive && !char.currentEffects.find((effect) => effect.effectId === 'waiting'))
                    .sort(() => Math.random() - 1)
                    .sort((a, b) => b.characteristics.initiative - a.characteristics.initiative);
            }
            else {
                this.turnOrder = [...this.playerCharacters, ...this.enemyCharacters]
                    .filter((char) => !char.actedThisRound && char.isAlive && !char.currentEffects.find((effect) => effect.effectId === 'waiting'))
                    .sort(() => Math.random() - 1)
                    .sort((a, b) => b.characteristics.initiative - a.characteristics.initiative);
            }
            const waitingCharacters = this.playerCharacters
                .filter((char) => !char.actedThisRound && char.isAlive && char.currentEffects.find((effect) => effect.effectId === 'waiting'))
                .sort(() => Math.random() - 1)
                .sort((a, b) => a.characteristics.initiative - b.characteristics.initiative);
            this.turnOrder = [...this.turnOrder, ...waitingCharacters];
            this.scene.drawTurnOrder(this.turnOrder);
        }
        shouldContinueBattle() {
            // what if everybody are dead?
            if (!this.enemyCharacters.some((char) => char.isAlive)) {
                console.log('Adventurer party won the battle');
                this.log('Adventurer party won the battle');
                this.scene.exitBattle(true);
                this.battleEnded = true;
            }
            if (!this.playerCharacters.some((char) => char.isAlive)) {
                console.log('Adventurer party lost the battle');
                this.log('Adventurer party lost the battle');
                this.scene.exitBattle(false);
                this.battleEnded = true;
            }
        }
        processAction(source, targets, action) {
            const targetsNames = targets.map((target) => target.name).join(', ');
            console.log(`%c${source.name} %ctries to perform %c${action.actionName} %con %c${targetsNames}`, 'color: red', 'color: auto', 'color: green', 'color: auto', 'color: red');
            this.log(`${source.name} tries to perform ${action.actionName} on ${targetsNames}`);
            const actionResults = {
                succeeded: [],
                triggeredTraps: [],
                source,
                targets,
                action,
            };
            if (action.parametersCost?.energy) {
                source.addToParameter('energy', -action.parametersCost.energy);
            }
            if (action.parametersCost?.manna) {
                source.addToParameter('manna', -action.parametersCost.manna);
            }
            source.actionPoints[action.type] -= action.actionCost;
            actionResults.triggeredTraps = this._checkForTriggers(source, action);
            if (action.actionId === 'accessInventory') {
                if (source instanceof adventurer_1.default) {
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
                    player_1.playerInstance.updateAchievement('See battle, Boo? Run, Boo, run!', undefined, true);
                return actionResults;
            }
            if (action.consumes !== undefined && source instanceof adventurer_1.default) {
                const consumedItem = source.getInventoryItemById(action.consumes, true)?.item;
                source.removeItemFromInventory(consumedItem, 1);
                consumedItem.specifics.recovers?.forEach((item) => {
                    if (player_1.playerInstance.addItemToInventory(item.itemId, item.quality) === undefined) {
                        this.scene.droppedItems.push(new item_1.default(item.itemId, item.quality));
                    }
                });
            }
            action.effects.forEach((effect) => {
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
            const triggeredTraps = [];
            let sourceEffectsLength = source.currentEffects.length;
            for (let index = 0; index < sourceEffectsLength; index += 1) {
                const effect = source.currentEffects[index];
                if (effect.type === 'conditional') {
                    // eslint-disable-next-line no-loop-func
                    action.triggers?.forEach((trigger) => {
                        if (trigger.conditionId === effect.effectId) {
                            const triggerRoll = Math.random();
                            console.log(`Trigger probability of ${trigger.probability} vs trigger roll of ${triggerRoll}`);
                            this.log(`Trigger probability of ${trigger.probability} vs trigger roll of ${triggerRoll}`);
                            if (triggerRoll < trigger.probability) {
                                console.log('Triggered!', 'applying new effects,', effect.modifier.value);
                                this.log('Triggered! Applying new effects');
                                triggeredTraps.push(effect);
                                source.currentEffects.splice(index, 1);
                                index -= 1;
                                sourceEffectsLength -= 1;
                                if (effect.modifier.type === 'effect') {
                                    effect.modifier.value.forEach((effectOfTheTrigger) => {
                                        const trapEffect = new effect_1.default(effectOfTheTrigger);
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
            logElement.style.display = 'block';
            const entreeElement = document.createElement('div');
            entreeElement.innerText = entree;
            logElement.appendChild(entreeElement);
        }
    }
    exports.default = Disposition;
    const enemiesList = {
        wildBoar: boar_1.default,
        wizard: wizard_1.default,
        'ghost-knight': ghost_knight_1.default,
        skeleton: skeleton_1.default,
    };
});
//# sourceMappingURL=disposition.js.map