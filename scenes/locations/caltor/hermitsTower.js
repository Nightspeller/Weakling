import { GeneralLocation } from "../generalLocation.js";
import { HermitNpc } from "../../../npcs/hermitsTower/hermitNpc.js";
export class HermitsTowerScene extends GeneralLocation {
    constructor() {
        super({ key: 'HermitsTower' });
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('hermitsTower');
        const hermit = new HermitNpc({ scene: this });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=hermitsTower.js.map