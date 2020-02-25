export const capeItems: { [key: string]: ItemData } = {
    'invisibility-cape': {
        itemId: 'invisibility-cape',
        displayName: 'Invisibility cloak',
        description: 'Once per battle allows you to become invisible for your enemies',
        slot: ['cape', 'backpack'],
        sprite: {key: 'icon-item-set', frame: 126},
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            skills: ['invisibility'],
            additionalCharacteristics: [
                {'defences.magicResistance': 2}
            ],
            size: ['xs', 's', 'm', 'l', 'xl', 'xxxl']
        },
        sellPrice: 30,
        buyPrice: 60
    },
};
