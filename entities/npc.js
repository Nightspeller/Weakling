import Item from "./item.js";
import { Trigger } from "./trigger.js";
export default class Npc {
    constructor({ scene, name, mapObjectName, mapObjectLayer = 'NPCs', texture, frame, initDialog, items = [], interactionCallback = () => {
    } }) {
        this.scene = scene;
        const mapObject = scene.getMapObject(mapObjectName, mapObjectLayer);
        this.name = name ? name : mapObject.name;
        if (mapObject['gid'] && !texture) {
            const params = scene.getSpriteParamsByObjectName(mapObject.name, mapObjectLayer);
            texture = params.key;
            frame = params.frame;
        }
        if (initDialog) {
            this.dialog = initDialog;
            this.interactionCallback = interactionCallback;
            this.image = new Trigger({
                scene: scene,
                name: mapObject.name,
                triggerX: mapObject.x,
                triggerY: mapObject.y,
                triggerW: mapObject.width,
                triggerH: mapObject.height,
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
        }
        else {
            this.image = new Trigger({
                scene: scene,
                name: mapObject.name,
                triggerX: mapObject.x,
                triggerY: mapObject.y,
                triggerW: mapObject.width,
                triggerH: mapObject.height,
                texture: texture,
                frame: frame,
                callback: () => {
                    this.interactionCallback = interactionCallback || (() => {
                    });
                    this.interactionCallback();
                }
            }).image;
        }
        this.items = new Map();
        this.numberOfSlots = 15;
        for (let i = 0; i < Math.floor(this.numberOfSlots / 5) + 1; i++) {
            const slotsInRow = Math.floor((this.numberOfSlots - 5 * i) / 5) > 0 ? 5 : this.numberOfSlots % 5;
            for (let j = 0; j < slotsInRow; j++) {
                if (items[5 * i + j]) {
                    const newItem = new Item(items[5 * i + j].itemId, items[5 * i + j].quantity);
                    this.items.set(`containerSlot${j}_${i}`, newItem);
                }
            }
        }
    }
    setDialog(newDialog, newInteractionCallback) {
        this.dialog = newDialog;
        if (newInteractionCallback)
            this.interactionCallback = newInteractionCallback;
    }
    startTrade() {
        this.scene.switchToScene('TraderOverlay', {
            name: this.name,
            numberOfSlots: this.numberOfSlots,
            items: this.items,
            closeCallback: (itemsInContainer) => {
                this.items = itemsInContainer;
            }
        }, false);
    }
    addItemsToTrade(itemsData) {
        itemsData.forEach((item) => {
            for (let i = 0; i < Math.floor(this.numberOfSlots / 5) + 1; i++) {
                const slotsInRow = Math.floor((this.numberOfSlots - 5 * i) / 5) > 0 ? 5 : this.numberOfSlots % 5;
                for (let j = 0; j < slotsInRow; j++) {
                    if (this.items.get(`containerSlot${j}_${i}`) === undefined) {
                        const newItem = new Item(item.itemId, item.quantity);
                        this.items.set(`containerSlot${j}_${i}`, newItem);
                        return;
                    }
                }
            }
            throw 'Trader is full, cant add items! Write more code to handle it properly!';
        });
    }
}
//# sourceMappingURL=npc.js.map