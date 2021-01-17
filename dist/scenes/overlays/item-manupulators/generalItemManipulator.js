/* eslint-disable */
// @ts-nocheck
define(["require", "exports", "../../../characters/adventurers/player", "../generalOverlayScene", "../../../entities/item", "../../../config/constants", "../../../entities/itemRepresentation", "../../../data/items/itemSlots", "../../../helpers/logger", "../../../index"], function (require, exports, player_1, generalOverlayScene_1, item_1, constants_1, itemRepresentation_1, itemSlots_1, logger_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GeneralItemManipulatorScene extends generalOverlayScene_1.default {
        constructor({ key }) {
            super({ key });
        }
        init({ opts, closeCallback, prevScene }) {
            this.player = player_1.playerInstance;
            this.opts = { backgroundAlpha: 0.8 };
            this.opts = { ...this.opts, ...opts };
            this.closeCallback = closeCallback;
            this.parentSceneKey = prevScene;
        }
        preload() {
        }
        create() {
            super.create(this.parentSceneKey, this.opts);
            this.generalDisplayGroup = this.add.group();
            this.slotsDisplayGroup = this.add.group();
            this.itemsDisplayGroup = this.add.group();
            this.highlightedSlotsGroup = this.add.group();
            this.droppedItems = [];
            if (constants_1.DEBUG) {
                this.input.keyboard.off('keyup-F2');
                this.input.keyboard.on('keyup-F2', () => {
                    console.table([...this.itemsMap].map(([key, value]) => [key, value.item.itemId, value.item.quantity]));
                });
            }
        }
        _createDropSlot(x, y) {
            const slot = this._createSlot('dropSlot', x, y);
            const dropSlotHoverText = this.add.text(this.opts.windowX + x, this.opts.windowY + y + 64, 'Drop on the ground', {
                backgroundColor: 'lightgrey',
                color: 'black',
            }).setVisible(false);
            this.add.sprite(this.opts.windowX + x, this.opts.windowY + y, 'icon-item-set', 205)
                .setOrigin(0, 0).setDisplaySize(64, 64).setInteractive()
                .on('pointerover', () => dropSlotHoverText.setVisible(true))
                .on('pointerout', () => dropSlotHoverText.setVisible(false));
            return slot;
        }
        _createSlot(name, x, y, isZone = false) {
            let slot;
            if (isZone) {
                slot = this.add.zone(this.opts.windowX + x, this.opts.windowY + y, 64, 64);
            }
            else {
                slot = this.add.sprite(this.opts.windowX + x, this.opts.windowY + y, 'inventory-slot').setDisplaySize(64, 64);
            }
            slot.setOrigin(0, 0).setName(name).setScrollFactor(0).setDepth(this.opts.baseDepth)
                .setInteractive({ dropZone: true });
            this.slotsDisplayGroup.add(slot);
            return slot;
        }
        _moveItemFromSlotToSlot(fromSlot, toSlot, quantity) {
            const itemToMove = this.itemsMap.get(fromSlot);
            const itemInTargetSlot = this.itemsMap.get(toSlot);
            if (quantity === undefined)
                quantity = itemToMove.item.quantity;
            if (toSlot === 'dropSlot') {
                console.log(...logger_1.default('Item was moved to !!dropSlot'));
                this._dropItem(fromSlot);
                return;
            }
            if (fromSlot === toSlot || itemToMove.item.possibleSlots.includes(toSlot) === false) {
                console.log(...logger_1.default(`Trying to move item in !!${fromSlot} to ${fromSlot === toSlot ? '!!itself' : '!!impossible slot'}, instead just ??animating ??it ??back`));
                this._animateItemFromSlotToSlot(fromSlot, fromSlot);
                return;
            }
            console.log(...logger_1.default(`Trying to move ??${quantity} !!${itemToMove.item.itemId} from !!${fromSlot} to !!${toSlot}.`));
            if (itemToMove.item.stackable && itemToMove.item.itemId === itemInTargetSlot?.item.itemId) {
                console.log(...logger_1.default('Items are the same, !!stacking them'));
                if (itemToMove.item.quantity === quantity) {
                    this._animateItemFromSlotToSlot(fromSlot, toSlot, true);
                    this._deleteItemRepresentation(fromSlot);
                    this._highlightValidSlots(itemToMove.item.possibleSlots, false);
                    this._changeItemQuantity(toSlot, itemInTargetSlot.item.quantity + quantity);
                }
                else {
                    this._animateItemFromSlotToSlot(fromSlot, toSlot, true);
                    this._animateItemFromSlotToSlot(fromSlot, fromSlot);
                    this._changeItemQuantity(fromSlot, itemToMove.item.quantity - quantity);
                    this._changeItemQuantity(toSlot, itemInTargetSlot.item.quantity + quantity);
                }
            }
            else if (itemInTargetSlot !== undefined) {
                console.log(...logger_1.default(`There is ??${itemInTargetSlot.item.itemId} item in that slot.`));
                if (quantity < itemToMove.item.quantity) {
                    console.log(...logger_1.default(`Since ??${itemToMove.item.itemId} is getting separated, moving ??${itemInTargetSlot.item.itemId} to first possible empty slot`));
                    this._moveItemFromSlotToFirstPossible(toSlot, itemSlots_1.playerSlotNames, undefined, true);
                    const separatedItem = this._createItemRepresentation(new item_1.default(itemToMove.item.itemId, quantity), toSlot).setVisible(false);
                    this._animateItemFromSlotToSlot(fromSlot, toSlot, true).then(() => {
                        separatedItem.setVisible(true);
                    });
                    this._animateItemFromSlotToSlot(fromSlot, fromSlot);
                    this._changeItemQuantity(fromSlot, itemToMove.item.quantity - quantity);
                }
                else if (itemInTargetSlot.item.possibleSlots.includes(fromSlot)) {
                    console.log(...logger_1.default('Items are ??swappable, so lets swap it.'));
                    this._animateItemFromSlotToSlot(fromSlot, toSlot);
                    this._animateItemFromSlotToSlot(toSlot, fromSlot);
                    this.itemsMap.set(toSlot, itemToMove);
                    this.itemsMap.set(fromSlot, itemInTargetSlot);
                }
                else {
                    console.log(...logger_1.default(`Items are !!not !!swappable, so moving ??${itemInTargetSlot.item.itemId} to first possible empty slot.`));
                    this._moveItemFromSlotToFirstPossible(toSlot, itemSlots_1.playerSlotNames, undefined, true);
                    this._animateItemFromSlotToSlot(fromSlot, toSlot);
                    this.itemsMap.delete(fromSlot);
                    this.itemsMap.set(toSlot, itemToMove);
                }
            }
            else {
                console.log(...logger_1.default('There is ??no item in that slot.'));
                if (quantity < itemToMove.item.quantity) {
                    console.log(...logger_1.default('Starting separation'));
                    const separatedItem = this._createItemRepresentation(new item_1.default(itemToMove.item.itemId, quantity), toSlot).setVisible(false);
                    this._animateItemFromSlotToSlot(fromSlot, toSlot, true).then(() => {
                        separatedItem.setVisible(true);
                    });
                    this._animateItemFromSlotToSlot(fromSlot, fromSlot);
                    this._changeItemQuantity(fromSlot, itemToMove.item.quantity - quantity);
                }
                else {
                    console.log(...logger_1.default('Moving the whole item without separation'));
                    this._animateItemFromSlotToSlot(fromSlot, toSlot);
                    this.itemsMap.delete(fromSlot);
                    this.itemsMap.set(toSlot, itemToMove);
                }
            }
            this.updateSourceCallback();
        }
        _animateItemFromSlotToSlot(fromSlot, toSlot, duplicateItemImage = false) {
            return new Promise((resolve) => {
                let itemToAnimate = this.itemsMap.get(fromSlot);
                console.log(...logger_1.default(`Animating !!${itemToAnimate.item.itemId} from ??${fromSlot} to ??${toSlot}`));
                const originalSlot = this.slotsDisplayGroup.getChildren().find((slot) => slot.name === toSlot);
                if (duplicateItemImage) {
                    itemToAnimate = this.add.sprite(itemToAnimate.x, itemToAnimate.y, itemToAnimate.item.sprite.texture, itemToAnimate.item.sprite.frame)
                        .setDisplaySize(64, 64).setScale(constants_1.INVENTORY_ITEM_SCALE);
                }
                this.tweens.add({
                    targets: itemToAnimate,
                    x: originalSlot.x + 32,
                    y: originalSlot.y + 32,
                    ease: 'Back.easeOut',
                    duration: 500,
                    onComplete: () => {
                        if (duplicateItemImage)
                            itemToAnimate.destroy();
                        resolve();
                    },
                });
            });
        }
        _enableDragAndDrop() {
            if (!this.input.eventNames().includes('drop')) {
                this.input.on('drop', (pointer, droppedItem, target) => {
                    const fromSlot = this._getSlotByItem(droppedItem);
                    const toSlot = target.name;
                    const shiftKey = this.input.keyboard.addKey('SHIFT');
                    const halfOfQuantity = Math.floor(this.itemsMap.get(fromSlot).item.quantity / 2);
                    this._moveItemFromSlotToSlot(fromSlot, toSlot, shiftKey.isDown ? halfOfQuantity : undefined);
                });
            }
        }
        _createItemsMap(itemsMap, updateSourceCallback) {
            this.itemsMap = new Map();
            this.updateSourceCallback = updateSourceCallback;
            itemsMap.forEach(this._createItemRepresentation.bind(this));
        }
        _createItemRepresentation(item, currentSlot) {
            const scene = this;
            const slotImage = this.slotsDisplayGroup.getChildren().find((slot) => slot.name === currentSlot);
            const itemRepresentation = new itemRepresentation_1.default(this, slotImage.x + 32, slotImage.y + 32, item.sprite.texture, item.sprite.frame, item);
            itemRepresentation.setDepth(this.opts.baseDepth + 1);
            this.itemsMap.set(currentSlot, itemRepresentation);
            this.input.setDraggable(itemRepresentation);
            itemRepresentation.on('dragstart', (pointer, dragX, dragY) => {
                scene._highlightValidSlots(itemRepresentation.item.possibleSlots, true);
            });
            itemRepresentation.on('drag', function (pointer, dragX, dragY) {
                scene.dragStarted = true;
                this.x = dragX;
                this.y = dragY;
                this.setDepth(scene.opts.baseDepth + 2);
            });
            itemRepresentation.on('dragend', function (pointer, something1, something2, dropped) {
                this.setDepth(scene.opts.baseDepth + 1);
                if (scene.dragStarted && !dropped) {
                    const currentSlot = scene._getSlotByItem(itemRepresentation);
                    scene._animateItemFromSlotToSlot(currentSlot, currentSlot);
                }
                scene._highlightValidSlots(itemRepresentation.item.possibleSlots, false);
                scene.dragStarted = false;
            });
            let doubleClickTimer = 0;
            itemRepresentation.on('pointerdown', (pointer) => {
                const itemCurrentSlot = this._getSlotByItem(itemRepresentation);
                if (pointer.rightButtonDown()) {
                    this._showItemDescriptionAndActions(itemCurrentSlot);
                }
                else if (doubleClickTimer === 0) {
                    doubleClickTimer = Date.now();
                }
                else {
                    const delta = Date.now() - doubleClickTimer;
                    if (delta > 350) {
                        doubleClickTimer = Date.now();
                    }
                    else {
                        this._itemDoubleClickCallback(itemCurrentSlot);
                    }
                }
            });
            this.itemsDisplayGroup.add(itemRepresentation);
            return itemRepresentation;
        }
        _itemDoubleClickCallback(itemCurrentSlot) {
            if (itemSlots_1.backpackSlotNames.includes(itemCurrentSlot)) {
                const { item } = this.itemsMap.get(itemCurrentSlot);
                const possibleNonBackpackPlayerSlotsForItem = item.possibleSlots.filter((x) => itemSlots_1.dollSlotNames.includes(x) || itemSlots_1.quickSlotNames.includes(x));
                this._moveItemFromSlotToFirstPossible(itemCurrentSlot, possibleNonBackpackPlayerSlotsForItem);
            }
            else {
                this._moveItemFromSlotToFirstPossible(itemCurrentSlot, itemSlots_1.backpackSlotNames);
            }
        }
        _getFirstEmptySlot(slotsPool) {
            return slotsPool.find((slot) => {
                const slotImageExists = this.slotsDisplayGroup.getChildren().find((slotImage) => slotImage.name === slot);
                return (slotImageExists && this.itemsMap.get(slot) === undefined);
            });
        }
        _moveItemFromSlotToFirstPossible(fromSlot, slotsPool, quantity, dropIfNoSlots = false) {
            const itemR = this.itemsMap.get(fromSlot);
            const possibleSlotsPool = itemR.item.possibleSlots.filter((x) => slotsPool.includes(x));
            if (itemR.item.stackable === true) {
                for (const [slot, itemFromMap] of this.itemsMap.entries()) {
                    if (slot !== fromSlot && itemFromMap.item.itemId === itemR.item.itemId) {
                        this._moveItemFromSlotToSlot(fromSlot, slot, quantity);
                        return true;
                    }
                }
            }
            const emptyPossibleSlot = this._getFirstEmptySlot(possibleSlotsPool);
            if (emptyPossibleSlot) {
                this._moveItemFromSlotToSlot(fromSlot, emptyPossibleSlot, quantity);
                return true;
            }
            if (dropIfNoSlots) {
                this._dropItem(fromSlot);
                return true;
            }
            return false;
        }
        _highlightValidSlots(slotNames, showHighlight) {
            const slotsObjects = this.slotsDisplayGroup.getChildren();
            let slotsToHighlight = [];
            slotNames
                .filter((nameOfSlotToHighlight) => !nameOfSlotToHighlight.includes('backpack') && !nameOfSlotToHighlight.includes('containerSlot'))
                .forEach((nameOfSlotToHighlight) => {
                slotsToHighlight = [...slotsToHighlight, ...slotsObjects.filter((slot) => slot.name === nameOfSlotToHighlight)];
            });
            if (showHighlight) {
                slotsToHighlight.forEach((slotZone) => {
                    this.highlightedSlotsGroup.add(this.add.graphics()
                        .lineStyle(3, 0xff0000)
                        .strokeRect(slotZone.x, slotZone.y, 66, 66));
                });
            }
            else {
                this.highlightedSlotsGroup.clear(true, true);
            }
        }
        _showItemDescriptionAndActions(slot, additionalActionsEnabled = true) {
            const itemRepresentation = this.itemsMap.get(slot);
            const { item } = itemRepresentation;
            const outerZone = this.add.zone(0, 0, constants_1.GAME_W, constants_1.GAME_H).setOrigin(0, 0).setDepth(this.opts.baseDepth + 1).setInteractive();
            const containerX = itemRepresentation.x < constants_1.GAME_W / 2 ? itemRepresentation.x + 32 : itemRepresentation.x - 32 - constants_1.INVENTORY_ITEM_DESCRIPTION_W;
            const containerY = itemRepresentation.y < constants_1.GAME_H / 2 ? itemRepresentation.y - 32 : itemRepresentation.y + 32 - constants_1.INVENTORY_ITEM_DESCRIPTION_H;
            const descriptionContainer = this.add.container(containerX, containerY).setDepth(this.opts.baseDepth + 2);
            outerZone.once('pointerdown', (pointer, eventX, eventY, event) => {
                event.stopPropagation();
                outerZone.destroy();
                descriptionContainer.destroy();
            });
            const background = this.add.graphics()
                .fillStyle(this.opts.backgroundColor, 1)
                .fillRect(0, 0, constants_1.INVENTORY_ITEM_DESCRIPTION_W, constants_1.INVENTORY_ITEM_DESCRIPTION_H)
                .lineStyle(2, 0x000000)
                .strokeRect(0, 0, constants_1.INVENTORY_ITEM_DESCRIPTION_W, constants_1.INVENTORY_ITEM_DESCRIPTION_H);
            descriptionContainer.add(background);
            const textStyle = {
                font: '14px monospace',
                color: '#000000',
                wordWrap: {
                    width: constants_1.INVENTORY_ITEM_DESCRIPTION_W,
                },
            };
            if (additionalActionsEnabled) {
                const dropItemButton = this.add.image(constants_1.INVENTORY_ITEM_DESCRIPTION_W - 32 - 5, 5, 'icon-item-set', 205).setOrigin(0, 0);
                dropItemButton.setInteractive({ useHandCursor: true });
                dropItemButton.once('pointerdown', (pointer, eventX, eventY, event) => {
                    this._dropItem(slot);
                    event.stopPropagation();
                    outerZone.destroy();
                    descriptionContainer.destroy();
                });
                descriptionContainer.add(dropItemButton);
                if (item.quantity > 1) {
                    const splitItemButton = this.add.image(constants_1.INVENTORY_ITEM_DESCRIPTION_W - 64 - 5, 5, 'icon-item-set', 36).setOrigin(0, 0);
                    splitItemButton.setInteractive({ useHandCursor: true });
                    splitItemButton.on('pointerdown', (pointer, eventX, eventY, event) => {
                        const newQuantity = Math.floor(item.quantity / 2);
                        const possiblePlayerSlotsForItem = item.possibleSlots.filter((x) => itemSlots_1.playerSlotNames.includes(x));
                        this._moveItemFromSlotToFirstPossible(slot, possiblePlayerSlotsForItem, newQuantity);
                        event.stopPropagation();
                        outerZone.destroy();
                        descriptionContainer.destroy();
                    });
                    descriptionContainer.add(splitItemButton);
                }
                if (item.specifics?.worldConsumable && this.parentSceneKey !== 'Battle') {
                    const consumeItemButton = this.add.image(constants_1.INVENTORY_ITEM_DESCRIPTION_W - 96 - 10, 5, 'icon-item-set', 18).setOrigin(0, 0);
                    consumeItemButton.setInteractive({ useHandCursor: true });
                    consumeItemButton.on('pointerdown', (pointer, eventX, eventY, event) => {
                        const currentMax = this.player.characteristics[item.specifics.worldConsumable.type];
                        const healing = Math.round(currentMax * item.specifics.worldConsumable.value);
                        this.player.addToParameter(item.specifics.worldConsumable.type, healing);
                        this._changeItemQuantity(slot, item.quantity - 1);
                        event.stopPropagation();
                        outerZone.destroy();
                        descriptionContainer.destroy();
                    });
                    descriptionContainer.add(consumeItemButton);
                }
            }
            const name = this.add.text(5, 5, item.displayName, textStyle).setOrigin(0, 0);
            descriptionContainer.add(name);
            name.setFontStyle('bold');
            const description = this.add.text(5, name.getBottomLeft().y + 15, item.description, textStyle).setOrigin(0, 0);
            descriptionContainer.add(description);
            let lastTextPosition = description.getBottomLeft().y;
            if (item.specifics?.additionalActions) {
                const actions = this.add.text(5, lastTextPosition + 10, `Provides actions: ${item.specifics.additionalActions.join(', ')}`, textStyle)
                    .setOrigin(0, 0);
                descriptionContainer.add(actions);
                lastTextPosition = actions.getBottomLeft().y;
            }
            if (item.specifics?.additionalCharacteristics) {
                const charText = item.specifics.additionalCharacteristics.map((char) => {
                    let name = Object.keys(char)[0];
                    const value = Object.values(char)[0];
                    name = name[0].toUpperCase() + name.slice(1);
                    return `${name}: ${value}`;
                }).join('\n');
                const characteristics = this.add.text(5, lastTextPosition + 10, `Characteristics:\n${charText}`, textStyle).setOrigin(0, 0);
                descriptionContainer.add(characteristics);
                lastTextPosition = characteristics.getBottomLeft().y;
            }
            const priceText = `Sell price, for 1: ${item.sellPrice ? `${item.sellPrice} copper` : 'Can\'t be sold.'}\nBuy price, for 1: ${item.buyPrice} copper`;
            const price = this.add.text(5, lastTextPosition + 10, priceText, textStyle).setOrigin(0, 0);
            descriptionContainer.add(price);
            lastTextPosition = price.getBottomLeft().y;
            if (item.itemId === 'mirror-of-travel') {
                const travelButton = this.add.text(5, lastTextPosition + 10, 'Fast travel', textStyle).setOrigin(0, 0);
                travelButton.setInteractive({ useHandCursor: true });
                descriptionContainer.add(travelButton);
                lastTextPosition = travelButton.getBottomLeft().y;
                travelButton.once('pointerdown', () => {
                    const outerZone = this.add.zone(0, 0, constants_1.GAME_W, constants_1.GAME_H).setOrigin(0, 0).setDepth(this.opts.baseDepth + 1).setInteractive();
                    const locationsDialogContainer = this.add.container(0, 0).setDepth(this.opts.baseDepth + 3);
                    outerZone.once('pointerdown', (pointer, eventX, eventY, event) => {
                        event.stopPropagation();
                        outerZone.destroy();
                        locationsDialogContainer.destroy();
                    });
                    const background = this.add.graphics();
                    locationsDialogContainer.add(background);
                    let lastButtonPosition = 5;
                    index_1.LOCATION_SCENES.forEach((location) => {
                        const locationName = location.name.split('Scene')[0];
                        const locationButton = this.add.text(5, lastButtonPosition + 10, locationName, textStyle).setOrigin(0, 0);
                        locationButton.setInteractive({ useHandCursor: true });
                        locationsDialogContainer.add(locationButton);
                        lastButtonPosition = locationButton.getBottomLeft().y;
                        locationButton.once('pointerdown', () => {
                            this.closeScene({ switchToScene: locationName });
                        });
                    });
                    locationsDialogContainer.setPosition(constants_1.GAME_W / 2 - constants_1.INVENTORY_ITEM_DESCRIPTION_W / 2, constants_1.GAME_H / 2 - lastButtonPosition / 2);
                    background.fillStyle(this.opts.backgroundColor, 1)
                        .fillRect(0, 0, constants_1.INVENTORY_ITEM_DESCRIPTION_W, lastButtonPosition + 15)
                        .lineStyle(2, 0x000000)
                        .strokeRect(0, 0, constants_1.INVENTORY_ITEM_DESCRIPTION_W, lastButtonPosition + 15);
                });
            }
        }
        _changeItemQuantity(slot, newQuantity) {
            const itemRepresentation = this.itemsMap.get(slot);
            if (itemRepresentation.item.stackable === false && newQuantity > 1)
                throw `Trying to increase quality of un-stackable item! ${itemRepresentation.item.itemId}`;
            if (newQuantity !== 0) {
                itemRepresentation.item.quantity = newQuantity;
                itemRepresentation.updateQuantityCounter();
                this.updateSourceCallback();
            }
            else {
                this._deleteItemRepresentation(slot);
            }
        }
        _deleteItemRepresentation(slot) {
            const itemRepresentation = this.itemsMap.get(slot);
            if (!itemRepresentation)
                throw new Error(`Trying to delete item which does not exist in slot ${slot}`);
            itemRepresentation.destroy();
            this.itemsMap.delete(slot);
            this.updateSourceCallback();
            return itemRepresentation;
        }
        _dropItem(slot) {
            this._animateItemFromSlotToSlot(slot, 'dropSlot', true);
            const deletedItem = this._deleteItemRepresentation(slot);
            this._highlightValidSlots(deletedItem.item.possibleSlots, false);
            this.droppedItems.push(deletedItem.item);
            this.player.updateAchievement('Let it go', undefined, true);
        }
        _getSlotByItem(itemRepresentation) {
            for (const [slot, itemFromMap] of this.itemsMap.entries()) {
                if (itemFromMap === itemRepresentation) {
                    return slot;
                }
            }
            return undefined;
        }
        closeScene(switchParam) {
            super.closeScene({ ...switchParam, droppedItems: this.droppedItems });
        }
    }
    exports.default = GeneralItemManipulatorScene;
});
//# sourceMappingURL=generalItemManipulator.js.map