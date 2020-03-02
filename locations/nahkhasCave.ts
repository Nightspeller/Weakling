import {GeneralLocation} from "./generalLocation.js";

export class NahkhasCaveScene extends GeneralLocation {

    constructor() {
        super({key: 'NahkhasCave'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('nahkhasCave', 304-32*6, 128);
    }

    public update() {
        super.update();
    }
}
