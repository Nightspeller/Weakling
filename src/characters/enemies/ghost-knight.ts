import * as Phaser from 'phaser';
import GeneralEnemy from './generalEnemy';
import Disposition from '../../scenes/battle/disposition';
import Adventurer from '../adventurers/adventurer';
import Action from '../../entities/action';
import { ActionData } from '../../types/my-types';

export default class GhostKnight extends GeneralEnemy {
  constructor() {
    super();
    this.spriteParams = {
      texture: 'ghost-knight-idle', frame: 0, width: 300, height: 300, flip: true,
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

    this.animations.idle = 'ghost-knight_idle';
    this.animations.move = 'ghost-knight_move';
    this.animations.attack = 'ghost-knight_attack2';
    this.animations.buff = 'ghost-knight_attack1';
    this.animations.death = 'ghost-knight_death';
    this.animations.hit = 'ghost-knight_hit';
  }

  public aiTurn = (disposition: Disposition): { action: ActionData, targets: (Adventurer | GeneralEnemy)[] } => {
    const alivePlayers = disposition.playerCharacters.filter((char) => char.isAlive);
    const randomAlivePlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
    let action = 'meleeAttack';
    if (this.actionPoints.magical >= 2) action = 'fear';
    return { action: new Action(action/* , this */), targets: [randomAlivePlayer] };
  };
}
