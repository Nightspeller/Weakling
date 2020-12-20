import Item from "../entities/item.js";
import { Trigger } from "../entities/trigger.js";
export default class GeneralNpc extends Trigger {
    constructor({ scene, name, triggerX, triggerY, spriteParams, initDialog, items = [], preInteractionCallback = () => { }, interactionCallback = () => {
    } }) {
        if (triggerX === undefined) {
            const mapObject = scene.getMapObject(name, 'NPCs');
            triggerX = mapObject.x;
            triggerY = mapObject.y;
            spriteParams = scene.getSpriteParamsByObjectName(name, 'NPCs') || { texture: undefined, frame: undefined };
            spriteParams.width = mapObject.width;
            spriteParams.height = mapObject.height;
        }
        super({
            scene: scene,
            name: name,
            triggerX: triggerX,
            triggerY: triggerY,
            triggerW: spriteParams.width,
            triggerH: spriteParams.height,
            texture: spriteParams.texture,
            frame: spriteParams.frame,
            callback: () => {
                this.preInteractionCallback();
                if (this.dialog) {
                    scene.switchToScene('Dialog', {
                        dialogTree: this.dialog,
                        speakerName: this.name,
                        closeCallback: (param) => {
                            this.interactionCallback(param);
                        }
                    }, false);
                }
                else {
                    this.interactionCallback = interactionCallback || (() => {
                    });
                    this.interactionCallback();
                }
            }
        });
        if (spriteParams.animation)
            this.image.anims.play(spriteParams.animation);
        this.dialog = initDialog;
        this.preInteractionCallback = preInteractionCallback;
        this.interactionCallback = interactionCallback;
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
    handlePlayerImageCollision(playerImage, collisionImage) {
        const dx = playerImage.x - collisionImage.x;
        const dy = playerImage.y - collisionImage.y;
        if (dx > -18.5 && dx < 19 && dy === -32) {
            collisionImage.anims.play(collisionImage.texture.key + '-idle-up');
        }
        else if (dx > -18.5 && dx < 19 && dy === 16) {
            collisionImage.anims.play(collisionImage.texture.key + '-idle-down');
        }
        else if (dx === -24 && dy > -16 && dy < 16) {
            collisionImage.anims.play(collisionImage.texture.key + '-idle-left');
        }
        else if (dx === 24 && dy > -25 && dy < 14) {
            collisionImage.anims.play(collisionImage.texture.key + '-idle-right');
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
//# sourceMappingURL=generalNpc.js.map