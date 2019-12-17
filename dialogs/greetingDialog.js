export default [{
        id: 'greetings',
        text: 'Hello there, my young friend. Came here to see the brand new dialog system in action? How do you like it? \n' +
            'Much better than it was last time we talked, dare I say. Portraits are still in development, but there are some other features to check out! ' +
            'Try selecting a reply, so we could continue.',
        replies: [{
                text: 'Good day to you too, it looks great!',
                successTriggers: 'capabilities',
            }, {
                text: 'Oh yeah? Lets see what can it do!',
                successTriggers: 'capabilities',
            }, {
                text: 'Whatever, not interested. (end dialog)',
                callbackParam: 'fastEnd'
            }]
    }, {
        id: 'capabilities',
        text: 'Let\'s see what I can show you.. With the new dialog system you can for example try to pass some ability checks. Try to get this shiny new dagger from me',
        replies: [{
                text: '(Strength) Aaaa! I want a new dagger give me give me give me!',
                checkCharacteristic: 'attributes.strength',
                checkValue: 20,
                successTriggers: 'daggerSuccess3',
                failureTriggers: 'daggerFailure',
            }, {
                text: '(Agility) *Whistle whistle whistle* Casually walk around trying to sneaky pick up the dagger.',
                checkCharacteristic: 'attributes.agility',
                checkValue: 15,
                successTriggers: 'daggerSuccess3',
                failureTriggers: 'daggerFailure',
            }, {
                text: '(Intelligence) A & B were sitting on the pipe, A fell down, B got lost, who was left on the pipe?',
                checkCharacteristic: 'attributes.intelligence',
                checkValue: 10,
                successTriggers: 'daggerSuccess1',
                failureTriggers: 'daggerFailure',
            }]
    }, {
        id: 'capabilitiesShort',
        text: 'Try to get this shiny new dagger from me.',
        replies: [{
                text: '(Strength) Aaaa! I want a new dagger give me give me give me!',
                checkCharacteristic: 'attributes.strength',
                checkValue: 20,
                successTriggers: 'daggerSuccess3',
                failureTriggers: 'daggerFailure'
            }, {
                text: '(Agility) *Whistle whistle whistle* Casually walk around trying to sneaky pick up the dagger.',
                checkCharacteristic: 'attributes.agility',
                checkValue: 15,
                successTriggers: 'daggerSuccess3',
                failureTriggers: 'daggerFailure'
            }, {
                text: '(Intelligence) A & B were sitting on the pipe, A fell down, B got lost, who is left on the pipe?',
                checkCharacteristic: 'attributes.intelligence',
                checkValue: 10,
                successTriggers: 'daggerSuccess1',
                failureTriggers: 'daggerFailure'
            }]
    }, {
        id: 'daggerFailure',
        text: 'I am sorry, but that will not do - you should try something else!',
        replies: [{
                text: 'Okay.. -(',
                successTriggers: 'capabilitiesShort',
            }, {
                text: 'Nah, who needs this stupid dagger anyway..',
                callbackParam: 'fastEnd'
            }]
    }, {
        id: 'daggerSuccess1',
        text: 'I don\'t know.. Who?',
        replies: [{
                text: '&!',
                successTriggers: 'daggerSuccess2',
            }]
    }, {
        id: 'daggerSuccess2',
        text: 'Wow that was lame.. Besides that would work much better in Russian, not English.. But fine, I guess you deserved it..',
        replies: [{
                text: 'Yay!',
                callbackParam: 'daggerObtained'
            }]
    }, {
        id: 'daggerSuccess3',
        text: 'Whaaat?! How did you manage.. Well.. It is yours..cheater!',
        replies: [{
                text: '-PPP',
                callbackParam: 'daggerObtained'
            }]
    }];
//# sourceMappingURL=greetingDialog.js.map