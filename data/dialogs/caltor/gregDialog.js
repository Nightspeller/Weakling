export const gregDialog = [{
        id: 'greetings',
        text: `    Hello Adventurer! Welcome to the small town of Honeywood! I saw your brave spirit from miles away and feel like you are just the right person to ask for help! 
    You see, my bucket got a hole in it, and without it I cant water my crops! Could you please help me with it, I will reward you however I can.`,
        replies: [{
                text: 'Accept',
                callbackParam: 'accept'
            }, {
                text: 'Decline',
                callbackParam: 'decline'
            }]
    }];
export const gregQuestAcceptedDialog = [{
        id: 'greetings',
        text: `    Thank you for agreeing to help me, adventurer! I will be waiting for your return!`,
        replies: [{
                text: `Don't worry, I will be back soon!`,
                callbackParam: 'fastEnd'
            }]
    }];
//# sourceMappingURL=gregDialog.js.map