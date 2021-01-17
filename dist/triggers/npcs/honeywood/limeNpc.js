define(["require", "exports", "../generalNpc", "../../../data/dialogs/honeywood/limeDialog"], function (require, exports, generalNpc_1, limeDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LimeNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Lime',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: limeDialog_1.limeDialog,
                interactionCallback: (param) => {
                    if (param === 'seedsObtained') {
                        scene.player.addItemToInventory('chamomile-seeds', 3);
                        this.setDialog(limeDialog_1.limeSecondDialog);
                    }
                },
                items: [
                    { itemId: 'chamomile-seeds', quantity: 10 },
                    { itemId: 'chamomile', quantity: 5 },
                ],
            });
        }
    }
    exports.default = LimeNpc;
});
//# sourceMappingURL=limeNpc.js.map