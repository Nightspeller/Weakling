define(["require", "exports", "../generalNpc", "../../../data/dialogs/caltor/fionaDialog"], function (require, exports, generalNpc_1, fionaDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FionaNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Fiona',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: fionaDialog_1.default,
                interactionCallback: (param) => {
                    if (param === 'openShop') {
                        this.startTrade();
                    }
                    /* if (param === 'goodsSold') {
                                scene.player.addItemToInventory('copper-pieces', 100, undefined, scene);
                                this.addItemsToTrade([
                                    {itemId: 'minerals', quantity: 10},
                                    {itemId: 'basket', quantity: 10},
                                ]);
                                scene.player.updateQuest('bigCaltorTrip', 'goodsSold');
                            }
                            if (param === 'goodsSoldAndOpenShop') {
                                scene.player.addItemToInventory('copper-pieces', 100, undefined, scene);
                                this.addItemsToTrade([
                                    {itemId: 'minerals', quantity: 10},
                                    {itemId: 'basket', quantity: 10},
                                ]);
                                scene.player.updateQuest('bigCaltorTrip', 'goodsSold');
                                this.startTrade();
                            } */
                },
                items: [
                    { itemId: 'copper-pieces', quantity: 10 },
                    { itemId: 'chamomile', quantity: 5 },
                    { itemId: 'chamomile-seeds', quantity: 10 },
                    { itemId: 'primula-flower', quantity: 5 },
                    { itemId: 'primula-sapling', quantity: 10 },
                ],
            });
        }
    }
    exports.default = FionaNpc;
});
//# sourceMappingURL=fionaNpc.js.map