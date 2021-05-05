import { DialogTree } from '../../../types/my-types';

const hopperDialog: DialogTree = [{
  id: 'capabilitiesShort',
  text: 'What would you like to put into the hopper? \n',
  replies: [{
    text: 'Wheat',
    checkInventory: 'remove',
    checkValue: [{ itemId: 'wheat', quantity: 1 }],
    successTriggers: 'wheatFlourSuccess',
    failureTriggers: 'wheatFlourFailure',
  },
  {
    text: 'Corn',
    checkInventory: 'remove',
    checkValue: [{ itemId: 'corn', quantity: 1 }],
    successTriggers: 'cornFlourSuccess',
    failureTriggers: 'cornFlourFailure',
  }],
}, {
  id: 'wheatFlourFailure',
  text: '(Check failed) You don\'t have any wheat!',
  replies: [{
    text: 'Okay.. -(',
    successTriggers: 'capabilitiesShort',
  }],
}, {
  id: 'wheatFlourSuccess',
  text: 'Go and get your processed wheat flour in the box downstairs.',
  replies: [{
    text: 'Nice!',
    callbackParam: 'wheatFlourObtained',
  }],
}, {
  id: 'cornFlourFailure',
  text: '(Check failed) You don\'t any corns!',
  replies: [{
    text: 'Okay.. -(',
    successTriggers: 'capabilitiesShort',
  }],
}, {
  id: 'cornFlourSuccess',
  text: 'Go and get your processed wheat flour in the box downstairs.',
  replies: [{
    text: 'Nice!',
    callbackParam: 'cornFlourObtained',
  }],
}];

export default hopperDialog;
