import { Adventurer } from "../../characters/adventurers/adventurer.js";
import { ACTION_POINT_HEIGHT, ACTION_POINT_WIDTH, BATTLE_CHAR_HEIGHT, BATTLE_CHAR_WIDTH } from "../../config/constants.js";
var Rectangle = Phaser.Geom.Rectangle;
export class CharacterDrawer {
    constructor(scene, char, positionIndex) {
        this.isParty = (char instanceof Adventurer);
        this.position = CharacterDrawer.getCharacterPosition(this.isParty, positionIndex);
        this.scene = scene;
        this.char = char;
        this.initializeMainImage();
        this.parametersContainer = this.scene.add.container(this.position.x, this.position.y);
        this.actionPointsContainer = this.scene.add.container(this.position.x, this.position.y);
        this.effectIconsContainer = this.scene.add.container(this.position.x, this.position.y);
        this.effectInformationContainer = this.scene.add.container(this.position.x, this.position.y);
        const charInfoContainerX = this.position.x < 400 ? this.position.x + BATTLE_CHAR_WIDTH / 2 : this.position.x - BATTLE_CHAR_WIDTH / 2 - 32 * 8;
        const charInfoContainerY = 96;
        this.characterInfoContainer = this.scene.add.container(charInfoContainerX, charInfoContainerY);
        this.makingTurnGraphics = this.scene.add.graphics()
            .lineStyle(1, 0xff0000)
            .strokeRectShape(new Rectangle(this.position.x - BATTLE_CHAR_WIDTH / 2, this.position.y - BATTLE_CHAR_HEIGHT / 2, BATTLE_CHAR_WIDTH, BATTLE_CHAR_HEIGHT))
            .setVisible(false);
    }
    initializeMainImage() {
        const spriteParams = this.char.spriteParams;
        this.mainImage = this.scene.add.sprite(this.position.x, this.position.y, this.char.spriteParams.texture, this.char.spriteParams.frame)
            .setDisplaySize(spriteParams.width, spriteParams.height);
        // This whole mess with clickable area is here to make sure that it is 96x96 square centered at the player image no matter how small or big the initial image is
        // When area is applied to the image, Phaser will rescale it using image scale, thus initial clickable area rectangle must be pre-adjusted.
        const clickableArea = new Rectangle((this.mainImage.getCenter().x - this.mainImage.getTopLeft().x - 48) / this.mainImage.scaleX, (this.mainImage.getCenter().y - this.mainImage.getTopLeft().y - 48) / this.mainImage.scaleY, 96 / this.mainImage.scaleX, 96 / this.mainImage.scaleY);
        this.mainImage.setInteractive({
            hitArea: clickableArea,
            hitAreaCallback: Rectangle.Contains,
            useHandCursor: true
        });
        if (spriteParams.flip)
            this.mainImage.flipX = true;
        this.mainImage.on('pointerdown', () => this.pointerDownCallback());
        this.playIdleAnimation();
    }
    drawEverything(isCurrentCharacter = false) {
        this.drawHealthAndManna();
        this.drawActionPoints(isCurrentCharacter);
        this.drawMakingTurnGraphics(isCurrentCharacter);
        this.drawEffectsIcons();
    }
    drawMakingTurnGraphics(show) {
        if (show !== undefined) {
            this.makingTurnGraphics.setVisible(show);
        }
        else {
            this.makingTurnGraphics.setVisible(!this.makingTurnGraphics.visible);
        }
    }
    drawHealthAndManna() {
        this.parametersContainer.removeAll(true);
        const textParams = {
            font: '12px monospace',
            fill: '#000000',
            align: 'center',
            fixedWidth: BATTLE_CHAR_WIDTH
        };
        const characteristics = this.char.characteristics;
        const params = this.char.parameters;
        const healthText = this.scene.add.text(0, -BATTLE_CHAR_HEIGHT / 2 - 36, `${params.health} / ${characteristics.health}`, {
            ...textParams,
            backgroundColor: '#ff000075'
        }).setOrigin(0.5, 0);
        const mannaText = this.scene.add.text(0, -BATTLE_CHAR_HEIGHT / 2 - 24, `${params.manna} / ${characteristics.manna}`, {
            ...textParams,
            backgroundColor: '#0000ff75'
        }).setOrigin(0.5, 0);
        const energyText = this.scene.add.text(0, -BATTLE_CHAR_HEIGHT / 2 - 12, `${params.energy} / ${characteristics.energy}`, {
            ...textParams,
            backgroundColor: '#00ff0075'
        }).setOrigin(0.5, 0);
        this.parametersContainer.add(healthText);
        this.parametersContainer.add(mannaText);
        this.parametersContainer.add(energyText);
    }
    drawActionPoints(show) {
        this.actionPointsContainer.removeAll(true);
        if (!show)
            return;
        const baseX = BATTLE_CHAR_WIDTH / 2 - ACTION_POINT_WIDTH + ACTION_POINT_WIDTH / 2;
        const baseY = -BATTLE_CHAR_HEIGHT / 2 + ACTION_POINT_HEIGHT / 2;
        Object.keys(this.char.actionPoints).forEach((pointType, index) => {
            let pointsDrawn = 0;
            const actionPointShift = ACTION_POINT_HEIGHT * 2 * index;
            for (let i = 0; i < Math.min(Math.trunc(this.char.actionPoints[pointType]), 2); i++) {
                this.actionPointsContainer.add(this.scene.add.sprite(baseX, baseY + pointsDrawn * ACTION_POINT_HEIGHT + actionPointShift, 'action-points', index));
                pointsDrawn++;
            }
            if (this.char.actionPoints[pointType] % 1 === 0.5) {
                if (pointsDrawn < 2) {
                    this.actionPointsContainer.add(this.scene.add.sprite(baseX, baseY + pointsDrawn * ACTION_POINT_HEIGHT + actionPointShift, 'action-points', index + 3));
                }
                else {
                    this.actionPointsContainer.add(this.scene.add.sprite(baseX + ACTION_POINT_WIDTH, baseY + actionPointShift, 'action-points', index + 3));
                }
            }
            if (this.char.actionPoints[pointType] === 3) {
                this.actionPointsContainer.add(this.scene.add.sprite(baseX + ACTION_POINT_WIDTH, baseY + actionPointShift, 'action-points', index));
            }
        });
    }
    drawEffectsIcons() {
        this.effectIconsContainer.removeAll(true);
        this.char.currentEffects.forEach((effect, index) => {
            let iconX, iconY;
            if (index < 4) {
                iconX = -48 - 16;
                iconY = -48 + 16 + 32 * index;
            }
            else {
                iconX = -48 + 16 + 32 * (index - 4);
                iconY = 48 + 16;
            }
            const iconSprite = this.scene.add.sprite(iconX, iconY, effect.statusImage.texture, effect.statusImage.frame);
            iconSprite.setInteractive()
                .on('pointerover', () => this.drawEffectInformation(effect, iconX + 16, iconY - 16))
                .on('pointerout', () => this.effectInformationContainer.removeAll(true))
                .on('destroy', () => this.effectInformationContainer.removeAll(true));
            this.effectIconsContainer.add(iconSprite);
        });
    }
    drawEffectInformation(effect, x, y) {
        var _a;
        this.effectInformationContainer.removeAll(true);
        const textStyle = { font: '12px monospace', fill: '#000000' };
        const background = this.scene.add.graphics()
            .lineStyle(1, 0xff0000)
            .fillStyle(0xf0d191)
            .fillRect(x, y, 32 * 8, 3 * 32);
        this.effectInformationContainer.add(background);
        this.effectInformationContainer.add(this.scene.add.text(x + 8, y + 8, `${effect.name}`, {
            ...textStyle,
            font: 'bold 12px monospace'
        }));
        this.effectInformationContainer.add(this.scene.add.text(x + 8, y + 8 + 12 + 8, `${effect.description} \nDuration: ${effect.durationLeft} / ${effect.baseDuration}`, textStyle));
        this.effectInformationContainer.add(this.scene.add.text(x + 8, y + 8 + 12 + 8 + 12 + 8 + 8, `Source: ${effect.source}`, textStyle));
        if (typeof ((_a = effect.modifier) === null || _a === void 0 ? void 0 : _a.value) === "number") {
            this.effectInformationContainer.add(this.scene.add.text(x + 8, y + 8 + 12 + 8 + 12 + 8 + 8 + 12, `Strength: ${effect.modifier.value}${effect.modifier.type === 'percent' ? '%' : ' units'}`, textStyle));
        }
        this.effectInformationContainer.setDepth(2);
    }
    drawCharInfo() {
        this.characterInfoContainer.removeAll(true);
        this.mainImage.setDepth(4).disableInteractive();
        let overlay = this.scene.add.graphics()
            .fillStyle(0x000000, 0.25)
            .fillRect(0, 0, 800, 640).setDepth(3);
        let zone = this.scene.add.zone(0, 0, 800, 640).setOrigin(0, 0)
            .setInteractive().once('pointerdown', () => {
            overlay.destroy();
            zone.destroy();
            this.characterInfoContainer.removeAll(true);
            this.mainImage.setDepth(0).setInteractive({ useHandCursor: true });
        }).setDepth(4);
        const background = this.scene.add.graphics()
            .lineStyle(1, 0xff0000)
            .fillStyle(0xf0d191)
            .fillRect(0, 0, 32 * 8, 13 * 32);
        this.characterInfoContainer.add(background);
        const spriteParams = this.char.spriteParams;
        const image = this.scene.add.sprite(48 + 2, 48 + 2, spriteParams.texture, spriteParams.frame).setDisplaySize(spriteParams.width, spriteParams.height);
        this.characterInfoContainer.add(image);
        const name = this.scene.add.text(2 + 96 + 2, 0, this.char.name, { font: '20px monospace', color: '#000000' });
        this.characterInfoContainer.add(name);
        const textStyle = { font: '12px monospace', color: '#000000' };
        let level;
        if (this.char instanceof Adventurer) {
            level = this.scene.add.text(2 + 96 + 2, 24, `Level: ${this.char.level}, ${this.char.xp}xp / ${this.char.experienceTable[this.char.level]}xp`, textStyle);
        }
        else {
            level = this.scene.add.text(2 + 96 + 2, 24, `Level: ${this.char.level}`, textStyle);
        }
        this.characterInfoContainer.add(level);
        const characteristics = this.char.characteristics;
        const parameters = this.char.parameters;
        const health = this.scene.add.text(2 + 96 + 2, 40, `HP: ${parameters.health}/${characteristics.health}`, textStyle);
        const manna = this.scene.add.text(2 + 96 + 2, 56, `MP: ${parameters.manna}/${characteristics.manna}`, textStyle);
        const energy = this.scene.add.text(2 + 96 + 2, 72, `EN: ${parameters.energy}/${characteristics.energy}`, textStyle);
        this.characterInfoContainer.add(health);
        this.characterInfoContainer.add(manna);
        this.characterInfoContainer.add(energy);
        let lastTextY = 102;
        const drawText = (characteristic) => {
            let charString = this.char.characteristics[characteristic] + ' (';
            charString += this.char.characteristicsModifiers[characteristic].map(modifier => modifier.value).join(' + ') + ')';
            const text = this.scene.add.text(8, lastTextY, `${characteristic}: ${charString}`, textStyle);
            this.characterInfoContainer.add(text);
            lastTextY += 14;
        };
        Object.keys(this.char.characteristics).forEach((characteristic) => {
            if (characteristic !== 'health' && characteristic !== 'manna' && characteristic !== 'energy' && !characteristic.includes('Resistance')) {
                drawText(characteristic);
            }
        });
        const resistance = this.scene.add.text(8, 206, `Resistance: `, textStyle);
        this.characterInfoContainer.add(resistance);
        const resistanceDetails = this.scene.add.text(8, 222, `🔥${this.char.characteristics.fireResistance} ` +
            `❄${this.char.characteristics.coldResistance} ` +
            `⚡${this.char.characteristics.electricityResistance} ` +
            `☣${this.char.characteristics.acidResistance} ` +
            `☠${this.char.characteristics.poisonResistance} ` +
            `✨${this.char.characteristics.magicResistance} `, { font: '14px monospace', color: '#000000' });
        this.characterInfoContainer.add(resistanceDetails);
        const actionPointsText = this.scene.add.text(8, 254, `Action points:`, textStyle);
        this.characterInfoContainer.add(actionPointsText);
        let pointsDrawn = 0;
        Object.keys(this.char.actionPoints).forEach((pointType, index) => {
            for (let i = 0; i < Math.trunc(this.char.actionPoints[pointType]); i++) {
                this.characterInfoContainer.add(this.scene.add.sprite(8 + pointsDrawn * 16, 270, 'action-points', index).setOrigin(0));
                pointsDrawn++;
            }
            if (this.char.actionPoints[pointType] % 1 === 0.5) {
                this.characterInfoContainer.add(this.scene.add.sprite(8 + pointsDrawn * 16, 270, 'action-points', index + 3).setOrigin(0));
                pointsDrawn++;
            }
        });
        this.characterInfoContainer.setDepth(4);
    }
    pointerDownCallback() {
        this.drawCharInfo();
    }
    playIdleAnimation() {
        return new Promise((resolve) => {
            if (this.char.animations.idle) {
                this.mainImage.anims.play(this.char.animations.idle);
                resolve();
            }
            else {
                this.mainImage.setTexture(this.char.spriteParams.texture, this.char.spriteParams.frame);
                resolve();
            }
        });
    }
    playMoveAnimation(targetX, targetY) {
        return new Promise((resolve) => {
            var _a;
            if (targetX === this.mainImage.x) {
                resolve();
            }
            if (targetX >= this.mainImage.x && this.isParty)
                this.mainImage.flipX = this.char.spriteParams.flip;
            if (targetX < this.mainImage.x && this.isParty)
                this.mainImage.flipX = !this.char.spriteParams.flip;
            if (targetX > this.mainImage.x && !this.isParty)
                this.mainImage.flipX = !this.char.spriteParams.flip;
            if (targetX <= this.mainImage.x && !this.isParty)
                this.mainImage.flipX = this.char.spriteParams.flip;
            if ((_a = this.char.animations) === null || _a === void 0 ? void 0 : _a.move) {
                this.mainImage.anims.play(this.char.animations.move, true);
            }
            const duration = (Math.abs(targetX - this.mainImage.x) / 600) * 1000;
            this.scene.tweens.add({
                targets: this.mainImage,
                props: {
                    x: {
                        value: targetX,
                    },
                    y: {
                        value: targetY,
                    }
                },
                // ease: 'Back.easeOut',
                duration: duration,
                yoyo: false,
                onComplete: () => {
                    this.mainImage.flipX = this.char.spriteParams.flip;
                    this.playIdleAnimation();
                    resolve();
                }
            });
        });
    }
    playMeleeAttackAnimation(targetX, targetY) {
        return new Promise((resolve) => {
            var _a;
            const initialImageDepth = this.mainImage.depth;
            this.mainImage.setDepth(5);
            if ((_a = this.char.animations) === null || _a === void 0 ? void 0 : _a.attack) {
                this.mainImage.anims.play({ key: this.char.animations.idle, repeat: 0 }).once('animationcomplete', (currentAnim, currentFrame, sprite) => {
                    this.mainImage.anims.play({ key: this.char.animations.attack, repeat: 0 }).once('animationcomplete', (currentAnim, currentFrame, sprite) => {
                        this.mainImage.setDepth(initialImageDepth);
                        resolve();
                    });
                });
            }
            else {
                this.scene.tweens.add({
                    targets: this.mainImage,
                    props: {
                        x: {
                            value: targetX,
                        },
                        y: {
                            value: targetY,
                        }
                    },
                    ease: 'Back.easeOut',
                    delay: 300,
                    duration: 500,
                    yoyo: true,
                    /*paused: true,
                    onActive: function () { addEvent('onActive') },
                    onStart: function () { addEvent('onStart') },
                    onLoop: function () { addEvent('onLoop') }, */
                    onYoyo: () => {
                    },
                    /*onRepeat: function () { addEvent('onRepeat') },*/
                    onComplete: () => {
                        this.mainImage.setDepth(initialImageDepth);
                        resolve();
                    }
                });
            }
        });
    }
    playCastAnimation() {
        return new Promise((resolve) => {
            var _a;
            if ((_a = this.char.animations) === null || _a === void 0 ? void 0 : _a.buff) {
                this.mainImage.anims.play(this.char.animations.buff, true);
                this.mainImage.once('animationcomplete', () => {
                    this.playIdleAnimation();
                    resolve();
                });
            }
            else {
                this.mainImage.setDepth(2);
                this.scene.add.sprite(this.position.x, this.position.y, null).setDepth(1)
                    .play('light_pillar_animation_back').once('animationcomplete', (currentAnim, currentFrame, sprite) => {
                    this.mainImage.setDepth(null);
                    sprite.destroy();
                    resolve();
                });
                this.scene.add.sprite(this.position.x, this.position.y, null).setDepth(3)
                    .play('light_pillar_animation_front').once('animationcomplete', (currentAnim, currentFrame, sprite) => {
                    sprite.destroy();
                });
            }
        });
    }
    playHitAnimation() {
        return new Promise((resolve) => {
            if (this.char.animations.hit) {
                this.mainImage.anims.play(this.char.animations.hit);
                this.mainImage.once('animationcomplete', () => {
                    this.playIdleAnimation();
                    resolve();
                });
            }
            else {
                const hitImage = this.scene.add.sprite(this.position.x, this.position.y, 'hit');
                setTimeout(() => {
                    hitImage.destroy();
                }, 500);
                resolve();
            }
        });
    }
    playMissAnimation() {
        return new Promise((resolve) => {
            if (this.char.animations.miss) {
                this.mainImage.anims.play(this.char.animations.miss);
                this.mainImage.once('animationcomplete', () => {
                    this.playIdleAnimation();
                    resolve();
                });
            }
            else {
                const missText = this.scene.add.text(this.position.x, this.position.y, 'Miss!', { color: 'red', font: 'bold 30px monospace' }).setOrigin(0.5, 0.5);
                this.scene.tweens.add({
                    targets: missText,
                    props: {
                        y: {
                            value: this.position.y - 80,
                        }
                    },
                    // ease: 'Back.easeOut',
                    duration: 800,
                    yoyo: false,
                    onComplete: () => {
                        missText.destroy();
                        resolve();
                    }
                });
            }
        });
    }
    playDeathAnimation() {
        return new Promise((resolve) => {
            if (this.char.animations.death) {
                this.mainImage.anims.play(this.char.animations.death);
                this.mainImage.once('animationcomplete', () => {
                    resolve();
                });
            }
            else {
                this.mainImage.setTexture('dead-character').setDisplaySize(BATTLE_CHAR_WIDTH, BATTLE_CHAR_HEIGHT);
                resolve();
            }
        });
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
}
//# sourceMappingURL=characterDrawer.js.map