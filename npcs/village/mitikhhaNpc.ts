import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../scenes/locations/generalLocation.js";
import {
    mitikhhaDialog,
    mitikhhaSecondDialog,
    mitikhhaWelcomeBackDialog
} from "../../data/dialogs/village/mitikhhaDialog.js";

export class MitikhhaNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        super({
            scene,
            name: 'Mitikhha',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: mitikhhaDialog,
            interactionCallback: (param) => {
                this.setDialog(mitikhhaSecondDialog);
            }
        });

        this.preInteractionCallback = () => {
            if (scene.player.getQuestById('bigCaltorTrip').currentStates.includes('goodsSold')) {
                this.setDialog(mitikhhaWelcomeBackDialog, () => {
                    this.destroy();
                });
                scene.player.updateQuest('bigCaltorTrip', 'completed');
            }
        }
    }
}
