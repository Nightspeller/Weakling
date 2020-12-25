import {GeneralLocation} from "../generalLocation.js";

export class DungeonScene extends GeneralLocation {
    constructor() {
        super({key: 'Dungeon'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('dungeon');
    }

    public update() {
        super.update();
    }
}
