import {GeneralLocation} from "./generalLocation.js";

export class DungeonLevel1Scene extends GeneralLocation {
    constructor() {
        super({key: 'DungeonLevel1'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('dungeonLevel1');
    }

    public update() {
        super.update();
    }
}
