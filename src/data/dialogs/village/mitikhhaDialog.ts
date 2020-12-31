import { DialogTree } from '../../../types/my-types';

export const mitikhhaDialog: DialogTree = [{
  id: 'greetings',
  text: 'Hi, sleepyhead! I was just about to go search for you! Father woke up with the sun today and was ready to go an hour ago! Oh, and mom and I are going to make the Longshroom stew for dinner - hope that will be enough motivation for you to go to Caltor and back as fast as you can!',
  replies: [{
    text: 'Longshroom stew! Consider the trip already done!',
    callbackParam: 'fastEnd',
  }],
}];

export const mitikhhaSecondDialog: DialogTree = [{
  id: 'greetings',
  text: 'Chop chop now! I will not go anywhere and we can spend all evening talking, you can even tell me your stories about the shrooms and rocks, but now you\'d better hurry!',
  replies: [{
    text: 'You not gonna believe what uncle Hargkakh and I are found! But okay, evening it is then!',
    callbackParam: 'fastEnd',
  }],
}];

export const mitikhhaWelcomeBackDialog: DialogTree = [{
  id: 'greetings',
  text: 'You are finally back! I was worried sick! What took you so long! Come to our cave right away and tell me everything what has happen!',
  replies: [{
    text: 'It was really long day...',
    callbackParam: 'fastEnd',
  }],
}];
