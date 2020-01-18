import {items} from "../actionsAndEffects/items.js";

export default class Npc {
    public inventory: Item[];
    private image: Phaser.Physics.Arcade.Image;

    constructor(scene, name: string, position, texture: string, frame: number, dialog?: DialogTree, items?: any[]) {

        this.image = scene.physics.add
            .image(position['x'], position['y'], 'fisherman', 1)
            .setOrigin(0, 0)
            .setDisplaySize(position['width'], position['height'])
            .setImmovable();
        let isDialogClosed = true;
        scene.physics.add.collider(scene.playerImage, this.image, () => {
            if (isDialogClosed) {
                isDialogClosed = false;
                scene.modalDialog.showDialog(dialog, scene.player, {}, (param) => {
                    isDialogClosed = true;
                });
            }
        });

        this.inventory = [];
        items?.forEach(item => this.addItemToInventory(item.itemId, item.quantity));
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
