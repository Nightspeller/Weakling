import GeneralNpc from "../generalNpc.js";
import { hargkakhAfterGoodsObtainedDialog, hargkakhFirstDialog, hargkakhSecondTryDialog } from "../../data/dialogs/village/hargkakhDialog.js";
export class HargkakhNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        super({
            scene,
            name: 'Hargkakh',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: hargkakhFirstDialog,
            interactionCallback: (param) => {
                if (param === 'pickupFailure') {
                    scene.player.addItemToInventory('hargkakhs-key', 1, undefined, scene);
                    this.setDialog(hargkakhSecondTryDialog, (param) => {
                        if (param === 'mineralsObtained') {
                            this.setDialog(hargkakhAfterGoodsObtainedDialog);
                            scene.player.addItemToInventory('minerals', 10, undefined, scene);
                            scene.player.updateQuest('bigCaltorTrip', 'mineralsObtained');
                        }
                    });
                }
                if (param === 'mineralsObtained') {
                    this.setDialog(hargkakhAfterGoodsObtainedDialog);
                    scene.player.addItemToInventory('minerals', 10, undefined, scene);
                    scene.player.updateQuest('bigCaltorTrip', 'mineralsObtained');
                }
            }
        });
    }
}
//# sourceMappingURL=hargkakhNpc.js.map