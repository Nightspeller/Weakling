import { DialogTree } from '../../../types/my-types';

export const bartenderDialog: DialogTree = [{
  id: 'greetings',
  text: 'Welcome to the Tipsy Dragon! Food or drink, soft bad or pleasant music - we have it all. Interested in something? Stick around and you will learn all the local news in no time.',
  replies: [{
    text: 'Thank you! So, what\'s on the menu?',
    callbackParam: 'openShop',
  }, {
    text: 'Interested in something? Are there some rumors everybody are eager to hear?',
    successTriggers: 'drinkForRumors',
  }, {
    text: 'Whatever, not interested. (end dialog)',
    callbackParam: 'fastEnd',
  }],
}, {
  id: 'drinkForRumors',
  text: 'How about you get yourself a cup of beer and while you are at it I might just think of something?',
  replies: [{
    text: '(Get a beer, 3 copper) Sounds good, pour me a cup.',
    checkInventory: 'remove',
    checkValue: [{ itemId: 'copper-pieces', quantity: 3 }],
    successTriggers: 'beerAndRumors',
    failureTriggers: 'noMoneyNoRumors',
  }, {
    text: 'I think I will pass for now, may be later...',
    callbackParam: 'fastEnd',
  }],
}, {
  id: 'beerAndRumors',
  text: 'Here is your beer. And as for the rumors..let\'s see.. Oh! Bodger, the local blacksmith, got so drunk last night that he got tangled in the ropes with washed clothes on his way home! Oh that was a show! He even lost his pants there trying to get out! Hahaha! I wonder if he came back to pick it up...',
  replies: [{
    text: 'Haha, that\'s a nice one, I wish I\'v seen it!',
    callbackParam: 'beerAndRumorObtained',
  }, {
    text: 'I hope your beer is better than your stories...',
    callbackParam: 'beerAndRumorObtained',
  }],
}, {
  id: 'noMoneyNoRumors',
  text: '(Not enough gold) Running low today, I see... Well, I can\'t give you beer for free, but I can give you a free advice - there is an announcements board right outside of the Tipsy Dragon. You can see if somebody needs help. Come back once you get a coin to spare.',
  replies: [{
    text: 'Thanks for the advice',
    callbackParam: 'fastEnd',
  }, {
    text: 'I can figure out what to do myself, thank you very much!',
    callbackParam: 'fastEnd',
  }],
}];

export const bartenderNoRumoresDialog: DialogTree = [{
  id: 'greetings',
  text: 'Welcome back! I don\'t have any rumors for you, but the food and drinks are good as always!',
  replies: [{
    text: 'Thank you! Show me what\'s on the menu?',
    callbackParam: 'openShop',
  }, {
    text: 'I am not hungry at the moment. (end dialog)',
    callbackParam: 'fastEnd',
  }],
}];
