import Item from "../../entities/item.js";
import {
    alchemyStandSlotNames,
    backpackSlotNames,
} from "../../data/items/itemSlots.js";
import drawArrow from "../../helpers/drawArrow.js";
import {recipes} from "../../data/recipes.js";
import {InventoryOverlayScene} from "./inventoryOverlayScene.js";

interface AlchemyStandInitParams {
    opts?: OverlaySceneOptions,
    closeCallback?: Function,
    prevScene: string,
    itemsOnStand?: Map<Slots, Item>,
    name: string
}

export class AlchemyStandScene extends InventoryOverlayScene {
    private name: string;
    private itemsOnStand: Map<Slots, Item>;

    constructor(initObject = {key: 'AlchemyStand'}) {
        super(initObject);
    }

    public init({opts, closeCallback, prevScene, itemsOnStand = new Map(), name}: AlchemyStandInitParams) {
        super.init({opts, closeCallback, prevScene});
        this.name = name;
        this.itemsOnStand = itemsOnStand;
    }

    public create() {
        super.create(false);
        this._drawAlchemyStand();
        this.itemsOnStand.forEach(this._createItemRepresentation.bind(this));
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

        const brewBtn = this.add.text(buttonX, buttonY, 'Make', {
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
            if(result === undefined || (result.itemId === matchingRecipe.result.id && result.stackable === true)) {
                requiredComponents.forEach(requiredComponent => {
                    this._changeItemQuantity(`componentSlot${requiredComponent.componentNumber}` as Slots, requiredComponent.component.quantity - requiredComponent.requiredQuantity);
                })
                if (vessel) this._changeItemQuantity(`vesselSlot` as Slots, vessel.quantity - 1);
                if (result === undefined) {
                    this._createItemRepresentation(new Item(matchingRecipe.result.id, matchingRecipe.result.quantity), 'resultSlot');
                } else {
                    this._changeItemQuantity(`resultSlot`, result.quantity + matchingRecipe.result.quantity);
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

    private _takeAllItems() {
        alchemyStandSlotNames.forEach(slotName => {
            if (this.itemsMap.get(slotName)) {
                this._moveItemFromSlotToFirstPossible(slotName, backpackSlotNames);
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
