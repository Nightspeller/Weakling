define(["require", "exports", "../generalNpc", "../../../data/dialogs/tavern/bartenderDialog"], function (require, exports, generalNpc_1, bartenderDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BartenderNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Bartender',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: bartenderDialog_1.bartenderDialog,
                interactionCallback: (param) => {
                    if (param === 'beerAndRumorObtained') {
                        scene.player.addItemToInventory('beer', 1, undefined, scene);
                        this.setDialog(bartenderDialog_1.bartenderNoRumoresDialog);
                    }
                    if (param === 'openShop') {
                        this.startTrade();
                    }
                },
                items: [
                    { itemId: 'copper-pieces', quantity: 40 },
                    { itemId: 'beer', quantity: 5 },
                    { itemId: 'pumpkin', quantity: 2 },
                    { itemId: 'apple', quantity: 3 },
                    { itemId: 'carrot', quantity: 4 },
                ],
            });
        }
    }
    exports.default = BartenderNpc;
});
//# sourceMappingURL=bartenderNpc.js.map