import GeneralEnemy from "./generalEnemy.js";
import Action from "../../entities/action.js";
export class Boar extends GeneralEnemy {
    constructor() {
        super();
        this.aiTurn = (disposition) => {
            const alivePlayers = disposition.playerCharacters.filter(char => char.isAlive);
            const randomAlivePlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
            const action = this.currentEffects.some(effect => effect.effectId === 'intelligenceDown') ? 'wildRush' : 'enrage';
            if (action === 'enrage') {
                return { action: new Action(action, this), targets: [this] };
            }
            else {
                return { action: new Action(action, this), targets: [randomAlivePlayer] };
            }
        };
        this.spriteParams = { texture: 'boar-avatar', frame: null, width: 96, height: 96 };
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
        this.actionPointsBase = { physical: 1, magical: 0, misc: 0 };
        this.actionPointsIncrement = { physical: 1, magical: 0, misc: 1 };
    }
    getAttackDamage() {
        return 3;
    }
}
//# sourceMappingURL=boar.js.map