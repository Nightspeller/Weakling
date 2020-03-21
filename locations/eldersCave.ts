import {GeneralLocation} from "./generalLocation.js";
import Npc from "../entities/npc.js";
import {liatshDialog} from "../data/dialogs/eldersCave/liatshDialog.js";

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
        const liatsh = new Npc({
            scene: this,
            mapObjectName: 'Liatsh',
            initDialog: liatshDialog
        });
    }

    public update() {
        super.update();
    }
}
