import {Adventurer} from "./adventurer.js";
import {DEBUG} from "../../config/constants.js";

export class Eyeball extends Adventurer {
    constructor() {
        super();
        this.spriteParams = {texture: 'eyeball-idle', frame: null, width: 300, height: 300};
        this.baseCharacteristics = {
            attributes: {
                strength: 5,
                agility: 10,
                intelligence: 15,
                initiative: Phaser.Math.Between(0, 30) + 10
            },
            parameters: {
                health: 5,
                currentHealth: 5,
                manna: 5,
                currentManna: 5,
                energy: 10,
                currentEnergy: 10,
            },
            defences: {
                armor: 10,
                dodge: 10,
                fireResistance: 10,
                coldResistance: 10,
                acidResistance: 10,
                electricityResistance: 10,
                poisonResistance: 10,
                magicResistance: 10,
            }
        };

        if (DEBUG) {
            this.baseCharacteristics.parameters.health = 50;
            this.baseCharacteristics.parameters.currentHealth = 50;
        }

        this.name = 'Eyeball';

        this.availableActions = ['meditate', 'dustStorm', 'healingTouch', 'drainingSoil', 'adjustArmor', 'warmUp', 'meleeAttack'];

        this.animations.idle = 'eyeball_idle';
        this.animations.move = 'eyeball_idle';
        this.animations.attack = 'eyeball_attack1';
        this.animations.buff = 'eyeball_buff';
        this.animations.death = 'eyeball_death';
        this.animations.hit = 'eyeball_hit';
    }

    public getAttackDamage() {
        return 5;
    }
}

export const eyeballInstance = new Eyeball();
