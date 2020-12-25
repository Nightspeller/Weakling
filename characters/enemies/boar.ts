import GeneralEnemy from "./generalEnemy.js";
import {Disposition} from "../../scenes/battle/disposition.js";
import {Adventurer} from "../adventurers/adventurer.js";
import Action from "../../entities/action.js";

export class Boar extends GeneralEnemy {
    constructor() {
        super();
        this.spriteParams = {texture: 'boar-avatar', frame: null, width: 96, height: 96};
        this.level = 1;
        this.availableActions = ['wildRush', 'enrage'];
        this.name = 'Wild Boar';
        this.characteristicsModifiers = {
            strength: [{source: 'base', value: 10}],
            agility: [{source: 'base', value: 10}],
            intelligence: [{source: 'base', value: 3}],
            initiative: [{source: 'base', value: Phaser.Math.Between(20, 30)}],
            health: [{source: 'base', value: 20}],
            manna: [{source: 'base', value: 0}],
            energy: [{source: 'base', value: 10}],
            armor: [{source: 'base', value: 12}],
            dodge: [{source: 'base', value: 10}],
            fireResistance: [{source: 'base', value: 0}],
            coldResistance: [{source: 'base', value: 5}],
            acidResistance: [{source: 'base', value: 0}],
            electricityResistance: [{source: 'base', value: 0}],
            poisonResistance: [{source: 'base', value: 0}],
            magicResistance: [{source: 'base', value: 0}],
            weaponDamage: [{source: 'base', value: 3}]
        };
        this.parameters = {
            health: 20,
            manna: 0,
            energy: 10,
        }
        this._recalculateCharacteristics();
        this.actionPointsBase = {physical: 1, magical: 0, misc: 0};
        this.actionPointsIncrement = {physical: 1, magical: 0, misc: 1};
    }

    public aiTurn = (disposition: Disposition): {action: ActionData, targets: (Adventurer | GeneralEnemy)[]} => {
        const alivePlayers = disposition.playerCharacters.filter(char => char.isAlive);
        const randomAlivePlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
        const action = this.currentEffects.some(effect => effect.effectId === 'intelligenceDown') ? 'wildRush' : 'enrage';
        if (action === 'enrage') {
            return {action: new Action(action, this), targets: [this]}
        } else {
            return {action: new Action(action, this), targets: [randomAlivePlayer]}
        }
    };
}
