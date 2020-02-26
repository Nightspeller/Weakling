import {Adventurer} from "./adventurer.js";

export class Elder extends Adventurer {
    constructor() {
        super();
        this.spriteParams = {texture: 'elder', frame: null, width: 96, height: 96};
        this.baseCharacteristics = {
            attributes: {
                strength: 5,
                agility: 10,
                intelligence: 15,
                initiative: Phaser.Math.Between(0, 30) + 10
            },
            parameters: {
                health: 15,
                currentHealth: 15,
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

/*        this.addItemToInventory('rope-belt').currentSlot = 'belt';
        this.addItemToInventory('leather-armor').currentSlot = 'body';
        this.addItemToInventory('wooden-sword-weapon').currentSlot = 'rightHand';
        this.addItemToInventory('copper-pieces', 15);*/
        this.name = 'Elder Guarthh';

        this.availableActions = ['meditate', 'accessInventory', /*'drinkWeakHealthPotion', */'dustStorm', 'healingTouch', 'drainingSoil', 'adjustArmor', 'warmUp', 'meleeAttack'];
    }

    public getAttackDamage() {
        return 5;
    }
}

export const elderInstance = new Elder();
