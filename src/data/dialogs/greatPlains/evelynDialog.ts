import { DialogTree } from '../../../types/my-types';

const evelynDialog: DialogTree = [{
  id: 'greetings',
  text: 'Back in the day, something was about to happen around here. My father had big plans for this place, but ever since he died, his café has stayed untouched. No one seems to believe in Great Plains like he did, and in a way, I am glad for that. You see, one day I will bring life back to Great Plains. When I have saved up enough money to buy this lot, I want to continue to grow the seed he once sowed.',
  replies: [{
    text: 'Sorry to hear about your dad. If there is anything I can do for you, please let me know.',
    callbackParam: 'fastEnd',
  }],
}];

export default evelynDialog;
