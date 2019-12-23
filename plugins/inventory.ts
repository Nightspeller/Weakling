import Player from "../entities/player.js";
import {belts} from "../actionsAndEffects/items.js";
import Sprite = Phaser.GameObjects.Sprite;
import player from "../entities/player.js";

export class InventoryPlugin extends Phaser.Plugins.ScenePlugin {
    private inventoryDisplayGroup: Phaser.GameObjects.Group;
    private options: any;
    private character: Player;
    private closeCallback: Function;

    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
        super(scene, pluginManager);

        this.options = {
            borderThickness: 3,
            borderColor: 0x907748,
            borderAlpha: 1,

            backgroundColor: 0xf0d191,
            backgroundAlpha: 0.8,

            inventoryWidth: 32 * 24,
            inventoryHeight: 32 * 19,
            inventoryX: 16,
            inventoryY: 16,

            inventoryIconX: +scene.sys.game.config.width - 32 - 64,
            inventoryIconY: 32,

            closeButtonColor: 'darkgoldenrod',
            closeButtonHoverColor: 'red',

            textColor: 'white',
            letterAppearanceDelay: 10,
        };

        this.inventoryDisplayGroup = scene.add.group();
        this.scene.load.image('doll', 'assets/images/interface/doll.png');
        this.scene.load.image('inventory-slot', 'assets/images/interface/inventory-slot.png');
    }

    public showOpenIcon(character: Player, options?: Object, closeCallback?: Function) {
        const inventoryGraphics = this.scene.add.graphics().setScrollFactor(0)
            .fillStyle(this.options.backgroundColor, this.options.backgroundAlpha)
            .fillRect(this.options.inventoryIconX, this.options.inventoryIconY, 64, 64)
            .lineStyle(this.options.borderThickness, this.options.borderColor)
            .strokeRect(this.options.inventoryIconX, this.options.inventoryIconY, 64, 64);
        const inventoryIconImage = this.scene.add.image(this.options.inventoryIconX, this.options.inventoryIconY, 'bag-green')
            .setOrigin(0, 0,).setScrollFactor(0).setScale(2).setInteractive();
        inventoryIconImage.on('pointerdown', () => {
            this.showInventory(character, options, closeCallback);
        });
    }

    public showInventory(character: Player, options?: Object, closeCallback?: Function) {
        console.log(character, options);
        this.character = character;
        this.options = {...this.options, ...options};
        this.closeCallback = closeCallback;
        this._drawInventory();
        this._enableDragAndDrop();
    }

    private _enableDragAndDrop() {
        // TODO: this is pretty bad because it uses drop event which might be already set on the scene
        if (!this.scene.input.eventNames().includes('drop')) {
            this.scene.input.on('drop', (pointer, object, target) => {
                const currentItemSlotName = object.name.split('image')[0];
                const targetSlotName = target.name;
                this._placeItemInSlot(currentItemSlotName, targetSlotName);
            });
        }
    }

    private _placeItemInSlot(currentItemSlotName, targetSlotName) {
        // TODO: optimize these cycles!!!
        const displayObjects = this.inventoryDisplayGroup.getChildren();
        const targetSlot = displayObjects.find(slot => slot.name === targetSlotName) as Sprite;
        const targetSlotX = targetSlot.x;
        const targetSlotY = targetSlot.y;
        const movedItem = this.character.inventory.find(item => item.currentSlot === currentItemSlotName);
        const movedItemImage = displayObjects.find(item => item.name === currentItemSlotName + 'image');
        const itemInTargetSlot = this.character.inventory.find(item => item.currentSlot === targetSlotName);

        if (itemInTargetSlot !== undefined) {
            const itemInTargetSlotImage = displayObjects.find(item => item.name === targetSlotName + 'image');
            const originalSlot = displayObjects.find(slot => slot.name === currentItemSlotName) as Sprite;
            const originalSlotX = originalSlot.x;
            const originalSlotY = originalSlot.y;
            this.scene.tweens.add({
                targets: itemInTargetSlotImage,
                x: originalSlotX + 32,
                y: originalSlotY + 32,
                ease: 'Back.easeOut',
                duration: 500
            });
            itemInTargetSlot.currentSlot = currentItemSlotName;
            itemInTargetSlotImage.setName(currentItemSlotName + 'image')
        }
        this.scene.tweens.add({
            targets: movedItemImage,
            x: targetSlotX + 32,
            y: targetSlotY + 32,
            ease: 'Back.easeOut',
            duration: 500
        });
        movedItem.currentSlot = targetSlotName;
        movedItemImage.setName(targetSlotName + 'image');
        if (targetSlotName === 'belt' || currentItemSlotName === 'belt') {
            if (targetSlotName === 'belt') {
                this._adjustQuickSlots(movedItem.specifics.quickSlots, itemInTargetSlot?.specifics.quickSlots || 0);
            } else {
                if (itemInTargetSlot) {
                    this._adjustQuickSlots(itemInTargetSlot.specifics.quickSlots, movedItem.specifics.quickSlots);
                } else {
                    this._adjustQuickSlots(0, movedItem.specifics.quickSlots);
                }
            }
        }
    }

    private _drawInventory() {
        this.inventoryDisplayGroup.clear(true, true);
        this._drawMainWindow();
        this._drawCloseButton();
        this._drawDoll();
        this._drawQuickSlots();
        this._drawBackpack();
        this._drawEquippedItems();
    }

    private _drawDoll() {
        /*        const drawZone = (zone) => {
                    this.inventoryDisplayGroup.add(this.scene.add.graphics()
                        .fillStyle(0xff0000, 1)
                        .fillRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height));
                };*/

        this.inventoryDisplayGroup.create(this.options.inventoryX + 16, this.options.inventoryY + 20, 'doll').setOrigin(0, 0).setScale(0.75).setScrollFactor(0);
        const rightHand = this.scene.add.zone(this.options.inventoryX + 16, this.options.inventoryY + 20 + 58, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({dropZone: true}).setName('rightHand');
        const leftHand = this.scene.add.zone(this.options.inventoryX + 281, this.options.inventoryY + 246, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({dropZone: true}).setName('leftHand');
        const belt = this.scene.add.zone(this.options.inventoryX + 202, this.options.inventoryY + 246, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({dropZone: true}).setName('belt');
        const head = this.scene.add.zone(this.options.inventoryX + 202, this.options.inventoryY + 20, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({dropZone: true}).setName('head');
        const neck = this.scene.add.zone(this.options.inventoryX + 202, this.options.inventoryY + 90, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({dropZone: true}).setName('neck');
        const backpack = this.scene.add.zone(this.options.inventoryX + 357, this.options.inventoryY + 20, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({dropZone: true}).setName('backpack');
        const ringLeft = this.scene.add.zone(this.options.inventoryX + 357, this.options.inventoryY + 246, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({dropZone: true}).setName('ringLeft');
        const ringRight = this.scene.add.zone(this.options.inventoryX + 86, this.options.inventoryY + 20 + 58, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({dropZone: true}).setName('ringRight');
        const body = this.scene.add.zone(this.options.inventoryX + 202, this.options.inventoryY + 246 - 77, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({dropZone: true}).setName('body');
        const cape = this.scene.add.zone(this.options.inventoryX + 287, this.options.inventoryY + 246 + 80, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({dropZone: true}).setName('cape');
        const gloves = this.scene.add.zone(this.options.inventoryX + 16, this.options.inventoryY + 78 + 80, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({dropZone: true}).setName('gloves');
        const tail = this.scene.add.zone(this.options.inventoryX + 94, this.options.inventoryY + 246 + 86, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({dropZone: true}).setName('tail');
        const pants = this.scene.add.zone(this.options.inventoryX + 208, this.options.inventoryY + 246 + 82, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({dropZone: true}).setName('pants');
        const boots = this.scene.add.zone(this.options.inventoryX + 210, this.options.inventoryY + 246 + 162, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({dropZone: true}).setName('boots');

        this.inventoryDisplayGroup.add(rightHand);
        this.inventoryDisplayGroup.add(leftHand);
        this.inventoryDisplayGroup.add(belt);
        this.inventoryDisplayGroup.add(head);
        this.inventoryDisplayGroup.add(neck);
        this.inventoryDisplayGroup.add(backpack);
        this.inventoryDisplayGroup.add(ringLeft);
        this.inventoryDisplayGroup.add(ringRight);
        this.inventoryDisplayGroup.add(body);
        this.inventoryDisplayGroup.add(cape);
        this.inventoryDisplayGroup.add(gloves);
        this.inventoryDisplayGroup.add(tail);
        this.inventoryDisplayGroup.add(pants);
        this.inventoryDisplayGroup.add(boots);
    }

    private _drawQuickSlots() {
        const additionalQuickSlotsNumber = this.character.inventory.find(item => item.currentSlot === "belt")?.specifics.quickSlots || 0;
        this._adjustQuickSlots(additionalQuickSlotsNumber, -1);
    }

    private _adjustQuickSlots(newQuickSlotsNumber, oldQuickSlotsNumber) {
        // todo: solve inventory overflow!!!
        const displayObjects = this.inventoryDisplayGroup.getChildren();
        if (newQuickSlotsNumber < oldQuickSlotsNumber) {
            for (let i = oldQuickSlotsNumber; i > newQuickSlotsNumber; i--) {
                const itemToBeMoved = this.character.inventory.find(item => item.currentSlot === `quickSlot${i}`);
                if (itemToBeMoved) {
                    let itemMoved = false;
                    for (let k = 0; k < 5; k++) {
                        if (!itemMoved) {
                            for (let j = 0; j < 5; j++) {
                                const testedSlot = `backpack${k}_${j}`;
                                if (!this.character.inventory.find(item => item.currentSlot === testedSlot)) {
                                    this._placeItemInSlot(`quickSlot${i}`, testedSlot);
                                    itemMoved = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                displayObjects.find(obj => obj.name === `quickSlot${i}`).destroy(true);
            }
        }
        if (newQuickSlotsNumber > oldQuickSlotsNumber) {
            for (let i = oldQuickSlotsNumber + 1; i < newQuickSlotsNumber + 1; i++) {
                this.inventoryDisplayGroup
                    .create(this.options.inventoryX + 16 + 64 * i, this.options.inventoryY + this.options.inventoryHeight - 64 - 16, 'inventory-slot')
                    .setOrigin(0, 0).setDisplaySize(64, 64).setName(`quickSlot${i}`).setScrollFactor(0).setDepth(1)
                    .setInteractive({dropZone: true});
            }
        }
    }

    private _drawBackpack() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const slotX = this.options.inventoryX + this.options.inventoryWidth - 20 - 64 * 5 + 64 * i;
                const slotY = this.options.inventoryY + 20 + 64 * j;
                this.inventoryDisplayGroup
                    .create(slotX, slotY, 'inventory-slot')
                    .setOrigin(0, 0).setDisplaySize(64, 64).setName(`backpack${i}_${j}`).setScrollFactor(0).setDepth(1)
                    .setInteractive({dropZone: true});
            }
        }
    }

    private _drawEquippedItems() {
        const displayObjects = this.inventoryDisplayGroup.getChildren();
        this.character.inventory.forEach(item => {
            const slotImage = displayObjects.find(slot => slot.name === item.currentSlot) as Sprite;
            const container = this.scene.add.container(slotImage.x + 32, slotImage.y + 32);
            const image = this.scene.add.image(0, 0, item.sprite.key, item.sprite.frame).setDisplaySize(64, 64);
            if (item.quantity) {
                const quantityText = this.scene.add.text(32, 32, item.quantity.toString(), {
                    font: '14px monospace',
                    color: '#000000',
                    backgroundColor: '#f0d191',
                    padding: {
                        left: 2,
                    },
                }).setOrigin(1, 1);
                container.add([quantityText]);
            }


            container.add([image]);
            container.setSize(64, 64)
                .setScrollFactor(0)
                .setName(item.currentSlot + 'image').setDepth(2)
                .setInteractive();
            this.scene.input.setDraggable(container);

            container.on('drag', function (pointer, dragX, dragY) {
                this.x = dragX;
                this.y = dragY;
                this.setDepth(3);
            });
            container.on('dragend', function (pointer, something1, something2, dropped) {
                this.setDepth(2);
                if (!dropped) {
                    this.scene.tweens.add({
                        targets: this,
                        x: this.input.dragStartX,
                        y: this.input.dragStartY,
                        ease: 'Back.easeOut',
                        duration: 500,
                    });
                }
            });

            this.inventoryDisplayGroup.add(container);
        })
    }

    private _drawMainWindow() {
        const inventoryGraphics = this.scene.add.graphics()
            .fillStyle(this.options.backgroundColor, this.options.backgroundAlpha)
            .fillRect(this.options.inventoryX, this.options.inventoryY, this.options.inventoryWidth, this.options.inventoryHeight)
            .lineStyle(this.options.borderThickness, this.options.borderColor)
            .strokeRect(this.options.inventoryX, this.options.inventoryY, this.options.inventoryWidth, this.options.inventoryHeight)
            .setScrollFactor(0).setInteractive();
        this.inventoryDisplayGroup.add(inventoryGraphics);
    }

    private _drawCloseButton() {
        const closeButtonX = this.options.inventoryX + this.options.inventoryWidth - 20;
        const closeButtonY = this.options.inventoryY;
        const graphics = this.scene.add.graphics()
            .lineStyle(this.options.borderThickness, this.options.borderColor, this.options.borderAlpha)
            .strokeRect(closeButtonX, closeButtonY, 20, 20).setScrollFactor(0);
        this.inventoryDisplayGroup.add(graphics);

        const closeBtn = this.scene.add.text(closeButtonX, closeButtonY, 'X', {
            font: 'bold 16px Arial',
            fill: this.options.closeButtonColor,
            fixedWidth: 20,
            fixedHeight: 20,
            align: 'center'
        }).setScrollFactor(0).setInteractive();

        closeBtn.on('pointerover', () => closeBtn.setColor(this.options.closeButtonHoverColor));
        closeBtn.on('pointerout', () => closeBtn.setColor(this.options.closeButtonColor));
        closeBtn.on('pointerdown', () => {
            console.log('close btn clicked');
            this.inventoryDisplayGroup.clear(true, true);
            this.closeCallback?.call(this);
        });

        this.inventoryDisplayGroup.add(closeBtn);
    }


    public boot() {
        console.log('booting inventory plugin');
        this.systems.events.on('shutdown', () => this._shutdown());
        this.systems.events.on('destroy', () => this.destroy());
    }

    private _shutdown() {
        console.log('shutting down inventory plugin');
    }

    public destroy() {
        console.log('destroying inventory plugin');
        this._shutdown();
    }
}
