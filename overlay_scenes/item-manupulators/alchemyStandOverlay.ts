import Item from "../../entities/item.js";
import ItemRepresentation from "../../entities/itemRepresentation.js";
import {GeneralItemManipulatorScene} from "./generalItemManipulator.js";
import {
    alchemyStandSlotNames,
    backpackSlotNames,
    containerSlotNames,
    dollSlotNames,
    quickSlotNames
} from "../../data/items/itemSlots.js";
import drawArrow from "../../helpers/drawArrow.js";
import {recipes} from "../../data/recipes.js";
import prepareLog from "../../helpers/logger.js";

interface AlchemyStandInitParams {
    opts?: OverlaySceneOptions,
    closeCallback?: Function,
    prevScene: string,
    itemsOnStand?: Map<Slots, Item>,
    name: string
}

export class AlchemyStandScene extends GeneralItemManipulatorScene {
    private numberOfQuickSlots: number;
    private name: string;
    private itemsOnStand: Map<Slots, Item>;

    constructor() {
        super({key: 'AlchemyStand'});
    }

    public init({opts, closeCallback, prevScene, itemsOnStand = new Map(), name}: AlchemyStandInitParams) {
        super.init({opts, closeCallback, prevScene});
        this.name = name;
        this.itemsOnStand = itemsOnStand;
    }

    public preload() {

    }

    public create() {
        super.create();
        this.numberOfQuickSlots = this.player.getItemInSlot("belt")?.specifics.quickSlots || 1;
        this._showAlchemyStand();
    }

