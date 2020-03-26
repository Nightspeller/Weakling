import {GeneralLocation} from "./generalLocation.js";

export class GreatPlainsScene extends GeneralLocation {

    constructor() {
        super({key: 'GreatPlains'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('greatPlains');
    }

    public update() {
        super.update();
    }
}
