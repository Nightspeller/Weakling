define(["require", "exports", "./itemSlots"], function (require, exports, itemSlots_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const bootsItems = {
        'leather-boots': {
            itemId: 'leather-boots',
            displayName: 'Leather boots',
            description: 'Basic leather boots',
            possibleSlots: ['boots', ...itemSlots_1.backpackSlotNames, ...itemSlots_1.containerSlotNames],
            sprite: {
                texture: 'icon-item-set',
                frame: 130,
            },
            stackable: false,
            modified: false,
            specifics: {
                additionalCharacteristics: [
                    { dodge: 1 },
                    { energy: 1 },
                ],
                size: ['xs', 's', 'm'],
            },
            sellPrice: 5,
            buyPrice: 10,
        },
    };
    exports.default = bootsItems;
});
//# sourceMappingURL=bootsItems.js.map