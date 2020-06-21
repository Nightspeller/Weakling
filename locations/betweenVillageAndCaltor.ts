import {GeneralLocation} from "./generalLocation.js";
import {GraveNpc} from "../npcs/betweenVillageAndCaltor/graveNpc.js";

export class BetweenVillageAndCaltorScene extends GeneralLocation {
    constructor() {
        super({key: 'BetweenVillageAndCaltor'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('betweenVillageAndCaltor');

        const grave = new GraveNpc({scene: this});
    }

    public update() {
        super.update();
    }
}
