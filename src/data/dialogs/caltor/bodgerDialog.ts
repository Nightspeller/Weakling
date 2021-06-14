import { DialogTree } from '../../../types/my-types';

const bodgerDialog: DialogTree = [
  {
    id: 'greetings',
    text: '    Hi, I am Bodger, the blacksmith of Honeywood. You will not find any better equipment in that hole, that\'s for sure.',
    replies: [{
      text: 'Show me what you have',
      callbackParam: 'openShop',
    }, {
      text: '(Sell the goods) I would like to sell the goods we crafted at the village.',
      checkInventory: 'remove',
      checkValue: [{ itemId: 'basket', quantity: 10 }, { itemId: 'minerals', quantity: 10 }],
      successTriggers: 'goodsSold',
      failureTriggers: 'noGoods',
    }, {
      text: 'Not interested',
      callbackParam: 'fastEnd',
    }],
  }, {
    id: 'goodsSold',
    text: 'Here is 5 silver pieces - the best I can do.',
    replies: [{
      text: 'I was hoping for more, but I guess we have to take it...',
      callbackParam: 'goodsSold',
    }, {
      text: 'Before we go, show me what you have',
      callbackParam: 'goodsSoldAndOpenShop',
    }],
  }, {
    id: 'noGoods',
    text: 'And where are they? Check your bags and come back once you find it.',
    replies: [{
      text: 'Oh, right right, where were they...',
      callbackParam: 'fastEnd',
    }, {
      text: 'At the meantime, show me what you have',
      callbackParam: 'openShop',
    }],
  },
];
export default bodgerDialog;
