import GeneralNpc from "../generalNpc.js";
import { limeDialog, limeSecondDialog } from "../../data/dialogs/honeywood/limeDialog.js";
export class LimeNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        super({
            scene,
            name: 'Lime',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: limeDialog,
            interactionCallback: (param) => {
                if (param === 'seedsObtained') {
                    scene.player.addItemToInventory('chamomile-seeds', 3);
                    this.setDialog(limeSecondDialog);
                }
            },
            items: [
                { itemId: 'chamomile-seeds', quantity: 10 },
                { itemId: 'chamomile', quantity: 5 },
            ],
        });
    }
}
//# sourceMappingURL=limeNpc.js.map