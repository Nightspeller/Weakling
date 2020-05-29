import {Player, playerInstance} from "../../characters/adventurers/player.js";
import {GeneralOverlayScene} from "../generalOverlayScene.js";
import Sprite = Phaser.GameObjects.Sprite;
import Item from "../../entities/item.js";
import {GAME_H, GAME_W, INVENTORY_ITEM_DESCRIPTION_H, INVENTORY_ITEM_DESCRIPTION_W} from "../../config/constants.js";
import {LOCATION_SCENES} from "../../index.js";
import ItemRepresentation from "../../entities/itemRepresentation.js";
import GameObject = Phaser.GameObjects.GameObject;
import Slot = spine.Slot;
import {backpackSlotNames} from "../../data/items/itemSlots.js";

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

    protected _moveItemFromSlotToSlot(fromSlot: Slots, toSlot: Slots, swappingIsFinished = true) {
        const itemToMove = this.itemsMap.get(fromSlot);
        const itemInTargetSlot = this.itemsMap.get(toSlot);
        console.log(`Trying to move %c${itemToMove.item.itemId}%c from %c${fromSlot}%c to %c${toSlot}%c. There is %c${itemInTargetSlot ? itemInTargetSlot.item.itemId : 'no'}%c item in that slot.`, `color: aqua`, `color: while`, `color: red`, `color: while`, `color: red`, `color: while`, `color: aqua`, `color: white`);

        if (fromSlot === toSlot) {
            this._animateItemFromSlotToSlot(fromSlot, fromSlot);
            return;
        }

        if (itemToMove.item.itemId === itemInTargetSlot?.item.itemId) {
            setTimeout(() => {
                this._changeItemQuantity(toSlot, itemInTargetSlot.item.quantity + itemToMove.item.quantity);
                this._deleteItemRepresentation(fromSlot);
            }, 0);
            return;
        }

        if (itemToMove.item.possibleSlots.includes(toSlot)) {
            this._animateItemFromSlotToSlot(fromSlot, toSlot);
            this.itemsMap.delete(fromSlot);

            if (itemInTargetSlot === undefined) {
                this.itemsMap.set(toSlot, itemToMove);
            } else {
                if (itemInTargetSlot.item.possibleSlots.includes(fromSlot)) {
                    this._moveItemFromSlotToSlot(toSlot, fromSlot, false);
                } else {
                    const emptyBackPackSlot = this.player.getEmptyBackpackSlot();
                    if (emptyBackPackSlot) {
                        this._moveItemFromSlotToSlot(toSlot, emptyBackPackSlot, false);
                    } else {
                        this._dropItem(toSlot);
                    }
                }
                this.itemsMap.set(toSlot, itemToMove);
            }
            this.updateSourceCallback(fromSlot, toSlot, itemToMove, swappingIsFinished);
        } else {
            this._animateItemFromSlotToSlot(fromSlot, fromSlot);
        }
    }

    protected _animateItemFromSlotToSlot(fromSlot, toSlot): Promise<void> {
        return new Promise((resolve) => {
            const itemToAnimate = this.itemsMap.get(fromSlot);
            const originalSlot = this.slotsDisplayGroup.getChildren().find(slot => slot.name === toSlot) as Sprite;
            this.tweens.add({
                targets: itemToAnimate,
                x: originalSlot.x + 32,
                y: originalSlot.y + 32,
                ease: 'Back.easeOut',
                duration: 500,
                onComplete: () => resolve(),
            });
        });
    }

    protected _enableDragAndDrop() {
        if (!this.input.eventNames().includes('drop')) {
            this.input.on('drop', (pointer, droppedItem: ItemRepresentation, target: GameObject) => {
                const fromSlot = this._getSlotByItem(droppedItem);
                const toSlot = target.name as Slots;
                this._moveItemFromSlotToSlot(fromSlot, toSlot);
            });
        }
    }

    protected _createItemsMap(itemsMap: Map<Slots, Item>, updateSourceCallback: Function) {
        this.itemsMap = new Map();
        this.updateSourceCallback = updateSourceCallback;
        itemsMap.forEach(this._createItemRepresentation.bind(this));
    }

    protected _createItemRepresentation(item: Item, currentSlot: Slots) {
        const scene = this;
        const slotImage = this.slotsDisplayGroup.getChildren().find(slot => slot.name === currentSlot) as Sprite;
        const itemRepresentation = new ItemRepresentation(this, slotImage.x + 32, slotImage.y + 32, item.sprite.key, item.sprite.frame, item);
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
                        this._moveItemToBackpack(itemCurrentSlot);
                    }
                }
            }
        });
        this.itemsDisplayGroup.add(itemRepresentation);
    }

    protected _moveItemToBackpack(fromSlot: Slots) {
        const itemR = this.itemsMap.get(fromSlot);
        if (itemR.item.stackable === true) {
            for (let [slot, itemFromMap] of this.itemsMap.entries()) {
                if (backpackSlotNames.includes(slot) && slot !== fromSlot && itemFromMap.item.itemId === itemR.item.itemId) {
                    this._animateItemFromSlotToSlot(fromSlot, slot).then(() => {
                        this._changeItemQuantity(slot, itemFromMap.item.quantity+itemR.item.quantity);
                        this._deleteItemRepresentation(fromSlot);
                    });
                    return;
                }
            }
        }
        const emptyBackPackSlot = this.player.getEmptyBackpackSlot();
        if (emptyBackPackSlot) {
            this._moveItemFromSlotToSlot(fromSlot, emptyBackPackSlot, true);
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

    private _showItemDescriptionAndActions(slot: Slots) {
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
                const emptyBackPackSlot = this.player.getEmptyBackpackSlot();
                if (emptyBackPackSlot) {
                    const newQuantity = Math.floor(item.quantity / 2);
                    this._changeItemQuantity(slot, item.quantity - newQuantity);
                    const separatedItem = new Item(item.itemId, newQuantity);
                    this._createItemRepresentation(separatedItem, emptyBackPackSlot);
                    this.player.addItemToInventory(separatedItem, separatedItem.quantity, emptyBackPackSlot);
                }
                event.stopPropagation();
                outerZone.destroy(true);
                descriptionContainer.destroy(true);
            });
            descriptionContainer.add(splitItemButton);
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
        const price = this.add.text(5, lastTextPosition + 10, `Sell price, for 1: ${item.sellPrice} copper\nBuy price, for 1: ${item.buyPrice} copper`, textStyle).setOrigin(0, 0);
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
        if (this.player.getItemInSlot(slot)) {
            this.player.removeItemFromInventory(itemRepresentation.item, itemRepresentation.item.quantity);
        }
        itemRepresentation.destroy(true);
        this.itemsMap.delete(slot);
        return itemRepresentation;
    }

    protected _dropItem(slot: Slots) {
        const deletedItem = this._deleteItemRepresentation(slot)
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
