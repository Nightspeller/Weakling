import Item from "../../entities/item.js";
import ItemRepresentation from "../../entities/itemRepresentation.js";
import {GeneralItemManipulatorScene} from "./generalItemManipulator.js";
import {backpackSlotNames, containerSlotNames, dollSlotNames, quickSlotNames} from "../../data/items/itemSlots.js";

interface ContainerInitParams {
    opts?: OverlaySceneOptions,
    closeCallback?: Function,
    prevScene: string,
    numberOfSlots?: number,
    items?: Map<Slots, Item>,
    name: string
}

export class ContainerOverlayScene extends GeneralItemManipulatorScene {
    private numberOfQuickSlots: number;
    private numberOfSlots: number;
    private name: string;
    private items: Map<Slots, Item>;

    constructor() {
        super({key: 'ContainerOverlay'});
    }

    public init({opts, closeCallback, prevScene, numberOfSlots = 10, items = new Map(), name}: ContainerInitParams) {
        super.init({opts, closeCallback, prevScene});
        if (numberOfSlots < items.size) throw "Trying to create container for more items than slots are there."
        this.numberOfSlots = numberOfSlots;
        this.name = name;
        this.items = items;
    }

    public preload() {

    }

    public create() {
        super.create();
        this.numberOfQuickSlots = this.player.getItemInSlot("belt")?.specifics.quickSlots || 1;
        this._showContainer();
    }

    private _showContainer() {
        this._drawContainerSlotsAndTitle();

        this._drawDoll();
        this._drawQuickSlots();
        this._drawBackpack();
        this._createItemsMap(new Map<Slots, Item>([...this.player.getAllItems(), ...this.items]), (fromSlot: Slots, toSlot: Slots, itemR: ItemRepresentation, swappingIsFinished?: boolean) => {

            console.log(`Item %c${itemR.item.itemId}%c was moved from %c${fromSlot}%c to %c${toSlot}%c, swapping is finished: %c${swappingIsFinished}`, `color: aqua`, `color: while`, `color: red`, `color: while`, `color: red`, `color: while`, `color: ${swappingIsFinished ? 'green' : 'red'}`);
            if (this.player.getItemInSlot(fromSlot) === itemR.item) {
                this.player.removeItemFromInventory(this.player.getItemInSlot(fromSlot), this.player.getItemInSlot(fromSlot).quantity);
            }
            if (this.player.getItemInSlot(toSlot)) {
                this.player.removeItemFromInventory(this.player.getItemInSlot(toSlot), this.player.getItemInSlot(toSlot).quantity);
            }
            const playerInventorySlots = [...dollSlotNames, ...backpackSlotNames, ...quickSlotNames];
            if (playerInventorySlots.includes(toSlot)) {
                this.player.addItemToInventory(itemR.item, itemR.item.quantity, toSlot);
            }

            // we do not want to adjust quickSlots until the swapping is done so that items not fly away from quickSlots until final item composition is settled
            if (swappingIsFinished) {
                this._adjustQuickSlots();
            }
        });
        this._enableDragAndDrop();
    }

    private _drawContainerSlotsAndTitle() {
        const textX = this.opts.windowWidth - 20 - 64 * 5;
        const textY = 20 + 64 * 5 + 20;
        this.add.text(this.opts.windowX + textX, this.opts.windowY + textY, `${this.name}:`, {
            font: 'bold 16px Arial',
            fill: '000000',
        });
        const takeAllButton = this.add.text(this.opts.windowWidth - 20 - 55, this.opts.windowY + textY, `Take All`, {
            font: 'bold 16px Arial',
            fill: this.opts.closeButtonColor,
            backgroundColor: 'lightgrey',
            fixedWidth: 70,
            align: 'center',
        });
        this.add.graphics()
            .lineStyle(this.opts.borderThickness, this.opts.borderColor, this.opts.borderAlpha)
            .strokeRect(takeAllButton.x, takeAllButton.y, takeAllButton.width, takeAllButton.height);
        for (let i = 0; i < Math.floor(this.numberOfSlots / 5) + 1; i++) {
            const slotsInRow = Math.floor((this.numberOfSlots - 5 * i) / 5) > 0 ? 5 : this.numberOfSlots % 5;
            for (let j = 0; j < slotsInRow; j++) {
                const slotX = textX + 64 * j;
                const slotY = textY + 20 + 64 * i;
                this._createSlot(`containerSlot${j}_${i}`, slotX, slotY);
            }
        }
        takeAllButton.setInteractive({useHandCursor: true}).on('pointerdown', () => this._takeAllItems());
        this.input.keyboard.on('keydown-' + 'SPACE', () => this._takeAllItems());        
    }

