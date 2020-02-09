import {Location} from "../entities/location.js";
import Npc from "../entities/npc.js";
import {bartenderDialog, bartenderNoRumoresDialog} from "../dialogs/tavern/bartenderDialog.js";

export class TavernScene extends Location {
    constructor() {
        super({key: 'Tavern'});
    }

    public preload() {
        this.preparePlugins();
    }

    public init() {
    }

    public create() {
        this.prepareMap('tavern');
        const bartender = new Npc({
            scene: this,
            mapObjectName: 'Bartender',
            texture: 'bartender',
            frame: 1,
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
    }

    public update() {
        this.updatePlayer();
    }
}
