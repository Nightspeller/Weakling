define(["require", "exports", "./itemSlots"], function (require, exports, itemSlots_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const bodyItems = {
        'leather-armor': {
            itemId: 'leather-armor',
            displayName: 'Leather armor',
            description: 'Basic leather armor',
            possibleSlots: ['body', ...itemSlots_1.backpackSlotNames, ...itemSlots_1.containerSlotNames],
            sprite: { texture: 'icons', frame: 'icons/clothes/chests/armor-leather' },
            stackable: false,
            modified: false,
            specifics: {
                additionalCharacteristics: [
                    { armor: 2 },
                    { dodge: 1 },
                ],
                additionalActions: ['adjustArmor'],
                size: ['xs', 's', 'm'],
            },
            sellPrice: 10,
            buyPrice: 20,
        },
    };
    exports.default = bodyItems;
});
//# sourceMappingURL=bodyItems.js.map