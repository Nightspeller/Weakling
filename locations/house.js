import { GeneralLocation } from "./generalLocation.js";
export class HouseScene extends GeneralLocation {
    constructor() {
        super({ key: 'House' });
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('house');
    }
    update() {
        this.updatePlayer();
    }
}
//# sourceMappingURL=house.js.map