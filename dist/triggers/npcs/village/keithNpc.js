define(["require", "exports", "../generalNpc", "../../../data/dialogs/village/keithDialog"], function (require, exports, generalNpc_1, keithDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class KeithNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Farmer Keith',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: keithDialog_1.keithDialog,
                interactionCallback: (param) => {
                    if (param === 'noApology') {
                        this.setDialog(keithDialog_1.keithNoApologyDialog);
                    }
                    if (param === 'openShop') {
                        this.startTrade();
                        this.setDialog(keithDialog_1.keithShopAgainDialog);
                    }
                },
                items: [
                    { itemId: 'copper-pieces', quantity: 30 },
                    { itemId: 'carrot-seeds', quantity: 5 },
                    { itemId: 'carrot', quantity: 3 },
                    { itemId: 'strawberry-seeds', quantity: 3 },
                    { itemId: 'strawberry', quantity: 5 },
                    { itemId: 'pumpkin-seeds', quantity: 5 },
                    { itemId: 'pumpkin', quantity: 3 },
                    { itemId: 'cabbage-seeds', quantity: 5 },
                    { itemId: 'cabbage', quantity: 3 },
                    { itemId: 'basic-sack', quantity: 1 },
                ],
            });
        }
    }
    exports.default = KeithNpc;
});
//# sourceMappingURL=keithNpc.js.map