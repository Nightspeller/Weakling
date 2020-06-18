export const whiskersDialog: DialogTree = [{
    id: 'greetings',
    text: `Meow`,
    replies: [{
        text: 'Meow to you to, snow-white bandit!',
        callbackParam: 'fastEnd'
    }]
}];

export const whiskersSecondDialog: DialogTree = [{
    id: 'greetings',
    text: `Meow! Meow Meow!`,
    replies: [{
        text: 'No! I am not giving you any of my strength potions, never again!',
        callbackParam: 'fastEnd'
    }]
}];
