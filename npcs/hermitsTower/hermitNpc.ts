import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../scenes/locations/generalLocation.js";
import {hermitDialogStab} from "../../data/dialogs/hermitsTower/hermitDialog.js";

export class HermitNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        super({
            scene,
            name: 'Hermit',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: hermitDialogStab,
            interactionCallback: (param) => {
                if (param === 'openShop') {
                    this.startTrade();
                }
            },
            items: [
                {itemId: 'copper-pieces', quantity: 10},
                {itemId: 'dagger-weapon', quantity: 1},
                {itemId: 'leather-armor', quantity: 1},
                {itemId: 'leather-pants', quantity: 1},
                {itemId: 'leather-boots', quantity: 1},
            ],
        });
    }
}
