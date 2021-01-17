define(["require", "exports", "./effects/passiveEffects", "./effects/directEffects", "./effects/conditionalEffects"], function (require, exports, passiveEffects_1, directEffects_1, conditionalEffects_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const effectsData = {
        ...passiveEffects_1.default,
        ...directEffects_1.default,
        ...conditionalEffects_1.default,
    };
    exports.default = effectsData;
});
//# sourceMappingURL=effectsData.js.map