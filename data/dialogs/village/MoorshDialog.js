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
        text: `I think 6 big bones grinded to dust should do it - do you think you can get it?`,
        replies: [{
                text: `I'll see what I can do!`,
                callbackParam: 'boneQuestAccepted'
            }, {
                text: `I am a little bit busy now with this Caltor trip, but I will certainly come back to you later, okay?`,
                callbackParam: 'fastEnd'
            }]
    }];
//# sourceMappingURL=MoorshDialog.js.map