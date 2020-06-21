import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../locations/generalLocation.js";
import {whiskersDialog, whiskersSecondDialog} from "../../data/dialogs/village/whiskersDialog.js";
import {farmerJoeDialog} from "../../data/dialogs/tavern/farmerJoeDialog.js";

export class FarmerJoeNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        super({
            scene,
            name: 'Farmer Joe',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: farmerJoeDialog,
            interactionCallback: (param) => {
            }
        });
    }
}
