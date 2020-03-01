import {GeneralLocation} from "./generalLocation.js";

export class BetweenVillageAndDungeonScene extends GeneralLocation {
    constructor() {
        super({key: 'BetweenVillageAndDungeon'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('betweenVillageAndDungeon');
    }

    public update() {
        super.update();
    }
}
