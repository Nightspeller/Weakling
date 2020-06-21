import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../locations/generalLocation.js";

export class KasimaNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        super({
            scene,
            name: 'Kasima',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            interactionCallback: (param) => {
                this.startTrade();
            },
            items: [
                {itemId: 'copper-pieces', quantity: 200},
                {itemId: 'rope-belt', quantity: 1},
                {itemId: 'dagger-weapon', quantity: 1},
                {itemId: 'leather-armor', quantity: 1},
                {itemId: 'invisibility-cape', quantity: 1},
                {itemId: 'leather-gloves', quantity: 1},
            ]
        });
    }
}
