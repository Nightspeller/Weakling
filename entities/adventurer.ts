import GeneralEntity from "./generalEntity.js";
import Item from "./item.js";

export class Adventurer extends GeneralEntity {
    public inventory: Item[];

    constructor() {
        super();
        this.inventory = [];
    }

    public addItemToInventory(passedItem: string | Item, quantity = 1, slot?: string): Item {
        let item;
        if (typeof passedItem === "string") {
            item = new Item(passedItem, quantity);
        } else {
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

    public putItemInSlot(item: Item, slot: string) {
        if (!item.slot.includes(slot) && !slot.includes('backpack') && !slot.includes('quickSlot')) {
            throw `Trying to put ${item.itemId} into ${slot} slot, while item can only be at ${item.slot}`
        }
        const existingItemInSlot = this.inventory.find(inventoryItem => inventoryItem.currentSlot === slot);
        if (existingItemInSlot) {
            this.moveItemToBackpack(item);
        }
        item.currentSlot = slot;

        this.applyItems();
        return item;
    }

    public moveItemToBackpack(item: Item) {
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

    public removeItemFromInventory(item: Item, quantity = 1) {
        if (!this.inventory.includes(item) || quantity > item.quantity) {
            throw 'Trying to remove non-existing item (or more items than possessed)!'
        }
        if (quantity === item.quantity || !item.quantity) {
            this.inventory = this.inventory.filter(existingItem => existingItem !== item)
        } else {
            item.quantity -= quantity;
        }
    }

    public getAttackDamage() {
        const rightHandDamage = this.inventory.find(item => item.currentSlot === 'rightHand')?.specifics?.damage || 1;
        const leftHandDamage = this.inventory.find(item => item.currentSlot === 'leftHand')?.specifics?.damage / 2 || 0;
        return rightHandDamage + leftHandDamage;
    }

    public applyItems() {
        Object.entries(this.characteristicsModifiers).forEach(([group, value]) => {
            Object.entries(value).forEach(([subgroup, value]) => {
                this.characteristicsModifiers[group][subgroup] = this.characteristicsModifiers[group][subgroup].filter(modifier => !modifier.source.itemId);
            })
        });
        this.inventory.forEach(item => {
            if (!item.currentSlot.includes('backpack')) {
                item.specifics?.additionalCharacteristics?.forEach(char => {
                    Object.entries(char).forEach(([targetString, targetValue]) => {
                        const target = targetString.split('.');
                        this.characteristicsModifiers[target[0]][target[1]].push({
                            value: targetValue,
                            source: item
                        });
                    });
                })
            }
        });
        this.recalculateCharacteristics();
    }

    public startRound(roundType: 'preparation' | 'battle') {
        super.startRound(roundType);
        if (roundType === 'preparation') {
            this.isAlive = true;
            this.recalculateCharacteristics();
            if (this.currentCharacteristics.parameters.currentHealth === 0) {
                this.currentCharacteristics.parameters.currentHealth = 1;
            }
        }
        if (this.isAlive) {
            this.actedThisRound = false;
            this.actionPoints.physical + 1 <= 3 ? this.actionPoints.physical++ : this.actionPoints.physical = 3;
            this.actionPoints.magical + 1 <= 3 ? this.actionPoints.magical++ : this.actionPoints.magical = 3;
            this.actionPoints.misc + 1 <= 3 ? this.actionPoints.misc++ : this.actionPoints.misc = 3;
        }
    }

    freeze() {
    }

    destroy() {
    }
}
