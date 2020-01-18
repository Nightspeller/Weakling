export const bodgerDialog: DialogTree = [{
    id: 'greetings',
    text: `    Hi, I am Bodger, the blacksmith of Honeywood. You will not find any better equipment in that hole, that's for sure.`,
    replies: [{
        text: 'Show me what you have',
        callbackParam: 'fastEnd'
    }, {
        text: 'Not interested',
        callbackParam: 'fastEnd'
    }]
}];
