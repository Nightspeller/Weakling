import { Location } from "../entities/location.js";
import Npc from "../entities/npc.js";
import { bartenderDialog, bartenderNoRumoresDialog } from "../dialogs/tavern/bartenderDialog.js";
export class TavernScene extends Location {
    constructor() {
        super({ key: 'Tavern' });
    }
    preload() {
        this.preparePlugins();
    }
    init() {
    }
    create() {
        this.prepareMap('tavern');
        const bartender = new Npc(this, 'Bartender', this.getMapObject("Bartender"), 'bartender', 1, bartenderDialog, param => {
            if (param === 'beerAndRumorObtained') {
                this.player.addItemToInventory('beer', 1);
                bartender.setDialog(bartenderNoRumoresDialog);
            }
            if (param === 'openShop') {
                this.switchToScene('Shop', {
                    player: this.player,
                    trader: bartender
                }, false);
            }
        }, [
            { itemId: 'copper-pieces', quantity: 10 },
            { itemId: 'dagger-weapon', quantity: 1 },
            { itemId: 'leather-armor', quantity: 1 },
            { itemId: 'leather-pants', quantity: 1 },
            { itemId: 'leather-boots', quantity: 1 },
        ]);
    }
    update() {
        this.updatePlayer();
    }
}
//# sourceMappingURL=tavern.js.map