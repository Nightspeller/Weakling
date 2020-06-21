import GeneralNpc from "../generalNpc.js";
import { elderFirstTimeDialog, elderSecondTimeDialog } from "../../data/dialogs/village/elderGreetingDialog.js";
import { elderInstance } from "../../characters/adventurers/elder.js";
export class ElderNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        super({
            scene,
            name: 'Elder Guarthh',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: elderFirstTimeDialog,
            interactionCallback: (param) => {
                scene.player.updateQuest('bigCaltorTrip', 'talkedToElder');
                this.setDialog(elderSecondTimeDialog, (param) => {
                    if (param === 'readyToGo') {
                        this.destroy();
                        scene.player.party.push(elderInstance);
                        scene.player.updateQuest('bigCaltorTrip', 'readyToGo');
                    }
                });
            }
        });
    }
}
//# sourceMappingURL=elderNpc.js.map