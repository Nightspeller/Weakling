/* eslint-disable */
// @ts-nocheck

import { EffectData } from '../../types/my-types';

const conditionalEffects: { [key: string]: EffectData } = {
  trapped: {
    effectId: 'trapped',
    name: 'Trap prepared',
    description: 'Trap is set on the character\'s path',
    type: 'conditional',
    baseDuration: -1,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 174 },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'effect',
        value: ['subtractHealth'],
      };
    },
  },
  cursedSoil: {
    effectId: 'cursedSoil',
    name: 'Cursed soil',
    description: 'The soil is cursed on the character\'s path',
    type: 'conditional',
    baseDuration: -1,
    durationLeft: null,
    strength: null,
    source: null,
    statusImage: { texture: 'icons', frame: 283 },
    applicationCheck: (source, target, action) => true,
    setModifier(source, target, action) {
      this.modifier = {
        type: 'effect',
        value: ['subtractHealth', 'agilityDown'],
      };
    },
  },
};

export default conditionalEffects;
