import Item from "./item.js";
export default class Npc {
    constructor({ scene, name, mapObjectName, mapObjectLayer = 'Objects', texture, frame, initDialog, items = [], interactionCallback = () => { } }) {
        const mapObject = scene.getMapObject(mapObjectName, mapObjectLayer);
        this.name = name ? name : mapObject.name;
        if (initDialog) {
            this.dialog = initDialog;
            this.interactionCallback = interactionCallback;
            if (mapObject['gid'] && !texture) {
                const params = scene.getSpriteParamsByObjectName(mapObject.name);
                texture = params.key;
                frame = params.frame;
            }
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
            }).image;
        }
        else {
            this.image = scene.createTrigger({
                objectName: mapObject.name,
                texture: texture,
                frame: frame,
                callback: () => {
                    this.interactionCallback = interactionCallback || (() => {
                    });
                    this.interactionCallback();
                }
            }).image;
        }
        this.inventory = [];
        items === null || items === void 0 ? void 0 : items.forEach(item => this.addItemToInventory(item.itemId, item.quantity));
    }
    setDialog(newDialog, newInteractionCallback) {
        this.dialog = newDialog;
        if (newInteractionCallback)
            this.interactionCallback = newInteractionCallback;
    }
    addItemToInventory(passedItem, quantity = 1) {
        let item;
        if (typeof passedItem === "string") {
            item = new Item(passedItem, quantity);
        }
        else {
            item = passedItem;
        }
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