import { DialogTree } from '../../../types/my-types';

export const fountainSignDialog: DialogTree = [{
  id: 'greetings',
  text: 'In memory of Caltor\'s founder, ruler, protector and the greatest hero, sir Jeremy von Caltor, from grateful friends, descendants and all the citizens.',
  replies: [{
    text: '(End)',
    callbackParam: 'fastEnd',
  }],
}];

export const fountainVandalDialog: DialogTree = [{
  id: 'greetings',
  text: 'In memory of Caltor\'s founder, ruler, protector and the greatest hero, sir Jeremy von Caltor, from grateful friends, descendants and all the citizens.',
  replies: [{
    text: '(Vandalize the fountain sign to glorify sir Jeremaya\'s deeds)',
    checkInventory: 'remove',
    checkValue: [{ itemId: 'coal', quantity: 1 }],
    successTriggers: 'fountainVandalized',
    failureTriggers: 'noCoal',
  }, {
    text: '(End)',
    callbackParam: 'fastEnd',
  }],
}, {
  id: 'fountainVandalized',
  text: '(Coal used) In memory of Caltor\'s -------, -----, protector and the greatest hero, sir Jerem<a>y<ya> the Bandit, from grateful ------------------ citizens.',
  replies: [{
    text: 'Much better',
    callbackParam: 'fountainVandalized',
  }],
}, {
  id: 'noCoal',
  text: '(You try to scratch the stone, but barely leave any marks. There must be better way to do it.)',
  replies: [{
    text: '(End)',
    callbackParam: 'fastEnd',
  }],
}];

export const fountainChangedDialog: DialogTree = [{
  id: 'greetings',
  text: 'In memory of Caltor\'s -------, -----, protector and the greatest hero, sir Jerem<a>y<ya> the Bandit, from grateful ------------------ citizens.',
  replies: [{
    text: '(End)',
    callbackParam: 'fastEnd',
  }],
}];
