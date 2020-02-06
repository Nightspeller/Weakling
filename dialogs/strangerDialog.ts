export const strangerDialog: DialogTree = [{
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
    text: 'Let\'s see what I can show you.. With the new dialog system you can for example try to pass some ability checks. Try to get this shiny new dagger from me.',
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
    }, {
        text: '(Bargain) I will give you 10 copper pieces for it! And my wooden sword! Pleeeeease!',
        checkInventory: 'remove',
        checkValue: [{itemId :'copper-pieces', quantity: 10}, {itemId: 'wooden-sword-weapon', quantity: 1}],
        successTriggers: 'daggerSuccess4',
        failureTriggers: 'daggerBargainFailure'
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
    }, {
        text: '(Bargain) I will give you 10 copper pieces for it! And my wooden sword! Pleeeeease!',
        checkInventory: 'remove',
        checkValue: [{itemId :'copper-pieces', quantity: 10}, {itemId: 'wooden-sword-weapon', quantity: 1}],
        successTriggers: 'daggerSuccess4',
        failureTriggers: 'daggerBargainFailure'
    }]
}, {
    id: 'daggerFailure',
    text: '(Check failed) I am sorry, but that will not do - you should try something else!',
    replies: [{
        text: 'Okay.. -(',
        successTriggers: 'capabilitiesShort',
    }, {
        text: 'Nah, who needs this stupid dagger anyway..',
        callbackParam: 'fastEnd'
    }]
}, {
    id: 'daggerBargainFailure',
    text: '(Check failed) You don\'t seem to have what you offer.. Go bring 10 copper and a wooden sword and we will have a deal',
    replies: [{
        text: 'Double take!..',
        successTriggers: 'capabilitiesShort',
    }, {
        text: 'I\'ll consider it..',
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
}, {
    id: 'daggerSuccess4',
    text: 'Hmm you got yourself a deal.',
    replies: [{
        text: 'Nice!',
        callbackParam: 'daggerObtained'
    }]
}];
