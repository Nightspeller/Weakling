import { Location } from "../entities/location.js";
export class HouseScene extends Location {
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