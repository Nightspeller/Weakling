import { GeneralLocation } from "./generalLocation.js";
import { LiatshNpc } from "../npcs/eldersCave/liatshNpc.js";
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
        super.create('eldersCave');
        const liatsh = new LiatshNpc({ scene: this });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=eldersCave.js.map