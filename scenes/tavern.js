import { Location } from "../entities/location.js";
export class TavernScene extends Location {
    constructor() {
        super({ key: 'Tavern' });
    }
    preload() {
        this.preparePlugins();
    }
    init() {
    }
    create() {
        this.prepareMap('tavern');
    }
    update() {
        this.updatePlayer();
    }
}
//# sourceMappingURL=tavern.js.map