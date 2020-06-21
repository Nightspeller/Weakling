import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../locations/generalLocation.js";
import {whiskersDialog, whiskersSecondDialog} from "../../data/dialogs/village/whiskersDialog.js";
import {
    fountainChangedDialog,
    fountainSignDialog,
    fountainVandalDialog
} from "../../data/dialogs/caltor/fountainSignDialog.js";

export class FountainNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        super({
            scene,
            name: 'Fountain sign',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: fountainSignDialog,
            interactionCallback: (param) => {
                if (scene.player.getQuestById('theSelflessSpirit')?.currentStates.includes('started')) {
                    scene.player.updateQuest('theSelflessSpirit', 'falseNameLearned');
                }
            }
        });

        this.preInteractionCallback = () => {
            if (scene.player.getQuestById('theSelflessSpirit')?.currentStates.includes('trueNameLearned') &&
                !scene.player.getQuestById('theSelflessSpirit')?.currentStates.includes('deedsGlorified')
            ) {
                this.setDialog(fountainVandalDialog, (param) => {
                    if (param === 'fountainVandalized') {
                        scene.player.updateQuest('theSelflessSpirit', 'deedsGlorified');
                        this.setDialog(fountainChangedDialog, () => {
                        });
                    }
                })
            }
        }
    }
}
