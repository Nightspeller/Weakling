export const elderFirstTimeDialog: DialogTree = [{
    id: 'greetings',
    text: `Oh, here you are! I'v been looking for you! What was it this time? Collecting your rocks and herbs? Sneaking into the Dungeon? How many times did I tell you to keep away from` +
        `that place.. One day it will get you into trouble and who will be there to help me then? It is important for the whole villadge, you know. I am not that young anymore to go alone, and who knows how soon you will have to do Caltor trips all by yourself..`,
    replies: [{
        text: 'I am sorry Guarthh, I just got carried away.. Did you know that if you squeeze sour grass over the blackolite pouder..',
        successTriggers: 'greetings2',
    }]
}, {
    id: 'greetings2',
    text: 'Yeah..that is exactly what I am talking about - once something gets into your head it is really hard to take it out.. The important question is - are you ready for the trip? Did you pick up ' +
        'baskets from aunt Nahkha?',
    replies: [{
        text: 'Uhh..she was not ready yet, so I decided to check what this blackolite can be useful for..',
        successTriggers: 'greetings3',
    }]
}, {
    id: 'greetings3',
    text: 'Now is not the time - the sun is high already and we have to hurry to come back before the dark - go check on her again and come back - this time with the baskets. ' +
        'Oh and don\'t forget to pickup whatever Hargkakh managed to dig out - we will need every coin we can collect if we want to be ready for the winter..',
    replies: [{
        text: 'Okay..I will be right back',
        callbackParam: 'fastEnd'
    }]
}];

export const elderSecondTimeDialog: DialogTree = [
    {
        id: 'greetings',
        text: `So? Did you bring baskets and stones?`,
        replies: [{
            text: 'Yes, everything is ready, we can go.',
            checkInventory: 'keep',
            checkValue: [{itemId: 'basket', quantity: 10}, {itemId: 'minerals', quantity: 10}],
            successTriggers: 'successReply1',
            failureTriggers: 'failureReply1'
        }, {
            text: 'Not yet, but I am right on my way - Nahkha\'s cave is the one on the south, while Hargkakh digs near the fields southeast, right?',
            successTriggers: 'greetings2',
        }]
    }, {
        id: 'successReply1',
        text: 'Finally - I bet you remember the way, so let\'s go. Oh, and this time, please just follow the road - no glades to check, no bugs to catch - we are pretty late already, so let\'s just get to Caltor, offload the goods and be done with it.',
        replies: [{
            text: 'As you say, Elder..',
            callbackParam: 'readyToGo'
        }]
    }, {
        id: 'failureReply1',
        text: 'That does not look like it - you are still missing some items. Please, concentrate - you need to get both baskets and stones before we can go. Quick now.',
        replies: [{
            text: 'Oh right, I knew I am missing something!',
            callbackParam: 'fastEnd'
        }]
    }, {
        id: 'greetings2',
        text: 'No, he finished digging there a week ago.. Just follow the road to the north from here - go toward the peak and you will see the hole - he should be somewhere around there..',
        replies: [{
            text: 'Oh right right, will be right back!',
            callbackParam: 'fastEnd'
        }]
    }
];
