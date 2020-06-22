import GeneralNpc from "../generalNpc.js";
import { eyeballFirstTimeDialog, eyeballSecondTimeDialog, eyeballSecondTimeOfferPurplecupDialog } from "../../data/dialogs/backCave/eyeballDialog.js";
import { eyeballInstance } from "../../characters/adventurers/eyeball.js";
export class EyeballNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
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
            var _a;
            if ((_a = scene.player.getQuestById('scaredyBat')) === null || _a === void 0 ? void 0 : _a.currentStates.includes('purplecupFed')) {
                this.setDialog(eyeballSecondTimeOfferPurplecupDialog);
            }
        };
    }
}
//# sourceMappingURL=eyeballNpc.js.map