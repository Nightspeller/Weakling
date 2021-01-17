define(["require", "exports", "./itemSlots"], function (require, exports, itemSlots_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const pantsItems = {
        'leather-pants': {
            itemId: 'leather-pants',
            displayName: 'Leather pants',
            description: 'Basic leather pants',
            possibleSlots: ['pants', ...itemSlots_1.backpackSlotNames, ...itemSlots_1.containerSlotNames],
            sprite: {
                texture: 'icon-item-set',
                frame: 123,
            },
            stackable: false,
            modified: false,
            specifics: {
                additionalCharacteristics: [
                    { armor: 1 },
                    { agility: 1 },
                ],
                size: ['xs', 's', 'm'],
            },
            sellPrice: 7,
            buyPrice: 14,
        },
    };
    exports.default = pantsItems;
});
//# sourceMappingURL=pantsItems.js.map