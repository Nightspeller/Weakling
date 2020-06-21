import GeneralNpc from "../generalNpc.js";
import { gregDialog, gregQuestAcceptedDialog } from "../../data/dialogs/caltor/gregDialog.js";
export class GregNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        super({
            scene,
            name: 'Greg',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: gregDialog,
            interactionCallback: (param) => {
                if (param === 'accept') {
                    scene.player.addQuest('gregsBucket');
                    this.setDialog(gregQuestAcceptedDialog);
                }
            }
        });
    }
}
//# sourceMappingURL=gregNpc.js.map