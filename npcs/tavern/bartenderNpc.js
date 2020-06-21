import GeneralNpc from "../generalNpc.js";
import { bartenderDialog, bartenderNoRumoresDialog } from "../../data/dialogs/tavern/bartenderDialog.js";
export class BartenderNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        super({
            scene,
            name: 'Bartender',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: bartenderDialog,
            interactionCallback: (param) => {
                if (param === 'beerAndRumorObtained') {
                    scene.player.addItemToInventory('beer', 1, undefined, scene);
                    this.setDialog(bartenderNoRumoresDialog);
                }
                if (param === 'openShop') {
                    this.startTrade();
                }
            },
            items: [
                { itemId: 'copper-pieces', quantity: 40 },
                { itemId: 'beer', quantity: 5 },
                { itemId: 'pumpkin', quantity: 2 },
                { itemId: 'apple', quantity: 3 },
                { itemId: 'carrot', quantity: 4 },
            ],
        });
    }
}
//# sourceMappingURL=bartenderNpc.js.map