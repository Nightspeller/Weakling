import GeneralNpc from "../generalNpc.js";
import {
    eyeballFirstTimeDialog,
    eyeballSecondTimeDialog,
    eyeballSecondTimeOfferPurplecupDialog
} from "../../data/dialogs/backCave/eyeballDialog.js";
import {eyeballInstance} from "../../characters/adventurers/eyeball.js";
import {GeneralLocation} from "../../locations/generalLocation.js";

export class EyeballNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        super({
            scene,
            name: 'Eyeball',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: eyeballFirstTimeDialog,
            interactionCallback: (param) => {
                if (param === 'fastEnd') {
                    this.setDialog(eyeballSecondTimeDialog);
                }
                if (param === 'wantsToHelp') {
                    scene.player.addQuest('scaredyBat');
                    this.setDialog(eyeballSecondTimeDialog);
                }
                if (param === 'eyeballJoined') {
                    scene.player.updateQuest('scaredyBat', 'completed');
                    this.destroy();
                    scene.player.party.push(eyeballInstance);
                }
            }
        });
        this.image.body.setSize(32, 32).setOffset(65, 65);

        this.preInteractionCallback = () => {
            if (scene.player.getQuestById('scaredyBat')?.currentStates.includes('signRead')) {
                this.setDialog(eyeballSecondTimeOfferPurplecupDialog);
            }
        }
    }
}
