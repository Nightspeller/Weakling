import { GeneralLocation } from "./generalLocation.js";
import Npc from "../entities/npc.js";
import { liatshDialog } from "../data/dialogs/eldersCave/liatshDialog.js";
export class EldersCaveScene extends GeneralLocation {
    constructor() {
        super({ key: 'EldersCave' });
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('eldersCave', 304 - 32 * 6, 128);
        const liatsh = new Npc({
            scene: this,
            mapObjectName: 'Liatsh',
            initDialog: liatshDialog
        });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=eldersCave.js.map