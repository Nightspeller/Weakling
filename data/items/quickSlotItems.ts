import {backpackSlotNames, containerSlotNames, quickSlotNames} from "./itemSlots.js";
import {generatePotions} from "../../helpers/helperFunctions.js";

const healthPotions = generatePotions('health', [
    {texture: 'icon-item-set', frame: 352},
    {texture: 'icon-item-set', frame: 156},
    {texture: 'icon-item-set', frame: 144},
    {texture: 'icon-item-set', frame: 308}
]);

const energyPotions = generatePotions('energy', [
    {texture: 'icon-item-set', frame: 306},
    {texture: 'icon-item-set', frame: 305},
    {texture: 'icon-item-set', frame: 146},
    {texture: 'icon-item-set', frame: 307}
]);

const mannaPotions = generatePotions('manna', [
    {texture: 'icon-item-set', frame: 306},
    {texture: 'icon-item-set', frame: 158},
    {texture: 'icon-item-set', frame: 145},
    {texture: 'icon-item-set', frame: 309}
]);

const strengthPotions = generatePotions('strength', [
    {texture: 'icon-item-set', frame: 306},
    {texture: 'icon-item-set', frame: 157},
    {texture: 'icon-item-set', frame: 147},
    {texture: 'icon-item-set', frame: 311}
]);

export const quickSlotItems: { [key: string]: ItemData } = {
    ...healthPotions,
    ...energyPotions,
    ...mannaPotions,
    ...strengthPotions,
    'trap-kit': {
        itemId: 'trap-kit',
        displayName: 'Trap kit',
        description: 'Simple trap kit',
        possibleSlots: [...quickSlotNames, ...backpackSlotNames, ...containerSlotNames],
        sprite: {texture: 'icon-item-set', frame: 174},
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
        sprite:  {texture: 'icon-item-set', frame: 254},
        stackable: true,
        modified: false,
        quantity: null,
        specifics: {
            useEffects: [
                {'parameters.currentHealth': 1}
            ],
        },
        sellPrice: 2,
        buyPrice: 3
    },
};
