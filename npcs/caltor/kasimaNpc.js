import GeneralNpc from "../generalNpc.js";
export class KasimaNpc extends GeneralNpc {
    constructor({ scene, x, y, spriteParams }) {
        super({
            scene,
            name: 'Kasima',
            triggerX: x,
            triggerY: y,
            spriteParams: spriteParams,
            interactionCallback: (param) => {
                this.startTrade();
            },
            items: [
                { itemId: 'copper-pieces', quantity: 200 },
                { itemId: 'rope-belt', quantity: 1 },
                { itemId: 'invisibility-cape', quantity: 1 },
                { itemId: 'small-bottle', quantity: 2 },
                { itemId: 'medium-bottle', quantity: 2 },
                { itemId: 'big-bottle', quantity: 2 },
            ]
        });
    }
}
//# sourceMappingURL=kasimaNpc.js.map