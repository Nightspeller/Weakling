import { actionsData } from "../data/actionsData.js";
import Effect from "./effect.js";
export default class Action {
    constructor(actionId, character) {
        const actionData = { ...actionsData[actionId] };
        Object.entries(actionData).forEach(([key, value]) => this[key] = value);
        this.effects = [];
        this.effectsDescriptions.forEach(effectDescription => {
            const effect = new Effect(effectDescription.effectId);
            effect.strength = effectDescription.strength;
            effect.source = this.actionId;
            this.effects.push(effect);
        });
    }
}
//# sourceMappingURL=action.js.map