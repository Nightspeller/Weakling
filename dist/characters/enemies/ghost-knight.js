define(["require", "exports", "phaser", "./generalEnemy", "../../entities/action"], function (require, exports, Phaser, generalEnemy_1, action_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GhostKnight extends generalEnemy_1.default {
        constructor() {
            super();
            this.aiTurn = (disposition) => {
                const alivePlayers = disposition.playerCharacters.filter((char) => char.isAlive);
                const randomAlivePlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
                let action = 'meleeAttack';
                if (this.actionPoints.magical >= 2)
                    action = 'fear';
                return { action: new action_1.default(action /* , this */), targets: [randomAlivePlayer] };
            };
            this.spriteParams = {
                texture: 'knight-idle', frame: 0, width: 300, height: 300, flip: true,
            };
            this.level = 3;
            this.availableActions = ['meleeAttack', 'fear'];
            this.name = 'Ghost of the Knight';
            this.characteristicsModifiers = {
                strength: [{ source: 'base', value: 20 }],
                agility: [{ source: 'base', value: 20 }],
                intelligence: [{ source: 'base', value: 10 }],
                initiative: [{ source: 'base', value: Phaser.Math.Between(0, 30) }],
                health: [{ source: 'base', value: 30 }],
                manna: [{ source: 'base', value: 10 }],
                energy: [{ source: 'base', value: 20 }],
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
                health: 30,
                manna: 10,
                energy: 20,
            };
            this._recalculateCharacteristics();
            this.actionPointsBase = { physical: 1, magical: 0, misc: 0 };
            this.actionPointsIncrement = { physical: 1, magical: 1, misc: 0 };
            this.animations.idle = 'knight_idle';
            this.animations.move = 'knight_move';
            this.animations.attack = 'knight_attack2';
            this.animations.buff = 'knight_attack1';
            this.animations.death = 'knight_death';
            this.animations.hit = 'knight_hit';
        }
    }
    exports.default = GhostKnight;
});
//# sourceMappingURL=ghost-knight.js.map