export default class GeneralEntity {
    constructor() {
        this.spriteParams = { texture: null, frame: null };
        this.worldImage = null;
        this.battleImage = null;
        this.level = null;
        this.actions = [];
        this.position = null;
        this.currentEffects = [];
        this.actedThisRound = false;
        this.isAlive = true;
        this.baseCharacteristics = {
            attributes: {
                strength: null,
                agility: null,
                intelligence: null,
                initiative: null
            },
            parameters: {
                health: null,
                currentHealth: null,
                manna: null,
                currentManna: null,
                energy: null,
                currentEnergy: null,
            },
            defences: {
                armor: null,
                dodge: null,
                fireResistance: null,
                coldResistance: null,
                acidResistance: null,
                electricityResistance: null,
                poisonResistance: null,
                magicResistance: null,
            }
        };
        this.currentCharacteristics = JSON.parse(JSON.stringify(this.baseCharacteristics));
    }
    drawMakingTurnGraphics(scene) {
        this.makingTurnGraphics = scene.add.graphics()
            .lineStyle(1, 0xff0000)
            .strokeRectShape(this.battleImage.getBounds());
    }
    draw(scene, x, y) {
        var _a, _b, _c;
        (_a = this.battleImage) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this.makingTurnGraphics) === null || _b === void 0 ? void 0 : _b.destroy();
        (_c = this.actionPointsGroup) === null || _c === void 0 ? void 0 : _c.clear(true, true);
        if (this.isAlive) {
            this.battleImage = scene.add.sprite(x, y, this.spriteParams.texture, this.spriteParams.frame);
        }
        else {
            this.battleImage = scene.add.sprite(x, y, 'dead-character');
        }
        this.drawHealthAndManna(scene, x, y);
        this.drawEffectsIcons(scene, x, y);
        this.battleImage.setOrigin(0, 0).setDisplaySize(96, 96).setInteractive()
            .on('pointerdown', (pointer, localX, localY, event) => this.drawEntityInfo(scene, x < 400 ? x + 96 : x - 32 * 8, 32));
        return this.battleImage;
    }
    drawHealthAndManna(scene, x, y) {
        var _a, _b, _c;
        (_a = this.healthText) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this.mannaText) === null || _b === void 0 ? void 0 : _b.destroy();
        (_c = this.energyText) === null || _c === void 0 ? void 0 : _c.destroy();
        this.healthText = scene.add.text(x, y - 24, `${this.currentCharacteristics.parameters.currentHealth} / ${this.currentCharacteristics.parameters.health}`, { font: '12px monospace', fill: '#000000', align: 'center', fixedWidth: 32 * 3, backgroundColor: '#ff000075' }).setOrigin(0, 1);
        this.mannaText = scene.add.text(x, y - 12, `${this.currentCharacteristics.parameters.currentManna} / ${this.currentCharacteristics.parameters.manna}`, { font: '12px monospace', fill: '#000000', align: 'center', fixedWidth: 32 * 3, backgroundColor: '#0000ff75' }).setOrigin(0, 1);
        this.energyText = scene.add.text(x, y, `${this.currentCharacteristics.parameters.currentEnergy} / ${this.currentCharacteristics.parameters.energy}`, { font: '12px monospace', fill: '#000000', align: 'center', fixedWidth: 32 * 3, backgroundColor: '#00ff0075' }).setOrigin(0, 1);
    }
    drawEffectsIcons(scene, x, y) {
        this.effectIconsGroup ? this.effectIconsGroup.clear(true, true) : this.effectIconsGroup = scene.add.group();
        this.currentEffects.forEach((effect, index) => {
            let iconX, iconY;
            if (index < 4) {
                iconX = x - 32;
                iconY = y + 32 * index;
            }
            else {
                iconX = x + 32 * (index - 4);
                iconY = y + 32 * 3;
            }
            const iconSprite = scene.add.sprite(iconX, iconY, effect.statusImage.texture, effect.statusImage.frame).setOrigin(0, 0);
            iconSprite.setInteractive()
                .on('pointerover', (pointer, localX, localY, event) => this.drawEffectInformation(scene, effect, iconX + 32, iconY))
                .on('pointerout', (pointer, localX, localY, event) => this.effectInformationGroup.clear(true, true))
                .on('destroy', () => { var _a; return (_a = this.effectInformationGroup) === null || _a === void 0 ? void 0 : _a.clear(true, true); });
            this.effectIconsGroup.add(iconSprite);
        });
    }
    drawActionPoints(scene) {
        const x = this.battleImage.getBounds().x;
        const y = this.battleImage.getBounds().y;
        this.actionPointsGroup ? this.actionPointsGroup.clear(true, true) : this.actionPointsGroup = scene.add.group();
        Object.keys(this.actionPoints).forEach((pointType, index) => {
            let pointsDrawn = 0;
            for (let i = 0; i < Math.min(Math.trunc(this.actionPoints[pointType]), 2); i++) {
                this.actionPointsGroup.create(x + 96 - 16, y + pointsDrawn * 16 + 32 * index, 'action-points', index).setOrigin(0);
                pointsDrawn++;
            }
            if (this.actionPoints[pointType] % 1 === 0.5) {
                if (pointsDrawn < 2) {
                    this.actionPointsGroup.create(x + 96 - 16, y + pointsDrawn * 16 + 32 * index, 'action-points', index + 3).setOrigin(0);
                }
                else {
                    this.actionPointsGroup.create(x + 96, y + 32 * index, 'action-points', index + 3).setOrigin(0);
                }
            }
            if (this.actionPoints[pointType] === 3) {
                this.actionPointsGroup.create(x + 96, y + 32 * index, 'action-points', index).setOrigin(0);
            }
        });
    }
    drawEffectInformation(scene, effect, x, y) {
        this.effectInformationGroup = scene.add.group();
        const background = scene.add.graphics()
            .lineStyle(1, 0xff0000)
            .fillStyle(0xf0d191)
            .fillRect(x, y, 32 * 8, 3 * 32);
        this.effectInformationGroup.add(background);
        this.effectInformationGroup.add(scene.add.text(x + 8, y + 8, `${effect.name}`, { font: 'bold 12px monospace', fill: '#000000' }));
        this.effectInformationGroup.add(scene.add.text(x + 8, y + 8 + 12 + 8, `${effect.description} \nDuration: ${effect.durationLeft} / ${effect.baseDuration}`, { font: '12px monospace', fill: '#000000' }));
    }
    drawEntityInfo(scene, x, y) {
        this.battleImage.setDepth(10).disableInteractive();
        this.entityInfoGroup = scene.add.group();
        let overlay = scene.add.graphics()
            .fillStyle(0x000000, 0.25)
            .fillRect(0, 0, 800, 640);
        this.entityInfoGroup.add(overlay);
        let zone = scene.add.zone(0, 0, 800, 640).setOrigin(0, 0)
            .setInteractive().once('pointerdown', () => {
            overlay.destroy();
            zone.destroy();
            this.entityInfoGroup.clear(true, true);
            this.battleImage.setDepth(0).setInteractive();
        });
        const background = scene.add.graphics()
            .lineStyle(1, 0xff0000)
            .fillStyle(0xf0d191)
            .fillRect(x, y, 32 * 8, 13 * 32);
        this.entityInfoGroup.add(background);
        this.entityInfoGroup.create(x + 2, y, this.spriteParams.texture, this.spriteParams.frame).setOrigin(0, 0).setDisplaySize(96, 96);
        const name = scene.add.text(x + 2 + 96 + 2, y, this.name, { font: '20px monospace', fill: '#000000' });
        this.entityInfoGroup.add(name);
        const health = scene.add.text(x + 2 + 96 + 2, y + 24, `HP: ${this.currentCharacteristics.parameters.currentHealth}/${this.currentCharacteristics.parameters.health}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(health);
        const manna = scene.add.text(x + 2 + 96 + 2, y + 40, `MP: ${this.currentCharacteristics.parameters.currentManna}/${this.currentCharacteristics.parameters.manna}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(manna);
        const energy = scene.add.text(x + 2 + 96 + 2, y + 56, `EN: ${this.currentCharacteristics.parameters.currentEnergy}/${this.currentCharacteristics.parameters.energy}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(energy);
        const strength = scene.add.text(x + 8, y + 102, `Strength: ${this.currentCharacteristics.attributes.strength}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(strength);
        const agility = scene.add.text(x + 8, y + 118, `Agility: ${this.currentCharacteristics.attributes.agility}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(agility);
        const intelligence = scene.add.text(x + 8, y + 134, `Intelligence: ${this.currentCharacteristics.attributes.intelligence}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(intelligence);
        const armor = scene.add.text(x + 8, y + 154, `Armor: ${this.currentCharacteristics.defences.armor}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(armor);
        const dodge = scene.add.text(x + 8, y + 170, `Dodge: ${this.currentCharacteristics.defences.dodge}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(dodge);
        const resistance = scene.add.text(x + 8, y + 186, `Resistance: `, { font: '12px monospace', fill: '#000000' });
        this.entityInfoGroup.add(resistance);
        const resistanceDetails = scene.add.text(x + 8, y + 202, `🔥${this.currentCharacteristics.defences.fireResistance} ` +
            `❄${this.currentCharacteristics.defences.coldResistance} ` +
            `⚡${this.currentCharacteristics.defences.electricityResistance} ` +
            `☣${this.currentCharacteristics.defences.acidResistance} ` +
            `☠${this.currentCharacteristics.defences.poisonResistance} ` +
            `✨${this.currentCharacteristics.defences.magicResistance} `, { font: '14px monospace', fill: '#000000' });
        this.entityInfoGroup.add(resistanceDetails);
        const initiative = scene.add.text(x + 8, y + 218, `Initiative: ${this.currentCharacteristics.attributes.initiative}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(initiative);
        const actionPointsText = scene.add.text(x + 8, y + 234, `Action points:`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(actionPointsText);
        let pointsDrawn = 0;
        Object.keys(this.actionPoints).forEach((pointType, index) => {
            for (let i = 0; i < Math.trunc(this.actionPoints[pointType]); i++) {
                this.entityInfoGroup.create(x + 8 + pointsDrawn * 16, y + 250, 'action-points', index).setOrigin(0);
                pointsDrawn++;
            }
            if (this.actionPoints[pointType] % 1 === 0.5) {
                this.entityInfoGroup.create(x + 8 + pointsDrawn * 16, y + 250, 'action-points', index + 3).setOrigin(0);
                pointsDrawn++;
            }
        });
    }
    applyEffect(effect) {
        const existingEffectIndex = this.currentEffects.findIndex(elem => (elem.source === effect.source && elem.effectId === effect.effectId));
        if (existingEffectIndex !== -1) {
            this.currentEffects[existingEffectIndex].currentLevel = effect.currentLevel;
            this.currentEffects[existingEffectIndex].durationLeft = effect.baseDuration;
        }
        else {
            this.currentEffects.push(effect);
        }
        this.recalculateCharacteristics();
    }
    recalculateCharacteristics() {
        this.characteristicsModifiers = {
            attributes: {
                strength: 0,
                agility: 0,
                intelligence: 0,
                initiative: 0
            },
            parameters: {
                health: 0,
                manna: 0,
                energy: 0,
            },
            defences: {
                armor: 0,
                dodge: 0,
                fireResistance: 0,
                coldResistance: 0,
                acidResistance: 0,
                electricityResistance: 0,
                poisonResistance: 0,
                magicResistance: 0,
            }
        };
        this.currentEffects.forEach((effect, i) => {
            const target = effect.targetCharacteristic.split('.');
            if (effect.type === 'passive') {
                if (effect.modifier.type === 'value') {
                    this.characteristicsModifiers[target[0]][target[1]] = this.characteristicsModifiers[target[0]][target[1]] + effect.modifier.value;
                }
                if (effect.modifier.type === 'percent') {
                    this.characteristicsModifiers[target[0]][target[1]] = this.characteristicsModifiers[target[0]][target[1]] + this.baseCharacteristics[target[0]][target[1]] * (effect.modifier.value / 100);
                }
            }
            if (effect.type === 'direct') {
                if (effect.modifier.type === 'value') {
                    this.currentCharacteristics[target[0]][target[1]] = this.currentCharacteristics[target[0]][target[1]] + effect.modifier.value;
                }
                if (effect.modifier.type === 'percent') {
                    this.currentCharacteristics[target[0]][target[1]] = this.currentCharacteristics[target[0]][target[1]] + this.currentCharacteristics[target[0]][target[1]] * (effect.modifier.value / 100);
                }
                this.currentEffects.splice(i, 1);
            }
        });
        Object.entries(this.characteristicsModifiers).forEach(([firstKey, value]) => {
            Object.entries(value).forEach(([secondKey, value]) => {
                this.currentCharacteristics[firstKey][secondKey] = this.baseCharacteristics[firstKey][secondKey] + this.characteristicsModifiers[firstKey][secondKey];
            });
        });
        this.applyItems();
    }
    applyItems() {
    }
    getAttackDamage() {
        return 1;
    }
    recalculateEffects() {
        this.currentEffects = this.currentEffects.filter((effect, i) => {
            if (effect.durationLeft === 1) {
                return false;
            }
            else {
                if (effect.durationLeft !== -1) {
                    effect.durationLeft--;
                }
                return true;
            }
        });
    }
    startRound(roundType) {
    }
    endRound() {
        this.recalculateEffects();
        this.recalculateCharacteristics();
    }
    startTurn() {
    }
    endTurn() {
    }
    async aiTurn(disposition) {
    }
    ;
    playMeleeAttackAnimation(scene, target) {
        return new Promise((resolve, reject) => {
            const prevX = this.battleImage.x;
            const prevY = this.battleImage.y;
            const enemyX = prevX < 400 ? target.battleImage.x - 96 : target.battleImage.x + 96;
            const enemyY = target.battleImage.y;
            scene.tweens.add({
                targets: this.battleImage,
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
                onLoop: function () { addEvent('onLoop') },
                onYoyo: function () {  resolve() },
                onRepeat: function () { addEvent('onRepeat') },*/
                onComplete: function () {
                    resolve();
                }
            });
        });
    }
    playCastAnimation(scene) {
        return new Promise((resolve, reject) => {
            this.battleImage.setDepth(2);
            scene.add.sprite(this.battleImage.getCenter().x, this.battleImage.getCenter().y, 'player').setDepth(1)
                .play('light_pillar_animation_back').on('animationcomplete', (currentAnim, currentFrame, sprite) => {
                this.battleImage.setDepth(null);
                sprite.destroy();
                resolve();
            });
            scene.add.sprite(this.battleImage.getCenter().x, this.battleImage.getCenter().y, 'player').setDepth(3)
                .play('light_pillar_animation_front').on('animationcomplete', (currentAnim, currentFrame, sprite) => {
                sprite.destroy();
            });
        });
    }
}
//# sourceMappingURL=generalEntity.js.map