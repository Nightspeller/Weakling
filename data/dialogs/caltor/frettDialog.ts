export const frettDialog: DialogTree = [{
    id: 'greetings',
    text: `    I like to observe this part of town - it is where life and history meet. Pavement stones here remember feet both old and new alike...`,
    replies: [{
        text: 'Stones remembering things? Must be some figure of speech.',
        callbackParam: 'fastEnd'
    }]
}];

export const frettObservedReadingDialog: DialogTree = [{
    id: 'greetings',
    text: `    I couldn't help myself but to notice that you were reading the sign on the fountain - are you interested in the story behind it?`,
    replies: [{
        text: `Not in particular - I think I learned everything I needed.`,
        callbackParam: 'fastEnd'
    }]
}];

export const frettObservedReadingAndInterestDialog: DialogTree = [{
    id: 'greetings',
    text: `    I couldn't help myself but to notice that you were reading the sign on the fountain - are you interested in the story behind it?`,
    replies: [{
        text: `Not in particular - just looking around.`,
        callbackParam: 'fastEnd'
    }, {
        text: `Actually, yes. I am curious to learn more about Caltor's greatest hero, "The defender of the weak and protector of destitute." - it must be sir Jeremy over there, right?`,
        successTriggers: 'sirJeremy'
    }]
}, {
    id: 'sirJeremy',
    text: `    Oh, Jeremy certainly was an interesting figure, our founder, the protector of the city. But defender of weak and destitute? I don't think so. You see, Jeremy was .. complicated. 
    In order to build this town he would put heavy tax burden on its folk, and ruled it with the iron fist. So, while it helped the town to grow fast and wide, I'd say he was a reason of most of the destitution, not it's remedy.`,
    replies: [{
        text: `...`,
        successTriggers: 'sirJeremy2'
    }]
}, {
    id: 'sirJeremy2',
    text: `    The description you gave is more suited to his unlawful son, Jeremaya the Bandit. His mother fall for strong character and wide cheekbones of Jeremy, who never rejected women's attention, but not the fruits of it.
    Jeremaya grown in poverty and need, but instead of following his father's footsteps and taking it on poor folks, he made it's name by trying to help them. He led the fight against the greedy landlords, cruel tax collectors, and not once crossed his father.`,
    replies: [{
        text: `...`,
        successTriggers: 'sirJeremy3'
    }]
}, {
    id: 'sirJeremy3',
    text: `    For that he was arrested, not even once, sentenced to all kinds of punishments, even death, but was always able to somehow get away with it. 
    He even outlived his father, and finally stroke a deal with the next ruler of Caltor, his brother from another mother, sir Bran von Caltor, by which taxes were reduced, landlords put in check and common folks got some air to breath.`,
    replies: [{
        text: `...`,
        successTriggers: 'sirJeremy4'
    }]
}, {
    id: 'sirJeremy4',
    text: `    For that though he promised to leave Caltor and never come back as long as the deal stays strong. 
    Nobody knows what has happen to Jeremaya after that, and there is no monument or plank in his honor, no tomb or even a simple grave of his in the city graveyard.
    Nevertheless, people remember Jeremaya the Bandit and praise him as the "Defender of the weak and protector of destitute."`,
    replies: [{
        text: `That was very interesting story, thank you for telling it.`,
        callbackParam: 'trueNameLearned'
    }]
}];

