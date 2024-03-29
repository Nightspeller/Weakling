import { DialogTree } from '../../../types/my-types';

export const ajikaDialog: DialogTree = [{
  id: 'greetings',
  text: '    Hey! Hi! Excuse me! Have you by any chance seen my son, Kai? He is about the same height as you, wearing blue pants! Blond hair, like mine - have you seen anybody like this?',
  replies: [{
    text: 'I am sorry, I don\'t remember anybody matching this description.. What has happen, is he missing?',
    successTriggers: 'isHeMissing',
  }, {
    text: 'I am sorry, no. I have to go, bye!',
    callbackParam: 'fastEnd',
  }],
}, {
  id: 'isHeMissing',
  text: '    Yes! He left this early morning to pick up some berries in the forest to the north-east from here and didn\'t come back! I am worried sick! My husband went searching for him, but did not come back neither. If you see my Kai, please bring him home, I will greatly appreciate it!',
  replies: [{
    text: 'Sounds like he might be lost - these forests are pretty hard to navigate.. I will help you looking for him!',
    successTriggers: 'willHelpLooking',
  }, {
    text: 'No, I haven\'t seen him, sorry. I have to go now.!',
    callbackParam: 'fastEnd',
  }],
}, {
  id: 'willHelpLooking',
  text: '    Oh, thank you so much! I hope he is alright!',
  replies: [{
    text: 'Don\'t worry, everything will be alright!',
    callbackParam: 'questObtained',
  }],
}];

export const ajikaNotYetFoundDialog: DialogTree = [{
  id: 'greetings',
  text: '    What are the news? Did you find him?',
  replies: [{
    text: '(end) No,not yet - this forest it pretty big..',
    callbackParam: 'fastEnd',
  }],
}];

export const ajikaKaiFoundDialog: DialogTree = [{
  id: 'greetings',
  text: '    Oh, I can\'t believe it! You found him! Thank you so so much! Here, please, take this pie I made and my sincere gratitude!',
  replies: [{
    text: 'Sure, I was happy to help!',
    callbackParam: 'sonReturned',
  }],
}];

export const ajikaRonFoundDialog: DialogTree = [{
  id: 'greetings',
  text: '    Oh, I can\'t believe it! You found him! Thank you so so much! Here, please, take this pie I made and my sincere gratitude!',
  replies: [{
    text: 'Sure, I was happy to help!',
    callbackParam: 'husbandReturned',
  }],
}];

export const ajikaRonLostDialog: DialogTree = [{
  id: 'greetings',
  text: '    Hey! Hi! Excuse me! Mr. Cobold, sir! Have you by any chance seen my husband, Ron? He went to the forest looking for Kai, but didn\'t come back yet! I am afraid he might be lost too! Could you please find him as well?! I know this is a lot to ask in one day, but look, I have an another pie here! Pleeeease!',
  replies: [{
    text: 'Heh, I see it runs in the family.. Okay, okay, don\'t despair, I will find him!',
    callbackParam: 'findRonAccepted',
  }, {
    text: 'I am sorry, no. I have to go, bye!',
    callbackParam: 'fastEnd',
  }],
}];

export const ajikaFamilyReunitedDialog: DialogTree = [{
  id: 'greetings',
  text: '    Thank you again for bringing everybody back home safe and sound! If you liked my pies, I will be happy to sell you some more!',
  replies: [{
    text: 'Sure, your pies are delicious!',
    callbackParam: 'openShop',
  }, {
    text: '(end) Maybe later',
    callbackParam: 'fastEnd',
  }],
}];
