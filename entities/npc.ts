import {items} from "../actionsAndEffects/items.js";

export default class Npc {
    public inventory: Item[];
    public dialog: DialogTree;
    private interactionCallback: Function;
    public name: string;
    public image: Phaser.Physics.Arcade.Image;

    constructor(scene, name: string, mapObject: Phaser.GameObjects.GameObject, texture: string, frame: number, initDialog?: DialogTree, interactionCallback?: Function, items?: any[]) {
        this.name = name;
        if (initDialog) {
            this.dialog = initDialog;
            this.interactionCallback = interactionCallback || (() => {});
            this.image = scene.createTrigger({
                objectName: mapObject.name,
                texture: texture,
                frame: frame,
                callback: () => {
                    if (this.dialog) {
                        scene.switchToScene('Dialog', {
                            dialogTree: this.dialog,
                            closeCallback: (param) => {
                                this.interactionCallback(param);
                            }
                        }, false);
                    }
                }
            });
        } else {
            this.image = scene.createTrigger({
                objectName: mapObject.name,
                texture: texture,
                frame: frame,
                callback: () => {
                    this.interactionCallback = interactionCallback || (() => {});
                    this.interactionCallback();
                }
            });
        }

        this.inventory = [];
        items?.forEach(item => this.addItemToInventory(item.itemId, item.quantity));
    }

    public setDialog(newDialog?: DialogTree, newInteractionCallback?: Function) {
        this.dialog = newDialog;
        if(newInteractionCallback) this.interactionCallback = newInteractionCallback;
    }

    public addItemToInventory(itemId, quantity = 1): Item {
        // todo? might have to do deep copy...
        const item = {...items[itemId]};
        if (item.stackable) {
            item.quantity = quantity;
            const existingItem = this.inventory.find(existingItem => existingItem.itemId === item.itemId);
            if (existingItem) {
                existingItem.quantity += item.quantity;
                return existingItem;
            }
        }

        this.inventory.push(item);
        return item;
    }

    public removeItemFromInventory(item: Item, quantity = 1) {
        if (!this.inventory.includes(item) || quantity > item.quantity) {
            throw 'Trying to remove non-existing item (or more items than possessed)!'
        }
        if (quantity === item.quantity || !item.quantity) {
            this.inventory = this.inventory.filter(existingItem => existingItem !== item)
        } else {
            item.quantity -= quantity;
        }
    }
}
