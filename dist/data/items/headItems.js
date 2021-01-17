define(["require", "exports", "./itemSlots"], function (require, exports, itemSlots_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const headItems = {
        'rangers-hat': {
            itemId: 'rangers-hat',
            displayName: 'Ranger\'s hat',
            description: 'Classic ranger\'s hat - provides very little protection, but does not get in a way',
            possibleSlots: ['head', ...itemSlots_1.backpackSlotNames, ...itemSlots_1.containerSlotNames],
            sprite: {
                texture: 'icon-item-set',
                frame: 112,
            },
            stackable: false,
            modified: false,
            specifics: {
                additionalCharacteristics: [
                    { agility: 1 },
                    { initiative: 1 },
                    { armor: 1 },
                ],
                size: ['xs', 's', 'm'],
            },
            sellPrice: 5,
            buyPrice: 10,
        },
    };
    exports.default = headItems;
});
//# sourceMappingURL=headItems.js.map