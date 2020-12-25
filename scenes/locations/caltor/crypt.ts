import {GeneralLocation} from "../generalLocation.js";

export class CryptScene extends GeneralLocation {

    constructor() {
        super({key: 'Crypt'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('crypt');
    }

    public update() {
        super.update();
    }
}
