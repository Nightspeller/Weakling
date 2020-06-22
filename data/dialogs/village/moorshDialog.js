export const moorshDialog = [{
        id: 'greetings',
        text: `What's up bud? I heard you are the one going to Caltor with Guarthh today? I already told him that we can't sell any mushrooms this year, so don't look at me.`,
        replies: [{
                text: `Why not?`,
                successTriggers: 'greetings2'
            }, {
                text: `I am not here for that, actually I could use some of your mushrooms myself!`,
                successTriggers: 'sell1'
            }]
    }, {
        id: 'greetings2',
        text: `The crops of Longshrooms are really poor this year, half of them didnt even sprout. Even Yuckies are small and mushy - and, you know, usually you have to unroot them to let the other shrooms grow. And don't let me even start on Purplecups...`,
        replies: [{
                text: `What's with Purplecups?`,
                successTriggers: 'purplecups'
            }]
    }, {
        id: 'purplecups',
        text: `Well, pretty much the same actually - smaller crops, smaller size.. And on top of that Eyeball managed to sneak into the barn and eat half of the basket! I bet it was Tareth who forgot to lock it! So yeah, this stupid bat got so stuffed he was not able to fly anymore - had to roll him outside - so heavy it got! So yeah, no Purplecups for sale neither this year..`,
        replies: [{
                text: `I see, so you dont have any mushrooms at all, even for an old friend?`,
                successTriggers: 'sell1'
            }]
    }, {
        id: 'sell1',
        text: `Nope, these are going to be our winter supplies, you know. I am not selling it to Caltor, not giving it to you or anybody else - and trust me you will thank me later. Although...`,
        replies: [{
                text: `Although what?`,
                successTriggers: 'sell2'
            }]
    }, {
        id: 'sell2',
        text: `If you really need some, I can give you some spores - I saw you cleared your Sourgrass patch, so you should be able to grow some yourself. But first, we need to make them to spore, and this is where I need your help.`,
        replies: [{
                text: `Sure, what is it?`,
                successTriggers: 'sell3'
            }, {
                text: `I am a little bit busy now with this Caltor trip, but I will certainly come back to you later, okay?`,
                callbackParam: 'fastEnd'
            }]
    }, {
        id: 'sell3',
        text: `I know you like to sneak into the Old Dungeon, even though Elder forbid you doing so. This place creeps me out - old bones, spiky traps, nasty creatures, uugh! \n   No idea what you find in all this. But it's the bones I am actually interested in - bone powder is a very nice fertilizer, especially during spore spreading.`,
        replies: [{
                text: `How much do you need?`,
                successTriggers: 'sell4'
            }, {
                text: `I am a little bit busy now with this Caltor trip, but I will certainly come back to you later, okay?`,
                callbackParam: 'fastEnd'
            }]
    }, {
        id: 'sell4',
        text: `I think 6 big bones ground to dust should do it - do you think you can get it?`,
        replies: [{
                text: `I'll see what I can do!`,
                callbackParam: 'boneQuestAccepted'
            }, {
                text: `I am a little bit busy now with this Caltor trip, but I will certainly come back to you later, okay?`,
                callbackParam: 'fastEnd'
            }]
    }];
