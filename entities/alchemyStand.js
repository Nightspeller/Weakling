import { Trigger } from "./trigger.js";
export default class AlchemyStand extends Trigger {
    constructor({ scene, name, triggerX, triggerY, triggerW, triggerH, texture, frame, workingTexture, workingFrame, }) {
        super({
            scene: scene,
            name: name,
            triggerX: triggerX,
            triggerY: triggerY,
            triggerW: triggerW,
            triggerH: triggerH,
            texture: texture,
            frame: frame,
            interaction: 'activate',
            isSecret: false,
            callback: () => {
                scene.switchToScene('AlchemyStand', {
                    name: name,
                    itemsOnStand: this.items,
                    closeCallback: (itemsOnStand) => {
                        this.items = itemsOnStand;
                        if (this.items.size !== 0 && workingFrame) {
                            this.image.setTexture(workingTexture, workingFrame);
                        }
                        else {
                            this.image.setTexture(texture, frame);
                        }
                    }
                }, false);
            },
        });
        this.items = new Map();
    }
}
//# sourceMappingURL=alchemyStand.js.map