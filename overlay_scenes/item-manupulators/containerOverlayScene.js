import { backpackSlotNames, containerSlotNames } from "../../data/items/itemSlots.js";
import { InventoryOverlayScene } from "./inventoryOverlayScene.js";
export class ContainerOverlayScene extends InventoryOverlayScene {
    constructor(initObject = { key: 'ContainerOverlay' }) {
        super(initObject);
    }
    init({ opts, closeCallback, prevScene, numberOfSlots = 10, items = new Map(), name }) {
        super.init({ opts, closeCallback, prevScene });
        if (numberOfSlots < items.size)
            throw "Trying to create container for more items than slots are there.";
        this.numberOfSlots = numberOfSlots;
        this.name = name;
        this.itemsInContainer = items;
    }
    create() {
        super.create(false);
        this._drawContainerSlotsAndTitle();
        this.itemsInContainer.forEach(this._createItemRepresentation.bind(this));
    }
    _drawContainerSlotsAndTitle(takeAllEnabled = true) {
        const textX = this.opts.windowWidth - 20 - 64 * 5;
        const textY = 20 + 64 * 5 + 20;
        this.add.text(this.opts.windowX + textX, this.opts.windowY + textY, `${this.name}:`, {
            font: 'bold 16px Arial',
            color: '000000',
        });
        if (takeAllEnabled) {
            const takeAllButton = this.add.text(this.opts.windowWidth - 20 - 55, this.opts.windowY + textY, `Take All`, {
                font: 'bold 16px Arial',
                color: this.opts.closeButtonColor,
                backgroundColor: 'lightgrey',
                fixedWidth: 70,
                align: 'center',
            });
            this.add.graphics()
                .lineStyle(this.opts.borderThickness, this.opts.borderColor, this.opts.borderAlpha)
                .strokeRect(takeAllButton.x, takeAllButton.y, takeAllButton.width, takeAllButton.height);
            takeAllButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this._takeAllItems());
            this.input.keyboard.on('keydown-' + 'SPACE', () => this._takeAllItems());
        }
        for (let i = 0; i < Math.floor(this.numberOfSlots / 5) + 1; i++) {
            const slotsInRow = Math.floor((this.numberOfSlots - 5 * i) / 5) > 0 ? 5 : this.numberOfSlots % 5;
            for (let j = 0; j < slotsInRow; j++) {
                const slotX = textX + 64 * j;
                const slotY = textY + 20 + 64 * i;
                this._createSlot(`containerSlot${j}_${i}`, slotX, slotY);
            }
        }
    }
    _takeAllItems() {
        containerSlotNames.forEach(slotName => {
            if (this.itemsMap.get(slotName)) {
                this._moveItemFromSlotToFirstPossible(slotName, backpackSlotNames);
            }
        });
    }
    closeScene() {
        const itemsInContainer = [...this.itemsMap]
            .filter(([slot, itemR]) => slot.includes('containerSlot'))
            .map(([slot, itemR]) => [slot, itemR.item]);
        this.closeCallback(new Map([...itemsInContainer]));
        super.closeScene();
    }
}
//# sourceMappingURL=containerOverlayScene.js.map