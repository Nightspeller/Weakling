import GeneralEntity from "./generalEntity.js";
import { items } from "../actionsAndEffects/items.js";
export class Adventurer extends GeneralEntity {
    constructor() {
        super();
        this.inventory = [];
        this.name = 'Adventurer';
    }
    addItemToInventory(itemId, quantity = 1) {
        // todo? might have to do deep copy...
        const item = { ...items[itemId] };
        item.quantity = quantity;
        if (item.stackable) {
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
        if (roundType === 'preparation') {
            this.isAlive = true;
            this.actionPoints = {
                physical: 0,
                magical: 0,
                misc: 0
            };
            if (this.currentCharacteristics.parameters.currentHealth === 0) {
                this.currentCharacteristics.parameters.currentHealth = 1;
            }
            this.currentEffects = [];
            this.recalculateCharacteristics();
        }
        if (this.isAlive) {
            this.actedThisRound = false;
            this.actionPoints.physical + 1 <= 3 ? this.actionPoints.physical++ : this.actionPoints.physical = 3;
            this.actionPoints.magical + 1 <= 3 ? this.actionPoints.magical++ : this.actionPoints.magical = 3;
            this.actionPoints.misc + 1 <= 3 ? this.actionPoints.misc++ : this.actionPoints.misc = 3;
        }
    }
    startTurn(scene) {
    }
    freeze() {
    }
    destroy() {
    }
}
//# sourceMappingURL=adventurer.js.map