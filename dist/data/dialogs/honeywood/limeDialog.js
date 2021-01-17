define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.limeSecondDialog = exports.limeDialog = void 0;
    exports.limeDialog = [{
            id: 'greetings',
            text: '    Please step carefully mr. Cobold! Mommy will get upset if you step on the flowers! I am Lime by the way and you are not from here!',
            replies: [{
                    text: 'Hi Lime. Don\'t worry, I will be careful. What are you doing here?',
                    successTriggers: 'whatAreYouDoing',
                }, {
                    text: 'Okay, I am leaving, sorry about the flowers.',
                    callbackParam: 'fastEnd',
                }],
        }, {
            id: 'whatAreYouDoing',
            text: '    Watering flowers of course! This is very important, and my mom is too busy in the flower shop, so I have to be very responsible!',
            replies: [{
                    text: 'Oh, so you are selling the flowers here? Can I get some?',
                    successTriggers: 'canIBuyFlowers',
                }, {
                    text: '(end) Very important indeed! Keep up the good work, bye!',
                    callbackParam: 'fastEnd',
                }],
        }, {
            id: 'canIBuyFlowers',
            text: '    I am sorry, but mom does not allow me to sell flowers - she says that I am too small and customers will not take me seriously because of my cute cheeks... You can get some from her store in Caltor, she should be there until night.',
            replies: [{
                    text: 'That is probably right, listen to your mom - she knows the best.',
                    successTriggers: 'momKnowsTheBest',
                }, {
                    text: 'That is just not fair - cute cheeks should not stay on a way of a business lady!',
                    successTriggers: 'businessLady',
                }, {
                    text: '(end) I see, I will make sure to stop by then!',
                    callbackParam: 'fastEnd',
                }],
        }, {
            id: 'momKnowsTheBest',
            text: '    You are boring! I thought I though of something but now I am not gonna tell you!',
            replies: [{
                    text: 'No need, who needs silly flowers anyway',
                    callbackParam: 'fastEnd',
                }],
        }, {
            id: 'businessLady',
            text: '    I know, but she does not want to listen! You know what? I like you, so I know what we can do! Mom gave me these Camomile seeds to plant, but there is no more space to plant it, so I can sell you them - seeds are not flowers after all, and I was told not to sell flowers, not seeds, right?!',
            replies: [{
                    text: 'I don\'t think this is a good idea - I am pretty certain your mom meant for you to not to sell anything',
                    callbackParam: 'fastEnd',
                }, {
                    text: 'Yea! Seeds are totally not flowers, everybody knows that! So, what do you want for them?',
                    successTriggers: 'whatDoYouWant',
                }],
        }, {
            id: 'whatDoYouWant',
            text: '    Hmm.. Let\'s see.. How about 10 copper pieces!',
            replies: [{
                    text: 'That is a bright day robbery, but your cheeks are too cute to say no to, so here you go!',
                    callbackParam: 'seedsObtained',
                }, {
                    text: 'Hmm, how about 3 copper pieces - after all I am your first customer, shouldn\'t I get a discount?',
                    callbackParam: 'seedsObtained',
                }, {
                    text: 'Oh no.. I have only one copper piece, but hey - what if I give you an apple with it?',
                    callbackParam: 'seedsObtained',
                }, {
                    text: 'Okay kid, I don\'t have time for that! Give me the seeds right now or I will trample all your flowers and tell your mom that you tried to trick her! She will certainly punish you!',
                    callbackParam: 'seedsObtained',
                }],
        }];
    exports.limeSecondDialog = [{
            id: 'greetings',
            text: '    Hi mr. Cobold! Have a nice day!',
            replies: [{
                    text: '(end) Have a nice day too, Lime the flower!',
                    callbackParam: 'fastEnd',
                }],
        }];
});
//# sourceMappingURL=limeDialog.js.map