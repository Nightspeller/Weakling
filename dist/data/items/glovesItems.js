define(["require", "exports", "./itemSlots"], function (require, exports, itemSlots_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const glovesItems = {
        'work-gloves': {
            itemId: 'work-gloves',
            displayName: 'Work gloves',
            description: 'Rough-made and simple, but think and reliable gloves ideal for heavy-lifting',
            possibleSlots: ['gloves', ...itemSlots_1.backpackSlotNames, ...itemSlots_1.containerSlotNames],
            sprite: { texture: 'icons', frame: 'icons/clothes/gloves/leather-gloves' },
            stackable: false,
            modified: false,
            specifics: {
                additionalCharacteristics: [
                    { strength: 1 },
                ],
                size: ['xs', 's', 'm'],
            },
            sellPrice: 5,
            buyPrice: 10,
        },
        'leather-gloves': {
            itemId: 'leather-gloves',
            displayName: 'Leather gloves',
            description: 'Basic leather gloves',
            possibleSlots: ['gloves', ...itemSlots_1.backpackSlotNames, ...itemSlots_1.containerSlotNames],
            sprite: { texture: 'icons', frame: 'icons/clothes/gloves/leather-gloves' },
            stackable: false,
            modified: false,
            specifics: {
                additionalCharacteristics: [
                    { strength: 1 },
                    { health: 1 },
                ],
                size: ['xs', 's', 'm'],
            },
            sellPrice: 10,
            buyPrice: 20,
        },
    };
    exports.default = glovesItems;
});
//# sourceMappingURL=glovesItems.js.map