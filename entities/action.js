import { actionsData } from "../data/actionsData.js";
export default class Action {
    constructor(actionId, character) {
        const actionData = { ...actionsData[actionId] };
        Object.entries(actionData).forEach(([key, value]) => this[key] = value);
    }
}
//# sourceMappingURL=action.js.map