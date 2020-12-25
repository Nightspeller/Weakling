import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../scenes/locations/generalLocation.js";
import {tarethDialog, tarethDoneDialog, tarethSecondDialog} from "../../data/dialogs/village/tarethDialog.js";

export class TarethNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
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
                    } else {
                        scene.player.updateQuest('helpTheTareth', 'potionToMake');
                    }
                });
                scene.player.addQuest('helpTheTareth');
            }
        });
    }
}
