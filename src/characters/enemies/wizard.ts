import * as Phaser from 'phaser';
import GeneralEnemy from './generalEnemy';
import Disposition from '../../scenes/battle/disposition';
import Adventurer from '../adventurers/adventurer';
import Action from '../../entities/action';
import { ActionData } from '../../types/my-types';

export default class Wizard extends GeneralEnemy {
  constructor() {
    super();
    this.spriteParams = {
      texture: 'wizard-idle', frame: 0, width: 231, height: 190, flip: true,
    };
    this.level = 1;
    this.availableActions = ['magicMissile', 'swiftMind'];
    this.name = 'Wizard';
    this.characteristicsModifiers = {
      strength: [{ source: 'base', value: 10 }],
      agility: [{ source: 'base', value: 3 }],
      intelligence: [{ source: 'base', value: 10 }],
      initiative: [{ source: 'base', value: Phaser.Math.Between(10, 20) }],
      health: [{ source: 'base', value: 10 }],
      manna: [{ source: 'base', value: 10 }],
      energy: [{ source: 'base', value: 5 }],
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
      health: 10,
      manna: 10,
      energy: 5,
    };
    this._recalculateCharacteristics();

    this.actionPointsBase = { physical: 0, magical: 1, misc: 0 };
    this.actionPointsIncrement = { physical: 0, magical: 1, misc: 1 };

    this.animations.idle = 'wizard_idle';
    this.animations.move = 'wizard_move';
    this.animations.attack = 'wizard_attack2';
    this.animations.buff = 'wizard_attack1';
    this.animations.death = 'wizard_death';
    this.animations.hit = 'wizard_hit';
  }

  public aiTurn = (disposition: Disposition): { action: ActionData, targets: (Adventurer | GeneralEnemy)[] } => {
    const alivePlayers = disposition.playerCharacters.filter((char) => char.isAlive);
    const randomAlivePlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
    const action = this.currentEffects.some((effect) => effect.effectId === 'intelligenceUp') ? 'magicMissile' : 'swiftMind';
    if (action === 'swiftMind') {
      return { action: new Action(action/* , this */), targets: [this] };
    }
    return { action: new Action(action/* , this */), targets: [randomAlivePlayer] };
  };
}
