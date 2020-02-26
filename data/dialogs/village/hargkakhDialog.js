export const hargkakhFirstDialog = [{
        id: 'greetings',
        text: `Oh, it's been a while! Haven't seen you since i gave you these blackolites - you could have stopped by and tell me if you found out anything about it you know.. But I understand, you, younglings are too busy these days for a simple chit chat..
     Even now I  bet you are here because Guarthh wants stones for sale in Caltor, am I right?`,
        replies: [{
                text: 'I am sorry uncle Hargkakh! I meant to stop by, but these stones! They are really amazing! I grinded them to powder and added sour grass juice and then..',
                successTriggers: 'greetings2',
            }]
    }, {
        id: 'greetings2',
        text: 'I knew it was not useless! Told you - everything can be used for something other than throwing down the cliffs! I want to hear all about it, but first you need to take these boxes to the human city' +
            ' - i found some copper, and even a little bit of iron ore - this must be good enough to keep the village going for the winter! Can you carry it?',
        replies: [{
                text: '(Strength) Let me try it',
                checkCharacteristic: 'attributes.strength',
                checkValue: 12,
                successTriggers: 'pickupSuccess',
                failureTriggers: 'pickupFailure',
            }]
    }, {
        id: 'pickupSuccess',
        text: `(Success) You got it! Great! Come back soon and show me what you got out of this black bolder`,
        replies: [{
                text: 'I don\'t think blackolite is the rock - just wait till I return and I promise I will blow your mind!',
                callbackParam: 'mineralsObtained'
            }]
    }, {
        id: 'pickupFailure',
        text: `(Fail) Oh..it seems these are just a little bit too heavy for you.. Yeah, strength was never your best side.. But I know just a way to help with that. Go to my cave, the one near the fields, remember? 
    There you will find a chest, it will be locked, but here is the key. Inside you will find my work belt and gloves - trust me it is much easier to carry things with it. You can borrow it until you come back. Now go. `,
        replies: [{
                text: 'Thank you, I will be right back!',
                callbackParam: 'pickupFailure'
            }]
    }];
export const hargkakhSecondTryDialog = [{
        id: 'greetings',
        text: `Got it? Good! Try picking it up now!`,
        replies: [{
                text: '(Strength) Okay',
                checkCharacteristic: 'attributes.strength',
                checkValue: 12,
                successTriggers: 'pickupSuccess',
                failureTriggers: 'pickupFailure',
            }]
    }, {
        id: 'pickupSuccess',
        text: `(Success) You got it! Great! Come back soon and show me what you got out of this black bolder`,
        replies: [{
                text: 'I don\'t think blackolite is the rock - just wait till I return and I promise I will blow your mind!',
                callbackParam: 'mineralsObtained'
            }]
    }, {
        id: 'pickupFailure',
        text: `(Fail) These are not the items I sent you for! Go change and come back!`,
        replies: [{
                text: 'I will be right back!',
                callbackParam: 'fastEnd'
            }]
    }];
export const hargkakhAfterGoodsObtainedDialog = [{
        id: 'greetings',
        text: `Go now, the faster you leave the sooner you will come back!`,
        replies: [{
                text: 'Thank you, I will be on my way!',
                callbackParam: 'fastEnd'
            }]
    }];
//# sourceMappingURL=hargkakhDialog.js.map