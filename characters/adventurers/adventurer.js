import GeneralCharacter from "../generalCharacter.js";
import Item from "../../entities/item.js";
import prepareLog from "../../helpers/logger.js";
export class Adventurer extends GeneralCharacter {
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
        this.inventory = newInventoryMap;
        this.applyItems();
    }
    getInventoryItemById(itemId, excludeBackpack = false) {
        const entreeFound = [...this.inventory.entries()].find(([slot, existingItem]) => {
            if (excludeBackpack) {
                return existingItem.itemId === itemId && slot.includes('backpack') === false;
            }
            else {
                return existingItem.itemId === itemId;
            }
        });
        if (entreeFound)
            return { slot: entreeFound[0], item: entreeFound[1] };
    }
    _getInventorySlotOfItem(item) {
        for (let [slot, inventoryItem] of this.inventory.entries()) {
            if (inventoryItem === item) {
                return slot;
            }
        }
        return undefined;
    }
    getEmptyBackpackSlot() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
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
        else {
            console.log(...prepareLog(`Trying to add !!${item.itemId} to !!empty !!backpack !!slot, but no such slots exist. Make sure to properly !!handle !!the !!returned '!!undefined'!`));
            return undefined;
        }
    }
    _addItemToTheMap(slot, item) {
        if (slot === undefined || item === undefined) {
            throw `Error while adding ${item} to ${slot}`;
        }
        this.inventory.set(slot, item);
        this.applyItems();
        return item;
    }
    addItemToInventory(item, quantity = 1, slot, sceneForDropping) {
        var _a;
        if (typeof quantity !== "number")
            throw 'addItemToInventory received quantity not as a number';
        if (typeof item === "string") {
            item = new Item(item, quantity);
        }
        else {
            quantity = item.quantity;
        }
        if (slot !== undefined) {
            const itemInTheSlot = this.inventory.get(slot);
            if (itemInTheSlot) {
                if (itemInTheSlot.itemId !== item.itemId) {
                    throw `Trying to add ${item.itemId} to the ${slot} slot where ${itemInTheSlot.itemId} resides`;
                }
                else {
                    if (item.stackable === true) {
                        itemInTheSlot.quantity += quantity;
                        return itemInTheSlot;
                    }
                    else {
                        throw `Trying to stack un-stackable item ${item.itemId} in the slot ${slot}`;
                    }
                }
            }
            else {
                return this._addItemToTheMap(slot, item);
            }
        }
        else {
            if (item.stackable === true) {
                const sameItemInInventory = (_a = this.getInventoryItemById(item.itemId)) === null || _a === void 0 ? void 0 : _a.item;
                if (sameItemInInventory) {
                    sameItemInInventory.quantity += quantity;
                    return sameItemInInventory;
                }
            }
            const itemAdded = this._addItemToEmptyBackpackSlot(item);
            if (itemAdded) {
                return itemAdded;
            }
            else {
                if (sceneForDropping) {
                    sceneForDropping.createDroppedItem(item);
                }
                else {
                    return undefined;
                }
            }
        }
    }
    removeItemFromInventory(item, quantity = 1) {
        const slotOfItem = this._getInventorySlotOfItem(item);
        if (slotOfItem === undefined || quantity > item.quantity) {
            throw 'Trying to remove non-existing item (or more items than possessed)!';
        }
        if (quantity === item.quantity || !item.quantity) {
            this.inventory.delete(slotOfItem);
        }
        else {
            item.quantity -= quantity;
        }
        this.applyItems();
    }
    getAttackDamage() {
        var _a, _b, _c, _d;
        const rightHandDamage = ((_b = (_a = this.inventory.get('rightHand')) === null || _a === void 0 ? void 0 : _a.specifics) === null || _b === void 0 ? void 0 : _b.damage) || 1;
        const leftHandDamage = ((_d = (_c = this.inventory.get('leftHand')) === null || _c === void 0 ? void 0 : _c.specifics) === null || _d === void 0 ? void 0 : _d.damage) / 2 || 0;
        return Math.round(rightHandDamage + leftHandDamage);
    }
    getAllItems() {
        return this.inventory;
    }
    getItemInSlot(slotName) {
        return this.inventory.get(slotName);
    }
    applyItems() {
        Object.entries(this.characteristicsModifiers).forEach(([group, value]) => {
            Object.entries(value).forEach(([subgroup, value]) => {
                this.characteristicsModifiers[group][subgroup] = this.characteristicsModifiers[group][subgroup].filter(modifier => !modifier.source.itemId);
            });
        });
        this.inventory.forEach((item, slot) => {
            var _a, _b;
            if (slot.includes('backpack') === false) {
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
    getAvailableActions() {
        let combinedActions = [];
        this.inventory.forEach((item, slot) => {
            var _a, _b;
            if (((_a = item.specifics) === null || _a === void 0 ? void 0 : _a.additionalActions) && !slot.includes('backpack')) {
                combinedActions = [...combinedActions, ...(_b = item.specifics) === null || _b === void 0 ? void 0 : _b.additionalActions];
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
            this.applyItems();
        }
    }
    addXp(xp) {
        this.xp += xp;
        let matchingLevel = 1;
        for (let i = 9; i >= 0; i--) {
            if (this.xp >= this.experienceTable[i]) {
                //console.log(`for ${this.xp}xp, value in table ${this.experienceTable[i]}, the index is ${i}`)
                matchingLevel = i + 1;
                break;
            }
        }
        //console.log(matchingLevel, this.level);
        if (matchingLevel !== this.level) {
            const levelDifference = matchingLevel - this.level;
            for (let i = 0; i < levelDifference; i++) {
                this.levelUp();
            }
        }
    }
    levelUp() {
        console.log(...prepareLog(`Leveling up ??${this.name} from level ${this.level} to ${this.level + 1}`));
        this.level++;
        this.baseCharacteristics.attributes.strength++;
        this.baseCharacteristics.attributes.agility++;
        this.baseCharacteristics.attributes.intelligence++;
        this.baseCharacteristics.parameters.health++;
        this.baseCharacteristics.parameters.currentHealth = this.baseCharacteristics.parameters.health;
        this.baseCharacteristics.parameters.manna++;
        this.baseCharacteristics.parameters.currentManna = this.baseCharacteristics.parameters.manna;
        this.baseCharacteristics.parameters.energy++;
        this.baseCharacteristics.parameters.currentEnergy = this.baseCharacteristics.parameters.energy;
        this.addBaseModifiers();
    }
    freeze() {
    }
    destroy() {
    }
}
//# sourceMappingURL=adventurer.js.map