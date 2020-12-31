import * as Phaser from 'phaser';
import { EffectData, SpriteParameters } from '../types/my-types';

export default class GeneralCharacter {
  public spriteParams: SpriteParameters;
  public level: number;
  public name: string;
  public currentEffects: EffectData[];
  public availableActions: string[];
  public actedThisRound: boolean;
  public isAlive: boolean;
  public animations: { [key: string]: string };
  public actionPoints: { magical: number; physical: number; misc: number };
  protected actionPointsBase: { magical: number; physical: number; misc: number };
  protected actionPointsIncrement: { magical: number; physical: number; misc: number };
  // eslint-disable-next-line max-len
  public readonly characteristics: { manna: number; dodge: number; magicResistance: number; initiative: number; strength: number; acidResistance: number; health: number; intelligence: number; armor: number; fireResistance: number; coldResistance: number; electricityResistance: number; agility: number; poisonResistance: number; weaponDamage: number; energy: number };
  // eslint-disable-next-line max-len
  public characteristicsModifiers: { manna: { source: any; value: number }[]; weaponDamage: { source: any; value: number }[]; dodge: { source: any; value: number }[]; magicResistance: { source: any; value: number }[]; initiative: { source: any; value: number }[]; strength: { source: any; value: number }[]; acidResistance: { source: any; value: number }[]; health: { source: any; value: number }[]; intelligence: { source: any; value: number }[]; armor: { source: any; value: number }[]; fireResistance: { source: any; value: number }[]; coldResistance: { source: any; value: number }[]; electricityResistance: { source: any; value: number }[]; agility: { source: any; value: number }[]; poisonResistance: { source: any; value: number }[]; energy: { source: any; value: number }[] };
  public parameters: { manna: number; health: number; energy: number };

  constructor() {
    this.spriteParams = {
      texture: null, frame: null, width: null, height: null,
    };
    this.animations = {};
    this.level = null;
    this.currentEffects = [];
    this.availableActions = [];
    this.actedThisRound = false;
    this.isAlive = true;

    this.characteristics = {
      strength: null,
      agility: null,
      intelligence: null,
      initiative: null,
      health: null,
      manna: null,
      energy: null,
      armor: null,
      dodge: null,
      fireResistance: null,
      coldResistance: null,
      acidResistance: null,
      electricityResistance: null,
      poisonResistance: null,
      magicResistance: null,
      weaponDamage: null,
    };
    this.characteristicsModifiers = {
      strength: [{ source: 'base', value: null }],
      agility: [{ source: 'base', value: null }],
      intelligence: [{ source: 'base', value: null }],
      initiative: [{ source: 'base', value: null }],
      health: [{ source: 'base', value: null }],
      manna: [{ source: 'base', value: null }],
      energy: [{ source: 'base', value: null }],
      armor: [{ source: 'base', value: null }],
      dodge: [{ source: 'base', value: null }],
      fireResistance: [{ source: 'base', value: null }],
      coldResistance: [{ source: 'base', value: null }],
      acidResistance: [{ source: 'base', value: null }],
      electricityResistance: [{ source: 'base', value: null }],
      poisonResistance: [{ source: 'base', value: null }],
      magicResistance: [{ source: 'base', value: null }],
      weaponDamage: [{ source: 'base', value: 1 }],
    };
    this.parameters = {
      health: 0,
      manna: 0,
      energy: 0,
    };
    this.actionPoints = { physical: 0, magical: 0, misc: 0 };
    this.actionPointsBase = { physical: 0, magical: 0, misc: 0 };
    this.actionPointsIncrement = { physical: 0, magical: 0, misc: 0 };
  }

  public addToParameter(parameter: 'health' | 'manna' | 'energy', value: number) {
    console.log(`Changing ${parameter} by ${value}`);
    if (this.parameters[parameter] + value > this.characteristics[parameter]) {
      this.parameters[parameter] = this.characteristics[parameter];
    } else {
      this.parameters[parameter] += value;
    }
    if (this.parameters[parameter] < 0) this.parameters[parameter] = 0;
    if (parameter === 'health' && this.parameters[parameter] === 0) this.isAlive = false;
  }

