import EnemyEntity from "./enemyEntity.js";
import {Disposition} from "./disposition.js";
import {enemyActions} from "../actionsAndEffects/enemyActions.js";

export class Boar extends EnemyEntity {
    private weapon: { damage: number };

    constructor() {
        super();
        this.spriteParams = {texture: 'boar-avatar', frame: null, width: 96, height: 96};
        this.level = 1;
        this.availableActions = ['wildRush', 'enrage'];
        this.name = 'Wild Boar';
        this.baseCharacteristics = {
            attributes: {
                strength: 10,
                agility: 10,
                intelligence: 3,
                initiative: Phaser.Math.Between(20, 30)
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
        this.addBaseModifiers();
        this.actionPoints = {physical: 1, magical: 0, misc: 0};
    }

    public async aiTurn(disposition: Disposition) {
        const currentAICharacter = this;
        const alivePlayers = disposition.playerCharacters.filter(char => char.isAlive);
        const randomAlivePlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
        const action = this.currentEffects.some(effect => effect.effectId === 'intelligenceDown') ? 'wildRush' : 'enrage';
        if (action === 'enrage') {
            await disposition.scene.playCastAnimation(currentAICharacter);
            disposition.processAction(currentAICharacter, currentAICharacter, enemyActions[action]);
        } else {
            await disposition.scene.playMeleeAttackAnimation(currentAICharacter, randomAlivePlayer);
            disposition.processAction(currentAICharacter, randomAlivePlayer, enemyActions[action]);
        }
    }

    public startRound(roundType: 'preparation' | 'battle') {
        this.actedThisRound = false;
        this.actionPoints.physical + 1 <= 3 ? this.actionPoints.physical++ : this.actionPoints.physical = 3;
        this.actionPoints.misc + 1 <= 3 ? this.actionPoints.misc++ : this.actionPoints.misc = 3;
    }

    public getAttackDamage() {
        return 3;
    }
}
