import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../locations/generalLocation.js";
import {keithDialog, keithNoApologyDialog, keithShopAgainDialog} from "../../data/dialogs/village/keithDialog.js";

export class KeithNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        super({
            scene,
            name: 'Farmer Keith',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: keithDialog,
            interactionCallback: (param) => {
                if (param === 'noApology') {
                    this.setDialog(keithNoApologyDialog);
                }
                if (param === 'openShop') {
                    this.startTrade();
                    this.setDialog(keithShopAgainDialog);
                }
            },
            items: [
                {itemId: 'copper-pieces', quantity: 30},
                {itemId: 'carrot-seeds', quantity: 5},
                {itemId: 'carrot', quantity: 3},
                {itemId: 'strawberry-seeds', quantity: 3},
                {itemId: 'strawberry', quantity: 5},
                {itemId: 'pumpkin-seeds', quantity: 5},
                {itemId: 'pumpkin', quantity: 3},
                {itemId: 'cabbage-seeds', quantity: 5},
                {itemId: 'cabbage', quantity: 3},
            ]
        });
    }
}
