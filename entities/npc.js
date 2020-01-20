import { items } from "../actionsAndEffects/items.js";
export default class Npc {
    constructor(scene, name, position, texture, frame, initDialog, initDialogCallback, items) {
        var _a;
        this.image = scene.physics.add
            .image(position['x'], position['y'], texture, frame)
            .setOrigin(0, 0)
            .setDisplaySize(position['width'], position['height'])
            .setImmovable();
        if (initDialog) {
            this.dialog = initDialog;
            this.dialogCallback = initDialogCallback || (() => { });
            let isDialogClosed = true;
            scene.physics.add.collider(scene.playerImage, this.image, () => {
                if (isDialogClosed && this.dialog) {
                    isDialogClosed = false;
                    scene.modalDialog.showDialog(this.dialog, scene.player, {}, (param) => {
                        isDialogClosed = true;
                        this.dialogCallback(param);
                    });
                }
            });
        }
        this.inventory = [];
        (_a = items) === null || _a === void 0 ? void 0 : _a.forEach(item => this.addItemToInventory(item.itemId, item.quantity));
    }
    setDialog(newDialog, newDialogCallback) {
        this.dialog = newDialog;
        this.dialogCallback = newDialogCallback || (() => { });
    }
    addItemToInventory(itemId, quantity = 1) {
        // todo? might have to do deep copy...
        const item = { ...items[itemId] };
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
    removeItemFromInventory(item, quantity = 1) {
        if (!this.inventory.includes(item) || quantity > item.quantity) {
            throw 'Trying to remove non-existing item (or more items than possessed)!';
        }
        if (quantity === item.quantity || !item.quantity) {
            this.inventory = this.inventory.filter(existingItem => existingItem !== item);
        }
        else {
            item.quantity -= quantity;
        }
    }
}
//# sourceMappingURL=npc.js.map