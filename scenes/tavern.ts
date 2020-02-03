import {Location} from "../entities/location.js";

export class TavernScene extends Location {
    constructor() {
        super({key: 'Tavern'});
    }

    public preload() {
        this.preparePlugins();
    }

    public init() {
    }

    public create() {
        this.prepareMap('tavern');
    }

    public update() {
        this.updatePlayer();
    }
}