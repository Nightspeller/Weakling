import { GeneralLocation } from "./generalLocation.js";
import Npc from "../entities/npc.js";
import { graveDialog } from "../data/dialogs/betweenVillageAndCaltor/graveDialog.js";
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
        const grave = new Npc({
            scene: this,
            mapObjectName: 'Grave',
            initDialog: graveDialog,
            interactionCallback: (param) => {
            }
        });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=betweenVillageAndCaltor.js.map