import {GeneralLocation} from "./generalLocation.js";

export class HouseScene extends GeneralLocation {
    constructor() {
        super({key: 'House'});
    }

    public preload() {
        this.preparePlugins();
    }

    public init() {
    }

    public create() {
        this.prepareMap('house');
    }

    public update() {
        this.updatePlayer();
    }
}
