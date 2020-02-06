import {Location} from "../entities/location.js";
import Npc from "../entities/npc.js";
import {bartenderDialog, bartenderNoRumoresDialog} from "../dialogs/tavern/bartenderDialog.js";

export class HermitsTowerScene extends Location {
    constructor() {
        super({key: 'HermitsTower'});
    }

    public preload() {
        this.preparePlugins();
    }

    public init() {
    }

    public create() {
        this.prepareMap('hermitsTower', 240);
        /*const bartender = new Npc(this, 'Bartender', this.getMapObject("Bartender"), 'bartender', 1, bartenderDialog, param => {
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
        }, [
            {itemId: 'copper-pieces', quantity: 10},
            {itemId: 'dagger-weapon', quantity: 1},
            {itemId: 'leather-armor', quantity: 1},
            {itemId: 'leather-pants', quantity: 1},
            {itemId: 'leather-boots', quantity: 1},
        ]);*/
    }

    public update() {
        this.updatePlayer();
    }
}
