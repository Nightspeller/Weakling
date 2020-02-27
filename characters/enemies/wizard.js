import GeneralEnemy from "./generalEnemy.js";
import Action from "../../entities/action.js";
export class Wizard extends GeneralEnemy {
    constructor() {
        super();
        this.aiTurn = (disposition) => {
            const alivePlayers = disposition.playerCharacters.filter(char => char.isAlive);
            const randomAlivePlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
            const action = this.currentEffects.some(effect => effect.effectId === 'intelligenceUp') ? 'magicMissile' : 'swiftMind';
            if (action === 'swiftMind') {
                return { action: new Action(action, this), targets: [this] };
            }
            else {
                return { action: new Action(action, this), targets: [randomAlivePlayer] };
            }
        };
        this.spriteParams = { texture: 'wizard-idle', frame: 0, width: 231, height: 190, flip: true };
        this.level = 1;
        this.availableActions = ['magicMissile', 'swiftMind'];
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
        this.actionPointsBase = { physical: 0, magical: 1, misc: 0 };
        this.actionPointsIncrement = { physical: 0, magical: 1, misc: 1 };
        this.animations.idle = 'wizard_idle';
        this.animations.attack = 'wizard_attack2';
        this.animations.buff = 'wizard_attack1';
        this.animations.death = 'wizard_death';
        this.animations.hit = 'wizard_hit';
    }
    getAttackDamage() {
        return 3;
    }
}
//# sourceMappingURL=wizard.js.map