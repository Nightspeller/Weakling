import GeneralNpc from "../generalNpc.js";
import { nahkhaAfterGoodsObtainedDialog, nahkhaAfterTheElderDialog, nahkhaBeforeTheElderDialog } from "../../data/dialogs/village/nahkhaDialog.js";
export class NahkhaNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        super({
            scene,
            name: 'Nahkha',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: nahkhaBeforeTheElderDialog,
            interactionCallback: (param) => {
            }
        });
        this.preInteractionCallback = () => {
            if (scene.player.getQuestById('bigCaltorTrip').currentStates.includes('talkedToElder') === true &&
                scene.player.getQuestById('bigCaltorTrip').currentStates.includes('basketsObtained') === false) {
                this.setDialog(nahkhaAfterTheElderDialog, (param) => {
                    if (param === 'basketsObtained') {
                        this.setDialog(nahkhaAfterGoodsObtainedDialog);
                        scene.player.addItemToInventory('basket', 10, undefined, scene);
                        scene.player.updateQuest('bigCaltorTrip', 'basketsObtained');
                    }
                });
            }
        };
    }
}
//# sourceMappingURL=nahkhaNpc.js.map