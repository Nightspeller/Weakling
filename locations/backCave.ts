import {GeneralLocation} from "./generalLocation.js";
import Npc from "../entities/npc.js";
import {eyeballFirstTimeDialog} from "../data/dialogs/backCave/eyeballDialog.js";

export class BackCaveScene extends GeneralLocation {

    constructor() {
        super({key: 'BackCave'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('backCave');

        const eyeball = new Npc({
            scene: this,
            mapObjectName: 'Eyeball',
            initDialog: eyeballFirstTimeDialog
        });
    }

    public update() {
        super.update();
    }
}
