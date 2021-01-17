define(["require", "exports", "../generalNpc", "../../../data/dialogs/hermitsTower/hermitDialog"], function (require, exports, generalNpc_1, hermitDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HermitNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Hermit',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: hermitDialog_1.hermitDialogStab,
                interactionCallback: (param) => {
                    if (param === 'openShop') {
                        this.startTrade();
                    }
                },
                items: [
                    { itemId: 'copper-pieces', quantity: 10 },
                    { itemId: 'dagger-weapon', quantity: 1 },
                    { itemId: 'leather-armor', quantity: 1 },
                    { itemId: 'leather-pants', quantity: 1 },
                    { itemId: 'leather-boots', quantity: 1 },
                ],
            });
        }
    }
    exports.default = HermitNpc;
});
//# sourceMappingURL=hermitNpc.js.map