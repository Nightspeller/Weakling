define(["require", "exports", "../data/effectsData"], function (require, exports, effectsData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Effect {
        constructor(effectId) {
            const effectData = { ...effectsData_1.default[effectId] };
            Object.entries(effectData)
                // @ts-ignore
                .forEach(([key, value]) => { this[key] = value; });
            this.durationLeft = this.baseDuration;
        }
    }
    exports.default = Effect;
});
//# sourceMappingURL=effect.js.map