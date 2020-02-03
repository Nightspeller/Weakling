import EnemyEntity from "./enemyEntity.js";
import { enemyActions } from "../actionsAndEffects/enemyActions.js";
export class Wizard extends EnemyEntity {
    constructor() {
        super();
        this.spriteParams = { texture: 'wizard-idle', frame: 0, width: 231, height: 190, flip: true };
        this.level = 1;
        this.availableActions = ['wildRush', 'enrage'];
        this.name = 'Wizard';
        this.baseCharacteristics = {
            attributes: {
                strength: 10,
                agility: 1,
                intelligence: 1,
                initiative: Phaser.Math.Between(0, 30)
            },
            parameters: {
                health: 20,
                currentHealth: 1,
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
        this.actionPoints = { physical: 1, magical: 0, misc: 0 };
        this.animations.idle = 'wizard_idle';
        this.animations.attack = 'wizard_attack2';
        this.animations.buff = 'wizard_attack1';
        this.animations.death = 'wizard_death';
        this.animations.hit = 'wizard_hit';
    }
    async aiTurn(disposition) {
        const currentAICharacter = this;
        const alivePlayers = disposition.playerCharacters.filter(char => char.isAlive);
        const randomAlivePlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
        const action = this.currentEffects.some(effect => effect.effectId === 'intelligenceDown') ? 'wildRush' : 'enrage';
        if (action === 'enrage') {
            await disposition.scene.playCastAnimation(currentAICharacter);
            disposition.processAction(currentAICharacter, currentAICharacter, enemyActions[action]);
        }
        else {
            await disposition.scene.playMeleeAttackAnimation(currentAICharacter, randomAlivePlayer);
            disposition.processAction(currentAICharacter, randomAlivePlayer, enemyActions[action]);
        }
    }
    startRound(roundType) {
        this.actedThisRound = false;
        this.actionPoints.physical + 1 <= 3 ? this.actionPoints.physical++ : this.actionPoints.physical = 3;
        this.actionPoints.misc + 1 <= 3 ? this.actionPoints.misc++ : this.actionPoints.misc = 3;
    }
    getAttackDamage() {
        return 3;
    }
}
//# sourceMappingURL=wizard.js.map