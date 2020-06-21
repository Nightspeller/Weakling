import GeneralNpc from "../generalNpc.js";
import { whiskersDialog, whiskersSecondDialog } from "../../data/dialogs/village/whiskersDialog.js";
export class WhiskersNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
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
//# sourceMappingURL=whiskersNpc.js.map