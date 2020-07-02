import GeneralEnemy from "./generalEnemy.js";
import Action from "../../entities/action.js";
export class GhostKnight extends GeneralEnemy {
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
        this.spriteParams = { texture: 'ghost-knight-idle', frame: 0, width: 300, height: 300, flip: true };
        this.level = 3;
        this.availableActions = ['meleeAttack', 'fear'];
        this.name = 'Ghost of the Knight';
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
        this.animations.idle = 'ghost-knight_idle';
        this.animations.move = 'ghost-knight_move';
        this.animations.attack = 'ghost-knight_attack2';
        this.animations.buff = 'ghost-knight_attack1';
        this.animations.death = 'ghost-knight_death';
        this.animations.hit = 'ghost-knight_hit';
    }
    getAttackDamage() {
        return 3;
    }
}
//# sourceMappingURL=ghost-knight.js.map