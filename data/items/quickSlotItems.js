import { backpackSlotNames, containerSlotNames, quickSlotNames } from "./itemSlots.js";
import { generatePotions } from "../../helpers/helperFunctions.js";
const healthPotions = generatePotions('health', [
    { texture: 'potions', frame: 'small-red-potion' },
    { texture: 'potions', frame: 'medium-red-potion' },
    { texture: 'potions', frame: 'big-red-potion' },
    { texture: 'potions', frame: 'giant-red-potion' }
]);
const energyPotions = generatePotions('energy', [
    { texture: 'potions', frame: 'small-green-potion' },
    { texture: 'potions', frame: 'medium-green-potion' },
    { texture: 'potions', frame: 'big-green-potion' },
    { texture: 'potions', frame: 'giant-green-potion' }
]);
const mannaPotions = generatePotions('manna', [
    { texture: 'potions', frame: 'small-blue-potion' },
    { texture: 'potions', frame: 'medium-blue-potion' },
    { texture: 'potions', frame: 'big-blue-potion' },
    { texture: 'potions', frame: 'giant-blue-potion' }
]);
const strengthPotions = generatePotions('strength', [
    { texture: 'potions', frame: 'small-yellow-potion' },
    { texture: 'potions', frame: 'medium-yellow-potion' },
    { texture: 'potions', frame: 'big-yellow-potion' },
    { texture: 'potions', frame: 'giant-yellow-potion' }
]);
export const quickSlotItems = {
    ...healthPotions,
    ...energyPotions,
    ...mannaPotions,
    ...strengthPotions,
    'trap-kit': {
        itemId: 'trap-kit',
        displayName: 'Trap kit',
        description: 'Simple trap kit',
        possibleSlots: [...quickSlotNames, ...backpackSlotNames, ...containerSlotNames],
        sprite: { texture: 'icon-item-set', frame: 174 },
        stackable: true,
        modified: false,
        quantity: null,
        specifics: {
            additionalActions: ['setTrap']
        },
        sellPrice: 5,
        buyPrice: 10
    },
    'beer': {
        itemId: 'beer',
        displayName: 'Beer',
        description: 'Local beer.',
        possibleSlots: [...quickSlotNames, ...backpackSlotNames, ...containerSlotNames],
        sprite: { texture: 'icon-item-set', frame: 254 },
        stackable: true,
        modified: false,
        quantity: null,
        specifics: {
            additionalActions: [`drinkAlcohol`],
        },
        sellPrice: 2,
        buyPrice: 3
    },
};
//# sourceMappingURL=quickSlotItems.js.map