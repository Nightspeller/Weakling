import { DialogTree } from '../../../types/my-types';

const eyeballActor = {
  helloFriend: 'Bul\'k bul\'k!',
  theAudacity: 'Buuuul\'k...',
  howCouldYou: 'Bul\'k! Bul\'k! Bul\'k!',
  unbelievable: 'Bul\'kkk? Bul\'k! Bul\'k!',
  noWay: 'Bul\'k!'
};

const playerActor = {
  greeting: 'Oh, there you are! I was wondering where you were! I haven\'t see you since...',
  exit: 'Yeah, I understand. Pretty traumatizing experience being dragged through the whole village by a cat, like some kind of flying mouse. I will leave you be then, get better soon!',
  kittyJumpy: 'Riiiight..since the incident with Whiskers... Look, I\'m sorry! I didn\'t know that after drinking that potion he would be able to jump 5 meters!',
  kittyNormal: 'Look, he\'s back to normal now, he will never be able to catch you again - you can come out!',
  kittyApology: 'Whiskers is fine now! And I can tell by the look in his eyes that he\'s sorry! Come out, we miss you!',
  comeAlong: 'I promise! How about this then, you can come and stick with me for some time and if he tries to do anything unnaturally skillful we will chill him out, together!',
  questGet: 'Still no? Well, I guess I\'ll have to come up with some way to make it up to you...',
  hireSuccess: 'Come on buddy, it\'s time to leave the cave and greet the world again! You can stick with me for some time and see how it goes.'
};

export const eyeballFirstTimeDialog: DialogTree = [{
  id: 'greetings',
  text: eyeballActor.helloFriend,
  replies: [{
    text: playerActor.greeting,
    successTriggers: 'greetings2',
  }],
}, {
  id: 'greetings2',
  text: eyeballActor.theAudacity,
  replies: [{
    text: playerActor.kittyJumpy,
    successTriggers: 'greetings3',
  }],
}, {
  id: 'greetings3',
  text: eyeballActor.howCouldYou,
  replies: [{
    text: playerActor.kittyNormal,
    successTriggers: 'greetings4',
  }],
}, {
  id: 'greetings4',
  text: eyeballActor.unbelievable,
  replies: [{
    text: playerActor.comeAlong,
    successTriggers: 'greetings5',
  }, {
    text: playerActor.exit,
    callbackParam: 'fastEnd',
  }],
}, {
  id: 'greetings5',
  text: eyeballActor.noWay,
  replies: [{
    text: playerActor.questGet,
    callbackParam: 'wantsToHelp',
  }, {
    text: playerActor.exit,
    callbackParam: 'fastEnd',
  }],
}];

export const eyeballSecondTimeDialog: DialogTree = [{
  id: 'greetings4',
  text: eyeballActor.unbelievable,
  replies: [{
    text: playerActor.kittyApology,
    successTriggers: 'greetings5',
  }],
}, {
  id: 'greetings5',
  text: eyeballActor.noWay,
  replies: [{
    text: playerActor.questGet,
    callbackParam: 'wantsToHelp',
  }, {
    text: playerActor.exit,
    callbackParam: 'fastEnd',
  }],
}];

export const eyeballSecondTimeOfferPurplecupDialog: DialogTree = [{
  id: 'greetings4',
  text: eyeballActor.unbelievable,
  replies: [{
    text: playerActor.kittyApology,
    successTriggers: 'greetings5',
  }],
}, {
  id: 'greetings5',
  text: eyeballActor.noWay,
  replies: [{
    text: playerActor.hireSuccess,
    callbackParam: 'eyeballJoined',
  }, {
    text: playerActor.exit,
    callbackParam: 'fastEnd',
  }],
}];
