import {GeneralLocation} from "../generalLocation.js";
import {LiatshNpc} from "../../../npcs/eldersCave/liatshNpc.js";

export class EldersCaveScene extends GeneralLocation {

    constructor() {
        super({key: 'EldersCave'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('eldersCave');

        const liatsh = new LiatshNpc({scene: this});
    }

    public update() {
        super.update();
    }
}
