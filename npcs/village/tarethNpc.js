import GeneralNpc from "../generalNpc.js";
import { tarethDialog, tarethDoneDialog, tarethSecondDialog } from "../../data/dialogs/village/tarethDialog.js";
export class TarethNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        super({
            scene,
            name: 'Tareth',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: tarethDialog,
            interactionCallback: (param) => {
                this.setDialog(tarethSecondDialog, (param) => {
                    if (param === 'potionGiven') {
                        this.setDialog(tarethDoneDialog, (param) => {
                            scene.player.updateQuest('helpTheTareth', 'completed');
                        });
                        scene.player.updateQuest('helpTheTareth', 'potionGiven');
                    }
                    else {
                        scene.player.updateQuest('helpTheTareth', 'potionToMake');
                    }
                });
                scene.player.addQuest('helpTheTareth');
            }
        });
    }
}
//# sourceMappingURL=tarethNpc.js.map