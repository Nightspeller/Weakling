import passiveEffects from './effects/passiveEffects';
import directEffects from './effects/directEffects';
import conditionalEffects from './effects/conditionalEffects';
import { EffectData } from '../types/my-types';

const effectsData: { [key: string]: EffectData } = {
  ...passiveEffects,
  ...directEffects,
  ...conditionalEffects,
};

export default effectsData;
