import { GeneralLocation } from "../generalLocation.js";
import { GraveNpc } from "../../../npcs/betweenVillageAndCaltor/graveNpc.js";
export class BetweenVillageAndCaltorScene extends GeneralLocation {
    constructor() {
        super({ key: 'BetweenVillageAndCaltor' });
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('betweenVillageAndCaltor');
        const grave = new GraveNpc({ scene: this });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=betweenVillageAndCaltor.js.map