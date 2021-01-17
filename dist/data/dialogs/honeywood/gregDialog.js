define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gregJokeQuestAcceptedDialog = exports.gregJokeDialog = exports.gregAfterQuestFinishedDialog = exports.gregQuestAcceptedDialog = exports.gregDialog = void 0;
    exports.gregDialog = [{
            id: 'greetings',
            text: `    Hi little kobold, what are you doing so far from your mountains? Whatever the reason, I welcome you to the town of Honeywood!
     You will not find much here - just farms and fields, mostly. But if you are looking for the job I could use your help.`,
            replies: [{
                    text: 'What kind of a job are you offering?',
                    successTriggers: 'job',
                }, {
                    text: 'Thank you, I am just passing by.',
                    callbackParam: 'fastEnd',
                }],
        }, {
            id: 'job',
            text: `    It is a harvesting season, and the crops of garlic are great this year! In fact, they are so great that I have no chance to harvest them all by myself...
    I am not rich enough to hire anybody to help - in fact, I don't have any money at all, but if you will help me and harvest that field next to my house, I will let you keep all the garlic seeds you  will find!`,
            replies: [{
                    text: 'Sure, I can use some garlic seeds - would be great to grow it in our village too!',
                    callbackParam: 'jobAccepted',
                }, {
                    text: 'But I don\'t need garlic seeds - are you sure there is nothing else you can offer?',
                    successTriggers: 'otherReward',
                }, {
                    text: 'Sounds like a lot of work for barely anything in return, I\'ll pass',
                    callbackParam: 'fastEnd',
                }],
        }, {
            id: 'otherReward',
            text: '    Unfortunately no - I am a garlic farmer and unlit the crops are harvested and sold, I don\'t have anything to offer...',
            replies: [{
                    text: 'Okay, I guess I can use some garlic seeds...',
                    callbackParam: 'jobAccepted',
                }, {
                    text: 'Sounds like a lot of work for barely anything in return, I\'ll pass',
                    callbackParam: 'fastEnd',
                }],
        }];
    exports.gregQuestAcceptedDialog = [{
            id: 'greetings',
            text: '    Thank you for agreeing to help me with the garlic! Are you done already?',
            replies: [{
                    text: 'Yes, here it is!',
                    checkInventory: 'remove',
                    checkValue: [{ itemId: 'garlic', quantity: 24 }],
                    successTriggers: 'garlicGathered',
                    failureTriggers: 'garlicNotGathered',
                }, {
                    text: 'No, not yet, I will be back soon!',
                    callbackParam: 'fastEnd',
                }],
        }, {
            id: 'garlicGathered',
            text: '    Great! As agreed, you can keep all the garlic seeds for yourself! Also, if you will need more, I can always sell you some!',
            replies: [{
                    text: 'Show me what you have!',
                    callbackParam: 'garlicGatheredOpenShop',
                }, {
                    text: 'Thank you!',
                    callbackParam: 'garlicGathered',
                }],
        }, {
            id: 'garlicNotGathered',
            text: '    It seems like you are not done yet - come back when you collect all of it.',
            replies: [{
                    text: 'Right.',
                    callbackParam: 'fastEnd',
                }],
        }];
    exports.gregAfterQuestFinishedDialog = [{
            id: 'garlicNotGathered',
            text: '    Hello again little kobold! Came to buy some of my garlic?',
            replies: [{
                    text: 'Yes, please',
                    callbackParam: 'openShop',
                }, {
                    text: 'No, just stopped by to say hi',
                    callbackParam: 'fastEnd',
                }],
        }];
    exports.gregJokeDialog = [{
            id: 'greetings',
            text: `    Hello Adventurer! Welcome to the small town of Honeywood! I saw your brave spirit from miles away and feel like you are just the right person to ask for help! 
    You see, my bucket got a hole in it, and without it I cant water my crops! Could you please help me with it, I will reward you however I can.`,
            replies: [{
                    text: 'Accept',
                    callbackParam: 'accept',
                }, {
                    text: 'Decline',
                    callbackParam: 'decline',
                }],
        }];
    exports.gregJokeQuestAcceptedDialog = [{
            id: 'greetings',
            text: '    Thank you for agreeing to help me, adventurer! I will be waiting for your return!',
            replies: [{
                    text: 'Don\'t worry, I will be back soon!',
                    callbackParam: 'fastEnd',
                }],
        }];
});
//# sourceMappingURL=gregDialog.js.map