export const frettRepeatStoryDialog: DialogTree = [{
    id: 'greetings',
    text: `    So, can I help you?`,
    replies: [{
        text: `Nothing really, I just wanted to say hi.`,
        callbackParam: 'fastEnd'
    }, {
        text: `Could you please tell me the story of sir Jeremy, defender of weak and destitute?`,
        successTriggers: 'sirJeremy'
    }]
}, {
    id: 'sirJeremy',
    text: `    Oh, Jeremy certainly was an interesting figure, our founder, the protector of the city. But defender of weak and destitute? I don't think so. You see, Jeremy was .. complicated. 
    In order to build this town he would put heavy tax burden on its folk, and ruled it with the iron fist. So, while it helped the town to grow fast and wide, I'd say he was a reason of most of the destitution, not it's remedy.`,
    replies: [{
        text: `...`,
        successTriggers: 'sirJeremy2'
    }]
}, {
    id: 'sirJeremy2',
    text: `    The description you gave is more suited to his unlawful son, Jeremaya the Bandit. His mother fall for strong character and wide cheekbones of Jeremy, who never rejected women's attention, but not the fruits of it.
    Jeremaya grown in poverty and need, but instead of following his father's footsteps and taking it on poor folks, he made it's name by trying to help them. He led the fight against the greedy landlords, cruel tax collectors, and not once crossed his father.`,
    replies: [{
        text: `...`,
        successTriggers: 'sirJeremy3'
    }]
}, {
    id: 'sirJeremy3',
    text: `    For that he was arrested, not even once, sentenced to all kinds of punishments, even death, but was always able to somehow get away with it. 
    He even outlived his father, and finally stroke a deal with the next ruler of Caltor, his brother from another mother, sir Bran von Caltor, by which taxes were reduced, landlords put in check and common folks got some air to breath.`,
    replies: [{
        text: `...`,
        successTriggers: 'sirJeremy4'
    }]
}, {
    id: 'sirJeremy4',
    text: `    For that though he promised to leave Caltor and never come back as long as the deal stays strong. 
    Nobody knows what has happen to Jeremaya after that, and there is no monument or plank in his honor, no tomb or even a simple grave of his in the city graveyard.
    Nevertheless, people remember Jeremaya the Bandit and praise him as the "Defender of the weak and protector of destitute."`,
    replies: [{
        text: `That was very interesting story, thank you for telling it.`,
        callbackParam: 'trueNameLearned'
    }]
}];

export const frettHowCanIHelpYouDialog: DialogTree = [{
    id: 'greetings',
    text: `    How can I help you?`,
    replies: [{
        text: `I am good for now, thank you.`,
        callbackParam: 'fastEnd'
    }]
}];

export const frettAfterTrueNameCalledDialog: DialogTree = [{
    id: 'greetings',
    text: `    How can I help you?`,
    replies: [{
        text: `I am good for now, thank you.`,
        callbackParam: 'fastEnd'
    }, {
        text: `The story you told me, it all seems to be true! I want to know more about Jeremaya! Do you know anything about his oath?`,
        successTriggers: 'sirJeremaya'
    }]
}, {
    id: 'sirJeremaya',
    text: `    Hmm.. Oath you say... I don't remember it, but I tell you what. I have a book telling the story of Jeremaya The Bandit - the really good one. If there is a place you can find it, then it would be in this book.
    Unfortunately I can't just give it to you for free - you see I am running a book store here. But I will give you a very good price on it - 100 copper pieces and it is yours. 
    What do you say?`,
    replies: [{
        text: `I don't have such money with me.. I guess I'l have to learn about it some other way...`,
        callbackParam: 'fastEnd'
    }, {
        text: '(-100cp) Oh.. Books certainly are expensive! But here it is - can I have it now?',
        checkInventory: 'remove',
        checkValue: [{itemId :'copper-pieces', quantity: 100}],
        successTriggers: 'bookObtained',
        failureTriggers: 'notEnoughMoney'
    }]
}, {
    id: 'bookObtained',
    text: `    It is yours, happy reading!`,
    replies: [{
        text: `Thank you!`,
        callbackParam: 'bookObtained'
    }]
}, {
    id: 'notEnoughMoney',
    text: `    It seems like you don't have enough money. Do not worry, I will hold it for you.`,
    replies: [{
        text: `Thank you, I will come back later.`,
        callbackParam: 'fastEnd'
    }]
}];
