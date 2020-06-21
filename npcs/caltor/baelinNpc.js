import GeneralNpc from "../generalNpc.js";
import { baelinDialog } from "../../data/dialogs/caltor/baelinDialog.js";
export class BaelinNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
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
//# sourceMappingURL=baelinNpc.js.map