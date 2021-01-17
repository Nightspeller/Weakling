define(["require", "exports", "../generalNpc", "../../../data/dialogs/caltor/bodgerDialog"], function (require, exports, generalNpc_1, bodgerDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BodgerNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Bodger',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: bodgerDialog_1.default,
                interactionCallback: (param) => {
                    if (param === 'openShop') {
                        this.startTrade();
                    }
                    if (param === 'goodsSold') {
                        scene.player.addItemToInventory('copper-pieces', 100, undefined, scene);
                        this.addItemsToTrade([
                            { itemId: 'minerals', quantity: 10 },
                            { itemId: 'basket', quantity: 10 },
                        ]);
                        scene.player.updateQuest('bigCaltorTrip', 'goodsSold');
                    }
                    if (param === 'goodsSoldAndOpenShop') {
                        scene.player.addItemToInventory('copper-pieces', 100, undefined, scene);
                        this.addItemsToTrade([
                            { itemId: 'minerals', quantity: 10 },
                            { itemId: 'basket', quantity: 10 },
                        ]);
                        scene.player.updateQuest('bigCaltorTrip', 'goodsSold');
                        this.startTrade();
                    }
                },
                items: [
                    { itemId: 'copper-pieces', quantity: 10 },
                    { itemId: 'dagger-weapon', quantity: 1 },
                    { itemId: 'leather-armor', quantity: 1 },
                    { itemId: 'leather-pants', quantity: 1 },
                    { itemId: 'leather-boots', quantity: 1 },
                    { itemId: 'simple-bow', quantity: 1 },
                    { itemId: 'wooden-arrow', quantity: 10 },
                ],
            });
        }
    }
    exports.default = BodgerNpc;
});
//# sourceMappingURL=bodgerNpc.js.map