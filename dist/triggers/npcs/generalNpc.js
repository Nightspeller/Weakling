define(["require", "exports", "../../entities/item", "../trigger"], function (require, exports, item_1, trigger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GeneralNpc extends trigger_1.default {
        constructor({ scene, name, triggerX, triggerY, spriteParams, initDialog, items = [], preInteractionCallback = () => {
        }, interactionCallback = () => {
        }, }) {
            if (triggerX === undefined) {
                const mapObject = scene.getMapObject(name, 'NPCs');
                triggerX = mapObject.x;
                triggerY = mapObject.y;
                spriteParams = scene.getSpriteParamsByObjectName(name, 'NPCs') || {
                    texture: undefined,
                    frame: undefined,
                };
                spriteParams.width = mapObject.width;
                spriteParams.height = mapObject.height;
            }
            super({
                scene,
                name,
                triggerX,
                triggerY,
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
                            },
                        }, false);
                    }
                    else {
                        this.interactionCallback = interactionCallback || (() => { });
                        this.interactionCallback();
                    }
                },
            });
            if (spriteParams.animation)
                this.image.anims.play(spriteParams.animation);
            this.dialog = initDialog;
            this.preInteractionCallback = preInteractionCallback;
            this.interactionCallback = interactionCallback;
            this.items = new Map();
            this.numberOfSlots = 15;
            for (let i = 0; i < Math.floor(this.numberOfSlots / 5) + 1; i += 1) {
                const slotsInRow = Math.floor((this.numberOfSlots - 5 * i) / 5) > 0 ? 5 : this.numberOfSlots % 5;
                for (let j = 0; j < slotsInRow; j += 1) {
                    if (items[5 * i + j]) {
                        const newItem = new item_1.default(items[5 * i + j].itemId, items[5 * i + j].quantity);
                        this.items.set(`containerSlot${j}_${i}`, newItem);
                    }
                }
            }
        }
        handlePlayerImageCollision(playerImage, collisionImage) {
            // to prevent the animation to play for graveNpc
            if (collisionImage.frame.texture.key === 'base-addition')
                return;
            if (collisionImage.anims == null && collisionImage.anims.currentFrame == null)
                return;
            if (playerImage.y + playerImage.body.height <= collisionImage.y - collisionImage.body.height / 2) {
                collisionImage.anims.play(`${collisionImage.texture.key}-idle-up`);
            }
            else if (playerImage.y >= collisionImage.y + collisionImage.body.height / 2) {
                collisionImage.anims.play(`${collisionImage.texture.key}-idle-down`);
            }
            else if (playerImage.x < collisionImage.x) {
                collisionImage.anims.play(`${collisionImage.texture.key}-idle-left`);
            }
            else if (playerImage.x > collisionImage.x) {
                collisionImage.anims.play(`${collisionImage.texture.key}-idle-right`);
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
                },
            }, false);
        }
        addItemsToTrade(itemsData) {
            itemsData.forEach((item) => {
                for (let i = 0; i < Math.floor(this.numberOfSlots / 5) + 1; i += 1) {
                    const slotsInRow = Math.floor((this.numberOfSlots - 5 * i) / 5) > 0 ? 5 : this.numberOfSlots % 5;
                    for (let j = 0; j < slotsInRow; j += 1) {
                        if (this.items.get(`containerSlot${j}_${i}`) === undefined) {
                            const newItem = new item_1.default(item.itemId, item.quantity);
                            this.items.set(`containerSlot${j}_${i}`, newItem);
                            return;
                        }
                    }
                }
                throw new Error('Trader is full, cant add items! Write more code to handle it properly!');
            });
        }
    }
    exports.default = GeneralNpc;
});
//# sourceMappingURL=generalNpc.js.map