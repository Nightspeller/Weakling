import { DialogTree } from '../../../types/my-types';

export const farmerJoeDialogQuestNotObtained: DialogTree = [{
  id: 'greetings',
  text: 'What is it? Hope you brought some good news about that damned pigs?',
  replies: [{
    text: 'Pigs? What pigs?',
    successTriggers: 'whatPigs',
  }, {
    text: '(End) Yeah, pigs, pigs are everywhere - just last week one of them tried to charge me double for a simple basket of carrots!',
    callbackParam: 'fastEnd',
  }],
}, {
  id: 'whatPigs',
  text: `    So you didn't see the poster? Darn beasts are ruining my fields and I can't chase them away myself - these are not your homegrown piglets - absolutely wild boars they are!
    I am looking for help, but so far nobody volunteered...`,
  replies: [{
    text: 'I can help you with it!',
    successTriggers: 'readyToHelp',
  }, {
    text: 'I can help you with it. What is the reward?',
    successTriggers: 'readyToHelpForReward',
  }, {
    text: '(End) I see... Yeah, nasty beasts they are! Once they made me to sit on a tree for a few hours - whole village had to come for the rescue... Good luck!',
    callbackParam: 'questRejected',
  }],
}, {
  id: 'readyToHelp',
  text: 'Great! Then what are you waiting for - every minute they feast on my delicious cabbage they get fatter and stronger!',
  replies: [{
    text: '(End) Time to make some kebabs!',
    callbackParam: 'questAccepted',
  }],
}, {
  id: 'readyToHelpForReward',
  text: 'Reward? I was hoping somebody will volunteer to do it for free - after all the thrill of battle and valuable life experience is a reward of its own, not speaking that the boar meat is delicious - and you are allowed to keep it, even though it was harvested on My fields!',
  replies: [{
    text: 'I see.. Fine, I will do it for free...',
    callbackParam: 'questAccepted',
  }, {
    text: '(Int check) And how did it go so far? I don\'t see any volunteers around, but I can see that your crops are disappearing - so how about I will take on a task for, let\'s say, 15 copper - surely you\'ll get much more if the crops are intact.',
    checkCharacteristic: 'intelligence',
    checkValue: 11,
    successTriggers: 'readyToHelpForReward2',
    failureTriggers: 'rewardDemandRejected',
  }, {
    text: '(End) I am not doing it for, good luck with your new pets!',
    callbackParam: 'questRejected',
  }],
}, {
  id: 'readyToHelpForReward2',
  text: 'Oh well, I guess you are right... Fine, I will give you 10 copper for the job, but please hurry!',
  replies: [{
    text: '(End) Time to make some kebabs!',
    callbackParam: 'questAcceptedForReward',
  }],
}, {
  id: 'rewardDemandRejected',
  text: 'You think you are soo smart, aren\'t you? Well, not smart enough - I can wait for some more time or even risk and do it myself if nobody volunteers.',
  replies: [{
    text: 'Fine, I\'ll volunteer, but your greed will come to bite you one day...',
    callbackParam: 'questAccepted',
  }, {
    text: '(End) Whatever, good luck with your new pets!',
    callbackParam: 'questRejected',
  }],
}];
export const farmerJoeDialogQuestObtained: DialogTree = [{
  id: 'greetings',
  text: 'What is it? Hope you brought some good news about that damned pigs?',
  replies: [{
    text: 'Yes! I saw the poster on the desk, I will be glad to help you!',
    successTriggers: 'readyToHelp',
  }, {
    text: 'Yes! I saw the poster on the desk, I will be glad to help you, if the price is right - what is the reward exactly?',
    successTriggers: 'readyToHelpForReward',
  }, {
    text: ' (End) Yeah, pigs, pigs are everywhere - just last week one of them tried to charge me double for a simple basket of carrots!',
    callbackParam: 'fastEnd',
  }],
}, {
  id: 'readyToHelp',
  text: 'Great! Then what are you waiting for - every minute they feast on my delicious cabbage they get fatter and stronger!',
  replies: [{
    text: '(End) Time to make some kebabs!',
    callbackParam: 'questAccepted',
  }],
}, {
  id: 'readyToHelpForReward',
  text: 'Reward? I was hoping somebody will volunteer to do it for free - after all the thrill of battle and valuable life experience is a reward of its own, not speaking that the boar meat is delicious - and you are allowed to keep it, even though it was harvested on My fields!',
  replies: [{
    text: 'I see.. Fine, I will do it for free...',
    callbackParam: 'questAccepted',
  }, {
    text: '(Int check) And how did it go so far? I don\'t see any volunteers around, but I can see that your crops are disappearing - so how about I will take on a task for, let\'s say, 15 copper - surely you\'ll get much more if the crops are intact.',
    checkCharacteristic: 'intelligence',
    checkValue: 11,
    successTriggers: 'readyToHelpForReward2',
    failureTriggers: 'rewardDemandRejected',
  }, {
    text: '(End) I am not doing it for, good luck with your new pets!',
    callbackParam: 'questRejected',
  }],
}, {
  id: 'readyToHelpForReward2',
  text: 'Oh well, I guess you are right... Fine, I will give you 10 copper for the job, but please hurry!',
  replies: [{
    text: '(End) Time to make some kebabs!',
    callbackParam: 'questAcceptedForReward',
  }],
}, {
  id: 'rewardDemandRejected',
  text: 'You think you are soo smart, aren\'t you? Well, not smart enough - I can wait for some more time or even risk and do it myself if nobody volunteers.',
  replies: [{
    text: 'Fine, I\'ll volunteer, but your greed will come to bite you one day...',
    callbackParam: 'questAccepted',
  }, {
    text: '(End) Whatever, good luck with your new pets!',
    callbackParam: 'questRejected',
  }],
}];

