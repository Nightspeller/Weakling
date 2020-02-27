import Item from "./item.js";

export default class Npc {
    public inventory: Item[];
    public dialog: DialogTree;
    private interactionCallback: Function;
    public name: string;
    public image: Phaser.Physics.Arcade.Image;

    constructor({
                    scene,
                    name,
                    mapObjectName,
                    mapObjectLayer = 'Objects',
                    texture,
                    frame,
                    initDialog,
                    items= [],
                    interactionCallback= () => {}
                }: NpcOptions
    ) {
        const mapObject = scene.getMapObject(mapObjectName, mapObjectLayer);
        this.name = name ? name : mapObject.name;
        if (initDialog) {
            this.dialog = initDialog;
            this.interactionCallback = interactionCallback;
            if (mapObject['gid'] && !texture) {
                const params = scene.getSpriteParamsByObjectName(mapObject.name);
                texture = params.key;
                frame = params.frame as number;
            }

            this.image = scene.createTrigger({
                objectName: mapObject.name,
                texture: texture,
                frame: frame,
                callback: () => {
                    if (this.dialog) {
                        scene.switchToScene('Dialog', {
                            dialogTree: this.dialog,
                            speakerName: this.name,
                            closeCallback: (param) => {
                                this.interactionCallback(param);
                            }
                        }, false);
                    }
                }
            }).image;
        } else {
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
        items?.forEach(item => this.addItemToInventory(item.itemId, item.quantity));
    }

    public setDialog(newDialog?: DialogTree, newInteractionCallback?: Function) {
        this.dialog = newDialog;
        if (newInteractionCallback) this.interactionCallback = newInteractionCallback;
    }

    public addItemToInventory(passedItem: string | Item, quantity = 1): Item {
        let item;
        if (typeof passedItem === "string") {
            item = new Item(passedItem, quantity);
        } else {
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
