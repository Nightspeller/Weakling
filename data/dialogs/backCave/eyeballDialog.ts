export const eyeballFirstTimeDialog: DialogTree = [{
    id: 'greetings',
    text: `Bul'k bul'k!`,
    replies: [{
        text: `Oh here you are! I was wondering where are you! Haven't see you since...`,
        successTriggers: 'greetings2'
    }]
}, {
    id: 'greetings2',
    text: `Buuuul'k...`,
    replies: [{
        text: `Riiiight..since the incident with Whiskers... Look, I am sorry! I didn't know that after drinking this potion he will be able to jump for 5 meters!`,
        successTriggers: 'greetings3'
    }]
}, {
    id: 'greetings3',
    text: `Bul'k! Bul'k! Bul'k!`,
    replies: [{
        text: `Look, he is back to normal now, he will never be able to catch you again - you can come out!`,
        successTriggers: 'greetings4'
    }]
}, {
    id: 'greetings4',
    text: `Bul'kkk? Bul'k! Bul'k!`,
    replies: [{
        text: `I promise! How about that - you can come and stick with me for some time, and if he will try to do anything unnaturally skillful we will chill him, together!`,
        successTriggers: 'greetings5'
    }, {
        text: `Yeah, I understand.. Pretty traumatizing experience - being dragged through the whole Village by a cat, like some kind of flying mouse.. I will leave you be then, get better soon!`,
        callbackParam: 'fastEnd'
    }]
}, {
    id: 'greetings5',
    text: `Bul'k!`,
    replies: [{
        text: `Still no? Well, I guess I'll have to come up with some way to make it up to you...`,
        callbackParam: 'wantsToHelp'
    }, {
        text: `Yeah, I understand.. Pretty traumatizing experience - being dragged through the whole Village by a cat, like some kind of flying mouse.. I will leave you be then, get better soon!`,
        callbackParam: 'fastEnd'
    }]
}];

export const eyeballSecondTimeDialog: DialogTree = [{
    id: 'greetings4',
    text: `Bul'kkk? Bul'k! Bul'k!`,
    replies: [{
        text: `Whiskers is fine now! And I can tell by the look in his eyes that he is sorry! Come out, we miss you!`,
        successTriggers: 'greetings5'
    }]
}, {
    id: 'greetings5',
    text: `Bul'k!`,
    replies: [{
        text: `Still no? Well, I guess I'll have to come up with some way to make it up to you...`,
        callbackParam: 'wantsToHelp'
    }, {
        text: `Yeah, I understand.. Pretty traumatizing experience - being dragged through the whole Village by a cat, like some kind of flying mouse.. I will leave you be then, get better soon!`,
        callbackParam: 'fastEnd'
    }]
}];

export const eyeballSecondTimeOfferPurplecupDialog: DialogTree = [{
    id: 'greetings4',
    text: `Bul'kkk? Bul'k! Bul'k!`,
    replies: [{
        text: `Whiskers is fine now! And I can tell by the look in his eyes that he is sorry! Come out, we miss you!`,
        successTriggers: 'greetings5'
    }]
}, {
    id: 'greetings5',
    text: `Bul'k!`,
    replies: [{
        text: `Still no? Hey! How about some Purplecups? Will it cheer you up?`,
        checkInventory: 'remove',
        checkValue: [{itemId: 'purplecup-mushroom', quantity: 1}],
        successTriggers: 'purplecupGiven',
        failureTriggers: 'noPurplecup',
    }, {
        text: `Yeah, I understand.. Pretty traumatizing experience - being dragged through the whole Village by a cat, like some kind of flying mouse.. I will leave you be then, get better soon!`,
        callbackParam: 'fastEnd'
    }]
}, {
    id: 'purplecupGiven',
    text: `Buuuul'k!`,
    replies: [{
        text: `That's my boy! Lets go!`,
        callbackParam: 'eyeballJoined'
    }]
}, {
    id: 'noPurplecup',
    text: `Bul'k?..`,
    replies: [{
        text: `I don't have it with me.. Let me go get some - I will be right back!`,
        callbackParam: 'fastEnd'
    }]
}];
