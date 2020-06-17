import { GeneralLocation } from "./generalLocation.js";
import Npc from "../entities/npc.js";
import { eyeballFirstTimeDialog } from "../data/dialogs/backCave/eyeballDialog.js";
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
            initDialog: eyeballFirstTimeDialog
        });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=backCave.js.map