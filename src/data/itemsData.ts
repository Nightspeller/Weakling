import backpackItems from './items/backpackItems';
import vesselsAndIngredients from './items/vesselsAndIngredients';
import bagItems from './items/bagItems';
import beltItems from './items/beltItems';
import bodyItems from './items/bodyItems';
import bootsItems from './items/bootsItems';
import capeItems from './items/capeItems';
import glovesItems from './items/glovesItems';
import handsItems from './items/handsItems';
import headItems from './items/headItems';
import neckItems from './items/neckItems';
import pantsItems from './items/pantsItems';
import quickSlotItems from './items/quickSlotItems';
import ringsItems from './items/ringsItems';
import tailItems from './items/tailItems';
import { ItemData } from '../types/my-types';

const itemsData: { [key: string]: ItemData } = {
  ...backpackItems,
  ...vesselsAndIngredients,
  ...bagItems,
  ...beltItems,
  ...bodyItems,
  ...bootsItems,
  ...capeItems,
  ...glovesItems,
  ...handsItems,
  ...headItems,
  ...neckItems,
  ...pantsItems,
  ...quickSlotItems,
  ...ringsItems,
  ...tailItems,
};

export default itemsData;
