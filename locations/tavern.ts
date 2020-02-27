import {GeneralLocation} from "./generalLocation.js";
import Npc from "../entities/npc.js";
import {bartenderDialog, bartenderNoRumoresDialog} from "../data/dialogs/tavern/bartenderDialog.js";
import {farmerJoeDialog} from "../data/dialogs/tavern/farmerJoeDialog.js";

export class TavernScene extends GeneralLocation {
    constructor() {
        super({key: 'Tavern'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('tavern');
        const bartender = new Npc({
            scene: this,
            mapObjectName: 'Bartender',
            initDialog: bartenderDialog,
            items: [
                {itemId: 'copper-pieces', quantity: 10},
                {itemId: 'dagger-weapon', quantity: 1},
                {itemId: 'leather-armor', quantity: 1},
                {itemId: 'leather-pants', quantity: 1},
                {itemId: 'leather-boots', quantity: 1},
            ],
            interactionCallback: param => {
                if (param === 'beerAndRumorObtained') {
                    this.player.addItemToInventory('beer', 1);
                    bartender.setDialog(bartenderNoRumoresDialog)
                }
                if (param === 'openShop') {
                    this.switchToScene('Shop', {
                        player: this.player,
                        trader: bartender
                    }, false)
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

    public update() {
        super.update();
    }
}
