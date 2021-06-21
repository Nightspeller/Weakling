import { DialogTree } from '../../../types/my-types';

export const eyeballFirstTimeDialog: DialogTree = [{
  id: 'greetings',
  text: 'Bul\'k bul\'k!',
  replies: [{
    text: 'Oh, there you are! I was wondering where you were! I haven\'t see you since...',
    successTriggers: 'greetings2',
  }],
}, {
  id: 'greetings2',
  text: 'Buuuul\'k...',
  replies: [{
    text: 'Riiiight..since the incident with Whiskers... Look, I\'m sorry! I didn\'t know that after drinking that potion he would be able to jump 5 meters!',
    successTriggers: 'greetings3',
  }],
}, {
  id: 'greetings3',
  text: 'Bul\'k! Bul\'k! Bul\'k!',
  replies: [{
    text: 'Look, he\'s back to normal now, he will never be able to catch you again - you can come out!',
    successTriggers: 'greetings4',
  }],
}, {
  id: 'greetings4',
  text: 'Bul\'kkk? Bul\'k! Bul\'k!',
  replies: [{
    text: 'I promise! How about this then, you can come and stick with me for some time and if he tries to do anything unnaturally skillful we will chill him out, together!',
    successTriggers: 'greetings5',
  }, {
    text: 'Yeah, I understand. Pretty traumatizing experience being dragged through the whole village by a cat, like some kind of flying mouse. I will leave you be then, get better soon!',
    callbackParam: 'fastEnd',
  }],
}, {
  id: 'greetings5',
  text: 'Bul\'k!',
  replies: [{
    text: 'Still no? Well, I guess I\'ll have to come up with some way to make it up to you...',
    callbackParam: 'wantsToHelp',
  }, {
    text: 'Yeah, I understand. Pretty traumatizing experience being dragged through the whole village by a cat, like some kind of flying mouse. I will leave you be then, get better soon!',
    callbackParam: 'fastEnd',
  }],
}];

export const eyeballSecondTimeDialog: DialogTree = [{
  id: 'greetings4',
  text: 'Bul\'kkk? Bul\'k! Bul\'k!',
  replies: [{
    text: 'Whiskers is fine now! And I can tell by the look in his eyes that he\'s sorry! Come out, we miss you!',
    successTriggers: 'greetings5',
  }],
}, {
  id: 'greetings5',
  text: 'Bul\'k!',
  replies: [{
    text: 'Still no? Well, I guess I\'ll have to come up with some way to make it up to you...',
    callbackParam: 'wantsToHelp',
  }, {
    text: 'Yeah, I understand. Pretty traumatizing experience being dragged through the whole village by a cat, like some kind of flying mouse. I will leave you be then, get better soon!',
    callbackParam: 'fastEnd',
  }],
}];

export const eyeballSecondTimeOfferPurplecupDialog: DialogTree = [{
  id: 'greetings4',
  text: 'Bul\'kkk? Bul\'k! Bul\'k!',
  replies: [{
    text: 'Whiskers is fine now! And I can tell by the look in his eyes that he\'s sorry! Come out, we miss you!',
    successTriggers: 'greetings5',
  }],
}, {
  id: 'greetings5',
  text: 'Bul\'k!',
  replies: [{
    text: 'Come on buddy, it\'s time to leave the cave and greet the world again! You can stick with me for some time and see how it goes.',
    callbackParam: 'eyeballJoined',
  }, {
    text: 'Yeah, I understand. Pretty traumatizing experience being dragged through the whole village by a cat, like some kind of flying mouse. I will leave you be then, get better soon!',
    callbackParam: 'fastEnd',
  }],
}];
