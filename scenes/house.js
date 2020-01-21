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
        this.createTrigger('Caltor', () => {
            this.switchToScene('Caltor');
        });
    }
    update() {
        this.updatePlayer();
    }
}
//# sourceMappingURL=house.js.map