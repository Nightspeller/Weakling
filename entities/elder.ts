import {Adventurer} from "./adventurer.js";

export class Elder extends Adventurer {
    constructor() {
        super();
        this.spriteParams = {texture: 'elder', frame: null};
        this.baseCharacteristics = {
            attributes: {
                strength: 5,
                agility: 10,
                intelligence: 15,
                initiative: Phaser.Math.Between(0, 30)
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
        this.currentCharacteristics = JSON.parse(JSON.stringify(this.baseCharacteristics));
        this.addItemToInventory('rope-belt').currentSlot = 'belt';
        this.addItemToInventory('leather-armor').currentSlot = 'body';
        this.addItemToInventory('wooden-sword-weapon').currentSlot = 'rightHand';
        this.addItemToInventory('copper-pieces', 15);
        this.name = 'Elder Guarthh';

        this.availableActions = ['meditate', 'accessInventory', /*'drinkWeakHealthPotion', */'swiftMind', 'fireProtection', 'drainingSoil', 'adjustArmor', 'warmUp', 'meleeAttack'];

        this.currentEffects = [];

        this.recalculateCharacteristics();
    }
}

export const elderInstance = new Elder();