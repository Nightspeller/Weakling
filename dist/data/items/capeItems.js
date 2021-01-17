define(["require", "exports", "./itemSlots"], function (require, exports, itemSlots_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const capeItems = {
        'invisibility-cape': {
            itemId: 'invisibility-cape',
            displayName: 'Invisibility cloak',
            description: 'Once per battle allows you to become invisible for your enemies',
            possibleSlots: ['cape', ...itemSlots_1.backpackSlotNames, ...itemSlots_1.containerSlotNames],
            sprite: {
                texture: 'icon-item-set',
                frame: 126,
            },
            stackable: false,
            modified: false,
            specifics: {
                skills: ['invisibility'],
                additionalCharacteristics: [
                    { magicResistance: 2 },
                ],
                size: ['xs', 's', 'm', 'l', 'xl', 'xxxl'],
            },
            sellPrice: 30,
            buyPrice: 60,
        },
    };
    exports.default = capeItems;
});
//# sourceMappingURL=capeItems.js.map