import {backpackItems} from "./items/backpackItems.js";
import {bagItems} from "./items/bagItems.js";
import {beltItems} from "./items/beltItems.js";
import {bodyItems} from "./items/bodyItems.js";
import {bootsItems} from "./items/bootsItems.js";
import {capeItems} from "./items/capeItems.js";
import {glovesItems} from "./items/glovesItems.js";
import {handsItems} from "./items/handsItems.js";
import {headItems} from "./items/headItems.js";
import {neckItems} from "./items/neckItems.js";
import {pantsItems} from "./items/pantsItems.js";
import {quickSlotItems} from "./items/quickSlotItems.js";
import {ringsItems} from "./items/ringsItems.js";
import {tailItems} from "./items/tailItems.js";


export const itemsData: { [key: string]: ItemData } = {
    ...backpackItems,
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
