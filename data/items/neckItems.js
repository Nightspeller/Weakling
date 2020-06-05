import { backpackSlotNames, containerSlotNames } from "./itemSlots.js";
export const neckItems = {
    'allpowerful-necklace': {
        itemId: 'allpowerful-necklace',
        displayName: 'All-powerful necklace',
        description: 'Unbelievably rare and powerful artifact, which improves it\'s owner in pretty much every way',
        possibleSlots: ['neck', ...backpackSlotNames, ...containerSlotNames],
        sprite: { texture: 'allpowerful-necklace', frame: null },
        stackable: false,
        modified: false,
        specifics: {
            additionalCharacteristics: [
                { 'attributes.strength': 10 },
                { 'attributes.agility': 10 },
                { 'attributes.intelligence': 10 },
                { 'attributes.initiative': 10 },
                { 'parameters.health': 10 },
                /*{'parameters.currentHealth': 10},*/
                { 'parameters.manna': 10 },
                /*{'parameters.currentManna': 10},*/
                { 'parameters.energy': 10 },
                /*{'parameters.currentEnergy': 10},*/
                { 'defences.armor': 10 },
                { 'defences.dodge': 10 },
                { 'defences.fireResistance': 10 },
                { 'defences.coldResistance': 10 },
                { 'defences.acidResistance': 10 },
                { 'defences.electricityResistance': 10 },
                { 'defences.poisonResistance': 10 },
                { 'defences.magicResistance': 10 },
            ],
            size: ['xs', 's', 'm'],
        },
        sellPrice: 100,
        buyPrice: 200
    },
};
//# sourceMappingURL=neckItems.js.map