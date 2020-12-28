import { DialogTree } from '../../../types/my-types';

const baelinDialog: DialogTree = [{
  id: 'greetings',
  text: 'Mornin\', nice day for fishing, ain\'t it? Hu Ha!',
  replies: [{
    text: 'Splendid day for fishing it is indeed!',
    callbackParam: 'fastEnd',
  }],
}];

export default baelinDialog;
