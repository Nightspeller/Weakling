export class InventoryPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
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
            baseDepth: 10
        };
        this.inventoryDisplayGroup = scene.add.group();
        this.scene.load.image('doll', 'assets/images/interface/doll.png');
        this.scene.load.image('inventory-slot', 'assets/images/interface/inventory-slot.png');
    }
    showOpenIcon(character, options, closeCallback) {
        const inventoryGraphics = this.scene.add.graphics().setScrollFactor(0)
            .fillStyle(this.options.backgroundColor, this.options.backgroundAlpha)
            .fillRect(this.options.inventoryIconX, this.options.inventoryIconY, 64, 64)
            .lineStyle(this.options.borderThickness, this.options.borderColor)
            .strokeRect(this.options.inventoryIconX, this.options.inventoryIconY, 64, 64)
            .setDepth(this.options.baseDepth - 1);
        const inventoryIconImage = this.scene.add.image(this.options.inventoryIconX, this.options.inventoryIconY, 'bag-green')
            .setOrigin(0, 0).setScrollFactor(0).setScale(2).setInteractive().setDepth(this.options.baseDepth - 1);
        inventoryIconImage.on('pointerdown', () => {
            this.showInventory(character, options, closeCallback);
        });
    }
    showInventory(character, options, closeCallback) {
        console.log(character, options);
        this.character = character;
        this.options = { ...this.options, ...options };
        this.closeCallback = closeCallback;
        this._drawInventory();
        this._enableDragAndDrop();
    }
    _enableDragAndDrop() {
        // TODO: this is pretty bad because it uses drop event which might be already set on the scene
        if (!this.scene.input.eventNames().includes('drop')) {
            this.scene.input.on('drop', (pointer, object, target) => {
                const currentItemSlotName = object.name.split('image')[0];
                const targetSlotName = target.name;
                const movedItem = this.character.inventory.find(item => item.currentSlot === currentItemSlotName);
                if (movedItem.slot.includes(targetSlotName) || targetSlotName.includes('backpack') || (movedItem.slot.includes('quickSlot') && targetSlotName.includes('quickSlot'))) {
                    this._placeItemInSlot(currentItemSlotName, targetSlotName);
                }
                else {
                    const originalSlot = this.inventoryDisplayGroup.getChildren().find(slot => slot.name === currentItemSlotName);
                    this.scene.tweens.add({
                        targets: object,
                        x: originalSlot.x + 32,
                        y: originalSlot.y + 32,
                        ease: 'Back.easeOut',
                        duration: 500,
                    });
                }
            });
        }
    }
    _placeItemInSlot(currentItemSlotName, targetSlotName) {
        var _a;
        // TODO: optimize these cycles!!!
        const displayObjects = this.inventoryDisplayGroup.getChildren();
        const targetSlot = displayObjects.find(slot => slot.name === targetSlotName);
        const targetSlotX = targetSlot.x;
        const targetSlotY = targetSlot.y;
        const movedItem = this.character.inventory.find(item => item.currentSlot === currentItemSlotName);
        const movedItemImage = displayObjects.find(item => item.name === currentItemSlotName + 'image');
        const itemInTargetSlot = this.character.inventory.find(item => item.currentSlot === targetSlotName);
        if (itemInTargetSlot !== undefined) {
            const itemInTargetSlotImage = displayObjects.find(item => item.name === targetSlotName + 'image');
            const originalSlot = displayObjects.find(slot => slot.name === currentItemSlotName);
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
            itemInTargetSlotImage.setName(currentItemSlotName + 'image');
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
                this._adjustQuickSlots(movedItem.specifics.quickSlots || 0, ((_a = itemInTargetSlot) === null || _a === void 0 ? void 0 : _a.specifics.quickSlots) || 0);
            }
            else {
                if (itemInTargetSlot) {
                    this._adjustQuickSlots(itemInTargetSlot.specifics.quickSlots || 0, movedItem.specifics.quickSlots);
                }
                else {
                    this._adjustQuickSlots(0, movedItem.specifics.quickSlots);
                }
            }
        }
    }
    _drawInventory() {
        this.inventoryDisplayGroup.clear(true, true);
        this._drawMainWindow();
        this._drawCloseButton();
        this._drawDoll();
        this._drawQuickSlots();
        this._drawBackpack();
        this._drawEquippedItems();
        this._drawCharacteristics();
    }
    _drawDoll() {
        /*        const drawZone = (zone) => {
                    this.inventoryDisplayGroup.add(this.scene.add.graphics()
                        .fillStyle(0xff0000, 1)
                        .fillRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height));
                };*/
        this.inventoryDisplayGroup.create(this.options.inventoryX + 16, this.options.inventoryY + 20, 'doll')
            .setOrigin(0, 0).setScale(0.75).setScrollFactor(0).setDepth(this.options.baseDepth);
        const rightHand = this.scene.add.zone(this.options.inventoryX + 16, this.options.inventoryY + 20 + 58, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ dropZone: true }).setName('rightHand');
        const leftHand = this.scene.add.zone(this.options.inventoryX + 281, this.options.inventoryY + 246, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ dropZone: true }).setName('leftHand');
        const belt = this.scene.add.zone(this.options.inventoryX + 202, this.options.inventoryY + 246, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ dropZone: true }).setName('belt');
        const head = this.scene.add.zone(this.options.inventoryX + 202, this.options.inventoryY + 20, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ dropZone: true }).setName('head');
        const neck = this.scene.add.zone(this.options.inventoryX + 202, this.options.inventoryY + 90, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ dropZone: true }).setName('neck');
        const backpack = this.scene.add.zone(this.options.inventoryX + 357, this.options.inventoryY + 20, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ dropZone: true }).setName('bag');
        const ringLeft = this.scene.add.zone(this.options.inventoryX + 357, this.options.inventoryY + 246, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ dropZone: true }).setName('ringLeft');
        const ringRight = this.scene.add.zone(this.options.inventoryX + 86, this.options.inventoryY + 20 + 58, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ dropZone: true }).setName('ringRight');
        const body = this.scene.add.zone(this.options.inventoryX + 202, this.options.inventoryY + 246 - 77, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ dropZone: true }).setName('body');
        const cape = this.scene.add.zone(this.options.inventoryX + 287, this.options.inventoryY + 246 + 80, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ dropZone: true }).setName('cape');
        const gloves = this.scene.add.zone(this.options.inventoryX + 16, this.options.inventoryY + 78 + 80, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ dropZone: true }).setName('gloves');
        const tail = this.scene.add.zone(this.options.inventoryX + 94, this.options.inventoryY + 246 + 86, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ dropZone: true }).setName('tail');
        const pants = this.scene.add.zone(this.options.inventoryX + 208, this.options.inventoryY + 246 + 82, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ dropZone: true }).setName('pants');
        const boots = this.scene.add.zone(this.options.inventoryX + 210, this.options.inventoryY + 246 + 162, 66, 66)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ dropZone: true }).setName('boots');
        const slotNameText = this.scene.add.text(0, 0, '', {
            font: '16px monospace',
            color: '#000000',
            backgroundColor: '#f0d191',
            padding: { left: 2 }
        }).setScrollFactor(0).setDepth(this.options.baseDepth + 1).setVisible(false);
        const slots = [rightHand, leftHand, belt, head, neck, backpack, ringLeft, ringRight, body, cape, gloves, tail, pants, boots];
        slots.forEach(slot => {
            slot.on('pointerover', () => {
                slotNameText.setText(slot.name[0].toUpperCase() + slot.name.slice(1)).setPosition(slot.getBottomLeft().x, slot.getBottomLeft().y).setVisible(true);
            }).on('pointerout', () => {
                slotNameText.setVisible(false);
            });
        });
        this.inventoryDisplayGroup.addMultiple(slots);
    }
    _drawQuickSlots() {
        var _a;
        const additionalQuickSlotsNumber = ((_a = this.character.inventory.find(item => item.currentSlot === "belt")) === null || _a === void 0 ? void 0 : _a.specifics.quickSlots) || 0;
        this._adjustQuickSlots(additionalQuickSlotsNumber, -1);
    }
    _adjustQuickSlots(newQuickSlotsNumber, oldQuickSlotsNumber) {
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
                    .setOrigin(0, 0).setDisplaySize(64, 64).setName(`quickSlot${i}`).setScrollFactor(0).setDepth(this.options.baseDepth)
                    .setInteractive({ dropZone: true });
            }
        }
    }
    _drawBackpack() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const slotX = this.options.inventoryX + this.options.inventoryWidth - 20 - 64 * 5 + 64 * i;
                const slotY = this.options.inventoryY + 20 + 64 * j;
                this.inventoryDisplayGroup
                    .create(slotX, slotY, 'inventory-slot')
                    .setOrigin(0, 0).setDisplaySize(64, 64).setName(`backpack${i}_${j}`).setScrollFactor(0).setDepth(this.options.baseDepth)
                    .setInteractive({ dropZone: true });
            }
        }
    }
    _drawEquippedItems() {
        const self = this;
        const displayObjects = this.inventoryDisplayGroup.getChildren();
        this.character.inventory.forEach(item => {
            const slotImage = displayObjects.find(slot => slot.name === item.currentSlot);
            const container = this.scene.add.container(slotImage.x + 32, slotImage.y + 32);
            const image = this.scene.add.image(0, 0, item.sprite.key, item.sprite.frame).setDisplaySize(64, 64);
            container.add([image]);
            if (item.quantity > 1) {
                const quantityText = this.scene.add.text(32, 32, item.quantity.toString(), {
                    font: '14px monospace',
                    color: '#000000',
                    backgroundColor: '#f0d191',
                    padding: {
                        left: 2,
                    },
                }).setOrigin(1, 1).setDepth(this.options.baseDepth);
                container.add([quantityText]);
            }
            container.setSize(64, 64)
                .setScrollFactor(0)
                .setName(item.currentSlot + 'image').setDepth(this.options.baseDepth + 1)
                .setInteractive();
            this.scene.input.setDraggable(container);
            container.on('drag', function (pointer, dragX, dragY) {
                this.x = dragX;
                this.y = dragY;
                this.setDepth(self.options.baseDepth + 2);
            });
            container.on('dragend', function (pointer, something1, something2, dropped) {
                this.setDepth(self.options.baseDepth + 1);
                if (!dropped) {
                    this.scene.tweens.add({
                        targets: this,
                        x: this.input.dragStartX,
                        y: this.input.dragStartY,
                        ease: 'Back.easeOut',
                        duration: 500,
                    });
                }
                self.character.recalculateCharacteristics();
                self._drawCharacteristics();
            });
            this.inventoryDisplayGroup.add(container);
        });
    }
    _drawMainWindow() {
        const inventoryGraphics = this.scene.add.graphics()
            .fillStyle(this.options.backgroundColor, this.options.backgroundAlpha)
            .fillRect(this.options.inventoryX, this.options.inventoryY, this.options.inventoryWidth, this.options.inventoryHeight)
            .lineStyle(this.options.borderThickness, this.options.borderColor)
            .strokeRect(this.options.inventoryX, this.options.inventoryY, this.options.inventoryWidth, this.options.inventoryHeight)
            .setScrollFactor(0).setInteractive().setDepth(this.options.baseDepth);
        this.inventoryDisplayGroup.add(inventoryGraphics);
    }
    _drawCloseButton() {
        const closeButtonX = this.options.inventoryX + this.options.inventoryWidth - 20;
        const closeButtonY = this.options.inventoryY;
        const graphics = this.scene.add.graphics()
            .lineStyle(this.options.borderThickness, this.options.borderColor, this.options.borderAlpha)
            .strokeRect(closeButtonX, closeButtonY, 20, 20).setScrollFactor(0).setDepth(this.options.baseDepth);
        this.inventoryDisplayGroup.add(graphics);
        const closeBtn = this.scene.add.text(closeButtonX, closeButtonY, 'X', {
            font: 'bold 16px Arial',
            fill: this.options.closeButtonColor,
            fixedWidth: 20,
            fixedHeight: 20,
            align: 'center'
        }).setScrollFactor(0).setDepth(this.options.baseDepth).setInteractive();
        closeBtn.on('pointerover', () => closeBtn.setColor(this.options.closeButtonHoverColor));
        closeBtn.on('pointerout', () => closeBtn.setColor(this.options.closeButtonColor));
        closeBtn.on('pointerdown', () => {
            var _a;
            this.inventoryDisplayGroup.clear(true, true);
            (_a = this.closeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        });
        this.inventoryDisplayGroup.add(closeBtn);
    }
    _drawCharacteristics() {
        const textX = this.options.inventoryX + this.options.inventoryWidth - 20 - 64 * 5;
        const textY = this.options.inventoryY + 20 + 64 * 5 + 20;
        const text = `${this.character.name}
HP: ${this.character.currentCharacteristics.parameters.currentHealth}/${this.character.currentCharacteristics.parameters.health}
MP: ${this.character.currentCharacteristics.parameters.currentManna}/${this.character.currentCharacteristics.parameters.manna}
EN: ${this.character.currentCharacteristics.parameters.currentEnergy}/${this.character.currentCharacteristics.parameters.energy}
Strength: ${this.character.currentCharacteristics.attributes.strength}
Agility: ${this.character.currentCharacteristics.attributes.agility}
Intelligence: ${this.character.currentCharacteristics.attributes.intelligence}
Armor: ${this.character.currentCharacteristics.defences.armor}
Dodge: ${this.character.currentCharacteristics.defences.dodge}
Resistance: 🔥${this.character.currentCharacteristics.defences.fireResistance}❄${this.character.currentCharacteristics.defences.coldResistance}⚡${this.character.currentCharacteristics.defences.electricityResistance}☣${this.character.currentCharacteristics.defences.acidResistance}☠${this.character.currentCharacteristics.defences.poisonResistance}✨${this.character.currentCharacteristics.defences.magicResistance}
Initiative: ${this.character.currentCharacteristics.attributes.initiative}
Damage: ${this.character.getAttackDamage()}`;
        const textObject = this.inventoryDisplayGroup.getChildren().find(child => child.name === 'characteristicsText');
        if (textObject) {
            textObject.setText(text);
        }
        else {
            const characteristicsText = this.scene.add.text(textX, textY, text, {
                font: '14px monospace',
                color: '#000000',
            }).setScrollFactor(0).setDepth(this.options.baseDepth).setName('characteristicsText');
            this.inventoryDisplayGroup.add(characteristicsText);
        }
    }
    boot() {
        console.log('booting inventory plugin');
        this.systems.events.on('shutdown', () => this._shutdown());
        this.systems.events.on('destroy', () => this.destroy());
    }
    _shutdown() {
        console.log('shutting down inventory plugin');
    }
    destroy() {
        console.log('destroying inventory plugin');
        this._shutdown();
    }
}
//# sourceMappingURL=inventory.js.map