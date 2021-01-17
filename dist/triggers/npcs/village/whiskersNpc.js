define(["require", "exports", "../generalNpc", "../../../data/dialogs/village/whiskersDialog"], function (require, exports, generalNpc_1, whiskersDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WhiskersNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Whiskers',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: whiskersDialog_1.whiskersDialog,
                interactionCallback: () => {
                    this.setDialog(whiskersDialog_1.whiskersSecondDialog);
                },
            });
        }
    }
    exports.default = WhiskersNpc;
});
//# sourceMappingURL=whiskersNpc.js.map