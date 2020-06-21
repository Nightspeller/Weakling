import GeneralNpc from "../generalNpc.js";
import {GeneralLocation} from "../../locations/generalLocation.js";
import {announcementsDialog, announcementsEmptyDialog} from "../../data/dialogs/caltor/announcementsDialog.js";

export class AnnouncementsDeskNpc extends GeneralNpc {
    constructor({scene, x, y, spriteParams}: { scene: GeneralLocation; x?: number; y?: number; spriteParams?: SpriteParameters }) {
        super({
            scene,
            name: 'Announcements',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            initDialog: announcementsDialog,
            interactionCallback: (param) => {
                if (param === 'questAccepted') {
                    this.setDialog(announcementsEmptyDialog);
                    scene.player.addQuest('boarsAtTheFields');
                }
            }
        });
    }
}
