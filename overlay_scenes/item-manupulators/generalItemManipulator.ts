import {Player, playerInstance} from "../../characters/adventurers/player.js";
import {GeneralOverlayScene} from "../generalOverlayScene.js";
import Sprite = Phaser.GameObjects.Sprite;
import Item from "../../entities/item.js";
import {
    DEBUG,
    GAME_H,
    GAME_W,
    INVENTORY_ITEM_DESCRIPTION_H,
    INVENTORY_ITEM_DESCRIPTION_W
} from "../../config/constants.js";
import {LOCATION_SCENES} from "../../index.js";
import ItemRepresentation from "../../entities/itemRepresentation.js";
import GameObject = Phaser.GameObjects.GameObject;
import {backpackSlotNames, dollSlotNames, playerSlotNames, quickSlotNames} from "../../data/items/itemSlots.js";
import prepareLog from "../../helpers/logger.js";

export class GeneralItemManipulatorScene extends GeneralOverlayScene {
    protected player: Player;
    protected closeCallback: Function;
    protected generalDisplayGroup: Phaser.GameObjects.Group;
    protected slotsDisplayGroup: Phaser.GameObjects.Group;
    protected itemsDisplayGroup: Phaser.GameObjects.Group;
    private highlightedSlotsGroup: Phaser.GameObjects.Group;
    private droppedItems: Item[];
    protected itemsMap: Map<Slots, ItemRepresentation>;
    protected updateSourceCallback: Function;
    private dragStarted: boolean;

    constructor({key: key}) {
        super({key: key});
    }

    public init({opts, closeCallback, prevScene}: { opts?: OverlaySceneOptions, closeCallback?: Function, prevScene: string }) {
        this.player = playerInstance;
        this.opts = {backgroundAlpha: 0.8};
        this.opts = {...this.opts, ...opts};
        this.closeCallback = closeCallback;
        this.parentSceneKey = prevScene;
    }

    public preload() {

    }

    public create() {
        super.create(this.parentSceneKey, this.opts);
        this.generalDisplayGroup = this.add.group();
        this.slotsDisplayGroup = this.add.group();
        this.itemsDisplayGroup = this.add.group();
        this.highlightedSlotsGroup = this.add.group();
        this.droppedItems = [];

        if (DEBUG) {
            this.input.keyboard.off('keyup-F2');
            this.input.keyboard.on('keyup-F2', () => {
                console.table([...this.itemsMap].map(
                    ([key, value]) => [key, value.item.itemId, value.item.quantity])
                );
            })
        }
    }

    protected _createDropSlot(x, y) {
        const slot = this._createSlot('dropSlot', x, y);
        const dropSlotHoverText = this.add.text(this.opts.windowX + x, this.opts.windowY + y + 64, 'Drop on the ground', {
            backgroundColor: 'lightgrey',
            color: 'black'
        }).setVisible(false);
        this.add.sprite(this.opts.windowX + x, this.opts.windowY + y, 'icon-item-set', 205,)
            .setOrigin(0, 0).setDisplaySize(64, 64).setInteractive()
            .on('pointerover', () => dropSlotHoverText.setVisible(true))
            .on('pointerout', () => dropSlotHoverText.setVisible(false));
        return slot;
    }

    protected _createSlot(name, x, y, isZone = false) {
        let slot;
        if (isZone) {
            slot = this.add.zone(this.opts.windowX + x, this.opts.windowY + y, 64, 64);
        } else {
            slot = this.add.sprite(this.opts.windowX + x, this.opts.windowY + y, 'inventory-slot',).setDisplaySize(64, 64);
        }
        slot.setOrigin(0, 0).setName(name).setScrollFactor(0).setDepth(this.opts.baseDepth).setInteractive({dropZone: true});
        this.slotsDisplayGroup.add(slot);
        return slot;
    }

