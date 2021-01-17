define(["require", "exports", "../generalNpc", "../../../data/dialogs/honeywood/mashaDialog"], function (require, exports, generalNpc_1, mashaDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MashaNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Masha',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: mashaDialog_1.mashaDialog,
                interactionCallback: (param) => {
                    if (param === 'owesMoneyAndOpenShop') {
                        scene.player.addItemToInventory('copper-pieces', 5);
                        this.startTrade();
                    }
                    if (param === 'owesMoney') {
                        scene.player.addItemToInventory('copper-pieces', 5);
                    }
                    if (param === 'carrotObtained') {
                        scene.player.addItemToInventory('carrot', 1);
                    }
                    if (param === 'openShop') {
                        this.startTrade();
                    }
                    this.setDialog(mashaDialog_1.mashaSecondDialog);
                },
                items: [
                    { itemId: 'apple', quantity: 10 },
                    { itemId: 'carrot', quantity: 5 },
                    { itemId: 'carrot-seeds', quantity: 5 },
                    { itemId: 'pumpkin', quantity: 5 },
                    { itemId: 'pumpkin-seeds', quantity: 5 },
                    { itemId: 'cabbage', quantity: 5 },
                    { itemId: 'cabbage-seeds', quantity: 5 },
                    { itemId: 'rope-belt', quantity: 1 },
                ],
            });
        }
    }
    exports.default = MashaNpc;
});
//# sourceMappingURL=mashaNpc.js.map