define(["require", "exports", "../data/itemsData"], function (require, exports, itemsData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Item {
        constructor(itemId, quantity = 1, options = {}) {
            let itemParams = {};
            if (itemId) {
                if (itemsData_1.default[itemId]) {
                    itemParams = JSON.parse(JSON.stringify(itemsData_1.default[itemId]));
                }
                else {
                    throw new Error(`Can't create "${itemId}" because there is no data for it.`);
                }
            }
            if (itemParams.stackable === false && quantity > 1) {
                throw new Error(`Trying to create unstackable item "${itemId}" with quantity of ${quantity}.`);
            }
            itemParams = {
                ...itemParams,
                ...options,
                quantity,
            };
            Object.entries(itemParams)
                .forEach(([key, value]) => {
                // @ts-ignore
                this[key] = value;
            });
        }
    }
    exports.default = Item;
});
//# sourceMappingURL=item.js.map