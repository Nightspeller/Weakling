import { PlayerActions } from "../actionsAndEffects/playerActions.js";
export class ActionInterfaceDrawer {
    constructor(scene, disposition) {
        this.disposition = disposition;
        this.scene = scene;
        this.displayContainer = this.scene.add.container(32, 500);
    }
    drawActionInterface() {
        return new Promise(resolve => {
            this.displayContainer.removeAll(true);
            const disposition = this.disposition;
            this.drawEndTurnButton(resolve);
            let self = this;
            let scene = this.scene;
            const currentCharacter = disposition.currentCharacter;
            const availableActions = currentCharacter.availableActions;
            const actions = new PlayerActions();
            let actionsOfType = [0, 0, 0];
            let buttonX;
            let buttonY;
            availableActions.sort().forEach(actionId => {
                const action = actions.getActionById(actionId);
                if (action.phase.includes(disposition.currentPhase)) {
                    if (action.type === 'physical') {
                        actionsOfType[0]++;
                        buttonX = 0;
                        buttonY = 30 * actionsOfType[0];
                    }
                    if (action.type === 'magical') {
                        actionsOfType[1]++;
                        buttonX = (800 - 64) / 3;
                        buttonY = 30 * actionsOfType[1];
                    }
                    if (action.type === 'misc') {
                        actionsOfType[2]++;
                        buttonX = (800 - 64) / 3 * 2;
                        buttonY = 30 * actionsOfType[2];
                    }
                    const isAvailable = currentCharacter.actionPoints[action.type] >= action.actionCost;
                    const button = this.drawActionInterfaceButton(action, buttonX, buttonY, isAvailable);
                    if (!isAvailable)
                        return;
                    button.on('pointerdown', function () {
                        if (action.target === 'self') {
                            self.displayContainer.removeAll(true);
                            resolve({ action: action, target: currentCharacter });
                        }
                        if (['enemy', 'friend', 'any', 'party'].includes(action.target)) {
                            console.log(`starting ${action.target} target selection`);
                            this.setBackgroundColor('red');
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
                                this.setBackgroundColor('#f0d191');
                            };
                            potentialTargets.forEach(potentialTarget => {
                                if (potentialTarget.character.isAlive) {
                                    potentialTarget.image.setDepth(3);
                                    potentialTarget.zone.once('pointerdown', () => {
                                        removeOverlay();
                                        self.displayContainer.removeAll(true);
                                        resolve({ action, target: potentialTarget.character });
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
                const zone = this.scene.add.zone(charImage.x, charImage.y, charImage.width, charImage.height).setDepth(4).setInteractive();
                targetList.push({ image: charImage, character: char, zone: zone });
            });
        }
        if (target === 'party' || target === 'any') {
            this.disposition.playerCharacters.forEach(char => {
                const charImage = this.scene.charToDrawerMap.get(char).mainImage;
                const zone = this.scene.add.zone(charImage.x, charImage.y, charImage.width, charImage.height).setDepth(4).setInteractive();
                targetList.push({ image: charImage, character: char, zone: zone });
            });
        }
        if (target === 'friend') {
            this.disposition.playerCharacters.forEach(char => {
                if (char !== self) {
                    const charImage = this.scene.charToDrawerMap.get(char).mainImage;
                    const zone = this.scene.add.zone(charImage.x, charImage.y, charImage.width, charImage.height).setDepth(4).setInteractive();
                    targetList.push({ image: charImage, character: char, zone: zone });
                }
            });
        }
        return targetList;
    }
    drawActionInterfaceButton(action, buttonX, buttonY, isAvailable) {
        const descriptionText = this.scene.add.text(buttonX, buttonY, '', { font: '12px monospace', fill: '#000000', backgroundColor: 'lightgrey', wordWrap: { width: 245 } }).setOrigin(0, 1);
        this.displayContainer.add(descriptionText);
        const actionText = this.scene.add.text(buttonX, buttonY, action.actionName, {
            fixedWidth: 240,
            font: '22px monospace',
            color: '#000000',
            backgroundColor: isAvailable ? '#f0d191' : '#474747',
            padding: {
                left: 2
            },
        });
        actionText.setInteractive()
            .on('pointerover', () => descriptionText.setText(action.actionDescription))
            .on('pointerout', () => descriptionText.setText(''));
        this.displayContainer.add(actionText);
        const border = this.scene.add.graphics()
            .lineStyle(1, 0x000000, 1)
            .strokeRectShape(actionText.getBounds());
        this.displayContainer.add(border);
        let pointsDrawn = 0;
        const frames = { physical: 0, magical: 1, misc: 2 };
        if (action.actionCost % 1 === 0.5) {
            this.displayContainer.add(this.scene.add.sprite(buttonX + 240 - 2, buttonY + 2, 'action-points', frames[action.type] + 3).setOrigin(1, 0));
            pointsDrawn++;
        }
        for (let i = 0; i < Math.trunc(action.actionCost); i++) {
            this.displayContainer.add(this.scene.add.sprite(buttonX + 240 - pointsDrawn * 16 - 2, buttonY + 2, 'action-points', frames[action.type]).setOrigin(1, 0));
            pointsDrawn++;
        }
        return actionText;
    }
    drawEndTurnButton(resolve) {
        const endTurnText = this.scene.add.text(800 / 2, 0, 'End Turn', {
            fixedWidth: 140,
            font: '22px monospace',
            color: '#000000',
            backgroundColor: '#8ef000',
            align: 'center',
        }).setOrigin(0.5, 0.5).setInteractive();
        this.displayContainer.add(endTurnText);
        //TODO: fix borders here and on buttons - getBounds is the problem - returns absolute position
        const border = this.scene.add.graphics()
            .lineStyle(1, 0x000000, 1)
            .strokeRectShape(endTurnText.getBounds());
        this.displayContainer.add(border);
        endTurnText.once('pointerdown', () => {
            this.displayContainer.removeAll(true);
            resolve({ action: 'END TURN', target: null });
        });
    }
}
//# sourceMappingURL=actionInterfaceDrawer.js.map