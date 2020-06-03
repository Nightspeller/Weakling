import { GAME_W } from "../config/constants.js";
import Action from "../entities/action.js";
var Rectangle = Phaser.Geom.Rectangle;
export class ActionInterfaceDrawer {
    constructor(scene, disposition) {
        this.disposition = disposition;
        this.scene = scene;
        this.displayContainer = this.scene.add.container(16, 500).setDepth(2);
    }
    drawActionInterface() {
        return new Promise(resolve => {
            this.displayContainer.removeAll(true);
            const disposition = this.disposition;
            this.drawEndTurnButton(resolve);
            let self = this;
            let scene = this.scene;
            const currentCharacter = disposition.currentCharacter;
            const availableActions = currentCharacter.getAvailableActions();
            let actionsOfType = [0, 0, 0];
            let buttonX;
            let buttonY;
            availableActions.sort().forEach(actionId => {
                const action = new Action(actionId, currentCharacter);
                if (action.phase.includes(disposition.currentPhase)) {
                    if (action.type === 'physical') {
                        buttonX = (actionsOfType[0] % 3) * 81;
                        buttonY = 32 * Math.floor(actionsOfType[0] / 3);
                        actionsOfType[0]++;
                    }
                    if (action.type === 'magical') {
                        buttonX = GAME_W / 2 - 81 - 40 - 16 + (actionsOfType[1] % 3) * 81;
                        buttonY = 32 * Math.floor(actionsOfType[1] / 3);
                        actionsOfType[1]++;
                    }
                    if (action.type === 'misc') {
                        buttonX = GAME_W - 32 - 3 * 81 + (actionsOfType[2] % 3) * 81;
                        buttonY = 32 * Math.floor(actionsOfType[2] / 3);
                        actionsOfType[2]++;
                    }
                    const isAvailable = currentCharacter.actionPoints[action.type] >= action.actionCost;
                    const button = this.drawActionInterfaceButton(action, buttonX, buttonY, isAvailable);
                    button['bx'] = buttonX;
                    button['by'] = buttonY;
                    if (!isAvailable)
                        return;
                    button.on('pointerdown', function () {
                        if (action.target === 'self') {
                            self.displayContainer.removeAll(true);
                            resolve({ action: action, targets: [currentCharacter] });
                        }
                        if (action.target === 'allEnemies') {
                            self.displayContainer.removeAll(true);
                            resolve({
                                action: action,
                                targets: disposition.enemyCharacters.filter(char => char.isAlive)
                            });
                        }
                        if (['enemy', 'friend', 'any', 'party'].includes(action.target)) {
                            console.log(`starting ${action.target} target selection`);
                            this.lineStyle(1, 0xff0000, 1)
                                .strokeRect(this.bx, this.by, 32 + 3 * 16, 32);
                            const potentialTargets = self.getPossibleTargets(action.target, currentCharacter);
                            let overlay = scene.add.graphics()
                                .fillStyle(0x000000, 0.25)
                                .fillRect(0, 0, 800, 640);
                            let zone = scene.add.zone(0, 0, 800, 640).setOrigin(0, 0)
                                .setInteractive().once('pointerdown', () => removeOverlay());
                            const removeOverlay = () => {
                                overlay.destroy();
                                zone.destroy();
                                potentialTargets.forEach(potentialTarget => {
                                    potentialTarget.image.setDepth(0);
                                    potentialTarget.zone.destroy(true);
                                });
                                this.lineStyle(1, 0x000000, 1)
                                    .strokeRect(this.bx, this.by, 32 + 3 * 16, 32);
                            };
                            potentialTargets.forEach(potentialTarget => {
                                if (potentialTarget.character.isAlive) {
                                    potentialTarget.image.setDepth(3);
                                    potentialTarget.zone.once('pointerdown', () => {
                                        removeOverlay();
                                        self.displayContainer.removeAll(true);
                                        resolve({ action, targets: [potentialTarget.character] });
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    getPossibleTargets(target, self) {
        const targetList = [];
        if (target === 'enemy' || target === 'any') {
            this.disposition.enemyCharacters.forEach(char => {
                const charImage = this.scene.charToDrawerMap.get(char).mainImage;
                const zone = this.scene.add.zone(charImage.x, charImage.y, 96, 96).setDepth(4)
                    .setInteractive({ useHandCursor: true });
                targetList.push({ image: charImage, character: char, zone: zone });
            });
        }
        if (target === 'party' || target === 'any') {
            this.disposition.playerCharacters.forEach(char => {
                const charImage = this.scene.charToDrawerMap.get(char).mainImage;
                const zone = this.scene.add.zone(charImage.x, charImage.y, 96, 96).setDepth(4)
                    .setInteractive({ useHandCursor: true });
                targetList.push({ image: charImage, character: char, zone: zone });
            });
        }
        if (target === 'friend') {
            this.disposition.playerCharacters.forEach(char => {
                if (char !== self) {
                    const charImage = this.scene.charToDrawerMap.get(char).mainImage;
                    const zone = this.scene.add.zone(charImage.x, charImage.y, 96, 96).setDepth(4)
                        .setInteractive({ useHandCursor: true });
                    targetList.push({ image: charImage, character: char, zone: zone });
                }
            });
        }
        return targetList;
    }
    drawActionInterfaceButton(action, buttonX, buttonY, isAvailable) {
        var _a, _b, _c, _d;
        const border = this.scene.add.graphics();
        this.displayContainer.add(border);
        const actionIcon = this.scene.add.sprite(buttonX, buttonY, action.icon.texture, action.icon.frame).setOrigin(0, 0);
        this.displayContainer.add(actionIcon);
        let pointsDrawn = 0;
        const frames = { physical: 0, magical: 1, misc: 2 };
        for (let i = 0; i < Math.trunc(action.actionCost); i++) {
            this.displayContainer.add(this.scene.add.sprite(buttonX + 32 + pointsDrawn * 16, buttonY, 'action-points', frames[action.type]).setOrigin(0, 0));
            pointsDrawn++;
        }
        if (action.actionCost % 1 === 0.5) {
            this.displayContainer.add(this.scene.add.sprite(buttonX + 32 + pointsDrawn * 16, buttonY, 'action-points', frames[action.type] + 3).setOrigin(0, 0));
            pointsDrawn++;
        }
        if ((_a = action.parametersCost) === null || _a === void 0 ? void 0 : _a.energy) {
            this.displayContainer.add(this.scene.add.text(buttonX + 32, buttonY + 16, `EN:${(_b = action.parametersCost) === null || _b === void 0 ? void 0 : _b.energy.toString()}`, { color: 'green' }).setOrigin(0, 0));
        }
        if ((_c = action.parametersCost) === null || _c === void 0 ? void 0 : _c.manna) {
            this.displayContainer.add(this.scene.add.text(buttonX + 32, buttonY + 16, `MP:${(_d = action.parametersCost) === null || _d === void 0 ? void 0 : _d.manna.toString()}`, { color: 'blue' }).setOrigin(0, 0));
        }
        border.lineStyle(1, 0x000000, 1)
            .fillStyle(isAvailable ? 0xf0d191 : 0x8e8e8e)
            .fillRect(buttonX, buttonY, 32 + 3 * 16, 32)
            .strokeRect(buttonX, buttonY, 32 + 3 * 16, 32)
            .setInteractive({
            useHandCursor: true, hitArea: new Rectangle(buttonX, buttonY, 32 + 3 * 16, 32),
            hitAreaCallback: Rectangle.Contains
        })
            .on('pointerover', () => this._drawActionDescription(action, true, buttonX, buttonY))
            .on('pointerout', () => this._drawActionDescription(action, false));
        return border;
    }
    _drawActionDescription(action, show, x, y) {
        if (this.actionDescriptionContainer) {
            this.actionDescriptionContainer.removeAll(true);
        }
        this.actionDescriptionContainer = this.scene.add.container(0, 0);
        if (show) {
            if (x + 240 > GAME_W)
                x = x - 160;
            let lastTextY = y - 5;
            const background = this.scene.add.graphics();
            this.actionDescriptionContainer.add(background);
            const actionNoticableText = this.scene.add.text(x, lastTextY, `Chance of being noticed: ${action.noticeable * 100}%`, {
                font: '12px monospace', wordWrap: { width: 245 }, align: 'left',
                color: 'black',
                padding: {
                    left: 5,
                    right: 5,
                }
            }).setOrigin(0, 1);
            this.actionDescriptionContainer.add(actionNoticableText);
            lastTextY = lastTextY - actionNoticableText.height - 5;
            const actionEffectsText = this.scene.add.text(x, lastTextY, `Effects: ${action.effects.map(effect => effect.effectId).join(', ')}`, {
                font: '12px monospace', wordWrap: { width: 245 }, align: 'left',
                color: 'black',
                padding: {
                    left: 5,
                    right: 5,
                }
            }).setOrigin(0, 1);
            this.actionDescriptionContainer.add(actionEffectsText);
            lastTextY = lastTextY - actionEffectsText.height - 5;
            const actionTargetText = this.scene.add.text(x, lastTextY, `Target: ${action.target}`, {
                font: '12px monospace', wordWrap: { width: 245 }, align: 'left',
                color: 'black',
                padding: {
                    left: 5,
                    right: 5,
                }
            }).setOrigin(0, 1);
            this.actionDescriptionContainer.add(actionTargetText);
            lastTextY = lastTextY - actionTargetText.height - 5;
            const actionPhaseText = this.scene.add.text(x, lastTextY, `Can be used during ${action.phase.join(' and ')} phase.`, {
                font: '12px monospace', wordWrap: { width: 245 }, align: 'left',
                color: 'black',
                padding: {
                    left: 5,
                    right: 5,
                }
            }).setOrigin(0, 1);
            this.actionDescriptionContainer.add(actionPhaseText);
            lastTextY = lastTextY - actionPhaseText.height - 5;
            const actionPointsCostText = this.scene.add.text(x, lastTextY, `Uses ${action.actionCost} ${action.type} action point(s).`, {
                font: '12px monospace', wordWrap: { width: 245 }, align: 'left',
                color: 'black',
                padding: {
                    left: 5,
                    right: 5,
                }
            }).setOrigin(0, 1);
            this.actionDescriptionContainer.add(actionPointsCostText);
            lastTextY = lastTextY - actionPointsCostText.height - 5;
            if (action.parametersCost.energy || action.parametersCost.manna) {
                const actionParametersCostText = this.scene.add.text(x, lastTextY, `Requires ${action.parametersCost.energy || action.parametersCost.manna} ${action.parametersCost.energy ? 'energy' : 'manna'}.`, {
                    font: '12px monospace', wordWrap: { width: 245 }, align: 'left',
                    color: 'black',
                    padding: {
                        left: 5,
                        right: 5,
                    }
                }).setOrigin(0, 1);
                this.actionDescriptionContainer.add(actionParametersCostText);
                lastTextY = lastTextY - actionParametersCostText.height - 5;
            }
            const actionDescriptionText = this.scene.add.text(x, lastTextY, action.actionDescription, {
                font: '12px monospace', wordWrap: { width: 245 }, align: 'left',
                color: 'black',
                padding: {
                    left: 5,
                    right: 5,
                }
            }).setOrigin(0, 1);
            this.actionDescriptionContainer.add(actionDescriptionText);
            lastTextY = lastTextY - actionDescriptionText.height - 5;
            const actionNameText = this.scene.add.text(x, lastTextY, action.actionName, {
                font: 'bold 12px monospace', wordWrap: { width: 245 }, align: 'left',
                color: 'black',
                padding: {
                    left: 5,
                    right: 5,
                }
            }).setOrigin(0, 1);
            this.actionDescriptionContainer.add(actionNameText);
            lastTextY = lastTextY - actionNameText.height;
            background.lineStyle(1, 0x000000, 1)
                .fillStyle(0xf0d191)
                .fillRect(x, y, 245, -(y - lastTextY + 5))
                .strokeRect(x, y, 245, -(y - lastTextY + 5));
            this.displayContainer.add(this.actionDescriptionContainer);
        }
    }
    drawEndTurnButton(resolve) {
        const endTurnText = this.scene.add.text(800 / 2, -40, 'End Turn', {
            fixedWidth: 140,
            font: '22px monospace',
            color: '#000000',
            backgroundColor: '#8ef000',
            align: 'center',
        }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
        this.displayContainer.add(endTurnText);
        const border = this.scene.add.graphics()
            .lineStyle(1, 0x000000, 1)
            .strokeRect(endTurnText.getTopLeft().x, endTurnText.getTopLeft().y, endTurnText.width, endTurnText.height);
        this.displayContainer.add(border);
        endTurnText.once('pointerdown', () => {
            this.displayContainer.removeAll(true);
            resolve({ action: 'END TURN', targets: null });
        });
    }
}
//# sourceMappingURL=actionInterfaceDrawer.js.map