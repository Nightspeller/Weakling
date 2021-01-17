define(["require", "exports", "./itemSlots", "../../helpers/helperFunctions"], function (require, exports, itemSlots_1, helperFunctions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const healthPotions = helperFunctions_1.generatePotions('health', [
        { texture: 'icons', frame: 'icons/potions/red/small-red-potion' },
        { texture: 'icons', frame: 'icons/potions/red/medium-red-potion' },
        { texture: 'icons', frame: 'icons/potions/red/big-red-potion' },
        { texture: 'icons', frame: 'icons/potions/red/giant-red-potion' },
    ]);
    const energyPotions = helperFunctions_1.generatePotions('energy', [
        { texture: 'icons', frame: 'icons/potions/green/small-green-potion' },
        { texture: 'icons', frame: 'icons/potions/green/medium-green-potion' },
        { texture: 'icons', frame: 'icons/potions/green/big-green-potion' },
        { texture: 'icons', frame: 'icons/potions/green/giant-green-potion' },
    ]);
    const mannaPotions = helperFunctions_1.generatePotions('manna', [
        { texture: 'icons', frame: 'icons/potions/blue/small-blue-potion' },
        { texture: 'icons', frame: 'icons/potions/blue/medium-blue-potion' },
        { texture: 'icons', frame: 'icons/potions/blue/big-blue-potion' },
        { texture: 'icons', frame: 'icons/potions/blue/giant-blue-potion' },
    ]);
    const strengthPotions = helperFunctions_1.generatePotions('strength', [
        { texture: 'icons', frame: 'icons/potions/yellow/small-yellow-potion' },
        { texture: 'icons', frame: 'icons/potions/yellow/medium-yellow-potion' },
        { texture: 'icons', frame: 'icons/potions/yellow/big-yellow-potion' },
        { texture: 'icons', frame: 'icons/potions/yellow/giant-yellow-potion' },
    ]);
    const quickSlotItems = {
        ...healthPotions,
        ...energyPotions,
        ...mannaPotions,
        ...strengthPotions,
        'trap-kit': {
            itemId: 'trap-kit',
            displayName: 'Trap kit',
            description: 'Simple trap kit',
            possibleSlots: [...itemSlots_1.quickSlotNames, ...itemSlots_1.backpackSlotNames, ...itemSlots_1.containerSlotNames],
            sprite: { texture: 'icon-item-set', frame: 174 },
            stackable: true,
            modified: false,
            quantity: null,
            specifics: {
                additionalActions: ['setTrap'],
            },
            sellPrice: 5,
            buyPrice: 10,
        },
        beer: {
            itemId: 'beer',
            displayName: 'Beer',
            description: 'Local beer.',
            possibleSlots: [...itemSlots_1.quickSlotNames, ...itemSlots_1.backpackSlotNames, ...itemSlots_1.containerSlotNames],
            sprite: { texture: 'icon-item-set', frame: 254 },
            stackable: true,
            modified: false,
            quantity: null,
            specifics: {
                additionalActions: ['drinkAlcohol'],
            },
            sellPrice: 2,
            buyPrice: 3,
        },
    };
    exports.default = quickSlotItems;
});
//# sourceMappingURL=quickSlotItems.js.map