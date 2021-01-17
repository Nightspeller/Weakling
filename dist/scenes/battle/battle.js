define(["require", "exports", "phaser", "../../characters/adventurers/player", "./disposition", "./characterDrawer", "../../characters/adventurers/adventurer", "../../characters/enemies/generalEnemy", "./actionInterfaceDrawer", "../overlays/generalOverlayScene", "../../helpers/richBitmapText"], function (require, exports, Phaser, player_1, disposition_1, characterDrawer_1, adventurer_1, generalEnemy_1, actionInterfaceDrawer_1, generalOverlayScene_1, richBitmapText_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattleScene extends generalOverlayScene_1.default {
        constructor() {
            super({ key: 'Battle' });
            this.droppedItems = [];
        }
        init({ prevScene, enemies, enemyName, background, }) {
            this.opts = {
                backgroundColor: 0xf0d191,
                backgroundAlpha: 0,
                windowX: 0,
                windowY: 0,
                windowWidth: 800,
                windowHeight: 640,
                borderThickness: 0,
                baseDepth: 0,
            };
            this.parentSceneKey = prevScene;
            this.background = background;
            if (Array.isArray(enemies)) {
                this.enemies = enemies.map((enemy) => enemy.type);
                this.enemyName = enemyName;
            }
            else {
                throw Error('No enemies were passed for Battle scene!');
            }
        }
        create() {
            super.create(this.parentSceneKey, this.opts);
            this.turnOrderDisplayContainer = this.add.container(16, 16);
            this.charToDrawerMap = new Map();
            this.disposition = new disposition_1.default(player_1.playerInstance.party, this.enemies, 'forrest', this);
            this.actionInterfaceDrawer = new actionInterfaceDrawer_1.default(this, this.disposition);
            this.disposition.playerCharacters.forEach((char, index) => {
                this.charToDrawerMap.set(char, new characterDrawer_1.default(this, char, index));
            });
            this.disposition.enemyCharacters.forEach((char, index) => {
                this.charToDrawerMap.set(char, new characterDrawer_1.default(this, char, index));
            });
            this.disposition.startRound();
            this.events.on('resume', (scene, data) => {
                if (data?.droppedItems) {
                    this.droppedItems.push(...data.droppedItems);
                }
            });
        }
        redrawAllCharacters() {
            this.charToDrawerMap.forEach((charDrawer, char) => {
                charDrawer.drawEverything(this.disposition.currentCharacter === char);
            });
        }
        collectActions(char) {
            this.redrawAllCharacters();
            if (char instanceof adventurer_1.default) {
                return this.actionInterfaceDrawer.drawActionInterface();
            }
            return Promise.resolve(char.aiTurn(this.disposition));
        }
        async animateAction({ 
        // eslint-disable-next-line no-unused-vars
        succeeded, triggeredTraps, source, targets, action, }) {
            this.charToDrawerMap.get(source).drawActionPoints(true);
            await this.playAnimation(source, action.animation, targets, succeeded);
            targets.forEach((target) => {
                if (!target.isAlive) {
                    this.playAnimation(target, 'death');
                }
            });
            if (!source.isAlive) {
                this.playAnimation(source, 'death');
            }
        }
        async playAnimation(char, animation, targets, succeeded) {
            const charDrawer = this.charToDrawerMap.get(char);
            let targetDrawer;
            if (targets?.length === 1) {
                targetDrawer = this.charToDrawerMap.get(targets[0]);
            }
            const animatingEnemy = char instanceof generalEnemy_1.default;
            switch (animation) {
                case 'idle':
                    await charDrawer.playIdleAnimation();
                    break;
                case 'meleeAttack': {
                    let attackX = 600;
                    let attackY = 320;
                    if (targetDrawer) {
                        attackX = targetDrawer.position.x;
                        attackY = targetDrawer.position.y;
                    }
                    await charDrawer.playMoveAnimation(attackX + (animatingEnemy ? 96 : -96), attackY);
                    await charDrawer.playMeleeAttackAnimation(attackX, attackY);
                    targets.forEach((target, index) => {
                        if (succeeded[index] && targets[index] !== char) {
                            this.playAnimation(targets[index], 'hit');
                        }
                        else {
                            this.playAnimation(targets[index], 'miss');
                        }
                    });
                    await charDrawer.playMoveAnimation(charDrawer.position.x, charDrawer.position.y);
                    await new Promise((resolve) => setTimeout(() => resolve(), 500));
                    break;
                }
                case 'rangeAttack': {
                    let attackX = 600;
                    let attackY = 320;
                    if (targetDrawer) {
                        attackX = targetDrawer.position.x;
                        attackY = targetDrawer.position.y;
                    }
                    await Promise.all([
                        charDrawer.playRangedAttackAnimation(),
                        charDrawer.playRangedProjectileAnimation(attackX, attackY)
                    ]);
                    targets.forEach((target, index) => {
                        if (succeeded[index] && targets[index] !== char) {
                            this.playAnimation(targets[index], 'hit');
                        }
                        else {
                            this.playAnimation(targets[index], 'miss');
                        }
                    });
                    await new Promise((resolve) => setTimeout(() => resolve(), 500));
                    break;
                }
                case 'castBuff':
                    await charDrawer.playCastAnimation();
                    break;
                case 'hit':
                    await charDrawer.playHitAnimation();
                    break;
                case 'miss':
                    await charDrawer.playMissAnimation();
                    break;
                case 'death':
                    await charDrawer.playDeathAnimation();
                    break;
                default:
                    throw new Error(`Unknown animation "${animation}" is requested!`);
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
                const charNameText = new richBitmapText_1.default({
                    scene: this,
                    x: 64 * i,
                    y: 16 + 64,
                    font: 'bitmapArial',
                    text: char.name,
                    size: 16,
                    align: undefined,
                    border: { color: 0x000000, alpha: 1, width: 1 },
                    fill: { color: 0xf0d191, alpha: 0.5 },
                }).setVisible(false);
                const initiativeText = this.add.bitmapText(64 * i + 32, 0, 'bitmapArial', char.characteristics.initiative.toString(), 16)
                    .setOrigin(0.5, 0);
                initiativeText
                    .setInteractive()
                    .on('pointerover', () => charNameText.setText('Initiative').setVisible(true))
                    .on('pointerout', () => charNameText.setVisible(false));
                this.turnOrderDisplayContainer.add([charNameText, /* graphics, */ initiativeText]);
                const sprite = this.add.sprite(64 * i + 32, 16 + 32, char.spriteParams.texture, char.spriteParams.frame)
                    .setDisplaySize(char.spriteParams.width / 1.5, char.spriteParams.height / 1.5);
                sprite.flipX = char.spriteParams.flip;
                // This whole mess with clickable area is here to make sure that it is 64x64 square centered at the char image no matter how small or big the initial image is
                // When area is applied to the image, Phaser will rescale it using image scale, thus initial clickable area rectangle must be pre-adjusted.
                const clickableArea = new Phaser.Geom.Rectangle((sprite.getCenter().x - sprite.getTopLeft().x - 32) / sprite.scaleX, (sprite.getCenter().y - sprite.getTopLeft().y - 32) / sprite.scaleY, 64 / sprite.scaleX, 64 / sprite.scaleY);
                sprite
                    .setInteractive({ hitArea: clickableArea, hitAreaCallback: Phaser.Geom.Rectangle.Contains })
                    .on('pointerover', () => charNameText.setText(char.name).setVisible(true))
                    .on('pointerout', () => charNameText.setVisible(false));
                this.turnOrderDisplayContainer.add(sprite);
            });
        }
        _drawBackground() {
            this.add.image(this.opts.windowX, this.opts.windowY, this.background)
                .setDisplaySize(this.opts.windowWidth, this.opts.windowHeight)
                .setOrigin(0)
                .setDepth(this.opts.baseDepth);
        }
        _drawCloseButton() {
        }
        exitBattle(isPartyWon) {
            console.log(`The party has ${isPartyWon ? 'won!' : 'lost...'}. Name of enemy object: ${this.enemyName}`);
            this.disposition.playerCharacters.forEach((adventurer) => {
                if (adventurer.parameters.health === 0)
                    adventurer.addToParameter('health', 1);
            });
            if (isPartyWon === true) {
                this.closeScene({ defeatedEnemy: this.enemyName, droppedItems: this.droppedItems });
                player_1.playerInstance.updateAchievement('Weak, but not useless', undefined, undefined, 1);
            }
            else {
                this.closeScene({ droppedItems: this.droppedItems });
            }
        }
    }
    exports.default = BattleScene;
});
//# sourceMappingURL=battle.js.map