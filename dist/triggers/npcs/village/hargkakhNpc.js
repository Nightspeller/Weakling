define(["require", "exports", "../generalNpc", "../../../data/dialogs/village/hargkakhDialog"], function (require, exports, generalNpc_1, hargkakhDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HargkakhNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Hargkakh',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: hargkakhDialog_1.hargkakhFirstDialog,
                interactionCallback: (param) => {
                    if (param === 'pickupFailure') {
                        scene.player.addItemToInventory('hargkakhs-key', 1, undefined, scene);
                        this.setDialog(hargkakhDialog_1.hargkakhSecondTryDialog, (param) => {
                            if (param === 'mineralsObtained') {
                                this.setDialog(hargkakhDialog_1.hargkakhAfterGoodsObtainedDialog);
                                scene.player.addItemToInventory('minerals', 10, undefined, scene);
                                scene.player.updateQuest('bigCaltorTrip', 'mineralsObtained');
                            }
                        });
                    }
                    if (param === 'mineralsObtained') {
                        this.setDialog(hargkakhDialog_1.hargkakhAfterGoodsObtainedDialog);
                        scene.player.addItemToInventory('minerals', 10, undefined, scene);
                        scene.player.updateQuest('bigCaltorTrip', 'mineralsObtained');
                    }
                },
            });
        }
    }
    exports.default = HargkakhNpc;
});
//# sourceMappingURL=hargkakhNpc.js.map