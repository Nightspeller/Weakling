define(["require", "exports", "../data/actionsData", "./effect"], function (require, exports, actionsData_1, effect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Action {
        constructor(actionId /* , character: Adventurer | GeneralEnemy */) {
            const actionData = { ...actionsData_1.default[actionId] };
            Object.entries(actionData)
                // @ts-ignore
                .forEach(([key, value]) => { this[key] = value; });
            this.effects = [];
            this.effectsDescriptions.forEach((effectDescription) => {
                const effect = new effect_1.default(effectDescription.effectId);
                effect.strength = effectDescription.strength;
                effect.source = this.actionId;
                this.effects.push(effect);
            });
        }
    }
    exports.default = Action;
});
//# sourceMappingURL=action.js.map