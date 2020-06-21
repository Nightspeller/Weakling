import GeneralNpc from "../generalNpc.js";
import { liatshDialog } from "../../data/dialogs/eldersCave/liatshDialog.js";
export class LiatshNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        super({
            scene,
            name: 'Whiskers',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: liatshDialog,
            interactionCallback: (param) => {
            }
        });
    }
}
//# sourceMappingURL=liatshNpc.js.map