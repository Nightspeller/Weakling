define(["require", "exports", "../generalNpc"], function (require, exports, generalNpc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class KasimaNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Kasima',
                triggerX: x,
                triggerY: y,
                spriteParams,
                interactionCallback: () => {
                    this.startTrade();
                },
                items: [
                    { itemId: 'copper-pieces', quantity: 200 },
                    { itemId: 'rope-belt', quantity: 1 },
                    { itemId: 'invisibility-cape', quantity: 1 },
                    { itemId: 'minor-energy-ring', quantity: 1 },
                    { itemId: 'small-bottle', quantity: 2 },
                    { itemId: 'medium-bottle', quantity: 2 },
                    { itemId: 'big-bottle', quantity: 2 },
                ],
            });
        }
    }
    exports.default = KasimaNpc;
});
//# sourceMappingURL=kasimaNpc.js.map