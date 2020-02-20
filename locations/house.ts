import {GeneralLocation} from "./generalLocation.js";

export class HouseScene extends GeneralLocation {
    constructor() {
        super({key: 'House'});
    }

    public preload() {
       super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('house');
    }

    public update() {
        this.updatePlayer();
    }
}
