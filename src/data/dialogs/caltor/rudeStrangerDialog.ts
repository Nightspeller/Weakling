import { DialogTree } from '../../../types/my-types';

export const rudeStrangerDialog: DialogTree = [{
  id: 'greetings',
  text: 'What are you looking at? Beat it!',
  replies: [{
    text: '(End) ...',
    callbackParam: 'fastEnd',
  }],
}];

export const burglaryDialog: DialogTree = [{
  id: 'greetings',
  text: `- Hey! Where do you think you are going!? This road is very dangerous at this time of a day, and you must pay for "protection"!
  - Yeah, you heard him - 5 silver pieces will guarantee that nothing bad will happen to you and your grandpa! You don't want anything bad to happen yo you two, do you?!`,
  replies: [{
    text: 'No, I do not... (give them 5 silver)',
    checkInventory: 'remove',
    checkValue: [{ itemId: 'silver-pieces', quantity: 5 }],
    successTriggers: 'silverGiven',
    failureTriggers: 'noSilver',
  }],
}, {
  id: 'silverGiven',
  text: 'Good boy! Beat it!',
  replies: [{
    text: '...',
    callbackParam: 'silverGiven',
  }],
}, {
  id: 'noSilver',
  text: "Where is it! I saw you got it from Bodger, where are you hiding it! You'd better bring it right here right now, or else!...",
  replies: [{
    text: 'I am sorry, I will bring it right away!',
    callbackParam: 'noSilverGiven',
  }],
}];
