define(["require", "exports", "../generalNpc", "../../../data/dialogs/caltor/announcementsDialog", "../../../characters/adventurers/player"], function (require, exports, generalNpc_1, announcementsDialog_1, player_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AnnouncementsDeskNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Announcements',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: announcementsDialog_1.announcementsDialog,
                interactionCallback: (param) => {
                    if (param === 'questAccepted') {
                        this.setDialog(announcementsDialog_1.announcementsEmptyDialog);
                        scene.player.addQuest('boarsAtTheFields');
                        if (player_1.playerInstance.defeatedEnemies.includes('caltor/Boars 1') && player_1.playerInstance.defeatedEnemies.includes('caltor/Boars 2')) {
                            player_1.playerInstance.updateQuest('boarsAtTheFields', 'boarsKilled');
                        }
                    }
                },
            });
        }
    }
    exports.default = AnnouncementsDeskNpc;
});
//# sourceMappingURL=announcementsDeskNpc.js.map