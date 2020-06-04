import {Adventurer} from "../characters/adventurers/adventurer.js";
import GeneralEnemy from "../characters/enemies/generalEnemy.js";
import {actionsData} from "../data/actionsData.js";
import Effect from "./effect.js";

export default class Action implements ActionData{
    public phase: ('preparation' | 'battle')[];
    public effectsDescriptions: { effectId: string; strength: 1 | 2 | 3 | 4 | 5 }[];
    public effects?: Effect[];
    public actionId: string;
    public actionCost: number;
    public actionDescription: string;
    public type: 'physical' | 'magical' | 'misc';
    public noticeable: number;
    public actionName: string;
    public target: 'self' | 'enemy' | 'friend' | 'any' | 'all' | 'allEnemies' | 'allFriends' | 'party';
    public special?: string;
    public requires?: string;
    public triggers?: { conditionId: string, probability: number, conditionDisplayName: string }[];
    public animation: 'meleeAttack' | 'castAttack' | 'castBuff';
    public icon?: {texture: string, frame: number | string};
    public parametersCost?: {energy?: number, manna?: number};

    constructor(actionId: string, character: Adventurer | GeneralEnemy) {
        const actionData = {...actionsData[actionId]} as ActionData;
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
