import Item from "../../entities/item.js";
import { ContainerOverlayScene } from "./containerOverlayScene.js";
import { containerSlotNames } from "../../data/items/itemSlots.js";
import prepareLog from "../../helpers/logger.js";
export class TraderOverlayScene extends ContainerOverlayScene {
    constructor() {
        super({ key: 'ShopOverlay' });
    }
    _moveItemFromSlotToSlot(fromSlot, toSlot, swappingIsFinished = true) {
        var _a, _b, _c, _d, _e;
        if ((fromSlot.includes('container') && (this.itemsMap.has(toSlot) && this.itemsMap.get(toSlot).item.itemId !== this.itemsMap.get(fromSlot).item.itemId)) ||
            (toSlot.includes('container') && (this.itemsMap.has(toSlot) && this.itemsMap.get(toSlot).item.itemId !== this.itemsMap.get(fromSlot).item.itemId)) ||
            (fromSlot.includes('container') && toSlot.includes('container')) ||
            ((_a = this.itemsMap.get(fromSlot)) === null || _a === void 0 ? void 0 : _a.item.itemId) === 'copper-pieces' ||
            ((_b = this.itemsMap.get(toSlot)) === null || _b === void 0 ? void 0 : _b.item.itemId) === 'copper-pieces' ||
            ((_c = this.itemsMap.get(fromSlot)) === null || _c === void 0 ? void 0 : _c.item.sellPrice) === 0) {
            console.log(...prepareLog(`Trying to move !!forbidden combination, ??animating ??item ??back to ??${fromSlot}`));
            super._moveItemFromSlotToSlot(fromSlot, fromSlot, swappingIsFinished);
            return;
        }
        if ((fromSlot.includes('container') === false && toSlot.includes('container') === false)) {
            super._moveItemFromSlotToSlot(fromSlot, toSlot, swappingIsFinished);
            return;
        }
        const [playerMoneySlot, playerMoneyItemR] = (_d = [...this.itemsMap].find(([slotName, item]) => slotName.includes('backpack') && item.item.itemId === 'copper-pieces')) !== null && _d !== void 0 ? _d : [];
        const [traderMoneySlot, traderMoneyItemR] = (_e = [...this.itemsMap].find(([slotName, item]) => slotName.includes('container') && item.item.itemId === 'copper-pieces')) !== null && _e !== void 0 ? _e : [];
        const playerMoney = playerMoneyItemR ? playerMoneyItemR === null || playerMoneyItemR === void 0 ? void 0 : playerMoneyItemR.item.quantity : 0;
        const traderMoney = traderMoneyItemR ? traderMoneyItemR === null || traderMoneyItemR === void 0 ? void 0 : traderMoneyItemR.item.quantity : 0;
        const tradingItemR = this.itemsMap.get(fromSlot);
        if (fromSlot.includes('container')) {
            console.log(...prepareLog(`Trying to buy !!${tradingItemR.item.itemId}`));
            const totalItemCost = tradingItemR.item.buyPrice;
            if (playerMoney >= totalItemCost) {
                console.log(...prepareLog('Player has !!enough money to buy it'));
                this._changeItemQuantity(playerMoneySlot, playerMoney - totalItemCost);
                if (traderMoneyItemR) {
                    console.log(...prepareLog('Trader !!has money in the inventory'));
                    this._changeItemQuantity(traderMoneySlot, traderMoney + totalItemCost);
                }
                else {
                    console.log(...prepareLog(`Trader !!doesn't have money in the inventory`));
                    const newMoneyItem = new Item('copper-pieces', totalItemCost);
                    const emptyTraderSlot = this._getEmptyTraderSlot();
                    if (emptyTraderSlot) {
                        this._createItemRepresentation(newMoneyItem, emptyTraderSlot);
                    }
                    else {
                        throw 'Emergency! No slot to create money on trader!';
                    }
                }
                super._moveItemFromSlotToSlot(fromSlot, toSlot, true);
            }
            else {
                console.log(...prepareLog('Player !!does !!not !!have !!enough money to buy it'));
                super._moveItemFromSlotToSlot(fromSlot, fromSlot);
                return;
            }
        }
        if (toSlot.includes('container')) {
            console.log('selling');
            const totalItemCost = tradingItemR.item.sellPrice * tradingItemR.item.quantity;
            if (traderMoney >= totalItemCost) {
                console.log('enough money');
                this._changeItemQuantity(traderMoneySlot, traderMoney - totalItemCost);
                if (playerMoneyItemR) {
                    this._changeItemQuantity(playerMoneySlot, playerMoney + totalItemCost);
                }
                else {
                    const newMoneyItem = new Item('copper-pieces', totalItemCost);
                    const emptyPlayerSlot = this.player.getEmptyBackpackSlot();
                    if (emptyPlayerSlot) {
                        this._createItemRepresentation(newMoneyItem, emptyPlayerSlot);
                        this.player.addItemToInventory(newMoneyItem, newMoneyItem.quantity, emptyPlayerSlot);
                    }
                    else {
                        throw 'Emergency! No slot to create money on player!';
                    }
                }
                super._moveItemFromSlotToSlot(fromSlot, toSlot, swappingIsFinished);
            }
            else {
                console.log(...prepareLog('!!Trader does not have enough money to buy item!'));
                super._moveItemFromSlotToSlot(fromSlot, fromSlot, swappingIsFinished);
                return;
            }
        }
    }
    _getEmptyTraderSlot() {
        return containerSlotNames.find(slotToCheck => this.itemsMap.get(slotToCheck) === undefined);
    }
    _showItemDescriptionAndActions(slot) {
        if (slot.includes('container')) {
            super._showItemDescriptionAndActions(slot, false);
        }
        else {
            super._showItemDescriptionAndActions(slot, true);
        }
    }
    _getTraderSlotByItemId(itemId) {
        for (let [slot, itemFromMap] of this.itemsMap.entries()) {
            if (itemFromMap.item.itemId === itemId && slot.includes('container')) {
                return slot;
            }
        }
        return undefined;
    }
    _itemDoubleClickCallback(itemCurrentSlot) {
        const tradingItemR = this.itemsMap.get(itemCurrentSlot);
        if (itemCurrentSlot.includes('container') === false) {
            if (tradingItemR.item.stackable === true) {
                const slotOfExistingItem = this._getTraderSlotByItemId(tradingItemR.item.itemId);
                if (slotOfExistingItem) {
                    console.log(...prepareLog(`Item !!is !!stackable and already at !!${slotOfExistingItem}`));
                    this._moveItemFromSlotToSlot(itemCurrentSlot, slotOfExistingItem);
                    return;
                }
            }
            const emptyTraderSlot = this._getEmptyTraderSlot();
            if (emptyTraderSlot) {
                console.log(...prepareLog(`Item !!isn't !!stackable and there is empty trader slot`));
                this._moveItemFromSlotToSlot(itemCurrentSlot, emptyTraderSlot, true);
            }
            else {
                console.log(...prepareLog(`Item !!isn't !!stackable and there is !!no empty trader slot`));
                this._moveItemFromSlotToSlot(itemCurrentSlot, itemCurrentSlot);
            }
        }
        else {
            if (tradingItemR.item.stackable === true) {
                const existingItem = this.player.getInventoryItemById(tradingItemR.item.itemId);
                if (existingItem) {
                    console.log(...prepareLog(`Item !!is !!stackable and already at !!${existingItem.slot}`));
                    this._moveItemFromSlotToSlot(itemCurrentSlot, existingItem.slot);
                    return;
                }
            }
            const emptyBackPackSlot = this.player.getEmptyBackpackSlot();
            if (emptyBackPackSlot) {
                console.log(...prepareLog(`Item !!isn't !!stackable and there is empty backpack slot`));
                this._moveItemFromSlotToSlot(itemCurrentSlot, emptyBackPackSlot, true);
            }
            else {
                console.log(...prepareLog(`Item !!isn't !!stackable and there is !!no empty backpack slot`));
                this._moveItemFromSlotToSlot(itemCurrentSlot, itemCurrentSlot);
            }
        }
    }
    _drawContainerSlotsAndTitle() {
        super._drawContainerSlotsAndTitle(false);
    }
}
//# sourceMappingURL=traderOverlayScene.js.map