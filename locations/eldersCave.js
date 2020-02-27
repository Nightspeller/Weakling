import { GeneralLocation } from "./generalLocation.js";
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
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=eldersCave.js.map