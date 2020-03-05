export const keithDialog: DialogTree = [{
    id: 'greetings',
    text: `No! No, no, no, no, no! I am not giving you any more carrots! Not after what you said about my cabbage! Besides, you will just squash, smash and burn it again for your weird hobby, will you not?
    If you want it, grow your own! Elder gave you the patch in the valley, so how about you clear it from that useless sourgrass of yours and start growing real plants?`,
    replies: [{
        text: 'Sourgrass is not useless! Look, just yesterday I tried mixing it with some weird rocks Hargkakh has found...',
        successTriggers: 'explanation'
    }, {
        text: `Yeah..but I ran out of seeds.. Do you think I can borrow some from you?`,
        successTriggers: 'borrow'
    }, {
        text: `I don't need your carrots! In fact I don't need anything from you, I just came to say hi, but now I am leaving and you can stay here with your stupid cabbage!`,
        callbackParam: 'noApology'
    }]
}, {
    id: 'explanation',
    text: `Oh please spare me! You can't eat neither sourgrass, nor rocks, and I doubt that mixture of those tastes any better!`,
    replies: [{
        text: 'Yeah..but I ran out of seeds.. Do you think I can borrow some from you?',
        successTriggers: 'borrow'
    }, {
        text: `Anyway, I don't need your carrots! In fact I don't need anything from you, I just came to say hi, but now I am leaving and you can stay here with your stupid cabbage!`,
        callbackParam: 'noApology'
    }]
}, {
    id: 'borrow',
    text: `No way! Although... If you will take back what you said about my cabbage and apologise I might sell you some, but just this time - we will need the rest for the next season.`,
    replies: [{
        text: 'Fine...I am sorry for what I said about your cabbage - it is not useless, and it is not withered, and it is certainly bigger than your brain...',
        successTriggers: 'excuseContinue1'
    }, {
        text: `I don't need your carrots! In fact I don't need anything from you, I just came to say hi, but now I am leaving and you can stay here with your stupid cabbage!`,
        callbackParam: 'noApology'
    }]
}, {
    id: 'excuseContinue1',
    text: `Aaaaand?`,
    replies: [{
        text: '...and it is exactly what we all will be happy to eat for dinner, and it certainly does not smell like...',
        successTriggers: 'excuseContinue2'
    }]
}, {
    id: 'excuseContinue2',
    text: `Okay, okay, that is enough, here is what I can sell you. 
    (Though I am still not sure if that you properly apologised for that brain size comparison - somehow I feel like you almost made it sound even worse...)`,
    replies: [{
        text: 'And I apologise for that too, now show me what you got!',
        callbackParam: 'openShop'
    }]
}];

export const keithNoApologyDialog: DialogTree = [{
    id: 'borrow',
    text: `Came to apologise, huh? Very well, I am listening.`,
    replies: [{
        text: 'Fine...I am sorry for what I said about your cabbage - it is not useless, and it is not withered, and it is certainly bigger than your brain...',
        successTriggers: 'excuseContinue1'
    }, {
        text: `I don't need your carrots! In fact I don't need anything from you, I just came to say hi, but now I am leaving and you can stay here with your stupid cabbage!`,
        callbackParam: 'noApology'
    }]
}, {
    id: 'excuseContinue1',
    text: `Aaaaand?`,
    replies: [{
        text: '...and it is exactly what we all will be happy to eat for dinner, and it certainly does not smell like...',
        successTriggers: 'excuseContinue2'
    }]
}, {
    id: 'excuseContinue2',
    text: `Okay, okay, that is enough, here is what I can sell you. 
    (Though I am still not sure if that you properly apologised for that brain size comparison - somehow I feel like you almost made it sound even worse...)`,
    replies: [{
        text: 'And I apologise for that too, now show me what you got!',
        callbackParam: 'openShop'
    }]
}];

export const keithShopAgainDialog: DialogTree = [{
    id: 'borrow',
    text: `You again? So what do you need this time?`,
    replies: [{
        text: 'I forgot to get something I needed, show me what you got again',
        callbackParam: 'openShop'
    }, {
        text: `Nothing really, just decided to stop by.`,
        callbackParam: 'fastEnd'
    }]
}];
