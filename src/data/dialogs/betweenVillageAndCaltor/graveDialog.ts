import { DialogTree } from '../../../types/my-types';

export const graveDialog: DialogTree = [{
  id: 'grave1',
  text: `(Walking through the woods, you find yourself on the little glade, brightly lit by the sun. Flowers under your feet are bright and soft, the air is fresh and clean and the surroundings are filled with piece and sorrow. 
    In the middle of the glade, you see a lonely grave, old, but mostly untouched by the time. In front of it there is a sword, stuck into the dirt. The light reflects from it's edge, but also passing through, leaving very little shade.)`,
  replies: [{
    text: 'Let\'s see...',
    successTriggers: 'grave2',
  }],
}, {
  id: 'grave2',
  text: `    The engraving says:
    
    Here lays the great hero of Caltor, 
    Defender of the weak and protector of destitute.
    Call his name, glorify his deeds, moan his fall, swear his oath 
    And be blessed with his power to continue his course.`,
  replies: [{
    text: 'Leave',
    callbackParam: 'fastEnd',
  }],
}];

export const graveDialogWithFalseName: DialogTree = [{
  id: 'grave1',
  text: `    The engraving says:
    
    Here lays the great hero of Caltor, 
    Defender of the weak and protector of destitute.
    Call his name, glorify his deeds, moan his fall, swear his oath 
    And be blessed with his power to continue his course.`,
  replies: [{
    text: 'The name of this hero is Jeremy von Caltor',
    callbackParam: 'falseNameCalled',
  }, {
    text: '(Leave)',
    callbackParam: 'fastEnd',
  }],
}];

export const graveDialogWithTrueName: DialogTree = [{
  id: 'grave1',
  text: `    The engraving says:
    
    Here lays the great hero of Caltor, 
    Defender of the weak and protector of destitute.
    Call his name, glorify his deeds, moan his fall, swear his oath 
    And be blessed with his power to continue his course.`,
  replies: [{
    text: 'The name of this hero is Jeremaya the Bandit',
    callbackParam: 'trueNameCalled',
  }, {
    text: '(Leave)',
    callbackParam: 'fastEnd',
  }],
}];

export const graveDialogWithGlorification: DialogTree = [{
  id: 'grave1',
  text: `    The engraving says:
    
    Here lays the great hero of Caltor, 
    Defender of the weak and protector of destitute.
    Call his name, glorify his deeds, moan his fall, swear his oath 
    And be blessed with his power to continue his course.`,
  replies: [{
    text: 'The deeds of sir Jeremaya are glorified on the central square of Caltor.',
    callbackParam: 'deedsGlorified',
  }, {
    text: '(Leave)',
    callbackParam: 'fastEnd',
  }],
}];

export const readyToTakeTheOath: DialogTree = [{
  id: 'grave1',
  text: `    The engraving says:
    
    Here lays the great hero of Caltor, 
    Defender of the weak and protector of destitute.
    Call his name, glorify his deeds, moan his fall, swear his oath 
    And be blessed with his power to continue his course.`,
  replies: [{
    text: 'Sir Jeremaya, your good name was called and glorified, your death is moaned. Now, let me take the oath and continue your course',
    callbackParam: 'oathTaken',
  }, {
    text: '(Leave)',
    callbackParam: 'fastEnd',
  }],
}];
