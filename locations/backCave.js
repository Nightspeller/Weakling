import { GeneralLocation } from "./generalLocation.js";
import Npc from "../entities/npc.js";
import { eyeballFirstTimeDialog, eyeballSecondTimeDialog } from "../data/dialogs/backCave/eyeballDialog.js";
import { eyeballInstance } from "../characters/adventurers/eyeball.js";
export class BackCaveScene extends GeneralLocation {
    constructor() {
        super({ key: 'BackCave' });
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
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
                    eyeball.destroy();
                    this.player.party.push(eyeballInstance);
                }
            }
        });
        eyeball.trigger.image.body.setSize(32, 32).setOffset(65, 65);
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=backCave.js.map