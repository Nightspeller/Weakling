import {GeneralLocation} from "./generalLocation.js";

export class EldersCaveScene extends GeneralLocation {

    constructor() {
        super({key: 'EldersCave'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('eldersCave', 304-32*6, 128);
    }

    public update() {
        super.update();
    }
}
