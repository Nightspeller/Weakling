define(["require", "exports", "./items/backpackItems", "./items/vesselsAndIngredients", "./items/bagItems", "./items/beltItems", "./items/bodyItems", "./items/bootsItems", "./items/capeItems", "./items/glovesItems", "./items/handsItems", "./items/headItems", "./items/neckItems", "./items/pantsItems", "./items/quickSlotItems", "./items/ringsItems", "./items/tailItems"], function (require, exports, backpackItems_1, vesselsAndIngredients_1, bagItems_1, beltItems_1, bodyItems_1, bootsItems_1, capeItems_1, glovesItems_1, handsItems_1, headItems_1, neckItems_1, pantsItems_1, quickSlotItems_1, ringsItems_1, tailItems_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const itemsData = {
        ...backpackItems_1.default,
        ...vesselsAndIngredients_1.default,
        ...bagItems_1.default,
        ...beltItems_1.default,
        ...bodyItems_1.default,
        ...bootsItems_1.default,
        ...capeItems_1.default,
        ...glovesItems_1.default,
        ...handsItems_1.default,
        ...headItems_1.default,
        ...neckItems_1.default,
        ...pantsItems_1.default,
        ...quickSlotItems_1.default,
        ...ringsItems_1.default,
        ...tailItems_1.default,
    };
    exports.default = itemsData;
});
//# sourceMappingURL=itemsData.js.map