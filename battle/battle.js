import { playerInstance } from "../characters/adventurers/player.js";
import { Disposition } from "./disposition.js";
import { GeneralLocation } from "../locations/generalLocation.js";
import { CharacterDrawer } from "./characterDrawer.js";
import { Adventurer } from "../characters/adventurers/adventurer.js";
import GeneralEnemy from "../characters/enemies/generalEnemy.js";
import { ActionInterfaceDrawer } from "./actionInterfaceDrawer.js";
var Rectangle = Phaser.Geom.Rectangle;
export class BattleScene extends GeneralLocation {
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
        super.preload();
    }
    create() {
        super.create('battle');
        this.turnOrderDisplayContainer = this.add.container(16, 16);
        this.player = playerInstance;
        this.charToDrawerMap = new Map();
        this.disposition = new Disposition(this.player.party, this.enemies, 'forrest', this);
        this.actionInterfaceDrawer = new ActionInterfaceDrawer(this, this.disposition);
        this.disposition.playerCharacters.forEach((char, index) => {
            this.charToDrawerMap.set(char, new CharacterDrawer(this, char, index));
        });
        this.disposition.enemyCharacters.forEach((char, index) => {
            this.charToDrawerMap.set(char, new CharacterDrawer(this, char, index));
        });
        this.disposition.startRound();
    }
    update() {
    }
    redrawAllCharacters() {
        this.charToDrawerMap.forEach((charDrawer, char) => {
            charDrawer.drawEverything(this.disposition.currentCharacter === char);
        });
    }
    collectActions(char) {
        this.redrawAllCharacters();
        if (char instanceof Adventurer) {
            return this.actionInterfaceDrawer.drawActionInterface();
        }
        else {
            return Promise.resolve(char.aiTurn(this.disposition));
        }
    }
    async animateAction({ attempted, succeeded, triggeredTraps, source, targets, action }) {
        this.charToDrawerMap.get(source).drawActionPoints(true);
        if (attempted) {
            if (targets.length === 1) {
                await this.playAnimation(source, action.animation, targets[0]);
            }
            else {
                await this.playAnimation(source, action.animation);
            }
            await Promise.all(targets.map((target, index) => {
                if (succeeded[index] && targets[index] !== source) {
                    return this.playAnimation(targets[index], 'hit');
                }
            }));
            targets.forEach(target => {
                if (!target.isAlive) {
                    this.playAnimation(target, 'death');
                }
            });
            if (!source.isAlive) {
                this.playAnimation(source, 'death');
            }
        }
    }
    async playAnimation(char, animation, target) {
        const charDrawer = this.charToDrawerMap.get(char);
        let targetDrawer = this.charToDrawerMap.get(target);
        const animatingEnemy = char instanceof GeneralEnemy;
        switch (animation) {
            case 'idle':
                await charDrawer.playIdleAnimation();
                break;
            case 'meleeAttack':
                if (targetDrawer) {
                    await charDrawer.playMoveAnimation(targetDrawer.position.x + (animatingEnemy ? 96 : -96), targetDrawer.position.y);
                    await charDrawer.playMeleeAttackAnimation(targetDrawer.position.x, targetDrawer.position.y);
                    charDrawer.playMoveAnimation(charDrawer.position.x, charDrawer.position.y, true);
                }
                else {
                    await charDrawer.playMeleeAttackAnimation(600, 320);
                }
                break;
            case 'castBuff':
                await charDrawer.playCastAnimation();
                break;
            case 'hit':
                await charDrawer.playHitAnimation();
                break;
            case 'death':
                await charDrawer.playDeathAnimation();
                break;
        }
    }
    drawTurnOrder(turnOrder) {
        this.turnOrderDisplayContainer.removeAll(true);
        this.turnOrderDisplayContainer.add(this.add.graphics()
            .fillStyle(0xf0d191, 0.5)
            .fillRect(0, 0, 64 * turnOrder.length, 64 + 16)
            .lineStyle(1, 0x000000)
            .strokeRect(0, 0, 64 * turnOrder.length, 64 + 16));
        turnOrder.forEach((char, i) => {
            const charNameText = this.add.text(64 * i, 16 + 64, char.name, {
                backgroundColor: 'lightgrey',
                color: 'black'
            }).setVisible(false);
            const initiativeText = this.add.text(64 * i, 0, char.currentCharacteristics.attributes.initiative.toString(), {
                fixedWidth: 64,
                fixedHeight: 16,
                align: 'center',
                color: 'black'
            });
            initiativeText.setInteractive()
                .on('pointerover', () => charNameText.setText('Initiative').setVisible(true))
                .on('pointerout', () => charNameText.setVisible(false));
            this.turnOrderDisplayContainer.add(charNameText);
            this.turnOrderDisplayContainer.add(initiativeText);
            const sprite = this.add.sprite(64 * i + 32, 16 + 32, char.spriteParams.texture, char.spriteParams.frame)
                .setDisplaySize(char.spriteParams.width / 1.5, char.spriteParams.height / 1.5);
            sprite.flipX = char.spriteParams.flip;
            // This whole mess with clickable area is here to make sure that it is 64x64 square centered at the char image no matter how small or big the initial image is
            // When area is applied to the image, Phaser will rescale it using image scale, thus initial clickable area rectangle must be pre-adjusted.
            const clickableArea = new Rectangle((sprite.getCenter().x - sprite.getTopLeft().x - 32) / sprite.scaleX, (sprite.getCenter().y - sprite.getTopLeft().y - 32) / sprite.scaleY, 64 / sprite.scaleX, 64 / sprite.scaleY);
            sprite.setInteractive({
                hitArea: clickableArea,
                hitAreaCallback: Rectangle.Contains
            }).on('pointerover', () => charNameText.setText(char.name).setVisible(true))
                .on('pointerout', () => charNameText.setVisible(false));
            this.turnOrderDisplayContainer.add(sprite);
        });
    }
    exitBattle(isPartyWon) {
        console.log(`The party has ${isPartyWon ? 'won!' : 'lost...'} Switching from the battle scene to ${this.prevSceneKey}. Name of object to remove: ${this.enemyName}`);
        if (isPartyWon === true) {
            this.scene.run(this.prevSceneKey, { defeatedEnemy: this.enemyName });
        }
        else {
            this.scene.run(this.prevSceneKey);
        }
        this.scene.stop('Battle');
    }
}
//# sourceMappingURL=battle.js.map