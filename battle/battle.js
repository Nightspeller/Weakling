import { playerInstance } from "../entities/player.js";
import { PlayerActions } from "../actionsAndEffects/playerActions.js";
import { Disposition } from "../entities/disposition.js";
import { ACTION_POINT_HEIGHT, ACTION_POINT_WIDTH, BATTLE_CHAR_HEIGHT, BATTLE_CHAR_WIDTH } from "../config/constants.js";
var Rectangle = Phaser.Geom.Rectangle;
import { Location } from "../entities/location.js";
export class BattleScene extends Location {
    constructor() {
        super({ key: 'Battle' });
    }
    init(data) {
        if (Array.isArray(data.enemies)) {
            this.enemies = data.enemies.map(enemy => enemy.type);
            this.enemyName = data.enemyName;
        }
        else {
            throw Error('No enemies were passed for Battle scene!');
        }
        this.prevSceneKey = data.prevScene;
    }
    preload() {
        this.preparePlugins();
    }
    create() {
        this.prepareMap('battle');
        this.turnOrderDisplayGroup = this.add.group();
        this.actionInterfaceDisplayGroup = this.add.group();
        this.player = playerInstance;
        this.charImageMap = new Map();
        this.disposition = new Disposition(this.player.party, this.enemies, 'forrest', this);
    }
    drawDisposition(disposition) {
        disposition.playerCharacters.forEach((char, index) => {
            const position = BattleScene.getCharacterPosition(true, index);
            if (!this.charImageMap.get(char))
                this.charImageMap.set(char, this.add.container(position.x, position.y));
            this.drawCharacter(char);
            this.drawHealthAndManna(char);
            this.drawEffectsIcons(char);
        });
        disposition.enemyCharacters.forEach((char, index) => {
            const position = BattleScene.getCharacterPosition(false, index);
            if (!this.charImageMap.get(char))
                this.charImageMap.set(char, this.add.container(position.x, position.y));
            this.drawCharacter(char);
            this.drawHealthAndManna(char);
            this.drawEffectsIcons(char);
        });
    }
    drawMakingTurnGraphics(char) {
        const charImageContainer = this.charImageMap.get(char);
        let makingTurnGraphics = charImageContainer.getByName('makingTurnGraphics');
        if (!makingTurnGraphics) {
            makingTurnGraphics = this.add.graphics()
                .lineStyle(1, 0xff0000)
                .strokeRectShape(new Rectangle(-BATTLE_CHAR_WIDTH / 2, -BATTLE_CHAR_HEIGHT / 2, BATTLE_CHAR_WIDTH, BATTLE_CHAR_HEIGHT))
                .setName('makingTurnGraphics');
            charImageContainer.add(makingTurnGraphics);
        }
        else {
            makingTurnGraphics.destroy(true);
            makingTurnGraphics = this.add.graphics()
                .lineStyle(1, 0xff0000)
                .strokeRectShape(new Rectangle(-BATTLE_CHAR_WIDTH / 2, -BATTLE_CHAR_HEIGHT / 2, BATTLE_CHAR_WIDTH, BATTLE_CHAR_HEIGHT))
                .setName('makingTurnGraphics');
            charImageContainer.add(makingTurnGraphics);
        }
    }
    drawCharacter(char) {
        const imgParams = char.spriteParams;
        const charImageContainer = this.charImageMap.get(char);
        let charImage = charImageContainer.getByName('charImage');
        if (!charImage) {
            charImage = this.add.sprite(0, 0, imgParams.texture, imgParams.frame).setName('charImage');
            charImage.setDisplaySize(imgParams.width, imgParams.height).setInteractive();
            if (char.spriteParams.flip)
                charImage.flipX = true;
            charImageContainer.add(charImage);
            this.playIdleAnimation(char);
            charImage.on('pointerdown', () => this.drawCharInfo(char));
        }
    }
    drawHealthAndManna(char) {
        const charImageContainer = this.charImageMap.get(char);
        const healthText = charImageContainer.getByName('healthText');
        const mannaText = charImageContainer.getByName('mannaText');
        const energyText = charImageContainer.getByName('energyText');
        const charWidth = BATTLE_CHAR_WIDTH;
        const charHeight = BATTLE_CHAR_HEIGHT;
        if (!healthText) {
            const healthText = this.add.text(0, -charHeight / 2 - 36, `${char.currentCharacteristics.parameters.currentHealth} / ${char.currentCharacteristics.parameters.health}`, {
                font: '12px monospace',
                fill: '#000000',
                align: 'center',
                fixedWidth: charWidth,
                backgroundColor: '#ff000075'
            }).setName('healthText').setOrigin(0.5, 0);
            charImageContainer.add(healthText);
        }
        else {
            healthText.setText(`${char.currentCharacteristics.parameters.currentHealth} / ${char.currentCharacteristics.parameters.health}`);
        }
        if (!mannaText) {
            const mannaText = this.add.text(0, -charHeight / 2 - 24, `${char.currentCharacteristics.parameters.currentManna} / ${char.currentCharacteristics.parameters.manna}`, {
                font: '12px monospace',
                fill: '#000000',
                align: 'center',
                fixedWidth: charWidth,
                backgroundColor: '#0000ff75'
            }).setName('mannaText').setOrigin(0.5, 0);
            charImageContainer.add(mannaText);
        }
        else {
            mannaText.setText(`${char.currentCharacteristics.parameters.currentManna} / ${char.currentCharacteristics.parameters.manna}`);
        }
        if (!energyText) {
            const energyText = this.add.text(0, -charHeight / 2 - 12, `${char.currentCharacteristics.parameters.currentEnergy} / ${char.currentCharacteristics.parameters.energy}`, {
                font: '12px monospace',
                fill: '#000000',
                align: 'center',
                fixedWidth: charWidth,
                backgroundColor: '#00ff0075'
            }).setName('energyText').setOrigin(0.5, 0);
            charImageContainer.add(energyText);
        }
        else {
            energyText.setText(`${char.currentCharacteristics.parameters.currentEnergy} / ${char.currentCharacteristics.parameters.energy}`);
        }
    }
    drawActionPoints(char) {
        const charImageContainer = this.charImageMap.get(char);
        let actionPointsContainer = charImageContainer.getByName('actionPointsContainer');
        if (!actionPointsContainer) {
            actionPointsContainer = this.add.container(0, 0).setName('actionPointsContainer');
            charImageContainer.add(actionPointsContainer);
        }
        else {
            actionPointsContainer.removeAll(true);
        }
        const baseX = BATTLE_CHAR_WIDTH / 2 - ACTION_POINT_WIDTH + ACTION_POINT_WIDTH / 2;
        const baseY = -BATTLE_CHAR_HEIGHT / 2 + ACTION_POINT_HEIGHT / 2;
        Object.keys(char.actionPoints).forEach((pointType, index) => {
            let pointsDrawn = 0;
            const actionPointShift = ACTION_POINT_HEIGHT * 2 * index;
            for (let i = 0; i < Math.min(Math.trunc(char.actionPoints[pointType]), 2); i++) {
                actionPointsContainer.add(this.add.sprite(baseX, baseY + pointsDrawn * ACTION_POINT_HEIGHT + actionPointShift, 'action-points', index));
                pointsDrawn++;
            }
            if (char.actionPoints[pointType] % 1 === 0.5) {
                if (pointsDrawn < 2) {
                    actionPointsContainer.add(this.add.sprite(baseX, baseY + pointsDrawn * ACTION_POINT_HEIGHT + actionPointShift, 'action-points', index + 3));
                }
                else {
                    actionPointsContainer.add(this.add.sprite(baseX + ACTION_POINT_WIDTH, baseY + actionPointShift, 'action-points', index + 3));
                }
            }
            if (char.actionPoints[pointType] === 3) {
                actionPointsContainer.add(this.add.sprite(baseX + ACTION_POINT_WIDTH, baseY + actionPointShift, 'action-points', index));
            }
        });
    }
    drawEffectsIcons(char) {
        const charImageContainer = this.charImageMap.get(char);
        let effectIconsContainer = charImageContainer.getByName('effectIconsContainer');
        if (!effectIconsContainer) {
            effectIconsContainer = this.add.container(0, 0).setName('effectIconsContainer');
            charImageContainer.add(effectIconsContainer);
        }
        else {
            effectIconsContainer.removeAll(true);
        }
        char.currentEffects.forEach((effect, index) => {
            let iconX, iconY;
            if (index < 4) {
                iconX = -48 - 16;
                iconY = -48 + 16 + 32 * index;
            }
            else {
                iconX = -48 + 16 + 32 * (index - 4);
                iconY = 48 + 16;
            }
            const iconSprite = this.add.sprite(iconX, iconY, effect.statusImage.texture, effect.statusImage.frame);
            iconSprite.setInteractive()
                .on('pointerover', () => this.drawEffectInformation(effect, charImageContainer.x + iconX + 16, charImageContainer.y + iconY - 16))
                .on('pointerout', () => this.effectInformationGroup.clear(true, true))
                .on('destroy', () => { var _a; return (_a = this.effectInformationGroup) === null || _a === void 0 ? void 0 : _a.clear(true, true); });
            effectIconsContainer.add(iconSprite);
        });
    }
    drawEffectInformation(effect, x, y) {
        this.effectInformationGroup = this.add.group();
        const background = this.add.graphics()
            .lineStyle(1, 0xff0000)
            .fillStyle(0xf0d191)
            .fillRect(x, y, 32 * 8, 3 * 32);
        this.effectInformationGroup.add(background);
        this.effectInformationGroup.add(this.add.text(x + 8, y + 8, `${effect.name}`, { font: 'bold 12px monospace', fill: '#000000' }));
        this.effectInformationGroup.add(this.add.text(x + 8, y + 8 + 12 + 8, `${effect.description} \nDuration: ${effect.durationLeft} / ${effect.baseDuration}`, { font: '12px monospace', fill: '#000000' }));
        this.effectInformationGroup.setDepth(2);
    }
    drawCharInfo(char) {
        const charImageContainer = this.charImageMap.get(char);
        const x = charImageContainer.x < 400 ? charImageContainer.x + BATTLE_CHAR_WIDTH / 2 : charImageContainer.x - BATTLE_CHAR_WIDTH / 2 - 32 * 8;
        const y = 32;
        const charImage = charImageContainer.getByName('charImage');
        charImage.setDepth(10).disableInteractive();
        this.characterInfoGroup = this.add.group();
        let overlay = this.add.graphics()
            .fillStyle(0x000000, 0.25)
            .fillRect(0, 0, 800, 640);
        this.characterInfoGroup.add(overlay);
        let zone = this.add.zone(0, 0, 800, 640).setOrigin(0, 0)
            .setInteractive().once('pointerdown', () => {
            overlay.destroy();
            zone.destroy();
            this.characterInfoGroup.clear(true, true);
            charImage.setDepth(0).setInteractive();
        });
        const background = this.add.graphics()
            .lineStyle(1, 0xff0000)
            .fillStyle(0xf0d191)
            .fillRect(x, y, 32 * 8, 13 * 32);
        this.characterInfoGroup.add(background);
        this.characterInfoGroup.create(x + 48 + 2, y + 48, char.spriteParams.texture, char.spriteParams.frame).setDisplaySize(char.spriteParams.width, char.spriteParams.height);
        const name = this.add.text(x + 2 + 96 + 2, y, char.name, { font: '20px monospace', fill: '#000000' });
        this.characterInfoGroup.add(name);
        const health = this.add.text(x + 2 + 96 + 2, y + 24, `HP: ${char.currentCharacteristics.parameters.currentHealth}/${char.currentCharacteristics.parameters.health}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.characterInfoGroup.add(health);
        const manna = this.add.text(x + 2 + 96 + 2, y + 40, `MP: ${char.currentCharacteristics.parameters.currentManna}/${char.currentCharacteristics.parameters.manna}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.characterInfoGroup.add(manna);
        const energy = this.add.text(x + 2 + 96 + 2, y + 56, `EN: ${char.currentCharacteristics.parameters.currentEnergy}/${char.currentCharacteristics.parameters.energy}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.characterInfoGroup.add(energy);
        let lastTextY = y + 102;
        const drawText = (group, subgroup) => {
            let charString = char.currentCharacteristics[group][subgroup] + ' (';
            charString += char.characteristicsModifiers[group][subgroup].map(modifier => modifier.value).join(' + ') + ')';
            const text = this.add.text(x + 8, lastTextY, `${subgroup}: ${charString}`, {
                font: '12px monospace',
                fill: '#000000'
            });
            this.characterInfoGroup.add(text);
            lastTextY += 14;
        };
        Object.entries(char.currentCharacteristics).forEach(([group, value]) => {
            Object.entries(value).forEach(([subgroup, value]) => {
                if (group !== 'parameters' && !subgroup.includes('Resistance'))
                    drawText(group, subgroup);
            });
        });
        const resistance = this.add.text(x + 8, y + 186, `Resistance: `, { font: '12px monospace', fill: '#000000' });
        this.characterInfoGroup.add(resistance);
        const resistanceDetails = this.add.text(x + 8, y + 202, `🔥${char.currentCharacteristics.defences.fireResistance} ` +
            `❄${char.currentCharacteristics.defences.coldResistance} ` +
            `⚡${char.currentCharacteristics.defences.electricityResistance} ` +
            `☣${char.currentCharacteristics.defences.acidResistance} ` +
            `☠${char.currentCharacteristics.defences.poisonResistance} ` +
            `✨${char.currentCharacteristics.defences.magicResistance} `, { font: '14px monospace', fill: '#000000' });
        this.characterInfoGroup.add(resistanceDetails);
        const actionPointsText = this.add.text(x + 8, y + 234, `Action points:`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.characterInfoGroup.add(actionPointsText);
        let pointsDrawn = 0;
        Object.keys(char.actionPoints).forEach((pointType, index) => {
            for (let i = 0; i < Math.trunc(char.actionPoints[pointType]); i++) {
                this.characterInfoGroup.create(x + 8 + pointsDrawn * 16, y + 250, 'action-points', index).setOrigin(0);
                pointsDrawn++;
            }
            if (char.actionPoints[pointType] % 1 === 0.5) {
                this.characterInfoGroup.create(x + 8 + pointsDrawn * 16, y + 250, 'action-points', index + 3).setOrigin(0);
                pointsDrawn++;
            }
        });
        this.characterInfoGroup.setDepth(2);
    }
    static getCharacterPosition(isParty, positionIndex) {
        const partyPositions = [
            { name: 'frontTop', x: 64 + 96 + 64 + 48, y: 32 + 128 + 48 },
            { name: 'backTop', x: 64 + 48, y: 32 + 128 + 48 },
            { name: 'frontBottom', x: 64 + 96 + 64 + 48, y: 32 + 96 + 96 + 128 + 48 },
            { name: 'backBottom', x: 64 + 48, y: 32 + 96 + 96 + 128 + 48 },
        ];
        const enemyPositions = [
            { name: 'frontTop', x: 800 - 64 - 96 - 64 - 96 + 48, y: 32 + 128 + 48 },
            { name: 'backTop', x: 800 - 64 - 96 + 48, y: 32 + 128 + 48 },
            { name: 'frontBottom', x: 800 - 64 - 96 - 64 - 96 + 48, y: 32 + 96 + 96 + 128 + 48 },
            { name: 'backBottom', x: 800 - 64 - 96 + 48, y: 32 + 96 + 96 + 128 + 48 },
        ];
        return isParty ? partyPositions[positionIndex] : enemyPositions[positionIndex];
    }
    playMeleeAttackAnimation(char, target) {
        const charImageContainer = this.charImageMap.get(char);
        const charImage = charImageContainer.getByName('charImage');
        const targetImageContainer = this.charImageMap.get(target);
        return new Promise((resolve, reject) => {
            var _a;
            if ((_a = char.animations) === null || _a === void 0 ? void 0 : _a.attack) {
                charImage.anims.play(char.animations.attack, true);
                charImage.once('animationcomplete', (currentAnim, currentFrame, sprite) => {
                    charImage.anims.play(char.animations.idle, true);
                    this.playHitAnimation(target).then(() => resolve());
                });
            }
            else {
                const prevX = charImageContainer.x;
                const prevY = charImageContainer.y;
                const enemyX = prevX < 400 ? targetImageContainer.x - 96 - prevX : targetImageContainer.x + 96 - prevX;
                const enemyY = targetImageContainer.y - prevY;
                this.tweens.add({
                    targets: charImage,
                    props: {
                        x: {
                            value: enemyX,
                        },
                        y: {
                            value: enemyY,
                        }
                    },
                    ease: 'Back.easeOut',
                    duration: 500,
                    yoyo: true,
                    /*paused: true,
                    onActive: function () { addEvent('onActive') },
                    onStart: function () { addEvent('onStart') },
                    onLoop: function () { addEvent('onLoop') }, */
                    onYoyo: () => {
                        this.playHitAnimation(target);
                    },
                    /*onRepeat: function () { addEvent('onRepeat') },*/
                    onComplete: function () {
                        resolve();
                    }
                });
            }
        });
    }
    playIdleAnimation(char) {
        const charImageContainer = this.charImageMap.get(char);
        const charImage = charImageContainer.getByName('charImage');
        return new Promise((resolve, reject) => {
            if (char.animations.idle) {
                charImage.anims.play(char.animations.idle);
                resolve();
            }
            else {
                charImage.setTexture(char.spriteParams.texture, char.spriteParams.frame);
                resolve();
            }
        });
    }
    playHitAnimation(char) {
        const charImageContainer = this.charImageMap.get(char);
        const charImage = charImageContainer.getByName('charImage');
        return new Promise((resolve, reject) => {
            if (char.animations.hit) {
                charImage.anims.play(char.animations.hit);
                charImage.once('animationcomplete', (currentAnim, currentFrame, sprite) => {
                    this.playIdleAnimation(char);
                    resolve();
                });
            }
            else {
                const hitImage = this.add.sprite(charImageContainer.x, charImageContainer.y, 'hit');
                setTimeout(() => {
                    hitImage.destroy(true);
                }, 500);
                resolve();
            }
        });
    }
    playDeathAnimation(char) {
        const charImageContainer = this.charImageMap.get(char);
        const charImage = charImageContainer.getByName('charImage');
        return new Promise((resolve, reject) => {
            if (char.animations.death) {
                charImage.anims.play(char.animations.death);
                charImage.once('animationcomplete', (currentAnim, currentFrame, sprite) => {
                    resolve();
                });
            }
            else {
                charImage.setTexture('dead-character').setDisplaySize(BATTLE_CHAR_WIDTH, BATTLE_CHAR_HEIGHT);
                resolve();
            }
        });
    }
    playCastAnimation(char) {
        const charImageContainer = this.charImageMap.get(char);
        const charImage = charImageContainer.getByName('charImage');
        return new Promise((resolve, reject) => {
            var _a;
            if ((_a = char.animations) === null || _a === void 0 ? void 0 : _a.buff) {
                charImage.anims.play(char.animations.buff, true);
                charImage.once('animationcomplete', (currentAnim, currentFrame, sprite) => {
                    charImage.anims.play(char.animations.idle, true);
                    resolve();
                });
            }
            else {
                charImageContainer.setDepth(2);
                this.add.sprite(charImageContainer.x, charImageContainer.y, null).setDepth(1)
                    .play('light_pillar_animation_back').once('animationcomplete', (currentAnim, currentFrame, sprite) => {
                    charImageContainer.setDepth(null);
                    sprite.destroy();
                    resolve();
                });
                this.add.sprite(charImageContainer.x, charImageContainer.y, null).setDepth(3)
                    .play('light_pillar_animation_front').once('animationcomplete', (currentAnim, currentFrame, sprite) => {
                    sprite.destroy();
                });
            }
        });
    }
    drawTurnOrder(disposition) {
        this.turnOrderDisplayGroup.clear(true, true);
        this.turnOrderDisplayGroup.add(this.add.graphics()
            .fillStyle(0xf0d191, 0.5)
            .fillRect(16, 16, 64 * disposition.turnOrder.length, 64 + 16)
            .lineStyle(1, 0x000000)
            .strokeRect(16, 16, 64 * disposition.turnOrder.length, 64 + 16));
        disposition.turnOrder.forEach((char, i) => {
            const charNameText = this.add.text(16 + 64 * i, 16 + 16 + 64, char.name, {
                backgroundColor: 'lightgrey',
                color: 'black'
            }).setVisible(false);
            const initiativeText = this.add.text(16 + 64 * i, 16, char.currentCharacteristics.attributes.initiative.toString(), {
                fixedWidth: 64,
                fixedHeight: 16,
                align: 'center',
                color: 'black'
            });
            initiativeText.setInteractive()
                .on('pointerover', (pointer, localX, localY, event) => charNameText.setText('Initiative').setVisible(true))
                .on('pointerout', (pointer, localX, localY, event) => charNameText.setVisible(false));
            this.turnOrderDisplayGroup.add(charNameText);
            this.turnOrderDisplayGroup.add(initiativeText);
            this.turnOrderDisplayGroup.create(16 + 64 * i + 32, 32 + 32, char.spriteParams.texture, char.spriteParams.frame)
                .setDisplaySize(64, 64).setInteractive()
                .on('pointerover', (pointer, localX, localY, event) => charNameText.setText(char.name).setVisible(true))
                .on('pointerout', (pointer, localX, localY, event) => charNameText.setVisible(false));
        });
    }
    drawActionInterface(disposition) {
        this.actionInterfaceDisplayGroup.clear(true, true);
        this.drawEndTurnButton(disposition);
        let scene = this;
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
                    buttonX = 32;
                    buttonY = 500 + 30 * actionsOfType[0];
                }
                if (action.type === 'magical') {
                    actionsOfType[1]++;
                    buttonX = 32 + (800 - 64) / 3;
                    buttonY = 500 + 30 * actionsOfType[1];
                }
                if (action.type === 'misc') {
                    actionsOfType[2]++;
                    buttonX = 32 + (800 - 64) / 3 * 2;
                    buttonY = 500 + 30 * actionsOfType[2];
                }
                const button = this.drawActionInterfaceButton(action, buttonX, buttonY, currentCharacter);
                button.on('pointerdown', function () {
                    if (action.target === 'self') {
                        scene.playCastAnimation(currentCharacter).then(() => {
                            disposition.processAction(currentCharacter, currentCharacter, action);
                            scene.drawActionPoints(currentCharacter);
                            scene.drawActionInterface(disposition);
                        });
                    }
                    if (action.target === 'enemy') {
                        this.setBackgroundColor('red');
                        console.log('starting enemy selection');
                        let overlay = scene.add.graphics()
                            .fillStyle(0x000000, 0.25)
                            .fillRect(0, 0, 800, 640);
                        let zone = scene.add.zone(0, 0, 800, 640).setOrigin(0, 0)
                            .setInteractive().once('pointerdown', () => removeOverlay());
                        disposition.enemyCharacters.forEach(enemy => {
                            if (enemy.isAlive) {
                                const charImageContainer = scene.charImageMap.get(enemy);
                                const charImage = charImageContainer.getByName('charImage');
                                charImageContainer.setDepth(10);
                                charImage.off('pointerdown').once('pointerdown', () => {
                                    removeOverlay();
                                    charImageContainer.setDepth(0);
                                    scene.playMeleeAttackAnimation(currentCharacter, enemy).then(() => {
                                        disposition.processAction(currentCharacter, enemy, action);
                                        scene.drawActionPoints(currentCharacter);
                                        scene.drawActionInterface(disposition);
                                    });
                                });
                            }
                        });
                        const removeOverlay = () => {
                            overlay.destroy();
                            zone.destroy();
                            disposition.enemyCharacters.forEach(enemy => {
                                scene.charImageMap.get(enemy).setDepth(0)
                                    .getByName('charImage').off('pointerdown')
                                    .on('pointerdown', () => scene.drawCharInfo(enemy));
                            });
                            this.setBackgroundColor('#f0d191');
                        };
                    }
                    if (action.target === 'party') {
                        this.setBackgroundColor('red');
                        console.log('starting party member selection');
                        let overlay = scene.add.graphics()
                            .fillStyle(0x000000, 0.25)
                            .fillRect(0, 0, 800, 640);
                        let zone = scene.add.zone(0, 0, 800, 640).setOrigin(0, 0)
                            .setInteractive().once('pointerdown', () => removeOverlay());
                        disposition.playerCharacters.forEach(adventurer => {
                            if (adventurer.isAlive) {
                                const charImageContainer = scene.charImageMap.get(adventurer);
                                const charImage = charImageContainer.getByName('charImage');
                                charImageContainer.setDepth(10);
                                charImage.off('pointerdown').once('pointerdown', () => {
                                    removeOverlay();
                                    charImageContainer.setDepth(0);
                                    scene.playMeleeAttackAnimation(currentCharacter, adventurer).then(() => {
                                        disposition.processAction(currentCharacter, adventurer, action);
                                        scene.drawActionPoints(currentCharacter);
                                        scene.drawActionInterface(disposition);
                                    });
                                });
                            }
                        });
                        const removeOverlay = () => {
                            overlay.destroy();
                            zone.destroy();
                            disposition.playerCharacters.forEach(adventurer => {
                                scene.charImageMap.get(adventurer).setDepth(0)
                                    .getByName('charImage').off('pointerdown')
                                    .on('pointerdown', () => scene.drawCharInfo(adventurer));
                            });
                            this.setBackgroundColor('#f0d191');
                        };
                    }
                });
            }
        });
    }
    drawActionInterfaceButton(action, buttonX, buttonY, character) {
        const isAvailable = character.actionPoints[action.type] >= action.actionCost;
        const descriptionText = this.add.text(buttonX, buttonY, '', { font: '12px monospace', fill: '#000000', backgroundColor: 'lightgrey', wordWrap: { width: 245 } }).setOrigin(0, 1);
        this.actionInterfaceDisplayGroup.add(descriptionText);
        const actionText = this.make.text({
            x: buttonX,
            y: buttonY,
            text: action.actionName,
            style: {
                fixedWidth: 240,
                font: '22px monospace',
                color: '#000000',
                backgroundColor: isAvailable ? '#f0d191' : '#474747',
                padding: {
                    left: 2
                },
            },
        });
        if (isAvailable) {
            actionText.setInteractive()
                .on('pointerover', () => {
                descriptionText.setText(action.actionDescription);
            })
                .on('pointerout', () => {
                descriptionText.setText('');
            });
        }
        this.actionInterfaceDisplayGroup.add(actionText);
        const border = this.add.graphics();
        border.lineStyle(1, 0x000000, 1);
        border.strokeRectShape(actionText.getBounds());
        this.actionInterfaceDisplayGroup.add(border);
        let pointsDrawn = 0;
        const frames = { physical: 0, magical: 1, misc: 2 };
        if (action.actionCost % 1 === 0.5) {
            this.actionInterfaceDisplayGroup.create(buttonX + 240 - 2, buttonY + 2, 'action-points', frames[action.type] + 3).setOrigin(1, 0);
            pointsDrawn++;
        }
        for (let i = 0; i < Math.trunc(action.actionCost); i++) {
            this.actionInterfaceDisplayGroup.create(buttonX + 240 - pointsDrawn * 16 - 2, buttonY + 2, 'action-points', frames[action.type]).setOrigin(1, 0);
            pointsDrawn++;
        }
        return actionText;
    }
    drawEndTurnButton(disposition) {
        const endTurnText = this.make.text({
            x: 800 / 2,
            y: 500,
            text: 'End Turn',
            style: {
                fixedWidth: 140,
                font: '22px monospace',
                color: '#000000',
                backgroundColor: '#8ef000',
                align: 'center',
            },
        }).setOrigin(0.5, 0.5).setInteractive();
        this.actionInterfaceDisplayGroup.add(endTurnText);
        const border = this.add.graphics();
        border.lineStyle(1, 0x000000, 1);
        border.strokeRectShape(endTurnText.getBounds());
        this.actionInterfaceDisplayGroup.add(border);
        endTurnText.once('pointerdown', () => {
            this.actionInterfaceDisplayGroup.clear(true, true);
            disposition.endTurn();
        });
    }
    exitBattle() {
        console.log('Switching from the battle scene to ', this.prevSceneKey);
        this.scene.run(this.prevSceneKey, { defeatedEnemy: this.enemyName });
        this.scene.stop('Battle');
    }
    update() {
    }
}
//# sourceMappingURL=battle.js.map