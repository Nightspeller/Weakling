define(["require", "exports", "../generalNpc", "../../../data/dialogs/eldersCave/liatshDialog"], function (require, exports, generalNpc_1, liatshDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LiatshNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Liatsh',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: liatshDialog_1.default,
                interactionCallback: ( /* param */) => {
                },
            });
        }
    }
    exports.default = LiatshNpc;
});
//# sourceMappingURL=liatshNpc.js.map