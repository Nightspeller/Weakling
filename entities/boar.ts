import EnemyEntity from "./enemyEntity.js";

export class Boar extends EnemyEntity {
    constructor() {
        super();
        this.spriteParams = {texture: 'boar-avatar', frame: null};
        this.level = 1;
        this.actions = ['wildRush', 'enrage'];
        this.name = 'Wild Boar';
        this.baseCharacteristics = {
            attributes: {
                strength: 10,
                agility: 10,
                intelligence: 1,
                initiative: Phaser.Math.Between(0,30)
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
                resistance: {
                    fire: 0,
                    cold: 5,
                    acid: 0,
                    electricity: 0,
                    poison: 0,
                    magic: 0,
                }
            }
        };
        this.currentCharacteristics = JSON.parse(JSON.stringify(this.baseCharacteristics));
        this.actionPoints = {
            physical: 2,
            magical: 0,
            misc: 1
        };
    }
}