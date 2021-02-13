import { DialogTree } from '../../../types/my-types';

export const ronDialog: DialogTree = [{
  id: 'greetings',
  text: '    Aaaaa! I am loooooost! Aaaaaa! This is so exciting!',
  replies: [{
    text: 'Sure, enjoy it while it lasts!',
    callbackParam: 'fastEnd',
  }],
}];

export const ronHasToReturnDialog: DialogTree = [{
  id: 'greetings',
  text: '    Aaaaa! I am loooooost! Aaaaaa! This is so exciting!',
  replies: [{
    text: 'That\'s it, I am taking you home',
    callbackParam: 'ronFound',
  }, {
    text: 'Sure, enjoy it while it lasts!',
    callbackParam: 'fastEnd',
  }],
}];
