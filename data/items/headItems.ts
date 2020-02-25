export const headItems: { [key: string]: ItemData } = {
    'rangers-hat': {
        itemId: 'rangers-hat',
        displayName: 'Ranger\'s hat',
        description: 'Classic ranger\'s hat - provides very little protection, but does not get in a way',
        slot: ['head', 'backpack'],
        sprite: {key: 'icon-item-set', frame: 112},
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            additionalCharacteristics: [
                {'attributes.agility': 1},
                {'attributes.initiative': 1},
                {'defences.armor': 1},
            ],
            size: ['xs', 's', 'm'],
        },
        sellPrice: 5,
        buyPrice: 10
    },
};
