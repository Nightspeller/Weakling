export default class GeneralEntity {
    constructor() {
        this.spriteParams = { texture: null, frame: null };
        this.worldImage = null;
        this.battleImage = null;
        this.level = null;
        this.actions = [];
        this.position = null;
        this.initiative = null;
        this.currentEffects = [];
        this.effectIcons = [];
        this.actedThisRound = false;
        this.isAlive = true;
        this.baseCharacteristics = {
            attributes: {
                strength: null,
                agility: null,
                intelligence: null,
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
                resistance: {
                    fire: null,
                    cold: null,
                    acid: null,
                    electricity: null,
                    poison: null,
                    magic: null,
                }
            }
        };
        this.currentCharacteristics = JSON.parse(JSON.stringify(this.baseCharacteristics));
    }
    draw(scene, x, y) {
        this.drawEffectsIcons(scene, x, y);
        if (this.isAlive) {
            this.battleImage = scene.add.sprite(x, y, this.spriteParams.texture, this.spriteParams.frame);
        }
        else {
            this.battleImage = scene.add.sprite(x, y, 'dead-character');
        }
        return this.battleImage;
    }
    drawEffectsIcons(scene, x, y) {
        this.currentEffects.forEach((effect, index) => {
            if (index < 4) {
                const iconX = x - 32;
                const iconY = y + 32 * index;
                const iconSprite = scene.add.sprite(iconX, iconY, effect.statusImage.texture, effect.statusImage.frame).setOrigin(0, 0);
                iconSprite.setInteractive().on('pointerover', (pointer, localX, localY, event) => this.drawEffectInformation(scene, effect, iconX + 32, iconY)).on('pointerout', (pointer, localX, localY, event) => this.effectInformationGroup.clear(true, true));
                this.effectIcons.push(iconSprite);
            }
            else {
                this.effectIcons.push(scene.add.sprite(x + 32 * (index - 4), y + 32 * 4, effect.statusImage.texture, effect.statusImage.frame).setOrigin(0, 0));
            }
        });
    }
    drawEffectInformation(scene, effect, x, y) {
        console.log(effect, x, y);
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
        //todo: normalize x, fix y gaps
        this.battleImage.setDepth(10).disableInteractive();
        this.entityInfoGroup = scene.add.group();
        let overlay = scene.add.graphics()
            .fillStyle(0x000000, 0.25)
            .fillRect(0, 0, 800, 640);
        this.entityInfoGroup.add(overlay);
        let zone = scene.add.zone(0, 0, 800, 640).setOrigin(0, 0)
            .setInteractive().once('pointerdown', () => {
            console.log('zone outside of entity info is clicked', this.name);
            overlay.destroy();
            zone.destroy();
            this.entityInfoGroup.clear(true, true);
            this.battleImage.setDepth(0).setInteractive();
        });
        const background = scene.add.graphics()
            .lineStyle(1, 0xff0000)
            .fillStyle(0xf0d191)
            .fillRect(x + 32, y, 32 * 8, 13 * 32);
        this.entityInfoGroup.add(background);
        this.entityInfoGroup.create(x + 36, y, this.spriteParams.texture, this.spriteParams.frame).setOrigin(0, 0).setDisplaySize(96, 96);
        const name = scene.add.text(x + 138, y, this.name, { font: '20px monospace', fill: '#000000' });
        this.entityInfoGroup.add(name);
        const health = scene.add.text(x + 138, y + 24, `HP: ${this.currentCharacteristics.parameters.currentHealth}/${this.currentCharacteristics.parameters.health}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(health);
        const manna = scene.add.text(x + 138, y + 40, `MP: ${this.currentCharacteristics.parameters.currentManna}/${this.currentCharacteristics.parameters.manna}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(manna);
        const energy = scene.add.text(x + 138, y + 56, `EN: ${this.currentCharacteristics.parameters.currentEnergy}/${this.currentCharacteristics.parameters.energy}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(energy);
        const strength = scene.add.text(x + 40, y + 102, `Strength: ${this.currentCharacteristics.attributes.strength}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(strength);
        const agility = scene.add.text(x + 40, y + 118, `Agility: ${this.currentCharacteristics.attributes.agility}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(agility);
        const intelligence = scene.add.text(x + 40, y + 134, `Intelligence: ${this.currentCharacteristics.attributes.intelligence}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(intelligence);
        const armor = scene.add.text(x + 40, y + 154, `Armor: ${this.currentCharacteristics.defences.armor}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(armor);
        const dodge = scene.add.text(x + 40, y + 170, `Dodge: ${this.currentCharacteristics.defences.dodge}`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(dodge);
        const resistance = scene.add.text(x + 40, y + 182, `Resistance: `, { font: '12px monospace', fill: '#000000' });
        this.entityInfoGroup.add(resistance);
        const resistanceDetails = scene.add.text(x + 40, y + 202, `🔥${this.currentCharacteristics.defences.resistance.fire} ` +
            `❄${this.currentCharacteristics.defences.resistance.cold} ` +
            `⚡${this.currentCharacteristics.defences.resistance.electricity} ` +
            `☣${this.currentCharacteristics.defences.resistance.acid} ` +
            `☠${this.currentCharacteristics.defences.resistance.poison} ` +
            `✨${this.currentCharacteristics.defences.resistance.magic} `, { font: '14px monospace', fill: '#000000' });
        this.entityInfoGroup.add(resistanceDetails);
        const actionPointsText = scene.add.text(x + 40, y + 222, `Action points:`, {
            font: '12px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(actionPointsText);
        let prepareActionPointsText = '🔴'.repeat(this.actionPoints.physical) + '🔵'.repeat(this.actionPoints.magical) + '🟢'.repeat(this.actionPoints.misc);
        const actionPoints = scene.add.text(x + 40, y + 234, prepareActionPointsText, {
            font: '16px monospace',
            fill: '#000000'
        });
        this.entityInfoGroup.add(actionPoints);
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
        let newCharacteristics = JSON.parse(JSON.stringify(this.baseCharacteristics));
        this.currentEffects.forEach((effect, i) => {
            if (effect.type === 'passive') {
                let target = effect.targetCharacteristic.split('.');
                if (target.length === 2) {
                    if (effect.modifierValue !== undefined) {
                        newCharacteristics[target[0]][target[1]] = newCharacteristics[target[0]][target[1]] - effect.modifierValue;
                    }
                    else {
                        newCharacteristics[target[0]][target[1]] = newCharacteristics[target[0]][target[1]] * effect.levels[effect.currentLevel];
                    }
                }
                if (target.length === 3) {
                    if (effect.modifierValue !== undefined) {
                        newCharacteristics[target[0]][target[1]][target[2]] = newCharacteristics[target[0]][target[1]][target[2]] - effect.modifierValue;
                    }
                    else {
                        newCharacteristics[target[0]][target[1]][target[2]] = newCharacteristics[target[0]][target[1]][target[2]] * effect.levels[effect.currentLevel];
                    }
                }
                this.currentCharacteristics = newCharacteristics;
            }
            if (effect.type === 'conditional') {
                console.log('conditional effect is on the target');
            }
            if (effect.type === 'direct') {
                let target = effect.targetCharacteristic.split('.');
                if (target[1] === 'currentHealth') {
                    if (effect.modifierValue !== undefined) {
                        newCharacteristics[target[0]][target[1]] = this.currentCharacteristics[target[0]][target[1]] - effect.modifierValue;
                    }
                    else {
                        newCharacteristics[target[0]][target[1]] = this.currentCharacteristics[target[0]][target[1]] - effect.levels[effect.currentLevel];
                    }
                    this.currentEffects.splice(i, 1);
                }
                this.currentCharacteristics = newCharacteristics;
            }
        });
    }
    recalculateEffects() {
        this.currentEffects.forEach((effect, i) => {
            if (effect.durationLeft === 1) {
                console.log('-----------------------removing effect', effect);
                this.currentEffects.splice(i, 1);
            }
            else {
                if (effect.durationLeft !== -1) {
                    console.log('-----------------------decreasing effect duration', effect);
                    this.currentEffects[i].durationLeft--;
                }
            }
        });
    }
    startTurn() {
        this.recalculateCharacteristics();
    }
    endTurn() {
        this.recalculateCharacteristics();
        this.recalculateEffects();
    }
}
//# sourceMappingURL=generalEntity.js.map