import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../locations/generalLocation.js";
import {gregDialog, gregQuestAcceptedDialog} from "../../data/dialogs/caltor/gregDialog.js";

export class GregNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
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
