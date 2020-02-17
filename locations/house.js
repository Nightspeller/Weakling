import { GeneralLocation } from "./generalLocation.js";
export class HouseScene extends GeneralLocation {
    constructor() {
        super({ key: 'House' });
    }
    preload() {
        this.preparePlugins();
    }
    init() {
    }
    create() {
        this.prepareMap('house');
    }
    update() {
        this.updatePlayer();
    }
}
//# sourceMappingURL=house.js.map