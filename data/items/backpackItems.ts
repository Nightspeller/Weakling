export const backpackItems: { [key: string]: ItemData } = {
    'basket': {
        itemId: 'basket',
        displayName: 'Basket',
        description: 'Accurately made, sturdy baskets made by aunt Nahkha for sale',
        slot: ['backpack'],
        sprite: {key: 'icon-item-set', frame: 160},
        stackable: true,
        modified: false,
        currentSlot: null,
        specifics: { },
        sellPrice: 5,
        buyPrice: 10
    },
    'minerals': {
        itemId: 'minerals',
        displayName: 'Minerals',
        description: 'A chunk of minerals',
        slot: ['backpack'],
        sprite: {key: 'icon-item-set', frame: 274},
        stackable: true,
        modified: false,
        currentSlot: null,
        specifics: { },
        sellPrice: 5,
        buyPrice: 10
    },
    'copper-key': {
        itemId: 'copper-key',
        displayName: 'Copper key',
        description: 'Simple key most likely used to unlock some simple door or chest',
        slot: ['backpack'],
        sprite: {key: 'icon-item-set', frame: 185},
        stackable: false,
        modified: false,
        currentSlot: null,
        specifics: {
            opens: ''
        },
        sellPrice: 1,
        buyPrice: 2
    },
    'copper-pieces': {
        itemId: 'copper-pieces',
        displayName: 'Copper pieces',
        description: 'Basic currency of Ardhon',
        slot: ['backpack'],
        sprite: {key: 'icon-item-set', frame: 200},
        stackable: true,
        modified: false,
        currentSlot: null,
        specifics: {},
        sellPrice: 1,
        buyPrice: 1
    }
};
