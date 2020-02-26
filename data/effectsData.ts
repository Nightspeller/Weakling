import {passiveEffects} from "./effects/passiveEffects.js";
import {directEffects} from "./effects/directEffects.js";
import {conditionalEffects} from "./effects/conditionalEffects.js";

export const effectsData: { [key: string]: EffectData } = {
    ...passiveEffects,
    ...directEffects,
    ...conditionalEffects
};
