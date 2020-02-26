import { effectsData } from "../data/effectsData.js";
export default class Effect {
    constructor(effectId) {
        const effectData = { ...effectsData[effectId] };
        Object.entries(effectData).forEach(([key, value]) => this[key] = value);
        this.durationLeft = this.baseDuration;
    }
}
//# sourceMappingURL=effect.js.map