define(["require", "exports", "phaser", "./generalEnemy", "../../entities/action"], function (require, exports, Phaser, generalEnemy_1, action_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Boar extends generalEnemy_1.default {
        constructor() {
            super();
            this.aiTurn = (disposition) => {
                const alivePlayers = disposition.playerCharacters.filter((char) => char.isAlive);
                const randomAlivePlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
                const action = this.currentEffects.some((effect) => effect.effectId === 'intelligenceDown') ? 'wildRush' : 'enrage';
                if (action === 'enrage') {
                    return { action: new action_1.default(action /* , this */), targets: [this] };
                }
                return { action: new action_1.default(action /* , this */), targets: [randomAlivePlayer] };
            };
            this.spriteParams = {
                texture: 'boar-avatar', frame: null, width: 96, height: 96,
            };
            this.level = 1;
            this.availableActions = ['wildRush', 'enrage'];
            this.name = 'Wild Boar';
            this.characteristicsModifiers = {
                strength: [{ source: 'base', value: 10 }],
                agility: [{ source: 'base', value: 10 }],
                intelligence: [{ source: 'base', value: 3 }],
                initiative: [{ source: 'base', value: Phaser.Math.Between(20, 30) }],
                health: [{ source: 'base', value: 20 }],
                manna: [{ source: 'base', value: 0 }],
                energy: [{ source: 'base', value: 10 }],
                armor: [{ source: 'base', value: 12 }],
                dodge: [{ source: 'base', value: 10 }],
                fireResistance: [{ source: 'base', value: 0 }],
                coldResistance: [{ source: 'base', value: 5 }],
                acidResistance: [{ source: 'base', value: 0 }],
                electricityResistance: [{ source: 'base', value: 0 }],
                poisonResistance: [{ source: 'base', value: 0 }],
                magicResistance: [{ source: 'base', value: 0 }],
                weaponDamage: [{ source: 'base', value: 3 }],
            };
            this.parameters = {
                health: 20,
                manna: 0,
                energy: 10,
            };
            this._recalculateCharacteristics();
            this.actionPointsBase = { physical: 1, magical: 0, misc: 0 };
            this.actionPointsIncrement = { physical: 1, magical: 0, misc: 1 };
        }
    }
    exports.default = Boar;
});
//# sourceMappingURL=boar.js.map