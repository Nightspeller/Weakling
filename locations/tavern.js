import { GeneralLocation } from "./generalLocation.js";
import Npc from "../entities/npc.js";
import { bartenderDialog, bartenderNoRumoresDialog } from "../data/dialogs/tavern/bartenderDialog.js";
import { farmerJoeDialog } from "../data/dialogs/tavern/farmerJoeDialog.js";
export class TavernScene extends GeneralLocation {
    constructor() {
        super({ key: 'Tavern' });
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('tavern');
        const bartender = new Npc({
            scene: this,
            mapObjectName: 'Bartender',
            initDialog: bartenderDialog,
            items: [
                { itemId: 'copper-pieces', quantity: 40 },
                { itemId: 'beer', quantity: 5 },
                { itemId: 'pumpkin', quantity: 2 },
                { itemId: 'apple', quantity: 3 },
                { itemId: 'carrot', quantity: 4 },
            ],
            interactionCallback: param => {
                if (param === 'beerAndRumorObtained') {
                    this.player.addItemToInventory('beer', 1);
                    bartender.setDialog(bartenderNoRumoresDialog);
                }
                if (param === 'openShop') {
                    bartender.startTrade();
                }
            }
        });
        const farmerJoe = new Npc({
            scene: this,
            mapObjectName: 'Farmer Joe',
            initDialog: farmerJoeDialog,
            interactionCallback: param => {
            }
        });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=tavern.js.map