    private _showAlchemyStand() {
        this._drawAlchemyStand();

        this._drawDoll();
        this._drawQuickSlots();
        this._drawBackpack();
        this._createItemsMap(new Map<Slots, Item>([...this.player.getAllItems(), ...this.itemsOnStand]), (fromSlot: Slots, toSlot: Slots, itemR: ItemRepresentation, swappingIsFinished?: boolean) => {

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

    private _drawAlchemyStand() {
        const standX = this.opts.windowWidth - 20 - 64 * 5;
        const standY = 20 + 64 * 5 + 20;
        this.add.text(this.opts.windowX + standX, this.opts.windowY + standY, `${this.name}:`, {
            font: 'bold 16px Arial',
            fill: '000000',
        });
        const takeAllButton = this.add.text(this.opts.windowWidth - 20 - 55, this.opts.windowY + standY, `Take All`, {
            font: 'bold 16px Arial',
            fill: this.opts.closeButtonColor,
            backgroundColor: 'lightgrey',
            fixedWidth: 70,
            align: 'center',
        });
        this.add.graphics()
            .lineStyle(this.opts.borderThickness, this.opts.borderColor, this.opts.borderAlpha)
            .strokeRect(takeAllButton.x, takeAllButton.y, takeAllButton.width, takeAllButton.height);
        takeAllButton.setInteractive({useHandCursor: true}).on('pointerdown', () => this._takeAllItems());
        this.input.keyboard.on('keydown-' + 'SPACE', () => this._takeAllItems());

        const standSlotCoords = {
            componentSlot0: {x: standX, y: standY + 20},
            componentSlot1: {x: standX, y: standY + 20 + 64},
            componentSlot2: {x: standX, y: standY + 20 + 64 * 2},
            vesselSlot: {x: standX + 64 * 2, y: standY + 20 + 64},
            resultSlot: {x: standX + 64 * 4, y: standY + 20 + 64},
        }
        Object.entries(standSlotCoords).forEach(([name, coords]) => this._createSlot(name, coords.x, coords.y));
        drawArrow(this,
            this.opts.windowX + standX + 64 + 5, this.opts.windowY + standY + 20 + 32,
            this.opts.windowX + standX + 64 * 2 - 5, this.opts.windowY + standY + 20 + 64 + 32 - 10);
        drawArrow(this,
            this.opts.windowX + standX + 64 + 5, this.opts.windowY + standY + 20 + 64 + 32,
            this.opts.windowX + standX + 64 * 2 - 5, this.opts.windowY + standY + 20 + 64 + 32);
        drawArrow(this,
            this.opts.windowX + standX + 64 + 5, this.opts.windowY + standY + 20 + 64 * 2 + 32,
            this.opts.windowX + standX + 64 * 2 - 5, this.opts.windowY + standY + 20 + 64 + 32 + 10);
        drawArrow(this,
            this.opts.windowX + standX + 64 * 2 + 5 + 64, this.opts.windowY + standY + 20 + 64 + 32,
            this.opts.windowX + standX + 64 * 2 - 5 + 64 * 2, this.opts.windowY + standY + 20 + 64 + 32);
        this._drawBrewButton();
    }

    private _drawBrewButton() {
        const buttonX = this.opts.windowX + this.opts.windowWidth - 20 - 64 * 5 + 64 * 2;
        const buttonY = 20 + 64 * 5 + 20 + 20 + 64 * 2 + 32;

        const brewBtn = this.add.text(buttonX, buttonY, 'Brew', {
            font: 'bold 16px Arial',
            fill: this.opts.closeButtonColor,
            backgroundColor: 'lightgrey',
            fixedWidth: 64,
            align: 'center',
        }).setScrollFactor(0).setDepth(this.opts.baseDepth).setInteractive({useHandCursor: true});

        this.add.graphics()
            .lineStyle(this.opts.borderThickness, this.opts.borderColor, this.opts.borderAlpha)
            .strokeRect(brewBtn.x, brewBtn.y, brewBtn.width, brewBtn.height);

        brewBtn.on('pointerover', () => brewBtn.setColor(this.opts.closeButtonHoverColor));
        brewBtn.on('pointerout', () => brewBtn.setColor(this.opts.closeButtonColor));
        brewBtn.on('pointerdown', () => this._brew());
    }

    private _brew() {
        const component1 = this.itemsMap.get('componentSlot0')?.item;
        const component2 = this.itemsMap.get('componentSlot1')?.item;
        const component3 = this.itemsMap.get('componentSlot2')?.item;
        const vessel = this.itemsMap.get('vesselSlot')?.item;
        const result = this.itemsMap.get('resultSlot')?.item;
        let requiredComponents;
        const matchingRecipe = Object.values(recipes).find((recipe) => {
            requiredComponents = this._testRecipe(recipe, [component1, component2, component3], vessel);
            return requiredComponents;
        })
        console.log(matchingRecipe, requiredComponents);
        if (requiredComponents) {
            if(result === undefined || (result.itemId === matchingRecipe.result && result.stackable === true)) {
                requiredComponents.forEach(requiredComponent => {
                    this._changeItemQuantity(`componentSlot${requiredComponent.componentNumber}` as Slots, requiredComponent.component.quantity - requiredComponent.requiredQuantity);
                })
                this._changeItemQuantity(`vesselSlot` as Slots, vessel.quantity - 1);
                if (result === undefined) {
                    this._createItemRepresentation(new Item(matchingRecipe.result, 1), 'resultSlot');
                } else {
                    this._changeItemQuantity(`resultSlot`, result.quantity + 1);
                }
            }
        }
    }

    private _testRecipe(recipe, components: Item[], vessel: Item) {
        if (components.every(component => !component)) return false;
        const list = [recipe.component1, recipe.component2, recipe.component3];
        const requiredQuantities = [];
        for (let i = 0; i < components.length; i++) {
            let found = false;
            for (let j = 0; j < list.length; j++) {
                const matchingComponent = list[j].find(componentInList => componentInList.id === components[i]?.itemId && componentInList.quantity <= components[i]?.quantity)
                if (matchingComponent !== undefined || (list[j].length === 0 && components[i] === undefined)) {
                    found = true;
                    list.splice(j, 1);
                    if (matchingComponent) requiredQuantities.push({
                        component: components[i],
                        componentNumber: i,
                        requiredQuantity: matchingComponent.quantity
                    })
                    break;
                }
            }
            if (!found) return false;
        }
        if (recipe.vessel === vessel?.itemId) {
            return requiredQuantities;
        } else {
            return false;
        }
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
        alchemyStandSlotNames.forEach(slotName => {
            if (this.itemsMap.get(slotName)) {
                this._moveItemToBackpack(slotName);
            }
        })
    }

    public closeScene() {
        const itemsOnStand = [...this.itemsMap]
            .filter(([slot, itemR]) => slot.includes('componentSlot') || slot.includes('vesselSlot') || slot.includes('resultSlot'))
            .map(([slot, itemR]): [Slots, Item] => [slot, itemR.item]);
        this.closeCallback(new Map([...itemsOnStand]));
        super.closeScene();
    }
}
