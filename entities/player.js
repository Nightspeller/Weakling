import GeneralEntity from "./generalEntity.js";
import { items } from "../actionsAndEffects/items.js";
export class Player extends GeneralEntity {
    constructor() {
        super();
        this.spriteParams = { texture: 'weakling', frame: null };
        this.speed = 200;
        this.worldImageSpriteParams = { texture: 'martha-pink', frame: 1 };
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
        this.currentCharacteristics = JSON.parse(JSON.stringify(this.baseCharacteristics));
        this.inventory = [];
        this.addItemToInventory('rope-belt').currentSlot = 'belt';
        this.addItemToInventory('fancy-belt');
        this.addItemToInventory('allpowerful-necklace');
        this.addItemToInventory('minor-healing-potion');
        this.addItemToInventory('minor-healing-potion', 2);
        this.addItemToInventory('leather-armor').currentSlot = 'body';
        this.addItemToInventory('wooden-sword-weapon').currentSlot = 'rightHand';
        this.addItemToInventory('wooden-sword-weapon');
        this.addItemToInventory('rangers-hat');
        this.addItemToInventory('copper-pieces', 240);
        this.actionPoints = {
            physical: 0,
            magical: 0,
            misc: 0
        };
        this.name = 'Weakling';
        this.availableActions = ['meditate', 'accessInventory', /*'drinkWeakHealthPotion', */ 'swiftMind', 'fireProtection', 'drainingSoil', 'setTrap', 'adjustArmor', 'warmUp', 'meleeAttack'];
        this.currentEffects = [];
        this.recalculateCharacteristics();
    }
    addItemToInventory(itemId, quantity = 1) {
        // todo? might have to do deep copy...
        const item = { ...items[itemId] };
        if (item.stackable) {
            item.quantity = quantity;
            const existingItem = this.inventory.find(existingItem => existingItem.itemId === item.itemId);
            if (existingItem) {
                existingItem.quantity += item.quantity;
                return existingItem;
            }
        }
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const testedSlot = `backpack${i}_${j}`;
                if (!this.inventory.find(item => item.currentSlot === testedSlot)) {
                    item.currentSlot = testedSlot;
                    this.inventory.push(item);
                    return item;
                }
            }
        }
        return null;
    }
    removeItemFromInventory(item, quantity = 1) {
        if (!this.inventory.includes(item) || quantity > item.quantity) {
            throw 'Trying to remove non-existing item (or more items than possessed)!';
        }
        if (quantity === item.quantity || !item.quantity) {
            this.inventory = this.inventory.filter(existingItem => existingItem !== item);
        }
        else {
            item.quantity -= quantity;
        }
    }
    getAttackDamage() {
        var _a, _b, _c, _d;
        const rightHandDamage = ((_b = (_a = this.inventory.find(item => item.currentSlot === 'rightHand')) === null || _a === void 0 ? void 0 : _a.specifics) === null || _b === void 0 ? void 0 : _b.damage) || 1;
        const leftHandDamage = ((_d = (_c = this.inventory.find(item => item.currentSlot === 'leftHand')) === null || _c === void 0 ? void 0 : _c.specifics) === null || _d === void 0 ? void 0 : _d.damage) / 2 || 0;
        return rightHandDamage + leftHandDamage;
    }
    applyItems() {
        this.inventory.forEach(item => {
            var _a, _b;
            if (!item.currentSlot.includes('backpack')) {
                (_b = (_a = item.specifics) === null || _a === void 0 ? void 0 : _a.additionalCharacteristics) === null || _b === void 0 ? void 0 : _b.forEach(char => {
                    Object.entries(char).forEach(([targetString, targetValue]) => {
                        const target = targetString.split('.');
                        this.currentCharacteristics[target[0]][target[1]] += targetValue;
                    });
                });
            }
        });
    }
    startRound(roundType) {
        this.actionPoints.physical + 1 <= 3 ? this.actionPoints.physical++ : this.actionPoints.physical = 3;
        this.actionPoints.magical + 1 <= 3 ? this.actionPoints.magical++ : this.actionPoints.magical = 3;
        this.actionPoints.misc + 1 <= 3 ? this.actionPoints.misc++ : this.actionPoints.misc = 3;
    }
    freeze() { }
    prepareWorldImage(scene, x, y) {
        const worldImage = scene.physics.add.sprite(x, y, this.worldImageSpriteParams.texture, this.worldImageSpriteParams.frame).setOrigin(0, 0);
        worldImage.anims.play("idle_down");
        const keys = scene.input.keyboard.addKeys('W,S,A,D,left,right,up,down,space');
        scene['inventory'].showOpenIcon(this);
        worldImage.body.setCollideWorldBounds(true);
        return { worldImage, keys };
    }
    update(worldImage, keys) {
        const up = keys.up.isDown || keys['W'].isDown;
        const down = keys.down.isDown || keys['S'].isDown;
        const right = keys.right.isDown || keys['D'].isDown;
        const left = keys.left.isDown || keys['A'].isDown;
        worldImage.body.setVelocity(0);
        if (this.lastCursor && !up && !down && !right && !left) {
            worldImage.play(`idle_${this.lastCursor}`, true);
        }
        if (up) {
            worldImage.body.setVelocityY(-this.speed);
        }
        else if (down) {
            worldImage.body.setVelocityY(this.speed);
        }
        if (right) {
            worldImage.body.setVelocityX(this.speed);
        }
        else if (left) {
            worldImage.body.setVelocityX(-this.speed);
        }
        if (up || (up && right) || (up && left)) {
            worldImage.play('walk_up', true);
            this.lastCursor = 'up';
        }
        else if (down || (down && right) || (down && left)) {
            worldImage.play('walk_down', true);
            this.lastCursor = 'down';
        }
        if (right && !up && !down) {
            worldImage.play('walk_right', true);
            this.lastCursor = 'right';
        }
        else if (left && !up && !down) {
            worldImage.play('walk_left', true);
            this.lastCursor = 'left';
        }
    }
    destroy() { }
}
export const playerInstance = new Player();
//# sourceMappingURL=player.js.map