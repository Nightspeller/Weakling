import Item from "../../entities/item.js";
import { ContainerOverlayScene } from "./containerOverlayScene.js";
import { backpackSlotNames, containerSlotNames } from "../../data/items/itemSlots.js";
import prepareLog from "../../helpers/logger.js";
export class TraderOverlayScene extends ContainerOverlayScene {
    constructor() {
        super({ key: 'TraderOverlay' });
    }
    _moveItemFromSlotToSlot(fromSlot, toSlot, quantity) {
        var _a, _b, _c, _d, _e;
        if ((fromSlot.includes('container') && (this.itemsMap.has(toSlot) && this.itemsMap.get(toSlot).item.itemId !== this.itemsMap.get(fromSlot).item.itemId)) ||
            (toSlot.includes('container') && (this.itemsMap.has(toSlot) && this.itemsMap.get(toSlot).item.itemId !== this.itemsMap.get(fromSlot).item.itemId)) ||
            (fromSlot.includes('container') && toSlot.includes('container')) ||
            ((_a = this.itemsMap.get(fromSlot)) === null || _a === void 0 ? void 0 : _a.item.itemId) === 'copper-pieces' ||
            ((_b = this.itemsMap.get(toSlot)) === null || _b === void 0 ? void 0 : _b.item.itemId) === 'copper-pieces' ||
            ((_c = this.itemsMap.get(fromSlot)) === null || _c === void 0 ? void 0 : _c.item.sellPrice) === 0) {
            console.log(...prepareLog(`Trying to move !!forbidden combination, ??animating ??item ??back to ??${fromSlot}`));
            super._moveItemFromSlotToSlot(fromSlot, fromSlot);
            return;
        }
        if (fromSlot.includes('container') === false && toSlot.includes('container') === false) {
            super._moveItemFromSlotToSlot(fromSlot, toSlot, quantity);
            return;
        }
        const [playerMoneySlot, playerMoneyItemR] = (_d = [...this.itemsMap].find(([slotName, item]) => slotName.includes('backpack') && item.item.itemId === 'copper-pieces')) !== null && _d !== void 0 ? _d : [];
        const [traderMoneySlot, traderMoneyItemR] = (_e = [...this.itemsMap].find(([slotName, item]) => slotName.includes('container') && item.item.itemId === 'copper-pieces')) !== null && _e !== void 0 ? _e : [];
        const playerMoney = playerMoneyItemR ? playerMoneyItemR === null || playerMoneyItemR === void 0 ? void 0 : playerMoneyItemR.item.quantity : 0;
        const traderMoney = traderMoneyItemR ? traderMoneyItemR === null || traderMoneyItemR === void 0 ? void 0 : traderMoneyItemR.item.quantity : 0;
        const tradingItemR = this.itemsMap.get(fromSlot);
        if (quantity === undefined)
            quantity = tradingItemR.item.quantity;
        if (fromSlot.includes('container')) {
            console.log(...prepareLog(`Trying to buy ??${quantity} !!${tradingItemR.item.itemId}`));
            const totalItemCost = tradingItemR.item.buyPrice * quantity;
            if (playerMoney >= totalItemCost) {
                console.log(...prepareLog('Player has !!enough money to buy it'));
                super._moveItemFromSlotToSlot(fromSlot, toSlot, quantity);
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
            }
            else {
                console.log(...prepareLog('??Player has !!not !!enough money to buy it'));
                super._moveItemFromSlotToSlot(fromSlot, fromSlot);
                return;
            }
        }
        if (toSlot.includes('container')) {
            console.log(...prepareLog(`Trying to sell ??${quantity} !!${tradingItemR.item.itemId}`));
            const totalItemCost = tradingItemR.item.sellPrice * quantity;
            if (traderMoney >= totalItemCost) {
                console.log(...prepareLog('Trader has !!enough money to buy it'));
                super._moveItemFromSlotToSlot(fromSlot, toSlot, quantity);
                this._changeItemQuantity(traderMoneySlot, traderMoney - totalItemCost);
                if (playerMoneyItemR) {
                    this._changeItemQuantity(playerMoneySlot, playerMoney + totalItemCost);
                }
                else {
                    const newMoneyItem = new Item('copper-pieces', totalItemCost);
                    const emptyPlayerSlot = this._getFirstEmptySlot(backpackSlotNames);
                    if (emptyPlayerSlot) {
                        this._createItemRepresentation(newMoneyItem, emptyPlayerSlot);
                    }
                    else {
                        throw 'Emergency! No slot to create money on player!';
                    }
                }
            }
            else {
                console.log(...prepareLog('??Trader has !!not !!enough money to buy item!'));
                super._moveItemFromSlotToSlot(fromSlot, fromSlot, quantity);
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
    _itemDoubleClickCallback(itemCurrentSlot) {
        if (itemCurrentSlot.includes('container') === false) {
            this._moveItemFromSlotToFirstPossible(itemCurrentSlot, containerSlotNames, 1);
        }
        else {
            this._moveItemFromSlotToFirstPossible(itemCurrentSlot, backpackSlotNames, 1);
        }
    }
    _drawContainerSlotsAndTitle() {
        super._drawContainerSlotsAndTitle(false);
    }
}
//# sourceMappingURL=traderOverlayScene.js.map