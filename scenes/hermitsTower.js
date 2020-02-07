import { Location } from "../entities/location.js";
import Npc from "../entities/npc.js";
import { hermitDialog } from "../dialogs/hermitsTower/hermitDialog.js";
export class HermitsTowerScene extends Location {
    constructor() {
        super({ key: 'HermitsTower' });
    }
    preload() {
        this.preparePlugins();
    }
    init() {
    }
    create() {
        this.prepareMap('hermitsTower', 240);
        const hermit = new Npc(this, 'Hermit', this.getMapObject("Hermit"), 'stranger', 1, hermitDialog, param => {
            if (param === 'openShop') {
                this.switchToScene('Shop', {
                    player: this.player,
                    trader: hermit
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
//# sourceMappingURL=hermitsTower.js.map