import {GeneralLocation} from "./generalLocation.js";
import {GregNpc} from "../npcs/honeywood/gregNpc.js";
import {MashaNpc} from "../npcs/honeywood/mashaNpc.js";
import {LimeNpc} from "../npcs/honeywood/limeNpc.js";

export class HoneywoodScene extends GeneralLocation {
    constructor() {
        super({key: 'Honeywood'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('honeywood');

        const greg = new GregNpc({scene: this});
        const masha = new MashaNpc({scene: this});
        const limeNpc = new LimeNpc({scene: this});
    }

    public update() {
        super.update();
    }
}
