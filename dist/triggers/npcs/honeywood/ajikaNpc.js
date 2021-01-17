define(["require", "exports", "../generalNpc", "../../../data/dialogs/honeywood/ajikaDialog"], function (require, exports, generalNpc_1, ajikaDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AjikaNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Ajika',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: ajikaDialog_1.ajikaDialog,
                interactionCallback: (param) => {
                    if (param === 'questObtained') {
                        this.setDialog(ajikaDialog_1.ajikaNotYetFoundDialog);
                    }
                },
                items: [],
            });
        }
    }
    exports.default = AjikaNpc;
});
//# sourceMappingURL=ajikaNpc.js.map