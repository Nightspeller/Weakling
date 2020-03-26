import {GeneralLocation} from "./generalLocation.js";

export class BackCaveScene extends GeneralLocation {

    constructor() {
        super({key: 'BackCave'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('backCave');
    }

    public update() {
        super.update();
    }
}
