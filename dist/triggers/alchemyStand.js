define(["require", "exports", "./trigger"], function (require, exports, trigger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AlchemyStand extends trigger_1.default {
        constructor({ scene, name, triggerX, triggerY, triggerW, triggerH, texture, frame, workingTexture, workingFrame, }) {
            super({
                scene,
                name,
                triggerX,
                triggerY,
                triggerW,
                triggerH,
                texture,
                frame,
                interaction: 'activate',
                isSecret: false,
                callback: () => {
                    scene.switchToScene('AlchemyStand', {
                        name,
                        itemsOnStand: this.items,
                        closeCallback: (itemsOnStand) => {
                            this.items = itemsOnStand;
                            if (this.items.size !== 0 && workingFrame) {
                                this.image.setTexture(workingTexture, workingFrame);
                            }
                            else {
                                this.image.setTexture(texture, frame);
                            }
                        },
                    }, false);
                },
            });
            this.items = new Map();
        }
    }
    exports.default = AlchemyStand;
});
//# sourceMappingURL=alchemyStand.js.map