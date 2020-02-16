import EnemyEntity from "./enemyEntity.js";
import {Disposition} from "./disposition.js";
import {enemyActions} from "../actionsAndEffects/enemyActions.js";
import {Adventurer} from "./adventurer";

export class Wizard extends EnemyEntity {
    private weapon: { damage: number };

    constructor() {
        super();
        this.spriteParams = {texture: 'wizard-idle', frame: 0, width: 231, height: 190, flip: true};
        this.level = 1;
        this.availableActions = ['wildRush', 'enrage'];
        this.name = 'Wizard';
        this.baseCharacteristics = {
            attributes: {
                strength: 10,
                agility: 3,
                intelligence: 10,
                initiative: Phaser.Math.Between(10, 20)
            },
            parameters: {
                health: 10,
                currentHealth: 10,
                manna: 10,
                currentManna: 10,
                energy: 5,
                currentEnergy: 5,
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
        this.animations.idle = 'wizard_idle';
        this.animations.attack = 'wizard_attack2';
        this.animations.buff = 'wizard_attack1';
        this.animations.death = 'wizard_death';
        this.animations.hit = 'wizard_hit';
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
