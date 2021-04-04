import { DialogTree } from '../../../types/my-types';

const rudeStrangerDialog: DialogTree = [{
  id: 'greetings',
  text: 'What are you looking at? Beat it!',
  replies: [{
    text: '(End) ...',
    callbackParam: 'fastEnd',
  }],
}];

export default rudeStrangerDialog;
