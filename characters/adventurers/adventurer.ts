import GeneralCharacter from "../generalCharacter.js";
import Item from "../../entities/item.js";
import item from "../../entities/item.js";

export class Adventurer extends GeneralCharacter {
    private inventory: Map<Slots, Item>;

    constructor() {
        super();
        this.inventory = new Map();
        this.actionPointsBase = {physical: 1, magical: 1, misc: 1};
        this.actionPointsIncrement = {physical: 1, magical: 1, misc: 1};
    }

    public getInventoryItemById(itemId: string, excludeBackpack = false): Item | undefined {
        const entreeFound =  [...this.inventory.entries()].find(([slot, existingItem]) => {
            if (excludeBackpack) {
                return existingItem.itemId === itemId && slot.includes('backpack') === false;
            }else {
                return existingItem.itemId === itemId;
            }
        });
        if (entreeFound) return entreeFound[1];
    }

    private _getInventorySlotOfItem(item: Item): Slots | undefined {
        for (let [slot, inventoryItem] of this.inventory.entries()) {
            if (inventoryItem === item) {
                return slot;
            }
        }
        return undefined;
    }

    public getEmptyBackpackSlot(): Slots | undefined {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const testedSlot = `backpack${i}_${j}` as Slots;
                if (this.inventory.get(testedSlot) === undefined) {
                    return testedSlot;
                }
            }
        }
        return undefined;
    }

    private _addItemToEmptyBackpackSlot(item): Item | undefined {
        const emptyBackpackSlot = this.getEmptyBackpackSlot();
        if (emptyBackpackSlot) {
            return this._addItemToTheMap(emptyBackpackSlot, item);
        } else {
            return undefined;
        }
    }

    private _addItemToTheMap(slot: Slots, item: Item): item {
        if (slot === undefined || item === undefined) {
            throw `Error while adding ${item} to ${slot}`;
        }
        this.inventory.set(slot, item);
        this.applyItems();
        return item;
    }

    public addItemToInventory(passedItem: string | Item, quantity = 1, slot?: Slots): Item | undefined {
        if (typeof quantity !== "number") throw 'addItemToInventory received quantity not as a number';
        const item = typeof passedItem === "string" ? new Item(passedItem, quantity) : passedItem;

        if (slot !== undefined) {
            const itemInTheSlot = this.inventory.get(slot);
            if (itemInTheSlot) {
                if (itemInTheSlot.itemId !== item.itemId) {
                    throw `Trying to add ${item.itemId} to the ${slot} slot where ${itemInTheSlot.itemId} resides`;
                } else {
                    if (item.stackable === true) {
                        itemInTheSlot.quantity += quantity;
                    } else {
                        throw `Trying to stack un-stackable item ${item.itemId} in the slot ${slot}`;
                    }
                }
            } else {
                return this._addItemToTheMap(slot, item);
            }
        } else {
            if (item.stackable === true) {
                const sameItemInInventory = this.getInventoryItemById(item.itemId);
                if (sameItemInInventory) {
                    sameItemInInventory.quantity += quantity;
                } else {
                    return this._addItemToEmptyBackpackSlot(item);
                }
            } else {
                return this._addItemToEmptyBackpackSlot(item);
            }
        }
    }

    public removeItemFromInventory(item: Item, quantity = 1) {
        const slotOfItem = this._getInventorySlotOfItem(item);
        if (slotOfItem === undefined || quantity > item.quantity) {
            throw 'Trying to remove non-existing item (or more items than possessed)!'
        }
        if (quantity === item.quantity || !item.quantity) {
            this.inventory.delete(slotOfItem);
        } else {
            item.quantity -= quantity;
        }
        this.applyItems();
    }

    public getAttackDamage() {
        const rightHandDamage = this.inventory.get('rightHand')?.specifics?.damage || 1;
        const leftHandDamage = this.inventory.get('leftHand')?.specifics?.damage / 2 || 0;
        return Math.round(rightHandDamage + leftHandDamage);
    }

    public getAllItems() {
        return this.inventory;
    }

    public getItemInSlot(slotName: Slots) {
        return this.inventory.get(slotName);
    }

    public applyItems() {
        Object.entries(this.characteristicsModifiers).forEach(([group, value]) => {
            Object.entries(value).forEach(([subgroup, value]) => {
                this.characteristicsModifiers[group][subgroup] = this.characteristicsModifiers[group][subgroup].filter(modifier => !modifier.source.itemId);
            })
        });
        this.inventory.forEach((item, slot) => {
            if (slot.includes('backpack') === false) {
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

    public getAvailableActions() {
        let combinedActions = [...this.availableActions];
        this.inventory.forEach((item, slot) => {
            if (item.specifics?.additionalActions && !slot.includes('backpack')) {
                combinedActions = [...combinedActions, ...item.specifics?.additionalActions]
            }
        });
        return [...new Set(combinedActions)];
    }

    public startRound(roundType: 'preparation' | 'battle') {
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
