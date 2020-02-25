import {Adventurer} from "../characters/adventurers/adventurer.js";
import GeneralEnemy from "../characters/enemies/generalEnemy.js";
import {actionsData} from "../data/actionsData.js";

export default class Action {
    public phase: ('preparation' | 'battle')[];
    public effect: { effectId: string; source: string; level: number }[];
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

    constructor(actionId: string, character: Adventurer | GeneralEnemy) {
        const actionData = {...actionsData[actionId]} as ActionData;
        Object.entries(actionData).forEach(([key, value]) => this[key] = value);
    }
}
