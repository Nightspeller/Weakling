import GeneralNpc from "../generalNpc.js";
import { moorshDialog } from "../../data/dialogs/village/moorshDialog.js";
export class MoorshNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        super({
            scene,
            name: 'Moorsh',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: moorshDialog,
            interactionCallback: (param) => {
                if (param === 'boneQuestAccepted') {
                    scene.player.addQuest('bonesPicking');
                }
            }
        });
    }
}
//# sourceMappingURL=moorshNpc.js.map