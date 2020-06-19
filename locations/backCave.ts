import {GeneralLocation} from "./generalLocation.js";
import Npc from "../entities/npc.js";
import {
    eyeballFirstTimeDialog,
    eyeballSecondTimeDialog,
    eyeballSecondTimeOfferPurplecupDialog
} from "../data/dialogs/backCave/eyeballDialog.js";
import {elderInstance} from "../characters/adventurers/elder.js";
import {eyeballInstance} from "../characters/adventurers/eyeball.js";
import {graveDialogWithFalseName} from "../data/dialogs/betweenVillageAndCaltor/graveDialog.js";

export class BackCaveScene extends GeneralLocation {

    constructor() {
        super({key: 'BackCave'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
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
        eyeball.trigger.image.body.setSize(32,32).setOffset(65,65);
        this.events.on('wake', (scene) => {
            if (this.player.getQuestById('scaredyEyeball')?.currentStates.includes('signRead')) {
                eyeball.setDialog(eyeballSecondTimeOfferPurplecupDialog);
            }
        })
    }

    public update() {
        super.update();
    }
}