export const moorshSecondNotAcceptedDialog = [{
        id: 'greetings',
        text: `Sup again! Did you think over my proposal? Think of it that way - you will help me, you will help yourself, you will help the whole village - just a quick trip, in and out!`,
        replies: [{
                text: `Sure, I will get you your bone dust, let's see these shrooms happy!`,
                callbackParam: 'boneQuestAccepted'
            }, {
                text: `Remind me why can't you just sell me some mushrooms or spores?`,
                successTriggers: 'remind1'
            }, {
                text: `I am a little bit busy now with this Caltor trip, but I will certainly come back to you later, okay?`,
                callbackParam: 'fastEnd'
            }]
    }, {
        id: 'remind1',
        text: `The crops of Longshrooms are really poor this year, half of them didnt even sprout. Even Yuckies are small and mushy - and, you know, usually you have to unroot them to let the other shrooms grow. And don't let me even start on Purplecups...`,
        replies: [{
                text: `What's with Purplecups?`,
                successTriggers: 'purplecups'
            }]
    }, {
        id: 'purplecups',
        text: `Well, pretty much the same actually - smaller crops, smaller size.. And on top of that Eyeball managed to sneak into the barn and eat half of the basket! I bet it was Tareth who forgot to lock it! So yeah, this stupid bat got so stuffed he was not able to fly anymore - had to roll him outside - so heavy it got! So yeah, no Purplecups for sale neither this year..`,
        replies: [{
                text: `I see, so you dont have any mushrooms at all, even for an old friend?`,
                successTriggers: 'sell1'
            }]
    }, {
        id: 'sell1',
        text: `Nope, these are going to be our winter supplies, you know. I am not selling it to Caltor, not giving it to you or anybody else - and trust me you will thank me later. Although...`,
        replies: [{
                text: `Although what?`,
                successTriggers: 'sell2'
            }]
    }, {
        id: 'sell2',
        text: `If you really need some, I can give you some spores - I saw you cleared your Sourgrass patch, so you should be able to grow some yourself. But first, we need to make them to spore, and this is where I need your help.`,
        replies: [{
                text: `Sure, what is it?`,
                successTriggers: 'sell3'
            }, {
                text: `I am a little bit busy now with this Caltor trip, but I will certainly come back to you later, okay?`,
                callbackParam: 'fastEnd'
            }]
    }, {
        id: 'sell3',
        text: `I know you like to sneak into the Old Dungeon, even though Elder forbid you doing so. This place creeps me out - old bones, spiky traps, nasty creatures, uugh! \n   No idea what you find in all this. But it's the bones I am actually interested in - bone powder is a very nice fertilizer, especially during spore spreading.`,
        replies: [{
                text: `How much do you need?`,
                successTriggers: 'sell4'
            }, {
                text: `I am a little bit busy now with this Caltor trip, but I will certainly come back to you later, okay?`,
                callbackParam: 'fastEnd'
            }]
    }, {
        id: 'sell4',
        text: `I think 6 big bones ground to dust should do it - do you think you can get it?`,
        replies: [{
                text: `I'll see what I can do!`,
                callbackParam: 'boneQuestAccepted'
            }, {
                text: `I am a little bit busy now with this Caltor trip, but I will certainly come back to you later, okay?`,
                callbackParam: 'fastEnd'
            }]
    }];
export const moorshSecondAcceptedDialog = [{
        id: 'greetings1',
        text: `So? Did you get the bones? I mean did you grind it? I don't have the right tools here, but you should be able to do it at your stand, right?`,
        replies: [{
                text: `Yes yes, I got your bone dust, it should be somewhere here..`,
                checkInventory: 'remove',
                checkValue: [{ itemId: 'bone-dust', quantity: 12 }],
                successTriggers: 'dustGiven',
                failureTriggers: 'noDust'
            }, {
                text: `Not so fast - to get it is not the easiest task, you know! I'll get it soon.`,
                callbackParam: 'fastEnd'
            }]
    }, {
        id: 'dustGiven',
        text: `Great, just what I needed! And here are the spores - these are from my old crops, but they should work out just fine - I know you would hate waiting for the new ones, so I decided to make an exception, just for a good friend!`,
        replies: [{
                text: `Nice! Thanks bud!`,
                callbackParam: 'sporesObtained'
            }]
    }, {
        id: 'noDust',
        text: `Take your time, but not too much - the winter is coming!`,
        replies: [{
                text: `Yes, my lord! :-P`,
                callbackParam: 'fastEnd'
            }]
    }];
export const moorshThirdDialog = [{
        id: 'greetings1',
        text: `Howdy? Were you able to grow the mushrooms?`,
        replies: [{
                text: `Yes! I don't know what were you complaining - they turned out great!`,
                successTriggers: 'greetings2',
            }, {
                text: `Not yet - you above all should know that it takes time...`,
                callbackParam: 'greetings3'
            }]
    }, {
        id: 'greetings2',
        text: `Good for you! If you want, I can always buy some from you. Also, I have a few things you might be interested in.`,
        replies: [{
                text: `Really?! Show me!`,
                callbackParam: 'openStore'
            }, {
                text: `Naaaah, I need those myself!`,
                callbackParam: 'fastEnd'
            }]
    }, {
        id: 'greetings3',
        text: `Yeah, I know.. Do your best, and if you succeed you can come back and sell some to me - I might even have a thing or two you will be interested in.`,
        replies: [{
                text: `Sounds good, see you later then!`,
                callbackParam: 'fastEnd'
            }]
    }];
//# sourceMappingURL=moorshDialog.js.map