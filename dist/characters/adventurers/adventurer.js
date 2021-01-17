define(["require", "exports", "../generalCharacter", "../../entities/item", "../../helpers/logger", "../../data/items/itemSlots"], function (require, exports, generalCharacter_1, item_1, logger_1, itemSlots_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Adventurer extends generalCharacter_1.default {
        constructor() {
            super();
            this.inventory = new Map();
            this.actionPointsBase = { physical: 1, magical: 1, misc: 1 };
            this.actionPointsIncrement = { physical: 1, magical: 1, misc: 1 };
            this.experienceTable = [0, 10, 20, 40, 80, 160, 320, 480, 640, 800];
            this.xp = 0;
            this.level = 1;
        }
        updateInventory(newInventoryMap) {
            // needed to avoid bug with moving same item inside the doll
            const itemsToAdd = new Map();
            itemSlots_1.playerSlotNames.forEach((slot) => {
                const itemInNewInventory = newInventoryMap.get(slot);
                const itemInCurrentInventory = this.inventory.get(slot);
                if (itemInCurrentInventory !== itemInNewInventory) {
                    if (itemInNewInventory === undefined) {
                        this.removeItemFromInventory(itemInCurrentInventory, itemInCurrentInventory.quantity);
                    }
                    else {
                        itemsToAdd.set(slot, itemInNewInventory);
                    }
                }
            });
            itemsToAdd.forEach((item, slot) => this._addItemToTheMap(slot, item));
        }
        getInventoryItemById(itemId, excludeBackpack = false) {
            const entreeFound = [...this.inventory.entries()].find(([slot, existingItem]) => {
                if (excludeBackpack) {
                    return existingItem.itemId === itemId && slot.includes('backpack') === false;
                }
                return existingItem.itemId === itemId;
            });
            if (entreeFound) {
                return {
                    slot: entreeFound[0],
                    item: entreeFound[1],
                };
            }
            return undefined;
        }
        _getInventorySlotOfItem(item) {
            // eslint-disable-next-line no-restricted-syntax
            for (const [slot, inventoryItem] of this.inventory.entries()) {
                if (inventoryItem === item) {
                    return slot;
                }
            }
            return undefined;
        }
        getEmptyBackpackSlot() {
            for (let i = 0; i < 5; i += 1) {
                for (let j = 0; j < 5; j += 1) {
                    const testedSlot = `backpack${i}_${j}`;
                    if (this.inventory.get(testedSlot) === undefined) {
                        return testedSlot;
                    }
                }
            }
            return undefined;
        }
        _addItemToEmptyBackpackSlot(item) {
            const emptyBackpackSlot = this.getEmptyBackpackSlot();
            if (emptyBackpackSlot) {
                return this._addItemToTheMap(emptyBackpackSlot, item);
            }
            console.log(...logger_1.default(`Trying to add !!${item.itemId} to !!empty !!backpack !!slot, but no such slots exist. Make sure to properly !!handle !!the !!returned '!!undefined'!`));
            return undefined;
        }
        _addItemToTheMap(slot, item) {
            if (slot === undefined || item === undefined) {
                throw new Error(`Error while adding ${item} to ${slot}`);
            }
            this.inventory.set(slot, item);
            this._processItemModifiers(slot, item, true);
            return item;
        }
        addItemToInventory(item, quantity = 1, slot, sceneForDropping) {
            if (typeof quantity !== 'number')
                throw new Error('addItemToInventory received quantity not as a number');
            if (typeof item === 'string') {
                item = new item_1.default(item, quantity);
            }
            else {
                quantity = item.quantity;
            }
            if (slot !== undefined) {
                const itemInTheSlot = this.inventory.get(slot);
                if (itemInTheSlot) {
                    if (itemInTheSlot.itemId !== item.itemId) {
                        throw new Error(`Trying to add ${item.itemId} to the ${slot} slot where ${itemInTheSlot.itemId} resides`);
                    }
                    else {
                        if (item.stackable === true) {
                            itemInTheSlot.quantity += quantity;
                            return itemInTheSlot;
                        }
                        throw new Error(`Trying to stack un-stackable item ${item.itemId} in the slot ${slot}`);
                    }
                }
                else {
                    return this._addItemToTheMap(slot, item);
                }
            }
            else {
                if (item.stackable === true) {
                    const sameItemInInventory = this.getInventoryItemById(item.itemId)?.item;
                    if (sameItemInInventory) {
                        sameItemInInventory.quantity += quantity;
                        return sameItemInInventory;
                    }
                }
                const itemAdded = this._addItemToEmptyBackpackSlot(item);
                if (itemAdded) {
                    return itemAdded;
                }
                if (sceneForDropping) {
                    sceneForDropping.createDroppedItem(item);
                }
                else {
                    throw new Error('Do we have a problem with adding item to the inventory?');
                }
                return undefined;
            }
        }
        removeItemFromInventory(item, quantity = 1) {
            const slotOfItem = this._getInventorySlotOfItem(item);
            if (slotOfItem === undefined || quantity > item.quantity) {
                throw new Error('Trying to remove non-existing item (or more items than possessed)!');
            }
            if (quantity === item.quantity || !item.quantity) {
                this.inventory.delete(slotOfItem);
            }
            else {
                item.quantity -= quantity;
            }
            this._processItemModifiers(slotOfItem, item, false);
        }
        getAllItems() {
            return this.inventory;
        }
        getItemInSlot(slotName) {
            return this.inventory.get(slotName);
        }
        _processItemModifiers(slot, item, add) {
            if (slot.includes('backpack') === false) {
                item.specifics?.additionalCharacteristics?.forEach((char) => {
                    Object.entries(char)
                        .forEach(([targetName, targetValue]) => {
                        if (targetName === 'weaponDamage' && slot === 'leftHand')
                            targetValue = Math.round(targetValue / 2);
                        if (add) {
                            this.setCharacteristicModifier(targetName, {
                                value: targetValue,
                                source: item,
                            });
                        }
                        else {
                            this.removeCharacteristicModifier(targetName, item);
                        }
                    });
                });
            }
        }
        getAvailableActions() {
            let combinedActions = [];
            this.inventory.forEach((item, slot) => {
                if (item.specifics?.additionalActions && !slot.includes('backpack')) {
                    combinedActions = [...combinedActions, ...item.specifics?.additionalActions];
                }
            });
            combinedActions = [...combinedActions, ...this.availableActions];
            return [...new Set(combinedActions)];
        }
        startRound(roundType) {
            super.startRound(roundType);
            if (roundType === 'preparation') {
                this.isAlive = true;
                this.actedThisRound = false;
            }
        }
        addXp(xp) {
            this.xp += xp;
            let matchingLevel = 1;
            for (let i = 9; i >= 0; i -= 1) {
                if (this.xp >= this.experienceTable[i]) {
                    matchingLevel = i + 1;
                    break;
                }
            }
            if (matchingLevel !== this.level) {
                this.readyForLevelUp = true;
            }
        }
        levelUp(strengthAddition = 0, agilityAddition = 0, intelligenceAddition = 0) {
            console.log(...logger_1.default(`Leveling up ??${this.name} from level ${this.level} to ${this.level + 1}`));
            this.level += 1;
            this.setCharacteristicModifier('strength', {
                source: 'base',
                value: this.characteristicsModifiers.strength.find((mod) => mod.source === 'base').value + strengthAddition,
            });
            this.setCharacteristicModifier('agility', {
                source: 'base',
                value: this.characteristicsModifiers.agility.find((mod) => mod.source === 'base').value + agilityAddition,
            });
            this.setCharacteristicModifier('intelligence', {
                source: 'base',
                value: this.characteristicsModifiers.intelligence.find((mod) => mod.source === 'base').value + intelligenceAddition,
            });
            this.readyForLevelUp = false;
        }
        freeze() { }
        destroy() { }
    }
    exports.default = Adventurer;
});
//# sourceMappingURL=adventurer.js.map