    private _drawDoll() {
        this.add.sprite(this.opts.windowX + 16, this.opts.windowY + 20, 'doll')
            .setOrigin(0, 0).setScale(0.75).setScrollFactor(0).setDepth(this.opts.baseDepth);
        const dollZoneCoords = {
            rightHand: {x: 16, y: 78},
            leftHand: {x: 281, y: 246},
            belt: {x: 202, y: 246},
            head: {x: 202, y: 20},
            neck: {x: 202, y: 92},
            bag: {x: 357, y: 20},
            ringLeft: {x: 357, y: 246},
            ringRight: {x: 86, y: 78},
            body: {x: 202, y: 246 - 77},
            cape: {x: 287, y: 246 + 82},
            gloves: {x: 16, y: 78 + 80},
            tail: {x: 94, y: 246 + 86},
            pants: {x: 208, y: 246 + 82},
            boots: {x: 210, y: 246 + 162},
        }
        Object.entries(dollZoneCoords).forEach(([name, coords]) => {
            const zone = this._createSlot(name, coords.x, coords.y, true);
            /*this.add.graphics()
                .fillStyle(0xff0000, 1)
                .fillRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height);*/
        })

    }

    private _drawQuickSlots() {
        for (let i = 0; i < this.numberOfQuickSlots; i++) {
            this._createSlot(`quickSlot${i}`, 16 + 64 * i, this.opts.windowHeight - 64 - 16);
        }
    }

    private _drawBackpack() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const slotX = this.opts.windowWidth - 20 - 64 * 5 + 64 * i;
                const slotY = 20 + 64 * j;
                this._createSlot(`backpack${i}_${j}`, slotX, slotY);
            }
        }
    }

    private _adjustQuickSlots() {
        const oldQuickSlotsNumber = this.numberOfQuickSlots;
        const newQuickSlotsNumber = this.player.getItemInSlot("belt")?.specifics.quickSlots || 1;
        console.log(`Adjusting quickSlots from ${oldQuickSlotsNumber} to ${newQuickSlotsNumber}`);
        this.numberOfQuickSlots = newQuickSlotsNumber;
        if (newQuickSlotsNumber < oldQuickSlotsNumber) {
            for (let i = oldQuickSlotsNumber - 1; i > newQuickSlotsNumber - 1; i--) {
                const itemToBeMoved = this.itemsMap.get(`quickSlot${i}` as Slots);
                if (itemToBeMoved) {
                    const emptyBackPackSlot = this.player.getEmptyBackpackSlot();
                    if (emptyBackPackSlot) {
                        this._moveItemFromSlotToSlot(`quickSlot${i}` as Slots, emptyBackPackSlot);
                    } else {
                        this._dropItem(`quickSlot${i}` as Slots);
                    }
                }
                this.slotsDisplayGroup.getChildren().find(obj => obj.name === `quickSlot${i}`).destroy(true);
            }
        }
        if (newQuickSlotsNumber > oldQuickSlotsNumber) {
            for (let i = oldQuickSlotsNumber; i < newQuickSlotsNumber; i++) {
                this._createSlot(`quickSlot${i}`, 16 + 64 * i, this.opts.windowHeight - 64 - 16);
            }
        }
    }

    private _takeAllItems() {
        containerSlotNames.forEach(slotName => {
            if (this.itemsMap.get(slotName)) {
                this._moveItemToBackpack(slotName);
            }
        })
    }

    public closeScene() {
        const itemsInContainer = [...this.itemsMap]
            .filter(([slot, itemR]) => slot.includes('containerSlot'))
            .map(([slot, itemR]): [Slots, Item] => [slot, itemR.item]);
        this.closeCallback(new Map([...itemsInContainer]));
        super.closeScene();
    }
}
