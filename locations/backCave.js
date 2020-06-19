import { GeneralLocation } from "./generalLocation.js";
import Npc from "../entities/npc.js";
import { eyeballFirstTimeDialog, eyeballSecondTimeDialog, eyeballSecondTimeOfferPurplecupDialog } from "../data/dialogs/backCave/eyeballDialog.js";
import { eyeballInstance } from "../characters/adventurers/eyeball.js";
export class BackCaveScene extends GeneralLocation {
    constructor() {
        super({ key: 'BackCave' });
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('backCave');
        const eyeball = new Npc({
            scene: this,
            mapObjectName: 'Eyeball',
            initDialog: eyeballFirstTimeDialog,
            interactionCallback: (param) => {
                if (param === 'fastEnd') {
                    eyeball.setDialog(eyeballSecondTimeDialog);
                }
                if (param === 'wantsToHelp') {
                    this.player.addQuest('scaredyEyeball');
                    eyeball.setDialog(eyeballSecondTimeDialog);
                }
                if (param === 'eyeballJoined') {
                    this.player.updateQuest('scaredyEyeball', 'completed');
                    eyeball.destroy();
                    this.player.party.push(eyeballInstance);
                }
            }
        });
        eyeball.trigger.image.body.setSize(32, 32).setOffset(65, 65);
        this.events.on('wake', (scene) => {
            var _a;
            if ((_a = this.player.getQuestById('scaredyEyeball')) === null || _a === void 0 ? void 0 : _a.currentStates.includes('signRead')) {
                eyeball.setDialog(eyeballSecondTimeOfferPurplecupDialog);
            }
        });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=backCave.js.map