  protected _recalculateCharacteristics(characteristic?: string) {
    if (characteristic) {
      // @ts-ignore
      this.characteristics[characteristic] = this.characteristicsModifiers[characteristic].reduce(
        (acc: number, modifier: { source: any, value: number }) => ((acc + modifier.value) > 0 ? (acc + modifier.value) : 0),
        0,
      );
    } else {
      Object.keys(this.characteristics).forEach((characteristic) => {
        // @ts-ignore
        this.characteristics[characteristic] = this.characteristicsModifiers[characteristic].reduce(
          (acc: number, modifier: { source: any, value: number }) => ((acc + modifier.value) > 0 ? (acc + modifier.value) : 0),
          0,
        );
      });
    }
    if (this.parameters.health > this.characteristics.health) this.parameters.health = this.characteristics.health;
    if (this.parameters.manna > this.characteristics.manna) this.parameters.manna = this.characteristics.manna;
    if (this.parameters.energy > this.characteristics.energy) this.parameters.energy = this.characteristics.energy;
  }

  public setCharacteristicModifier(characteristic: string, modifier: { source: any, value: number }) {
    console.log(`Setting modifier for ${characteristic}`, modifier);
    if (Number.isInteger(modifier.value) === false) throw new Error('Non-integer modifier value is passed!');
    // @ts-ignore
    const existingModifiers = this.characteristicsModifiers[characteristic];
    // @ts-ignore
    const existingModifier = existingModifiers.find((existingModifier) => existingModifier.source === modifier.source);

    if (existingModifier) {
      existingModifier.value = modifier.value;
    } else {
      existingModifiers.push(modifier);
    }

    this._recalculateCharacteristics(characteristic);
  }

  public removeCharacteristicModifier(characteristic: string, source: any) {
    console.log(`Removing modifier for ${characteristic}, source:`, source);
    // @ts-ignore
    // eslint-disable-next-line max-len
    this.characteristicsModifiers[characteristic] = this.characteristicsModifiers[characteristic].filter((modifier) => modifier.source !== source);
    this._recalculateCharacteristics(characteristic);
  }

  public applyEffect(effect: EffectData) {
    // eslint-disable-next-line max-len
    const existingEffectIndex = this.currentEffects.findIndex((elem) => (elem.source === effect.source && elem.effectId === effect.effectId));
    if (existingEffectIndex !== -1) {
      this.currentEffects[existingEffectIndex].strength = effect.strength;
      this.currentEffects[existingEffectIndex].durationLeft = effect.baseDuration;
    } else {
      if (effect.type !== 'conditional') {
        if (effect.targetCharacteristic) {
          const { targetCharacteristic } = effect;
          // @ts-ignore - in case of traps effect modifier value is another effect!
          const value = Math.round(effect.modifier.type === 'value' ? effect.modifier.value : this.characteristics[targetCharacteristic] * (effect.modifier.value / 100));
          if (targetCharacteristic === 'health' || targetCharacteristic === 'manna' || targetCharacteristic === 'energy') {
            this.addToParameter(targetCharacteristic, value);
          } else {
            this.setCharacteristicModifier(targetCharacteristic, {
              value,
              source: effect,
            });
          }
        }
      }
      if (effect.type !== 'direct') {
        this.currentEffects.push(effect);
      }
    }
  }

  public getAttackDamage() {
    return this.characteristics.weaponDamage;
  }

  private recalculateEffects() {
    this.currentEffects = this.currentEffects.filter((effect) => {
      if (effect.durationLeft === 1) {
        if (effect.targetCharacteristic) {
          this.removeCharacteristicModifier(effect.targetCharacteristic, effect);
        }
        return false;
      }
      if (effect.durationLeft !== -1) {
        effect.durationLeft -= 1;
      }
      return true;
    });
  }

  public startRound(roundType: 'preparation' | 'battle') {
    if (roundType === 'preparation') {
      this.actionPoints = { ...this.actionPointsBase };
      this.currentEffects = [];
    } else {
      this.actionPoints.physical = Phaser.Math.Clamp(this.actionPoints.physical + this.actionPointsIncrement.physical, 0, 3);
      this.actionPoints.magical = Phaser.Math.Clamp(this.actionPoints.magical + this.actionPointsIncrement.magical, 0, 3);
      this.actionPoints.misc = Phaser.Math.Clamp(this.actionPoints.misc + this.actionPointsIncrement.misc, 0, 3);
    }
    if (this.isAlive) {
      this.actedThisRound = false;
    }
  }

  public endRound() {
    this.recalculateEffects();
  }

  public endTurn() {
    if (this.isAlive) {
      this.actedThisRound = true;
    }
  }

  public getAvailableActions() {
    return this.availableActions;
  }
}
