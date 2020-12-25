import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../scenes/locations/generalLocation.js";
import {
    gregAfterQuestFinishedDialog,
    gregDialog,
    gregQuestAcceptedDialog
} from "../../data/dialogs/honeywood/gregDialog.js";
import {mashaDialog, mashaSecondDialog} from "../../data/dialogs/honeywood/mashaDialog.js";

export class MashaNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        super({
            scene,
            name: 'Masha',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: mashaDialog,
            interactionCallback: (param) => {
                if (param === 'owesMoneyAndOpenShop') {
                    scene.player.addItemToInventory('copper-pieces', 5);
                    this.startTrade();
                }
                if (param === 'owesMoney') {
                    scene.player.addItemToInventory('copper-pieces', 5);
                }
                if (param === 'carrotObtained') {
                    scene.player.addItemToInventory('carrot', 1);
                }
                if (param === 'openShop') {
                    this.startTrade();
                }
                this.setDialog(mashaSecondDialog);
            },
            items: [
                {itemId: 'apple', quantity: 10},
                {itemId: 'carrot', quantity: 5},
                {itemId: 'carrot-seeds', quantity: 5},
                {itemId: 'pumpkin', quantity: 5},
                {itemId: 'pumpkin-seeds', quantity: 5},
                {itemId: 'cabbage', quantity: 5},
                {itemId: 'cabbage-seeds', quantity: 5},
                {itemId: 'rope-belt', quantity: 1},
            ],
        });
    }
}
