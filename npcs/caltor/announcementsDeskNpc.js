import GeneralNpc from "../generalNpc.js";
import { announcementsDialog, announcementsEmptyDialog } from "../../data/dialogs/caltor/announcementsDialog.js";
export class AnnouncementsDeskNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
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
//# sourceMappingURL=announcementsDeskNpc.js.map