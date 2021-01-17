define(["require", "exports", "./itemSlots"], function (require, exports, itemSlots_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        'fire-marble': {
            itemId: 'fire-marble',
            displayName: 'Fire marble',
            description: 'Enchanted stone which burns brightly upon impact.',
            possibleSlots: ['tail', ...itemSlots_1.backpackSlotNames, ...itemSlots_1.containerSlotNames],
            sprite: { texture: 'icons', frame: 'icons/gems/red-round-stone' },
            stackable: true,
            modified: false,
            specifics: {
                additionalActions: ['throwFireMarble'],
            },
            sellPrice: 1,
            buyPrice: 2,
        },
    };
});
//# sourceMappingURL=tailItems.js.map