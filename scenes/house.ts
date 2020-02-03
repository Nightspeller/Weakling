import {Location} from "../entities/location.js";

export class HouseScene extends Location {
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