    protected _moveItemFromSlotToSlot(fromSlot: Slots, toSlot: Slots, quantity?: number) {
        const itemToMove = this.itemsMap.get(fromSlot);
        const itemInTargetSlot = this.itemsMap.get(toSlot);
        if (quantity === undefined) quantity = itemToMove.item.quantity;

        if (toSlot === 'dropSlot') {
            console.log(...prepareLog('Item was moved to !!dropSlot'));
            this._dropItem(fromSlot);
            return;
        }

        if (fromSlot === toSlot || itemToMove.item.possibleSlots.includes(toSlot) === false) {
            console.log(...prepareLog(`Trying to move item in !!${fromSlot} to ${fromSlot === toSlot ? '!!itself' : '!!impossible slot'}, instead just ??animating ??it ??back`));
            this._animateItemFromSlotToSlot(fromSlot, fromSlot);
            return;
        }

        console.log(...prepareLog(`Trying to move ??${quantity} !!${itemToMove.item.itemId} from !!${fromSlot} to !!${toSlot}.`));

        if (itemToMove.item.stackable && itemToMove.item.itemId === itemInTargetSlot?.item.itemId) {
            console.log(...prepareLog(`Items are the same, !!stacking them`));
            if (itemToMove.item.quantity === quantity) {
                this._animateItemFromSlotToSlot(fromSlot, toSlot, true)
                this._deleteItemRepresentation(fromSlot);
                this._highlightValidSlots(itemToMove.item.possibleSlots, false);
                this._changeItemQuantity(toSlot, itemInTargetSlot.item.quantity + quantity);
            } else {
                this._animateItemFromSlotToSlot(fromSlot, toSlot, true);
                this._animateItemFromSlotToSlot(fromSlot, fromSlot);
                this._changeItemQuantity(fromSlot, itemToMove.item.quantity - quantity);
                this._changeItemQuantity(toSlot, itemInTargetSlot.item.quantity + quantity);
            }
        } else {
            if (itemInTargetSlot !== undefined) {
                console.log(...prepareLog(`There is ??${itemInTargetSlot.item.itemId} item in that slot.`));
                if (quantity < itemToMove.item.quantity) {
                    console.log(...prepareLog(`Since ??${itemToMove.item.itemId} is getting separated, moving ??${itemInTargetSlot.item.itemId} to first possible empty slot`));
                    this._moveItemFromSlotToFirstPossible(toSlot, playerSlotNames, undefined, true);
                } else {
                    if (itemInTargetSlot.item.possibleSlots.includes(fromSlot)) {
                        console.log(...prepareLog(`Items are ??swappable, so lets swap it.`));
                        this._animateItemFromSlotToSlot(fromSlot, toSlot);
                        this._animateItemFromSlotToSlot(toSlot, fromSlot);
                        this.itemsMap.set(toSlot, itemToMove);
                        this.itemsMap.set(fromSlot, itemInTargetSlot);
                    } else {
                        console.log(...prepareLog(`Items are !!not !!swappable, so moving ??${itemInTargetSlot.item.itemId} to first possible empty slot.`));
                        this._moveItemFromSlotToFirstPossible(toSlot, playerSlotNames, undefined, true);
                        this._animateItemFromSlotToSlot(fromSlot, toSlot);
                        this.itemsMap.delete(fromSlot);
                        this.itemsMap.set(toSlot, itemToMove);
                    }
                }
            } else {
                console.log(...prepareLog(`There is ??no item in that slot.`));
                if (quantity < itemToMove.item.quantity) {
                    console.log(...prepareLog(`Starting separation`));
                    const separatedItem = this._createItemRepresentation(new Item(itemToMove.item.itemId, quantity), toSlot).setVisible(false);
                    this._animateItemFromSlotToSlot(fromSlot, toSlot, true).then(() => {
                        separatedItem.setVisible(true);
                    });
                    this._animateItemFromSlotToSlot(fromSlot, fromSlot);
                    this._changeItemQuantity(fromSlot, itemToMove.item.quantity - quantity);
                } else {
                    console.log(...prepareLog(`Moving the whole item without separation`));
                    this._animateItemFromSlotToSlot(fromSlot, toSlot);
                    this.itemsMap.delete(fromSlot);
                    this.itemsMap.set(toSlot, itemToMove);
                }
            }
        }
        this.updateSourceCallback();
    }

    protected _animateItemFromSlotToSlot(fromSlot, toSlot, duplicateItemImage = false): Promise<void> {
        return new Promise((resolve) => {
            let itemToAnimate = this.itemsMap.get(fromSlot);
            console.log(...prepareLog(`Animating !!${itemToAnimate.item.itemId} from ??${fromSlot} to ??${toSlot}`));
            const originalSlot = this.slotsDisplayGroup.getChildren().find(slot => slot.name === toSlot) as Sprite;
            if (duplicateItemImage) {
                // @ts-ignore
                itemToAnimate = this.add.sprite(itemToAnimate.x, itemToAnimate.y, itemToAnimate.item.sprite.texture, itemToAnimate.item.sprite.frame).setDisplaySize(64, 64);
            }
            this.tweens.add({
                targets: itemToAnimate,
                x: originalSlot.x + 32,
                y: originalSlot.y + 32,
                ease: 'Back.easeOut',
                duration: 500,
                onComplete: () => {
                    if (duplicateItemImage) itemToAnimate.destroy(true);
                    resolve();
                },
            });
        });
    }

