export const tarethDialog: DialogTree = [{
    id: 'greetings',
    text: `Oh man, elder tasked me with preparing these stockpiles for winter storage! And they are sooo heavy! I barely can lift that basket, and it is not even the heaviest one!`,
    replies: [{
        text: 'You can handle it, just take it slow.',
        callbackParam: 'fastEnd'
    }]
}];

export const tarethSecondDialog: DialogTree = [{
    id: 'greetings',
    text: `Nope, still working on it, it might happen that you will be back from Caltor before I am done taking these things across the road and downstairs.`,
    replies: [{
        text: 'I will help you as soon as I come back, I promise, Tareth!',
        callbackParam: 'fastEnd'
    }]
}];
