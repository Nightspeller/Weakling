import {GeneralLocation} from "../generalLocation.js";
import {BartenderNpc} from "../../../npcs/tavern/bartenderNpc.js";
import {FarmerJoeNpc} from "../../../npcs/tavern/farmerJoeNpc.js";

export class TavernScene extends GeneralLocation {
    constructor() {
        super({key: 'Tavern'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('tavern');
        const bartender = new BartenderNpc({scene: this});
        const farmerJoe = new FarmerJoeNpc({scene: this});
    }

    public update() {
        super.update();
    }
}
