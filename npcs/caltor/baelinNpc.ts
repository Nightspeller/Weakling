import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../locations/generalLocation.js";
import {baelinDialog} from "../../data/dialogs/caltor/baelinDialog.js";

export class BaelinNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        super({
            scene,
            name: 'Baelin',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: baelinDialog,
            interactionCallback: (param) => {
            }
        });
    }
}
