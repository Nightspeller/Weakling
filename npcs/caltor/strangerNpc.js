import GeneralNpc from "../generalNpc.js";
import { strangerDialog } from "../../data/dialogs/caltor/strangerDialog.js";
export class StrangerNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        super({
            scene,
            name: 'Stranger',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: strangerDialog,
            interactionCallback: (param) => {
                if (param === 'daggerObtained') {
                    scene.player.addItemToInventory('dagger-weapon', 1, undefined, scene);
                }
            }
        });
    }
}
//# sourceMappingURL=strangerNpc.js.map