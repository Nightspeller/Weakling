import EnemyEntity from "./enemyEntity.js";
import {Disposition} from "./disposition.js";
import {enemyActions} from "../actionsAndEffects/enemyActions.js";
import {Adventurer} from "./adventurer";

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
    }

    public aiTurn = (disposition: Disposition): {action: Action, target: Adventurer | EnemyEntity} => {
        const alivePlayers = disposition.playerCharacters.filter(char => char.isAlive);
        const randomAlivePlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
        const action = this.currentEffects.some(effect => effect.effectId === 'intelligenceDown') ? 'wildRush' : 'enrage';
        if (action === 'enrage') {
            return {action: enemyActions[action], target: this}
        } else {
            return {action: enemyActions[action], target: randomAlivePlayer}
        }
    };

    public startRound(roundType: 'preparation' | 'battle') {
        super.startRound(roundType);
        if (roundType === 'preparation') {
            this.actionPoints = {physical: 1, magical: 0, misc: 0};
        }
        this.actedThisRound = false;
        this.actionPoints.physical + 1 <= 3 ? this.actionPoints.physical++ : this.actionPoints.physical = 3;
        this.actionPoints.misc + 1 <= 3 ? this.actionPoints.misc++ : this.actionPoints.misc = 3;
    }

    public getAttackDamage() {
        return 3;
    }
}
