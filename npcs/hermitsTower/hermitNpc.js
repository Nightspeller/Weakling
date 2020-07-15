import GeneralNpc from "../generalNpc.js";
import { hermitDialogStab } from "../../data/dialogs/hermitsTower/hermitDialog.js";
export class HermitNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
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
                { itemId: 'copper-pieces', quantity: 10 },
                { itemId: 'dagger-weapon', quantity: 1 },
                { itemId: 'leather-armor', quantity: 1 },
                { itemId: 'leather-pants', quantity: 1 },
                { itemId: 'leather-boots', quantity: 1 },
            ],
        });
    }
}
//# sourceMappingURL=hermitNpc.js.map