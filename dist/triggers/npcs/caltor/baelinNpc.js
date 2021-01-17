define(["require", "exports", "../generalNpc", "../../../data/dialogs/caltor/baelinDialog"], function (require, exports, generalNpc_1, baelinDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaelinNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Baelin',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: baelinDialog_1.default,
                interactionCallback: () => {
                },
            });
        }
    }
    exports.default = BaelinNpc;
});
//# sourceMappingURL=baelinNpc.js.map