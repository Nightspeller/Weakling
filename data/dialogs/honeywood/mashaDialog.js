export const mashaDialog = [{
        id: 'greetings',
        text: `    Oh hello there, didn't notice you in the grass. Looking for this no good husband of mine, aren't you? Let me guess, he did not pay you for the job or something? Yeah, that's absolutely like Joe. 
    Unfortunately, he is not here - must be drinking in Tipsy Dragon as usual.`,
        replies: [{
                text: 'Your husband? No, I was just passing by on my way to Caltor.',
                successTriggers: 'passingBy'
            }, {
                text: 'Hmm..yes! I did.. em.. work.. for him and he promised to pay 5 copper pieces, but never did!',
                successTriggers: 'owesMoney'
            }]
    }, {
        id: 'owesMoney',
        text: `    Yea, this is so much like him! Trying to trick anybody and everybody to do his work for free! No worries - here you go. I apologise for his behavior. 
    Now, when that is settled, would you like to buy something. He might be not the best person around, but our produce is still the best in the village!`,
        replies: [{
                text: 'Sure, show me what you have!',
                callbackParam: 'owesMoneyAndOpenShop'
            }, {
                text: `(end) No, I am good, thank you!`,
                callbackParam: 'owesMoney'
            }]
    }, {
        id: 'passingBy',
        text: `    Oh! Good to hear! Well, then may be you would like to buy a snack - Caltor is still quite far away.`,
        replies: [{
                text: 'Sure, show me what you have!',
                callbackParam: 'openShop'
            }, {
                text: `No..I don't have enough money on me, sorry`,
                successTriggers: 'noMoney'
            }, {
                text: `(end) No, I am good, thank you!`,
                callbackParam: 'fastEnd'
            }]
    }, {
        id: 'noMoney',
        text: `    Oh you, poor thing! Here, take this carrot - it's too small to be sold anyway, but should give you plenty of energy, little one!`,
        replies: [{
                text: 'Thank you, you are very kind!',
                callbackParam: 'carrotObtained'
            }, {
                text: `I am good, but thank you for your kindness!`,
                callbackParam: 'fastEnd'
            }]
    }];
export const mashaSecondDialog = [{
        id: 'greetings',
        text: `    Oh hello again! Came back for a snack? Telling you - our crops are the best!`,
        replies: [{
                text: 'Sure, show me what you have!',
                callbackParam: 'openShop'
            }, {
                text: `(end) No, I am good, thank you!`,
                callbackParam: 'fastEnd'
            }]
    }];
//# sourceMappingURL=mashaDialog.js.map