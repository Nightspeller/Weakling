import { itemsData } from "../data/itemsData.js";
export default class Item {
    constructor(itemId, quantity = 1, options = {}) {
        let itemParams = {};
        if (itemId) {
            if (itemsData[itemId]) {
                itemParams = JSON.parse(JSON.stringify(itemsData[itemId]));
            }
            else {
                throw `Can't create "${itemId}" because there is no data for it.`;
            }
        }
        if (itemParams['stackable'] === false && quantity > 1) {
            throw `Trying to create unstackable item "${itemId}" with quantity of ${quantity}.`;
        }
        itemParams = { ...itemParams, ...options, quantity: quantity };
        Object.entries(itemParams).forEach(([key, value]) => this[key] = value);
    }
}
//# sourceMappingURL=item.js.map