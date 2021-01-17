define(["require", "exports", "phaser", "./adventurer", "../../config/constants"], function (require, exports, Phaser, adventurer_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.eyeballInstance = exports.Eyeball = void 0;
    class Eyeball extends adventurer_1.default {
        constructor() {
            super();
            this.spriteParams = {
                texture: 'eyeball-idle', frame: null, width: 300, height: 300,
            };
            this.characteristicsModifiers = {
                strength: [{ source: 'base', value: 10 }],
                agility: [{ source: 'base', value: 10 }],
                intelligence: [{ source: 'base', value: 15 }],
                initiative: [{ source: 'base', value: Phaser.Math.Between(0, 30) + 10 }],
                health: [{ source: 'base', value: 5 }],
                manna: [{ source: 'base', value: 5 }],
                energy: [{ source: 'base', value: 10 }],
                armor: [{ source: 'base', value: 10 }],
                dodge: [{ source: 'base', value: 10 }],
                fireResistance: [{ source: 'base', value: 10 }],
                coldResistance: [{ source: 'base', value: 10 }],
                acidResistance: [{ source: 'base', value: 10 }],
                electricityResistance: [{ source: 'base', value: 10 }],
                poisonResistance: [{ source: 'base', value: 10 }],
                magicResistance: [{ source: 'base', value: 10 }],
                weaponDamage: [{ source: 'base', value: 1 }],
            };
            this.parameters = { health: 5, manna: 5, energy: 10 };
            this._recalculateCharacteristics();
            if (constants_1.DEBUG) {
                this.characteristics.health = 50;
                this.parameters.health = 50;
            }
            this.name = 'Eyeball';
            this.availableActions = ['meditate', 'dustStorm', 'healingTouch', 'drainingSoil', 'adjustArmor', 'warmUp', 'meleeAttack', 'wait', 'catchBreath'];
            this.animations.idle = 'eyeball_idle';
            this.animations.move = 'eyeball_idle';
            this.animations.attack = 'eyeball_attack1';
            this.animations.buff = 'eyeball_buff';
            this.animations.death = 'eyeball_death';
            this.animations.hit = 'eyeball_hit';
        }
    }
    exports.Eyeball = Eyeball;
    exports.eyeballInstance = new Eyeball();
});
//# sourceMappingURL=eyeball.js.map