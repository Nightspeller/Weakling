import { items } from "../actionsAndEffects/items.js";
export default class Item {
    constructor(itemId, quantity = 1, options = {}) {
        let itemParams = {};
        if (itemId) {
            itemParams = JSON.parse(JSON.stringify(items[itemId]));
        }
        itemParams = { ...itemParams, ...options, quantity: quantity };
        Object.entries(itemParams).forEach(([key, value]) => this[key] = value);
    }
}
//# sourceMappingURL=item.js.map