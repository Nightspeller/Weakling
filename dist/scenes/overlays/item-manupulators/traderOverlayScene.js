define(["require", "exports", "../../../entities/item", "./containerOverlayScene", "../../../data/items/itemSlots", "../../../helpers/logger"], function (require, exports, item_1, containerOverlayScene_1, itemSlots_1, logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TraderOverlayScene extends containerOverlayScene_1.default {
        constructor() {
            super({ key: 'TraderOverlay' });
        }
        create() {
            super.create();
            this.setCurrentCopperAmount();
            this.updatePriceTags();
        }
        setCurrentCopperAmount() {
            this.itemsMap.forEach((itemRepresentation, currentSlot) => {
                if (currentSlot.startsWith('containerSlot') && itemRepresentation.item.itemId === 'copper-pieces') {
                    this.npcMoney = itemRepresentation.item.quantity;
                }
                else if (itemRepresentation.item.itemId === 'copper-pieces') {
                    this.playerMoney = itemRepresentation.item.quantity;
                }
            });
        }
        updatePriceTags() {
            this.itemsMap.forEach((itemRepresentation, currentSlot) => {
                if (currentSlot.startsWith('containerSlot')) {
                    itemRepresentation.setPriceTag(this.playerMoney, 'player');
                }
                else {
                    itemRepresentation.setPriceTag(this.npcMoney, 'npc');
                }
            });
        }
        _moveItemFromSlotToSlot(fromSlot, toSlot, quantity) {
            if ((fromSlot.includes('container') && (this.itemsMap.has(toSlot) && this.itemsMap.get(toSlot).item.itemId !== this.itemsMap.get(fromSlot).item.itemId))
                || (toSlot.includes('container') && (this.itemsMap.has(toSlot) && this.itemsMap.get(toSlot).item.itemId !== this.itemsMap.get(fromSlot).item.itemId))
                || (fromSlot.includes('container') && toSlot.includes('container'))
                || this.itemsMap.get(fromSlot)?.item.itemId === 'copper-pieces'
                || this.itemsMap.get(toSlot)?.item.itemId === 'copper-pieces'
                || this.itemsMap.get(fromSlot)?.item.sellPrice === 0) {
                console.log(...logger_1.default(`Trying to move !!forbidden combination, ??animating ??item ??back to ??${fromSlot}`));
                super._moveItemFromSlotToSlot(fromSlot, fromSlot);
                return;
            }
            if (fromSlot.includes('container') === false && toSlot.includes('container') === false) {
                super._moveItemFromSlotToSlot(fromSlot, toSlot, quantity);
                return;
            }
            const [playerMoneySlot, playerMoneyItemR] = [...this.itemsMap].find(([slotName, item]) => slotName.includes('backpack') && item.item.itemId === 'copper-pieces') ?? [];
            const [traderMoneySlot, traderMoneyItemR] = [...this.itemsMap].find(([slotName, item]) => slotName.includes('container') && item.item.itemId === 'copper-pieces') ?? [];
            const playerMoney = playerMoneyItemR ? playerMoneyItemR?.item.quantity : 0;
            const traderMoney = traderMoneyItemR ? traderMoneyItemR?.item.quantity : 0;
            const tradingItemR = this.itemsMap.get(fromSlot);
            if (quantity === undefined)
                quantity = tradingItemR.item.quantity;
            if (fromSlot.includes('container')) {
                console.log(...logger_1.default(`Trying to buy ??${quantity} !!${tradingItemR.item.itemId}`));
                const totalItemCost = tradingItemR.item.buyPrice * quantity;
                if (playerMoney >= totalItemCost) {
                    console.log(...logger_1.default('Player has !!enough money to buy it'));
                    super._moveItemFromSlotToSlot(fromSlot, toSlot, quantity);
                    this._changeItemQuantity(playerMoneySlot, playerMoney - totalItemCost);
                    this.playerMoney = (playerMoney - totalItemCost);
                    this.npcMoney = (traderMoney + totalItemCost);
                    this.updatePriceTags();
                    if (traderMoneyItemR) {
                        console.log(...logger_1.default('Trader !!has money in the inventory'));
                        this._changeItemQuantity(traderMoneySlot, traderMoney + totalItemCost);
                    }
                    else {
                        console.log(...logger_1.default('Trader !!doesn\'t have money in the inventory'));
                        const newMoneyItem = new item_1.default('copper-pieces', totalItemCost);
                        const emptyTraderSlot = this._getEmptyTraderSlot();
                        if (emptyTraderSlot) {
                            this._createItemRepresentation(newMoneyItem, emptyTraderSlot);
                        }
                        else {
                            throw new Error('Emergency! No slot to create money on trader!');
                        }
                    }
                }
                else {
                    console.log(...logger_1.default('??Player has !!not !!enough money to buy it'));
                    super._moveItemFromSlotToSlot(fromSlot, fromSlot);
                    return;
                }
            }
            if (toSlot.includes('container')) {
                console.log(...logger_1.default(`Trying to sell ??${quantity} !!${tradingItemR.item.itemId}`));
                const totalItemCost = tradingItemR.item.sellPrice * quantity;
                if (traderMoney >= totalItemCost) {
                    console.log(...logger_1.default('Trader has !!enough money to buy it'));
                    super._moveItemFromSlotToSlot(fromSlot, toSlot, quantity);
                    this._changeItemQuantity(traderMoneySlot, traderMoney - totalItemCost);
                    this.npcMoney = (traderMoney - totalItemCost);
                    this.playerMoney = (playerMoney + totalItemCost);
                    this.updatePriceTags();
                    if (playerMoneyItemR) {
                        this._changeItemQuantity(playerMoneySlot, playerMoney + totalItemCost);
                    }
                    else {
                        const newMoneyItem = new item_1.default('copper-pieces', totalItemCost);
                        const emptyPlayerSlot = this._getFirstEmptySlot(itemSlots_1.backpackSlotNames);
                        if (emptyPlayerSlot) {
                            this._createItemRepresentation(newMoneyItem, emptyPlayerSlot);
                        }
                        else {
                            throw new Error('Emergency! No slot to create money on player!');
                        }
                    }
                }
                else {
                    console.log(...logger_1.default('??Trader has !!not !!enough money to buy item!'));
                    super._moveItemFromSlotToSlot(fromSlot, fromSlot, quantity);
                }
            }
        }
        _getEmptyTraderSlot() {
            return itemSlots_1.containerSlotNames.find((slotToCheck) => this.itemsMap.get(slotToCheck) === undefined);
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
                this._moveItemFromSlotToFirstPossible(itemCurrentSlot, itemSlots_1.containerSlotNames, 1);
            }
            else {
                this._moveItemFromSlotToFirstPossible(itemCurrentSlot, itemSlots_1.backpackSlotNames, 1);
            }
        }
        _drawContainerSlotsAndTitle() {
            super._drawContainerSlotsAndTitle(false);
        }
    }
    exports.default = TraderOverlayScene;
});
//# sourceMappingURL=traderOverlayScene.js.map