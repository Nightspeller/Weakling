import GeneralCharacter from "../generalCharacter.js";
import Item from "../../entities/item.js";
import prepareLog from "../../helpers/logger.js";
import {GeneralLocation} from "../../locations/generalLocation.js";

export class Adventurer extends GeneralCharacter {
    private inventory: Map<Slots, Item>;
    public xp: number;
    public experienceTable: number[];

    constructor() {
        super();
        this.inventory = new Map();
        this.actionPointsBase = {physical: 1, magical: 1, misc: 1};
        this.actionPointsIncrement = {physical: 1, magical: 1, misc: 1};
        this.experienceTable = [0, 10, 20, 40, 80, 160, 320, 480, 640, 800];
        this.xp = 0;
        this.level = 1;
    }

    public updateInventory(newInventoryMap: Map<Slots, Item>) {
        this.inventory = newInventoryMap;
        this.applyItems();
    }

    public getInventoryItemById(itemId: string, excludeBackpack = false): { slot: Slots, item: Item } | undefined {
        const entreeFound = [...this.inventory.entries()].find(([slot, existingItem]) => {
            if (excludeBackpack) {
                return existingItem.itemId === itemId && slot.includes('backpack') === false;
            } else {
                return existingItem.itemId === itemId;
            }
        });
        if (entreeFound) return {slot: entreeFound[0], item: entreeFound[1]};
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

    private _addItemToEmptyBackpackSlot(item: Item): Item | undefined {
        const emptyBackpackSlot = this.getEmptyBackpackSlot();
        if (emptyBackpackSlot) {
            return this._addItemToTheMap(emptyBackpackSlot, item);
        } else {
            console.log(...prepareLog(`Trying to add !!${item.itemId} to !!empty !!backpack !!slot, but no such slots exist. Make sure to properly !!handle !!the !!returned '!!undefined'!`));
            return undefined;
        }
    }

    private _addItemToTheMap(slot: Slots, item: Item): Item {
        if (slot === undefined || item === undefined) {
            throw `Error while adding ${item} to ${slot}`;
        }
        this.inventory.set(slot, item);
        this.applyItems();
        return item;
    }

    public addItemToInventory(item: string | Item, quantity = 1, slot?: Slots, sceneForDropping?: GeneralLocation): Item | undefined {
        if (typeof quantity !== "number") throw 'addItemToInventory received quantity not as a number';
        if (typeof item === "string") {
            item = new Item(item, quantity);
        } else {
            quantity = item.quantity;
        }

        if (slot !== undefined) {
            const itemInTheSlot = this.inventory.get(slot);
            if (itemInTheSlot) {
                if (itemInTheSlot.itemId !== item.itemId) {
                    throw `Trying to add ${item.itemId} to the ${slot} slot where ${itemInTheSlot.itemId} resides`;
                } else {
                    if (item.stackable === true) {
                        itemInTheSlot.quantity += quantity;
                        return itemInTheSlot;
                    } else {
                        throw `Trying to stack un-stackable item ${item.itemId} in the slot ${slot}`;
                    }
                }
            } else {
                return this._addItemToTheMap(slot, item);
            }
        } else {
            if (item.stackable === true) {
                const sameItemInInventory = this.getInventoryItemById(item.itemId)?.item;
                if (sameItemInInventory) {
                    sameItemInInventory.quantity += quantity;
                    return sameItemInInventory;
                }
            }
            const itemAdded = this._addItemToEmptyBackpackSlot(item);
            if (itemAdded) {
                return itemAdded
            } else {
                if (sceneForDropping) {
                    sceneForDropping.createDroppedItem(item);
                } else {
                    return undefined;
                }
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
        let combinedActions = [];
        this.inventory.forEach((item, slot) => {
            if (item.specifics?.additionalActions && !slot.includes('backpack')) {
                combinedActions = [...combinedActions, ...item.specifics?.additionalActions]
            }
        });
        combinedActions = [...combinedActions, ...this.availableActions];
        return [...new Set(combinedActions)];
    }

    public startRound(roundType: 'preparation' | 'battle') {
        super.startRound(roundType);
        if (roundType === 'preparation') {
            this.isAlive = true;
            this.actedThisRound = false;
            this.applyItems();
        }
    }

    public addXp(xp: number) {
        this.xp += xp;
        let matchingLevel = 1;
        for (let i = 9; i >= 0; i--) {
            if (this.xp > this.experienceTable[i]) {
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

    protected levelUp() {
        //console.log(...prepareLog(`Leveling up ??${this.name} from level ${this.level} to ${this.level + 1}`));
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
    }

    freeze() {
    }

    destroy() {
    }
}