    protected _enableDragAndDrop() {
        if (!this.input.eventNames().includes('drop')) {
            this.input.on('drop', (pointer, droppedItem: ItemRepresentation, target: GameObject) => {
                const fromSlot = this._getSlotByItem(droppedItem);
                const toSlot = target.name as Slots;
                const shiftKey = this.input.keyboard.addKey('SHIFT');
                const halfOfQuantity = Math.floor(this.itemsMap.get(fromSlot).item.quantity / 2);
                this._moveItemFromSlotToSlot(fromSlot, toSlot, shiftKey.isDown ? halfOfQuantity : undefined);
            });
        }
    }

    protected _createItemsMap(itemsMap: Map<Slots, Item>, updateSourceCallback: Function) {
        this.itemsMap = new Map();
        this.updateSourceCallback = updateSourceCallback;
        itemsMap.forEach(this._createItemRepresentation.bind(this));
    }

    protected _createItemRepresentation(item: Item, currentSlot: Slots): ItemRepresentation {
        const scene = this;
        const slotImage = this.slotsDisplayGroup.getChildren().find(slot => slot.name === currentSlot) as Sprite;
        const itemRepresentation = new ItemRepresentation(this, slotImage.x + 32, slotImage.y + 32, item.sprite.texture, item.sprite.frame, item);
        itemRepresentation.setDepth(this.opts.baseDepth+1);
        this.itemsMap.set(currentSlot, itemRepresentation);

        this.input.setDraggable(itemRepresentation);
        itemRepresentation.on('dragstart', function (pointer, dragX, dragY) {
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
        let doubleClickTimer = 0
        itemRepresentation.on('pointerdown', (pointer) => {
            const itemCurrentSlot = this._getSlotByItem(itemRepresentation);
            if (pointer.rightButtonDown()) {
                this._showItemDescriptionAndActions(itemCurrentSlot);
            } else {
                if (doubleClickTimer === 0) {
                    doubleClickTimer = Date.now();
                } else {
                    let delta = Date.now() - doubleClickTimer;
                    if (delta > 350) {
                        doubleClickTimer = Date.now()
                    } else {
                        this._itemDoubleClickCallback(itemCurrentSlot);
                    }
                }
            }
        });
        this.itemsDisplayGroup.add(itemRepresentation);
        return itemRepresentation;
    }

    protected _itemDoubleClickCallback(itemCurrentSlot) {
        if (backpackSlotNames.includes(itemCurrentSlot)) {
            const item = this.itemsMap.get(itemCurrentSlot).item;
            const possibleNonBackpackPlayerSlotsForItem = item.possibleSlots.filter(x => dollSlotNames.includes(x) || quickSlotNames.includes(x));
            this._moveItemFromSlotToFirstPossible(itemCurrentSlot, possibleNonBackpackPlayerSlotsForItem);
        } else {
            this._moveItemFromSlotToFirstPossible(itemCurrentSlot, backpackSlotNames);
        }
    }

    protected _getFirstEmptySlot(slotsPool: Slots[]) {
        return slotsPool.find(slot => this.itemsMap.get(slot) === undefined)
    }

    protected _moveItemFromSlotToFirstPossible(fromSlot: Slots, slotsPool: Slots[], quantity?: number, dropIfNoSlots = false): boolean {
        const itemR = this.itemsMap.get(fromSlot);
        const possibleSlotsPool = itemR.item.possibleSlots.filter(x => slotsPool.includes(x));
        if (itemR.item.stackable === true) {
            for (let [slot, itemFromMap] of this.itemsMap.entries()) {
                if (possibleSlotsPool.includes(slot) && slot !== fromSlot && itemFromMap.item.itemId === itemR.item.itemId) {
                    this._moveItemFromSlotToSlot(fromSlot, slot, quantity)
                    return true;
                }
            }
        }
        const emptyPossibleSlot = this._getFirstEmptySlot(possibleSlotsPool);
        if (emptyPossibleSlot) {
            this._moveItemFromSlotToSlot(fromSlot, emptyPossibleSlot, quantity);
            return true;
        } else {
            if (dropIfNoSlots) {
                this._dropItem(fromSlot)
                return true;
            }
            return false;
        }
    }

    protected _highlightValidSlots(slotNames: string[], showHighlight: boolean) {
        const slotsObjects = this.slotsDisplayGroup.getChildren();
        let slotsToHighlight = [];
        slotNames
            .filter(nameOfSlotToHighlight => !nameOfSlotToHighlight.includes('backpack') && !nameOfSlotToHighlight.includes('containerSlot'))
            .forEach(nameOfSlotToHighlight => {
                slotsToHighlight = [...slotsToHighlight, ...slotsObjects.filter(slot => slot.name === nameOfSlotToHighlight)]
            });

        if (showHighlight) {
            slotsToHighlight.forEach(slotZone => {
                this.highlightedSlotsGroup.add(
                    this.add.graphics()
                        .lineStyle(3, 0xff0000)
                        .strokeRect(slotZone.x, slotZone.y, 66, 66)
                );
            })
        } else {
            this.highlightedSlotsGroup.clear(true, true);
        }
    }

    protected _showItemDescriptionAndActions(slot: Slots, additionalActionsEnabled = true) {
        const itemRepresentation = this.itemsMap.get(slot);
        const item = itemRepresentation.item;
        const outerZone = this.add.zone(0, 0, GAME_W, GAME_H).setOrigin(0, 0).setDepth(this.opts.baseDepth + 1).setInteractive();
        const containerX = itemRepresentation.x < GAME_W / 2 ? itemRepresentation.x + 32 : itemRepresentation.x - 32 - INVENTORY_ITEM_DESCRIPTION_W;
        const containerY = itemRepresentation.y < GAME_H / 2 ? itemRepresentation.y - 32 : itemRepresentation.y + 32 - INVENTORY_ITEM_DESCRIPTION_H;
        const descriptionContainer = this.add.container(containerX, containerY).setDepth(this.opts.baseDepth + 2);

        outerZone.once('pointerdown', (pointer, eventX, eventY, event) => {
            event.stopPropagation();
            outerZone.destroy(true);
            descriptionContainer.destroy(true);
        });
        const background = this.add.graphics()
            .fillStyle(this.opts.backgroundColor, 1)
            .fillRect(0, 0, INVENTORY_ITEM_DESCRIPTION_W, INVENTORY_ITEM_DESCRIPTION_H)
            .lineStyle(2, 0x000000)
            .strokeRect(0, 0, INVENTORY_ITEM_DESCRIPTION_W, INVENTORY_ITEM_DESCRIPTION_H);
        descriptionContainer.add(background);

        const textStyle = {
            font: '14px monospace',
            color: '#000000',
            wordWrap: {
                width: INVENTORY_ITEM_DESCRIPTION_W,
            },
        };

        if (additionalActionsEnabled) {
            const dropItemButton = this.add.image(INVENTORY_ITEM_DESCRIPTION_W - 32 - 5, 5, 'icon-item-set', 205).setOrigin(0, 0);
            dropItemButton.setInteractive({useHandCursor: true});
            dropItemButton.once('pointerdown', (pointer, eventX, eventY, event) => {
                this._dropItem(slot);
                event.stopPropagation();
                outerZone.destroy(true);
                descriptionContainer.destroy(true);
            });
            descriptionContainer.add(dropItemButton);

            if (item.quantity > 1) {
                const splitItemButton = this.add.image(INVENTORY_ITEM_DESCRIPTION_W - 64 - 5, 5, 'icon-item-set', 36).setOrigin(0, 0);
                splitItemButton.setInteractive({useHandCursor: true});
                splitItemButton.on('pointerdown', (pointer, eventX, eventY, event) => {
                    const newQuantity = Math.floor(item.quantity / 2);
                    const possiblePlayerSlotsForItem = item.possibleSlots.filter(x => playerSlotNames.includes(x));
                    this._moveItemFromSlotToFirstPossible(slot, possiblePlayerSlotsForItem, newQuantity);
                    event.stopPropagation();
                    outerZone.destroy(true);
                    descriptionContainer.destroy(true);
                });
                descriptionContainer.add(splitItemButton);
            }
        }

        const name = this.add.text(5, 5, item.displayName, textStyle).setOrigin(0, 0);
        descriptionContainer.add(name);
        name.setFontStyle('bold');
        const description = this.add.text(5, name.getBottomLeft().y + 15, item.description, textStyle).setOrigin(0, 0);
        descriptionContainer.add(description);

        let lastTextPosition = description.getBottomLeft().y;

        if (item.specifics?.damage) {
            const damage = this.add.text(5, lastTextPosition + 10, `Damage: ${item.specifics.damage}`, textStyle).setOrigin(0, 0);
            descriptionContainer.add(damage);
            lastTextPosition = damage.getBottomLeft().y;
        }
        if (item.specifics?.additionalActions) {
            const actions = this.add.text(5, lastTextPosition + 10, `Provides actions: ${item.specifics.additionalActions.join(', ')}`, textStyle).setOrigin(0, 0);
            descriptionContainer.add(actions);
            lastTextPosition = actions.getBottomLeft().y;
        }
        if (item.specifics?.additionalCharacteristics) {
            const charText = item.specifics.additionalCharacteristics.map(char => {
                let name = Object.keys(char)[0];
                let value = Object.values(char)[0];
                name = name.split('.')[1];
                name = name[0].toUpperCase() + name.slice(1);
                return `${name}: ${value}`
            }).join('\n');
            const characteristics = this.add.text(5, lastTextPosition + 10, `Characteristics:\n${charText}`, textStyle).setOrigin(0, 0);
            descriptionContainer.add(characteristics);
            lastTextPosition = characteristics.getBottomLeft().y;
        }

        const priceText = `Sell price, for 1: ${item.sellPrice ? `${item.sellPrice} copper` : `Can't be sold.`}\nBuy price, for 1: ${item.buyPrice} copper`;
        const price = this.add.text(5, lastTextPosition + 10, priceText, textStyle).setOrigin(0, 0);
        descriptionContainer.add(price);
        lastTextPosition = price.getBottomLeft().y;

        if (item.itemId === 'mirror-of-travel') {
            const travelButton = this.add.text(5, lastTextPosition + 10, `Fast travel`, textStyle).setOrigin(0, 0);
            travelButton.setInteractive({useHandCursor: true});
            descriptionContainer.add(travelButton);
            lastTextPosition = travelButton.getBottomLeft().y;

            travelButton.once('pointerdown', () => {
                const outerZone = this.add.zone(0, 0, GAME_W, GAME_H).setOrigin(0, 0).setDepth(this.opts.baseDepth + 1).setInteractive();
                const locationsDialogContainer = this.add.container(0, 0).setDepth(this.opts.baseDepth + 3);

                outerZone.once('pointerdown', (pointer, eventX, eventY, event) => {
                    event.stopPropagation();
                    outerZone.destroy(true);
                    locationsDialogContainer.destroy(true);
                });

                const background = this.add.graphics();
                locationsDialogContainer.add(background);

                let lastButtonPosition = 5;
                LOCATION_SCENES.forEach(location => {
                    const locationName = location.name.split('Scene')[0];
                    const locationButton = this.add.text(5, lastButtonPosition + 10, locationName, textStyle).setOrigin(0, 0);
                    locationButton.setInteractive({useHandCursor: true});
                    locationsDialogContainer.add(locationButton);
                    lastButtonPosition = locationButton.getBottomLeft().y;

                    locationButton.once('pointerdown', () => {
                        this.closeScene({switchToScene: locationName});
                    })
                })
                locationsDialogContainer.setPosition(GAME_W / 2 - INVENTORY_ITEM_DESCRIPTION_W / 2, GAME_H / 2 - lastButtonPosition / 2);
                background.fillStyle(this.opts.backgroundColor, 1)
                    .fillRect(0, 0, INVENTORY_ITEM_DESCRIPTION_W, lastButtonPosition + 15)
                    .lineStyle(2, 0x000000)
                    .strokeRect(0, 0, INVENTORY_ITEM_DESCRIPTION_W, lastButtonPosition + 15);

            })
        }
    }

    protected _changeItemQuantity(slot: Slots, newQuantity: number) {
        const itemRepresentation = this.itemsMap.get(slot);
        if (itemRepresentation.item.stackable === false && newQuantity > 1) throw `Trying to increase quality of un-stackable item! ${itemRepresentation.item.itemId}`;
        if (newQuantity !== 0) {
            itemRepresentation.item.quantity = newQuantity;
            itemRepresentation.updateQuantityCounter();
        } else {
            this._deleteItemRepresentation(slot);
        }
    }

    protected _deleteItemRepresentation(slot: Slots): ItemRepresentation {
        const itemRepresentation = this.itemsMap.get(slot);
        if (!itemRepresentation) throw `Trying to delete item which does not exist in slot ${slot}`;
        itemRepresentation.destroy(true);
        this.itemsMap.delete(slot);
        return itemRepresentation;
    }

    protected _dropItem(slot: Slots) {
        this._animateItemFromSlotToSlot(slot, 'dropSlot', true);
        const deletedItem = this._deleteItemRepresentation(slot)
        this._highlightValidSlots(deletedItem.item.possibleSlots, false);
        this.droppedItems.push(deletedItem.item);
    }

    protected _getSlotByItem(itemRepresentation: ItemRepresentation): Slots | undefined {
        for (let [slot, itemFromMap] of this.itemsMap.entries()) {
            if (itemFromMap === itemRepresentation) {
                return slot;
            }
        }
        return undefined;
    }

    public closeScene(switchParam?) {
        super.closeScene({...switchParam, droppedItems: this.droppedItems});
    }
}
