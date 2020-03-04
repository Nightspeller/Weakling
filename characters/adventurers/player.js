import { Adventurer } from "./adventurer.js";
import { elderInstance } from "./elder.js";
import { DEBUG } from "../../config/constants.js";
export class Player extends Adventurer {
    constructor() {
        super();
        this.spriteParams = { texture: 'weakling', frame: null, width: 96, height: 96 };
        this.worldImageSpriteParams = { texture: 'jeremy-green', frame: 1 };
        this.baseCharacteristics = {
            attributes: {
                strength: 10,
                agility: 10,
                intelligence: 10,
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
        if (DEBUG) {
            this.baseCharacteristics.parameters.health = 50;
            this.baseCharacteristics.parameters.currentHealth = 50;
            this.addItemToInventory('copper-pieces', 1000);
            this.addItemToInventory('allpowerful-necklace');
            this.addItemToInventory('leather-armor', 1, 'body');
            this.addItemToInventory('trap-kit');
            this.addItemToInventory('spirit-sword');
            this.addItemToInventory('smoldering-ring', 1, 'ringRight');
            /*            this.addItemToInventory('pinky-pie-sapling');
                        this.addItemToInventory('yellow-fingers-sapling');
                        this.addItemToInventory('primula-sapling');
                        this.addItemToInventory('rocky-rose-sapling');
                        this.addItemToInventory('rope-belt', 1, 'belt');
                        this.addItemToInventory('fancy-belt');`
                        this.addItemToInventory('minor-healing-potion');
                        this.addItemToInventory('minor-healing-potion', 2);
                        this.addItemToInventory('leather-armor', 1, 'body');
                        this.addItemToInventory('wooden-sword-weapon', 1, 'rightHand');
                        this.addItemToInventory('wooden-sword-weapon');
                        this.addItemToInventory('rangers-hat');*/
        }
        this.addBaseModifiers();
        this.applyItems();
        this.name = 'Weakling';
        this.availableActions = ['meditate', 'accessInventory', /*'drinkWeakHealthPotion', */ 'swiftMind', 'fireProtection', 'drainingSoil', 'warmUp', 'meleeAttack'];
        this.party = [this];
        if (DEBUG)
            this.party = [this, elderInstance];
    }
    getAvailableActions() {
        let combinedActions = [...this.availableActions];
        this.inventory.forEach(item => {
            var _a, _b;
            if (((_a = item.specifics) === null || _a === void 0 ? void 0 : _a.additionalActions) && !item.currentSlot.includes('backpack')) {
                combinedActions = [...combinedActions, ...(_b = item.specifics) === null || _b === void 0 ? void 0 : _b.additionalActions];
            }
        });
        return [...new Set(combinedActions)];
    }
}
export const playerInstance = new Player();
//# sourceMappingURL=player.js.map