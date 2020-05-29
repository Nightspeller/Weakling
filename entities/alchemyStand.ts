import {GeneralLocation} from "../locations/generalLocation.js";
import Item from "./item.js";
import {Trigger} from "./trigger.js";

interface AlchemyStandParams {
    scene: GeneralLocation,
    name: string,
    triggerX: number,
    triggerY: number,
    triggerW: number,
    triggerH: number,
    texture: string,
    frame: number,
    workingTexture?: string,
    workingFrame?: number,
}

export default class AlchemyStand extends Trigger {
    private items: Map<Slots, Item>;

    constructor(
        {
            scene,
            name,
            triggerX,
            triggerY,
            triggerW,
            triggerH,
            texture,
            frame,
            workingTexture,
            workingFrame,
        }: AlchemyStandParams
    ) {
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
                        } else {
                            this.image.setTexture(texture, frame);
                        }
                    }
                }, false)
            },
        });
        this.items = new Map<Slots, Item>();
    }
}
