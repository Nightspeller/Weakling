import EnemyEntity from "./enemyEntity.js";
import { enemyActions } from "../actionsAndEffects/enemyActions.js";
export class Boar extends EnemyEntity {
    constructor() {
        super();
        this.spriteParams = { texture: 'boar-avatar', frame: null };
        this.level = 1;
        this.actions = ['wildRush', 'enrage'];
        this.name = 'Wild Boar';
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
}
//# sourceMappingURL=boar.js.map