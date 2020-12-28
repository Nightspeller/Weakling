export interface Recipe {
  component1: { id: string, quantity: number }[];
  component2: { id: string, quantity: number }[];
  component3: { id: string, quantity: number }[];
  process: { id: string, level: string };
  vessel: string;
  result: { [key: number]: { id: string, quantity: number } };
}

const recipes: { [key: string]: Recipe } = {
  'small-weak-health-potion': {
    component1: [{ id: 'sourgrass', quantity: 1 }, { id: 'rocky-rose-flower', quantity: 1 }],
    component2: [{ id: 'primula-flower', quantity: 1 }],
    component3: [],
    process: { id: 'heat', level: 'minor' },
    vessel: 'small-bottle',
    result: {
      10: { id: 'small-weak-health-potion', quantity: 1 },
      12: { id: 'small-mediocre-health-potion', quantity: 1 },
      14: { id: 'small-average-health-potion', quantity: 1 },
      16: { id: 'small-strong-health-potion', quantity: 1 },
      18: { id: 'small-powerful-health-potion', quantity: 1 },
    },
  },
  'medium-weak-health-potion': {
    component1: [{ id: 'sourgrass', quantity: 2 }, { id: 'rocky-rose-flower', quantity: 1 }],
    component2: [{ id: 'primula-flower', quantity: 1 }],
    component3: [],
    process: { id: 'heat', level: 'minor' },
    vessel: 'medium-bottle',
    result: {
      10: { id: 'medium-weak-health-potion', quantity: 1 },
      12: { id: 'medium-mediocre-health-potion', quantity: 1 },
      14: { id: 'medium-average-health-potion', quantity: 1 },
      16: { id: 'medium-strong-health-potion', quantity: 1 },
      18: { id: 'medium-powerful-health-potion', quantity: 1 },
    },
  },
  'big-weak-health-potion': {
    component1: [{ id: 'sourgrass', quantity: 3 }, { id: 'rocky-rose-flower', quantity: 2 }],
    component2: [{ id: 'primula-flower', quantity: 2 }],
    component3: [],
    process: { id: 'heat', level: 'minor' },
    vessel: 'big-bottle',
    result: {
      10: { id: 'big-weak-health-potion', quantity: 1 },
      12: { id: 'big-mediocre-health-potion', quantity: 1 },
      14: { id: 'big-average-health-potion', quantity: 1 },
      16: { id: 'big-strong-health-potion', quantity: 1 },
      18: { id: 'big-powerful-health-potion', quantity: 1 },
    },
  },
  'giant-weak-health-potion': {
    component1: [{ id: 'sourgrass', quantity: 4 }, { id: 'rocky-rose-flower', quantity: 2 }],
    component2: [{ id: 'primula-flower', quantity: 2 }],
    component3: [],
    process: { id: 'heat', level: 'minor' },
    vessel: 'giant-bottle',
    result: {
      10: { id: 'giant-weak-health-potion', quantity: 1 },
      12: { id: 'giant-mediocre-health-potion', quantity: 1 },
      14: { id: 'giant-average-health-potion', quantity: 1 },
      16: { id: 'giant-strong-health-potion', quantity: 1 },
      18: { id: 'giant-powerful-health-potion', quantity: 1 },
    },
  },
  'small-weak-strength-potion': {
    component1: [{ id: 'rocky-rose-flower', quantity: 1 }],
    component2: [{ id: 'carrot', quantity: 2 }],
    component3: [],
    process: { id: 'heat', level: 'minor' },
    vessel: 'small-bottle',
    result: {
      10: { id: 'small-weak-strength-potion', quantity: 1 },
      12: { id: 'small-mediocre-strength-potion', quantity: 1 },
      14: { id: 'small-average-strength-potion', quantity: 1 },
      16: { id: 'small-strong-strength-potion', quantity: 1 },
      18: { id: 'small-powerful-strength-potion', quantity: 1 },
    },
  },
  'medium-weak-strength-potion': {
    component1: [{ id: 'rocky-rose-flower', quantity: 1 }],
    component2: [{ id: 'carrot', quantity: 2 }],
    component3: [],
    process: { id: 'heat', level: 'minor' },
    vessel: 'medium-bottle',
    result: {
      10: { id: 'medium-weak-strength-potion', quantity: 1 },
      12: { id: 'medium-mediocre-strength-potion', quantity: 1 },
      14: { id: 'medium-average-strength-potion', quantity: 1 },
      16: { id: 'medium-strong-strength-potion', quantity: 1 },
      18: { id: 'medium-powerful-strength-potion', quantity: 1 },
    },
  },
  'medium-weak-energy-potion': {
    component1: [{ id: 'pumpkin-seeds', quantity: 2 }],
    component2: [{ id: 'carrot', quantity: 2 }],
    component3: [],
    process: { id: 'heat', level: 'minor' },
    vessel: 'medium-bottle',
    result: {
      10: { id: 'medium-weak-energy-potion', quantity: 1 },
      12: { id: 'medium-mediocre-energy-potion', quantity: 1 },
      14: { id: 'medium-average-energy-potion', quantity: 1 },
      16: { id: 'medium-strong-energy-potion', quantity: 1 },
      18: { id: 'medium-powerful-energy-potion', quantity: 1 },
    },
  },
  'bone-dust': {
    component1: [{ id: 'bone', quantity: 1 }],
    component2: [],
    component3: [],
    process: { id: 'heat', level: 'minor' },
    vessel: undefined,
    result: {
      10: { id: 'bone-dust', quantity: 2 },
      15: { id: 'bone-dust', quantity: 3 },
      20: { id: 'bone-dust', quantity: 4 },
    },
  },
};

export default recipes;
