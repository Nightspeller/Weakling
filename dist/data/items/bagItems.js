define(["require", "exports", "./itemSlots"], function (require, exports, itemSlots_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const bagItems = {
        'basic-sack': {
            itemId: 'basic-sack',
            displayName: 'Basic sack',
            description: 'Small and lightweight bag designed to carry just a few items.',
            possibleSlots: ['bag', ...itemSlots_1.backpackSlotNames, ...itemSlots_1.containerSlotNames],
            sprite: { texture: 'icons', frame: 'icons/bags/weaved-basket' },
            stackable: false,
            modified: false,
            specifics: {
                additionalCharacteristics: [
                    { health: 1 },
                ],
                size: ['xs', 's', 'm'],
            },
            sellPrice: 1,
            buyPrice: 2,
        },
    };
    exports.default = bagItems;
});
//# sourceMappingURL=bagItems.js.map