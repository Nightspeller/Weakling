import { DialogTree } from '../../../types/my-types';

export const kaiDialog: DialogTree = [{
  id: 'greetings',
  text: '    Aaaaa! I am loooooost! Aaaaaa! This is so exciting!',
  replies: [{
    text: 'Sure, enjoy it while it lasts!',
    callbackParam: 'fastEnd',
  }],
}];

export const kaiHasToReturnDialog: DialogTree = [{
  id: 'greetings',
  text: '    Aaaaa! I am loooooost! Aaaaaa! This is so exciting!',
  replies: [{
    text: 'That\'s it, I am taking you home',
    callbackParam: 'kaiFound',
  }, {
    text: 'Sure, enjoy it while it lasts!',
    callbackParam: 'fastEnd',
  }],
}];
