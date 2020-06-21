import GeneralNpc from "../generalNpc.js";
import { farmerJoeDialog } from "../../data/dialogs/tavern/farmerJoeDialog.js";
export class FarmerJoeNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
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
//# sourceMappingURL=farmerJoeNpc.js.map