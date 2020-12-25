import {GeneralLocation} from "../generalLocation.js";
import {HermitNpc} from "../../../npcs/hermitsTower/hermitNpc.js";

export class HermitsTowerScene extends GeneralLocation {
    constructor() {
        super({key: 'HermitsTower'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('hermitsTower');
        const hermit = new HermitNpc({scene: this});
    }

    public update() {
        super.update();
    }
}
