import {GeneralLocation} from "./generalLocation.js";
import Npc from "../entities/npc.js";
import {eyeballFirstTimeDialog, eyeballSecondTimeDialog} from "../data/dialogs/backCave/eyeballDialog.js";
import {elderInstance} from "../characters/adventurers/elder.js";
import {eyeballInstance} from "../characters/adventurers/eyeball.js";

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
            initDialog: eyeballFirstTimeDialog,
            interactionCallback: (param) => {
                if (param === 'fastEnd') {
                    eyeball.setDialog(eyeballSecondTimeDialog);
                }
                if (param === 'eyeballJoined') {
                    eyeball.image.destroy(true);
                    this.player.party.push(eyeballInstance);
                }
            }
        });
    }

    public update() {
        super.update();
    }
}
