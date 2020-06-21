import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../locations/generalLocation.js";
import {whiskersDialog, whiskersSecondDialog} from "../../data/dialogs/village/whiskersDialog.js";

export class WhiskersNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        super({
            scene,
            name: 'Whiskers',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: whiskersDialog,
            interactionCallback: (param) => {
                this.setDialog(whiskersSecondDialog);
            }
        });
    }
}