export const farmerJoeDialogQuestDiscussedNoReward: DialogTree = [{
  id: 'greetings',
  text: 'What is it? Hope you brought some good news about that damned pigs?',
  replies: [{
    text: 'So, about the reward...',
    successTriggers: 'readyToHelpForReward',
  }, {
    text: 'No, still working on it - they are fat and scary, you know!',
    callbackParam: 'fastEnd',
  }],
}, {
  id: 'readyToHelpForReward',
  text: 'Reward? I was hoping somebody will volunteer to do it for free - after all the thrill of battle and valuable life experience is a reward of its own, not speaking that the boar meat is delicious - and you are allowed to keep it, even though it was harvested on My fields!',
  replies: [{
    text: 'I see.. Fine, I will do it for free...',
    callbackParam: 'questAccepted',
  }, {
    text: '(Int check) And how did it go so far? I don\'t see any volunteers around, but I can see that your crops are disappearing - so how about I will take on a task for, let\'s say, 15 copper - surely you\'ll get much more if the crops are intact.',
    checkCharacteristic: 'intelligence',
    checkValue: 11,
    successTriggers: 'readyToHelpForReward2',
    failureTriggers: 'rewardDemandRejected',
  }, {
    text: '(End) I am not doing it for, good luck with your new pets!',
    callbackParam: 'questRejected',
  }],
}, {
  id: 'readyToHelpForReward2',
  text: 'Oh well, I guess you are right... Fine, I will give you 10 copper for the job, but please hurry!',
  replies: [{
    text: '(End) Time to make some kebabs!',
    callbackParam: 'questAcceptedForReward',
  }],
}, {
  id: 'rewardDemandRejected',
  text: 'You think you are soo smart, aren\'t you? Well, not smart enough - I can wait for some more time or even risk and do it myself if nobody volunteers.',
  replies: [{
    text: 'Fine, I\'ll volunteer, but your greed will come to bite you one day...',
    callbackParam: 'questAccepted',
  }, {
    text: '(End) Whatever, good luck with your new pets!',
    callbackParam: 'questRejected',
  }],
}];

export const farmerJoeDialogQuestDiscussed: DialogTree = [{
  id: 'greetings',
  text: 'What is it? Hope you brought some good news about that damned pigs?',
  replies: [{
    text: 'No, still working on it - they are fat and scary, you know!',
    callbackParam: 'fastEnd',
  }],
}];

export const farmerJoeDialogPigsDead: DialogTree = [{
  id: 'greetings',
  text: 'What is it? Hope you brought some good news about that damned pigs?',
  replies: [{
    text: 'Yes, they are dead!',
    successTriggers: 'done1',
  }, {
    text: 'No, still working on it - they are fat and scary, you know!',
    callbackParam: 'fastEnd',
  }],
}, {
  id: 'done1',
  text: 'Finally! My crops are safe! Thank you.',
  replies: [{
    text: 'You are welcome.',
    callbackParam: 'completeQuest',
  }],
}];

export const farmerJoeDialogAftermath: DialogTree = [{
  id: 'greetings',
  text: `    Pigs are gone, my crops are safe and you certainly had fair share of fun, what else is there to wish for? Unless you want to purchase some of crops you helped to save. 
    But dont expect the discount - I am already in the red...`,
  replies: [{
    text: 'Sure, show me what you have',
    callbackParam: 'openShop',
  }, {
    text: 'I am good, thanks.',
    callbackParam: 'fastEnd',
  }],
}];
