export const hermitDialogStab = [{
        id: `greetings`,
        text: `Oh hey! You are not supposed to be here! In fact, I am not supposed to be here neither. The whole 'here' is not supposed to be here - I am a character from the second act. So, farewell for now, and if you wish us to meet again, for real this time, please go and support the developer with feedback and kind word. Thank you!`,
        replies: [{
                text: `(End) Naaaah`,
                callbackParam: `fastEnd`
            }, {
                text: `(End) Will do!`,
                callbackParam: `fastEnd`
            }]
    }];
export const hermitDialog = [{
        id: `greetings`,
        text: `So the Varadun sent you? Interesting... I guess that means that you are also striving to get the ear of the Neverforgeting One. Who is that your revenge is against? Bandits? Greedy merchants?
    Is it also these damned old farts from the Grey Tower? Oh if so, you just came to the very right place!`,
        replies: [{
                text: `My revenge is against The Seeking Hand, but I don't want to Talk about it.`,
                successTriggers: `seekingHand`
            }, {
                text: `I need to learn how to defeat Bremor the Blazer, he is an apprentice of Ragwar the Watcher. Varadun said that you will know who that is.`,
                successTriggers: `ragwar`,
            }, {
                text: `My revenge is mine and mine alone, I am not even sure why am I talking to you...`,
                callbackParam: `fastEnd`
            }]
    }, {
        id: `seekingHand`,
        text: `The Seeking Hand you said? I haven't heard about them - they must be new around here. But why Varadun told you to seek me - whoever they are I doubt I have a quarrel with them`,
        replies: [{
                text: `One of them is Bremor the Blazer, an apprentice of Ragwar the Watcher.`,
                successTriggers: `ragwar`,
            }, {
                text: `They burned my village to the ground, slaughtered everyone there and I can't do anything to them unless I learn how to use magic! If you are not going to help me then I am just wasting my time here...`,
                callbackParam: `fastEnd`
            }]
    }, {
        id: `ragwar`,
        text: `Ragwar you said? Oh, now I see!.. So, you are going after his apprentice? That is very very nice. Ragwar is an old nemesis of mine, one of the five arch-mages of the Grey Tower.
    Hurting him means hurting all of them and that is what I prey to the Neverforgiving one for.`,
        replies: [{
                text: `I am not interested in killing Ragwar - his apprentice is the one whom I want to see feeding the worms.`,
                successTriggers: `ragwar2`
            }]
    }, {
        id: `ragwar2`,
        text: `Hahaha! You?! Killing Ragwar?! Oh that's so funny! He might not be the strongest or most influential of the circle, but he is the oldest one. And he is still the arch-mage. 
    The likes of you will never even see him, not speaking about getting close enough to blow on him. I spent years trying to get to them, but the most realistic thing one could do is to cut` +
            ` their tentacles when they spread them out of their precious tower.`,
        replies: [{
                text: `Is that so? Then what are you trying to achieve? And why do you hate them?`,
                successTriggers: `ragwar3`
            }]
    }, {
        id: `ragwar3`,
        text: `The Grey Tower - they control everything here. Heck, they think that they are the magic itself! They decide who is allowed to do and what, who is worth teaching and who is not. ` +
            `I was supposed to be the greatest mage of Caltor! I was natural! Yet, they refused to teach me - "Your magic is too wild." - they said - "You can't be allowed to use it!" ` +
            `And since they said it, nobody would take me as the apprentice! I had to study on my own, to spend years on things other apprentices learned from their masters in weeks!
    I had to leave the town and build my own Tower here, in the middle of nowhere. My career, my life was ruined because somebody there in the circle was too afraid of my true potential!`,
        replies: [{
                text: `Then teach me how to get to the Blazer - I am sure Ragwar will feel it when his apprentice will fall.`,
                successTriggers: `teaching`
            }]
    }, {
        id: `teaching`,
        text: `Hmm... Unfortunately it is not that easy - look, even for the talented young man to learn the magic will take months to begin. And you...I don't see any magic aura around you, at all.
    I just don't think that you will ever be able to become a mage, no matter how hard your desire it.`,
        replies: [{
                text: `So you are not going to teach me? You, among all the people! You, who just whimpered about being abandoned and betrayed while asking exactly the same!?`,
                successTriggers: `teaching2`
            }]
    }, {
        id: `teaching2`,
        text: `Don't get fired up - if you can't use magic what can I do? You either born with the Gift or not. There are very few things which can change it, and none of them are in my power...
    Although - you don't really want to be the mage, do you? You just want to be able to defeat one, right? In that case there might be just the way!`,
        replies: [{
                text: `What is it?`,
                successTriggers: `teaching3`
            }]
    }, {
        id: `teaching3`,
        text: `I will teach you how to scribe scrolls. It is easier than it seems to be. Well, of course you will not be able to create a scroll yourself - for that you do need to be able to cast the spells.` +
            `But if you already have one, and you happen to have suitable components like stylus, parchment, ink, couple of proper extracts and can memorise and repeat a few words, you should be able to copy the scroll, make a bunch of it to use later.` +
            `That is not very creative approach to magic, but should be enough to prepare you for the battle with the mage's apprentice`,
        replies: [{
                text: `(continue)`,
                successTriggers: `teaching4`
            }]
    }, {
        id: `teaching4`,
        text: `Now, as I said - in these lands it is not exactly legal - you see, the Grey Tower does not only controls magic users around here, but also forbids the creation and distribution` +
            ` of scrolls which are not created by "acknowledged" wizards - their pet guild members for the most part. They even managed to convince local authorities to support the ban -` +
            ` you see, they say it is too dangerous to allow non-trained person to create a scroll.`,
        replies: [{
                text: `(continue)`,
                successTriggers: `teaching5`
            }]
    }, {
        id: `teaching5`,
        text: `And yeah, if you are not careful your scroll can fuzz off or even worse, but you know what - I believe in you - I think you can do it, and do it right. ` +
            `And even keep all your limbs together after using one. So let me show you how to start, but never tell anybody where did you learn it - the great Wooden Tower is not ready to be revealed.` +
            `From now on, you can call me ... Master!`,
        replies: [{
                text: `Thank you, Master`,
                callbackParam: `fastEnd`
            }]
    }];
export const hermitLastDialog = [{
        id: `greetings`,
        text: ``,
        replies: [{
                text: ``,
                callbackParam: `openShop`
            }, {
                text: ``,
                callbackParam: `fastEnd`
            }]
    }];
//# sourceMappingURL=hermitDialog.js.map