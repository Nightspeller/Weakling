import GeneralCharacter from "../generalCharacter.js";
import Item from "../../entities/item.js";
export class Adventurer extends GeneralCharacter {
    constructor() {
        super();
        this.inventory = [];
        this.actionPointsBase = { physical: 1, magical: 1, misc: 1 };
        this.actionPointsIncrement = { physical: 1, magical: 1, misc: 1 };
    }
    addItemToInventory(passedItem, quantity = 1, slot) {
        if (typeof quantity !== "number")
            throw 'addItemToInventory received quantity not as a number';
        let item;
        if (typeof passedItem === "string") {
            item = new Item(passedItem, quantity);
        }
        else {
            item = passedItem;
        }
        if (item.stackable) {
            const existingItem = this.inventory.find(existingItem => existingItem.itemId === item.itemId);
            if (existingItem) {
                existingItem.quantity += item.quantity;
                return existingItem;
            }
        }
        if (slot) {
            this.inventory.push(item);
            return this.putItemInSlot(item, slot);
        }
        this.inventory.push(item);
        return this.moveItemToBackpack(item);
    }
    putItemInSlot(item, slot) {
        if (!item.slot.includes(slot) && !slot.includes('backpack') && !slot.includes('quickSlot')) {
            throw `Trying to put ${item.itemId} into ${slot} slot, while item can only be at ${item.slot}`;
        }
        const existingItemInSlot = this.inventory.find(inventoryItem => inventoryItem.currentSlot === slot);
        if (existingItemInSlot) {
            this.moveItemToBackpack(item);
        }
        item.currentSlot = slot;
        this.applyItems();
        return item;
    }
    moveItemToBackpack(item) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const testedSlot = `backpack${i}_${j}`;
                if (!this.inventory.find(item => item.currentSlot === testedSlot)) {
                    item.currentSlot = testedSlot;
                    return item;
                }
            }
        }
        //todo: do something about inventory overflow
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
        return Math.round(rightHandDamage + leftHandDamage);
    }
    applyItems() {
        Object.entries(this.characteristicsModifiers).forEach(([group, value]) => {
            Object.entries(value).forEach(([subgroup, value]) => {
                this.characteristicsModifiers[group][subgroup] = this.characteristicsModifiers[group][subgroup].filter(modifier => !modifier.source.itemId);
            });
        });
        this.inventory.forEach(item => {
            var _a, _b;
            if (!item.currentSlot.includes('backpack')) {
                (_b = (_a = item.specifics) === null || _a === void 0 ? void 0 : _a.additionalCharacteristics) === null || _b === void 0 ? void 0 : _b.forEach(char => {
                    Object.entries(char).forEach(([targetString, targetValue]) => {
                        const target = targetString.split('.');
                        this.characteristicsModifiers[target[0]][target[1]].push({
                            value: targetValue,
                            source: item
                        });
                    });
                });
            }
        });
        this.recalculateCharacteristics();
    }
    startRound(roundType) {
        super.startRound(roundType);
        if (roundType === 'preparation') {
            this.isAlive = true;
            this.applyItems();
        }
    }
    freeze() {
    }
    destroy() {
    }
}
//# sourceMappingURL=adventurer.js.map