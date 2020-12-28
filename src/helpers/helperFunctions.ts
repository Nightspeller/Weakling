import * as Phaser from 'phaser';
import { backpackSlotNames, containerSlotNames, quickSlotNames } from '../data/items/itemSlots';
import quickSlotItems from '../data/items/quickSlotItems';
import { ActionData, ItemData, SpriteParameters } from '../types/my-types';

export function capsFirstLetter(string: string) {
  return string.charAt(0)
    .toUpperCase() + string.slice(1);
}

export function drawBorder(
  scene: Phaser.Scene,
  object: Phaser.GameObjects.Sprite | { x: number, y: number, width: number, height: number },
  color = 0x0000ff,
) {
  if (object instanceof Phaser.GameObjects.Sprite) {
    scene.add.graphics()
      .lineStyle(1, color)
      .strokeRect(object.getTopLeft().x, object.getTopLeft().y, object.displayWidth, object.displayHeight);
  } else {
    scene.add.graphics()
      .lineStyle(1, color)
      .strokeRect(object.x, object.y, object.width, object.height);
  }
}

export function generatePotions(characteristic: string, icons: SpriteParameters[]): { [key: string]: ItemData } {
  const qualities = ['weak', 'mediocre', 'average', 'strong', 'powerful'];
  const sizes = ['small', 'medium', 'big', 'giant'];
  const result: {[key: string]: ItemData} = {};
  sizes.forEach((size, sizeIndex) => {
    qualities.forEach((quality, qualityIndex) => {
      const potionId = `${size}-${quality}-${characteristic}-potion`;
      const sellPrise = (2 ** (sizeIndex + 1)) + (3 ** (qualityIndex + 1));
      result[potionId] = {
        itemId: potionId,
        displayName: `${capsFirstLetter(size)} ${quality} ${characteristic} potion`,
        description: `This potion gives you some ${characteristic}`,
        possibleSlots: [...quickSlotNames, ...backpackSlotNames, ...containerSlotNames],
        sprite: icons[sizeIndex],
        stackable: true,
        modified: false,
        quantity: null,
        specifics: {
          additionalActions: [`drink${capsFirstLetter(size)}${capsFirstLetter(quality)}${capsFirstLetter(characteristic)}Potion`],
          recovers: [{
            itemId: `${size}-bottle`,
            quality: 1,
          }],
        },
        sellPrice: sellPrise,
        buyPrice: sellPrise * 2,
      };
    });
  });
  return result;
}

export function generatePotionActions(characteristic: string): { [key: string]: ActionData } {
  const sizes = ['small', 'medium', 'big', 'giant'];
  const qualities = ['weak', 'mediocre', 'average', 'strong', 'powerful'];
  const result: {[key: string]: ActionData} = {};
  sizes.forEach((size, sizeIndex) => {
    qualities.forEach((quality, qualityIndex) => {
      const actionId = `drink${capsFirstLetter(size)}${capsFirstLetter(quality)}${capsFirstLetter(characteristic)}Potion`;
      // TODO: strength is wrong and bad as a concept.....
      const strength = sizeIndex + qualityIndex + 1;
      result[actionId] = {
        actionId,
        phase: ['preparation', 'battle'],
        type: 'misc',
        actionName: `Drink ${size} ${quality} ${characteristic} potion`,
        consumes: `${size}-${quality}-${characteristic}-potion`,
        actionDescription: `Drink ${size} ${quality} ${characteristic} potion to get ${strength * 5} ${characteristic}`,
        effectsDescriptions: [{
          effectId: `add${capsFirstLetter(characteristic)}`,
          // @ts-ignore
          strength,
        }],
        target: 'self',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
        icon: quickSlotItems[`${size}-${quality}-${characteristic}-potion`].sprite,
        parametersCost: {},
      };
    });
  });
  return result;
}
