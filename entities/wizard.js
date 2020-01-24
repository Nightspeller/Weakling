import EnemyEntity from "./enemyEntity.js";
import { enemyActions } from "../actionsAndEffects/enemyActions.js";
export class Wizard extends EnemyEntity {
    constructor() {
        super();
        this.spriteParams = { texture: 'wizard-idle', frame: 0 };
        this.level = 1;
        this.actions = ['wildRush', 'enrage'];
        this.name = 'Wizard';
        this.baseCharacteristics = {
            attributes: {
                strength: 10,
                agility: 10,
                intelligence: 1,
                initiative: Phaser.Math.Between(0, 30)
            },
            parameters: {
                health: 20,
                currentHealth: 20,
                manna: 0,
                currentManna: 0,
                energy: 10,
                currentEnergy: 10,
            },
            defences: {
                armor: 12,
                dodge: 10,
                fireResistance: 0,
                coldResistance: 5,
                acidResistance: 0,
                electricityResistance: 0,
                poisonResistance: 0,
                magicResistance: 0,
            }
        };
        this.currentCharacteristics = JSON.parse(JSON.stringify(this.baseCharacteristics));
        this.actionPoints = {
            physical: 1,
            magical: 0,
            misc: 0
        };
        this.animations.idle = 'wizard_idle';
        this.animations.attack = 'wizard_attack2';
        this.animations.buff = 'wizard_attack1';
    }
    async aiTurn(disposition) {
        const currentAICharacter = this;
        const alivePlayers = disposition.playerCharacters.filter(char => char.isAlive);
        const randomAlivePlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
        const action = this.currentEffects.some(effect => effect.effectId === 'intelligenceDown') ? 'wildRush' : 'enrage';
        if (action === 'enrage') {
            await this.playCastAnimation(disposition.scene);
            disposition.processAction(currentAICharacter, currentAICharacter, enemyActions[action]);
        }
        else {
            await this.playMeleeAttackAnimation(disposition.scene, randomAlivePlayer);
            disposition.processAction(currentAICharacter, randomAlivePlayer, enemyActions[action]);
        }
    }
    startRound(roundType) {
        this.actionPoints.physical + 1 <= 3 ? this.actionPoints.physical++ : this.actionPoints.physical = 3;
        this.actionPoints.misc + 1 <= 3 ? this.actionPoints.misc++ : this.actionPoints.misc = 3;
    }
    getAttackDamage() {
        return 3;
    }
    // TODO: rewrite and move back to general entity
    draw(scene, x, y) {
        var _a, _b, _c;
        (_a = this.battleImage) === null || _a === void 0 ? void 0 : _a.destroy();
        // @ts-ignore
        (_b = this.makingTurnGraphics) === null || _b === void 0 ? void 0 : _b.destroy();
        // @ts-ignore
        (_c = this.actionPointsGroup) === null || _c === void 0 ? void 0 : _c.clear(true, true);
        if (this.isAlive) {
            this.battleImage = scene.add.sprite(x + 48, y + 48, this.spriteParams.texture, this.spriteParams.frame).setDepth(1);
            this.battleImage.anims.play(this.animations.idle, true);
        }
        else {
            this.battleImage = scene.add.sprite(x, y, 'dead-character');
        }
        // @ts-ignore
        this.drawHealthAndManna(scene, x, y);
        // @ts-ignore
        this.drawEffectsIcons(scene, x, y);
        this.battleImage.setDisplaySize(231, 190).setInteractive()
            .on('pointerdown', (pointer, localX, localY, event) => this.drawEntityInfo(scene, x < 400 ? x + 96 : x - 32 * 8, 32));
        this.battleImage.flipX = true;
        return this.battleImage;
    }
}
//# sourceMappingURL=wizard.js.map