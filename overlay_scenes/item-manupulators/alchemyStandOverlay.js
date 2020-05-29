import Item from "../../entities/item.js";
import { GeneralItemManipulatorScene } from "./generalItemManipulator.js";
import { alchemyStandSlotNames, backpackSlotNames, dollSlotNames, quickSlotNames } from "../../data/items/itemSlots.js";
import drawArrow from "../../helpers/drawArrow.js";
import { recipes } from "../../data/recipes.js";
export class AlchemyStandScene extends GeneralItemManipulatorScene {
    constructor() {
        super({ key: 'AlchemyStand' });
    }
    init({ opts, closeCallback, prevScene, itemsOnStand = new Map(), name }) {
        super.init({ opts, closeCallback, prevScene });
        this.name = name;
        this.itemsOnStand = itemsOnStand;
    }
    preload() {
    }
    create() {
        var _a;
        super.create();
        this.numberOfQuickSlots = ((_a = this.player.getItemInSlot("belt")) === null || _a === void 0 ? void 0 : _a.specifics.quickSlots) || 1;
        this._showAlchemyStand();
    }
    _showAlchemyStand() {
        this._drawAlchemyStand();
        this._drawDoll();
        this._drawQuickSlots();
        this._drawBackpack();
        this._createItemsMap(new Map([...this.player.getAllItems(), ...this.itemsOnStand]), (fromSlot, toSlot, itemR, swappingIsFinished) => {
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
    _drawAlchemyStand() {
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
        takeAllButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this._takeAllItems());
        this.input.keyboard.on('keydown-' + 'SPACE', () => this._takeAllItems());
        const standSlotCoords = {
            componentSlot0: { x: standX, y: standY + 20 },
            componentSlot1: { x: standX, y: standY + 20 + 64 },
            componentSlot2: { x: standX, y: standY + 20 + 64 * 2 },
            vesselSlot: { x: standX + 64 * 2, y: standY + 20 + 64 },
            resultSlot: { x: standX + 64 * 4, y: standY + 20 + 64 },
        };
        Object.entries(standSlotCoords).forEach(([name, coords]) => this._createSlot(name, coords.x, coords.y));
        drawArrow(this, this.opts.windowX + standX + 64 + 5, this.opts.windowY + standY + 20 + 32, this.opts.windowX + standX + 64 * 2 - 5, this.opts.windowY + standY + 20 + 64 + 32 - 10);
        drawArrow(this, this.opts.windowX + standX + 64 + 5, this.opts.windowY + standY + 20 + 64 + 32, this.opts.windowX + standX + 64 * 2 - 5, this.opts.windowY + standY + 20 + 64 + 32);
        drawArrow(this, this.opts.windowX + standX + 64 + 5, this.opts.windowY + standY + 20 + 64 * 2 + 32, this.opts.windowX + standX + 64 * 2 - 5, this.opts.windowY + standY + 20 + 64 + 32 + 10);
        drawArrow(this, this.opts.windowX + standX + 64 * 2 + 5 + 64, this.opts.windowY + standY + 20 + 64 + 32, this.opts.windowX + standX + 64 * 2 - 5 + 64 * 2, this.opts.windowY + standY + 20 + 64 + 32);
        this._drawBrewButton();
    }
    _drawBrewButton() {
        const buttonX = this.opts.windowX + this.opts.windowWidth - 20 - 64 * 5 + 64 * 2;
        const buttonY = 20 + 64 * 5 + 20 + 20 + 64 * 2 + 32;
        const brewBtn = this.add.text(buttonX, buttonY, 'Brew', {
            font: 'bold 16px Arial',
            fill: this.opts.closeButtonColor,
            backgroundColor: 'lightgrey',
            fixedWidth: 64,
            align: 'center',
        }).setScrollFactor(0).setDepth(this.opts.baseDepth).setInteractive({ useHandCursor: true });
        this.add.graphics()
            .lineStyle(this.opts.borderThickness, this.opts.borderColor, this.opts.borderAlpha)
            .strokeRect(brewBtn.x, brewBtn.y, brewBtn.width, brewBtn.height);
        brewBtn.on('pointerover', () => brewBtn.setColor(this.opts.closeButtonHoverColor));
        brewBtn.on('pointerout', () => brewBtn.setColor(this.opts.closeButtonColor));
        brewBtn.on('pointerdown', () => this._brew());
    }
    _brew() {
        var _a, _b, _c, _d, _e;
        const component1 = (_a = this.itemsMap.get('componentSlot0')) === null || _a === void 0 ? void 0 : _a.item;
        const component2 = (_b = this.itemsMap.get('componentSlot1')) === null || _b === void 0 ? void 0 : _b.item;
        const component3 = (_c = this.itemsMap.get('componentSlot2')) === null || _c === void 0 ? void 0 : _c.item;
        const vessel = (_d = this.itemsMap.get('vesselSlot')) === null || _d === void 0 ? void 0 : _d.item;
        const result = (_e = this.itemsMap.get('resultSlot')) === null || _e === void 0 ? void 0 : _e.item;
        let requiredComponents;
        const matchingRecipe = Object.values(recipes).find((recipe) => {
            requiredComponents = this._testRecipe(recipe, [component1, component2, component3], vessel);
            return requiredComponents;
        });
        console.log(matchingRecipe, requiredComponents);
        if (requiredComponents) {
            if (result === undefined || (result.itemId === matchingRecipe.result && result.stackable === true)) {
                requiredComponents.forEach(requiredComponent => {
                    this._changeItemQuantity(`componentSlot${requiredComponent.componentNumber}`, requiredComponent.component.quantity - requiredComponent.requiredQuantity);
                });
                this._changeItemQuantity(`vesselSlot`, vessel.quantity - 1);
                if (result === undefined) {
                    this._createItemRepresentation(new Item(matchingRecipe.result, 1), 'resultSlot');
                }
                else {
                    this._changeItemQuantity(`resultSlot`, result.quantity + 1);
                }
            }
        }
    }
    _testRecipe(recipe, components, vessel) {
        if (components.every(component => !component))
            return false;
        const list = [recipe.component1, recipe.component2, recipe.component3];
        const requiredQuantities = [];
        for (let i = 0; i < components.length; i++) {
            let found = false;
            for (let j = 0; j < list.length; j++) {
                const matchingComponent = list[j].find(componentInList => { var _a, _b; return componentInList.id === ((_a = components[i]) === null || _a === void 0 ? void 0 : _a.itemId) && componentInList.quantity <= ((_b = components[i]) === null || _b === void 0 ? void 0 : _b.quantity); });
                if (matchingComponent !== undefined || (list[j].length === 0 && components[i] === undefined)) {
                    found = true;
                    list.splice(j, 1);
                    if (matchingComponent)
                        requiredQuantities.push({
                            component: components[i],
                            componentNumber: i,
                            requiredQuantity: matchingComponent.quantity
                        });
                    break;
                }
            }
            if (!found)
                return false;
        }
        if (recipe.vessel === (vessel === null || vessel === void 0 ? void 0 : vessel.itemId)) {
            return requiredQuantities;
        }
        else {
            return false;
        }
    }
    _drawDoll() {
        this.add.sprite(this.opts.windowX + 16, this.opts.windowY + 20, 'doll')
            .setOrigin(0, 0).setScale(0.75).setScrollFactor(0).setDepth(this.opts.baseDepth);
        const dollZoneCoords = {
            rightHand: { x: 16, y: 78 },
            leftHand: { x: 281, y: 246 },
            belt: { x: 202, y: 246 },
            head: { x: 202, y: 20 },
            neck: { x: 202, y: 92 },
            bag: { x: 357, y: 20 },
            ringLeft: { x: 357, y: 246 },
            ringRight: { x: 86, y: 78 },
            body: { x: 202, y: 246 - 77 },
            cape: { x: 287, y: 246 + 82 },
            gloves: { x: 16, y: 78 + 80 },
            tail: { x: 94, y: 246 + 86 },
            pants: { x: 208, y: 246 + 82 },
            boots: { x: 210, y: 246 + 162 },
        };
        Object.entries(dollZoneCoords).forEach(([name, coords]) => {
            const zone = this._createSlot(name, coords.x, coords.y, true);
            /*this.add.graphics()
                .fillStyle(0xff0000, 1)
                .fillRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height);*/
        });
    }
    _drawQuickSlots() {
        for (let i = 0; i < this.numberOfQuickSlots; i++) {
            this._createSlot(`quickSlot${i}`, 16 + 64 * i, this.opts.windowHeight - 64 - 16);
        }
    }
    _drawBackpack() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const slotX = this.opts.windowWidth - 20 - 64 * 5 + 64 * i;
                const slotY = 20 + 64 * j;
                this._createSlot(`backpack${i}_${j}`, slotX, slotY);
            }
        }
    }
    _adjustQuickSlots() {
        var _a;
        const oldQuickSlotsNumber = this.numberOfQuickSlots;
        const newQuickSlotsNumber = ((_a = this.player.getItemInSlot("belt")) === null || _a === void 0 ? void 0 : _a.specifics.quickSlots) || 1;
        console.log(`Adjusting quickSlots from ${oldQuickSlotsNumber} to ${newQuickSlotsNumber}`);
        this.numberOfQuickSlots = newQuickSlotsNumber;
        if (newQuickSlotsNumber < oldQuickSlotsNumber) {
            for (let i = oldQuickSlotsNumber - 1; i > newQuickSlotsNumber - 1; i--) {
                const itemToBeMoved = this.itemsMap.get(`quickSlot${i}`);
                if (itemToBeMoved) {
                    const emptyBackPackSlot = this.player.getEmptyBackpackSlot();
                    if (emptyBackPackSlot) {
                        this._moveItemFromSlotToSlot(`quickSlot${i}`, emptyBackPackSlot);
                    }
                    else {
                        this._dropItem(`quickSlot${i}`);
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
    _takeAllItems() {
        alchemyStandSlotNames.forEach(slotName => {
            if (this.itemsMap.get(slotName)) {
                this._moveItemToBackpack(slotName);
            }
        });
    }
    closeScene() {
        const itemsOnStand = [...this.itemsMap]
            .filter(([slot, itemR]) => slot.includes('componentSlot') || slot.includes('vesselSlot') || slot.includes('resultSlot'))
            .map(([slot, itemR]) => [slot, itemR.item]);
        this.closeCallback(new Map([...itemsOnStand]));
        super.closeScene();
    }
}
//# sourceMappingURL=alchemyStandOverlay.js.map