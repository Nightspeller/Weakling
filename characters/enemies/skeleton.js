import GeneralEnemy from "./generalEnemy.js";
import Action from "../../entities/action.js";
export class Skeleton extends GeneralEnemy {
    constructor() {
        super();
        this.aiTurn = (disposition) => {
            const alivePlayers = disposition.playerCharacters.filter(char => char.isAlive);
            const randomAlivePlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
            let action = 'meleeAttack';
            if (this.actionPoints.magical >= 2)
                action = 'fear';
            return { action: new Action(action, this), targets: [randomAlivePlayer] };
        };
        this.spriteParams = { texture: 'skeleton-idle', frame: 0, width: 280, height: 280, flip: true };
        this.level = 1;
        this.availableActions = ['meleeAttack', 'fear'];
        this.name = 'Skeleton';
        this.baseCharacteristics = {
            attributes: {
                strength: 20,
                agility: 20,
                intelligence: 10,
                initiative: Phaser.Math.Between(10, 20)
            },
            parameters: {
                health: 30,
                currentHealth: 30,
                manna: 10,
                currentManna: 10,
                energy: 20,
                currentEnergy: 20,
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
        this.actionPointsBase = { physical: 1, magical: 0, misc: 0 };
        this.actionPointsIncrement = { physical: 1, magical: 1, misc: 0 };
        this.animations.idle = 'skeleton_idle';
        this.animations.move = 'skeleton_move';
        this.animations.attack = 'skeleton_attack2';
        this.animations.buff = 'skeleton_attack1';
        this.animations.death = 'skeleton_death';
        this.animations.hit = 'skeleton_hit';
    }
    getAttackDamage() {
        return 3;
    }
}
//# sourceMappingURL=skeleton.js.map