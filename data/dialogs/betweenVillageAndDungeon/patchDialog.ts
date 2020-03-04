export const firstTimePatchDialog: DialogTree = [{
    id: 'patch1',
    text: `You are standing in front of your little patch. It is empty now, because you just collected the crop of Sourgrass for your recent experiments, but usually it flourishes with all kinds of plants.
    Not many in the village understand why would you grow so many uneatable plants, but you know that for really cool things cabbage just does not cut. Aunt Nahkha is the only person who kinda gets it - she likes and grows all kinds of flowers.
    So, would now be the time to start growing something new?`,
    replies: [{
        text: `Let's see...`,
        successTriggers: 'selectPlants'
    }, {
        text: `No, today you simply don't have time for that`,
        callbackParam: 'fastEnd'
    }]
}, {
    id: 'selectPlants',
    text: `Based on what seeds and saplings you have with you, you could plant:`,
    replies: [{
        text: `No, today you simply don't have time for that`,
        callbackParam: 'fastEnd'
    }]
}];

export const secondTimePatchDialog: DialogTree = [{
    id: 'patch1',
    text: `What are we going to do today?`,
    replies: [{
        text: `Let's plant something`,
        successTriggers: 'selectPlants'
    }, {
        text: `Let's collect crops`,
        successTriggers: 'collectPlants'
    }, {
        text: `No, today you simply don't have time for that`,
        callbackParam: 'fastEnd'
    }]
}, {
    id: 'selectPlants',
    text: `Based on what seeds and saplings you have with you, you could plant:`,
    replies: [{
        text: `No, today you simply don't have time for that`,
        callbackParam: 'fastEnd'
    }]
}, {
    id: 'collectPlants',
    text: `This is what is currently grown up:`,
    replies: [{
        text: `Never mind`,
        callbackParam: 'fastEnd'
    }]
}];
