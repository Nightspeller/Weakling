import { GeneralLocation } from "./generalLocation.js";
import { BartenderNpc } from "../npcs/tavern/bartenderNpc.js";
import { FarmerJoeNpc } from "../npcs/tavern/farmerJoeNpc.js";
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
        const bartender = new BartenderNpc({ scene: this });
        const farmerJoe = new FarmerJoeNpc({ scene: this });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=tavern.js.map