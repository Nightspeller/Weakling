import { backpackSlotNames, componentSlotNames, containerSlotNames } from './itemSlots';
import { ItemData } from '../../types/my-types';

const fishingItems: { [key: string]: ItemData } = {
  'flimsy-fishing-rod': {
    itemId: 'flimsy-fishing-rod',
    displayName: 'Flimsy fishing rod',
    description: 'Very basic fishing rod, suitable for catching small and not capricious fish',
    possibleSlots: [...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/fishing/fishing-rod' },
    stackable: false,
    modified: false,
    specifics: {
      fishingRodCatchRange: 16,
    },
    sellPrice: 5,
    buyPrice: 10,
  },
  'decent-fishing-rod': {
    itemId: 'decent-fishing-rod',
    displayName: 'Decent fishing rod',
    description: 'Accurately crafted fishing rod, suitable for catching all kinds of regular fish',
    possibleSlots: [...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/fishing/fishing-rod-2' },
    stackable: false,
    modified: false,
    specifics: {
      fishingRodCatchRange: 24,
    },
    sellPrice: 10,
    buyPrice: 20,
  },
  'ground-worm': {
    itemId: 'ground-worm',
    displayName: 'Ground worm',
    description: 'Ground worm, can be used as a fish bait or bird snack',
    possibleSlots: [...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/fishing/worm' },
    stackable: true,
    modified: false,
    specifics: {
      fishingBait: true,
    },
    sellPrice: 1,
    buyPrice: 2,
  },
  bread: {
    itemId: 'bread',
    displayName: 'Loaf of bread',
    description: 'Slightly old, but still good smelling loaf of bread, can be eater to restore 15% of health',
    possibleSlots: [...backpackSlotNames, ...containerSlotNames],
    sprite: { texture: 'icons', frame: 'icons/food-and-drinks/bread' },
    stackable: true,
    modified: false,
    specifics: {
      fishingBait: true,
      worldConsumable: {
        type: 'health',
        value: 0.15,
      },
    },
    sellPrice: 2,
    buyPrice: 4,
  },
  carp: {
    itemId: 'carp',
    displayName: 'Carp',
    description: 'Fresh, if somewhat skinny, carp. Can be eaten to restore 50% of HP.',
    possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
    sprite: {
      texture: 'icons',
      frame: 'icons/fishing/silver-fish',
    },
    stackable: true,
    modified: false,
    specifics: {
      worldConsumable: {
        type: 'health',
        value: 0.5,
      },
      baitPreferences: {
        loves: ['bread'],
        likes: ['apple'],
        hates: ['ground-worm'],
      },
      fishPattern: [
        { moveTo: 0, speed: 1000 },
        { moveTo: 0.25, speed: 1000 },
        { moveTo: 0.45, speed: 2000 },
        { moveTo: 0.35, speed: 1000 },
        { moveTo: 0.45, speed: 1000 },
        { moveTo: 0.65, speed: 500 },
        { moveTo: 1, speed: 1000 },
        { moveTo: 0.55, speed: 1000 },
        { moveTo: 0.85, speed: 1000 },
        { moveTo: 0.65, speed: 1000 },
        { moveTo: 0.45, speed: 2000 },
      ],
    },
    sellPrice: 3,
    buyPrice: 6,
  },
  perch: {
    itemId: 'perch',
    displayName: 'Perch',
    description: 'Fresh, if somewhat skinny, perch. Can be eaten to restore 50% of MP.',
    possibleSlots: [...backpackSlotNames, ...containerSlotNames, ...componentSlotNames],
    sprite: {
      texture: 'icons',
      frame: 'icons/fishing/brown-fish',
    },
    stackable: true,
    modified: false,
    specifics: {
      worldConsumable: {
        type: 'manna',
        value: 0.5,
      },
      baitPreferences: {
        loves: ['ground-worm'],
        likes: ['apple'],
        hates: ['bread'],
      },
      fishPattern: [
        { moveTo: 0, speed: 1000 },
        { moveTo: 0.25, speed: 1000 },
        { moveTo: 0, speed: 1000 },
        { moveTo: 0.75, speed: 2000 },
        { moveTo: 1, speed: 1000 },
        { moveTo: 0.75, speed: 1000 },
        { moveTo: 0.25, speed: 1000 },
        { moveTo: 0.45, speed: 500 },
        { moveTo: 0.75, speed: 3000 },
        { moveTo: 0.3, speed: 1500 },
      ],
    },
    sellPrice: 3,
    buyPrice: 6,
  },
};

export default fishingItems;
