import {effectsData} from "../data/effectsData.js";

export default class Effect implements EffectData {
    public effectId: string;
    public name: string;
    public description: string;
    public type: 'direct' | 'passive' | 'conditional';
    public targetCharacteristic?: string;
    public baseDuration: number;
    public durationLeft: number;
    public strength: 1 | 2 | 3 | 4 | 5;
    public modifier?: Modifier;
    public source: string;
    public statusImage: SpriteParameters;
    public applicationCheck: Function;
    public setModifier: Function;

    constructor(effectId: string) {
        const effectData = {...effectsData[effectId]} as EffectData;
        Object.entries(effectData).forEach(([key, value]) => this[key] = value);
        this.durationLeft = this.baseDuration;
    }
}
