import { DialogTree } from '../../../types/my-types';

const graveActor = {
  intro: `(While walking through the woods you find yourself in a little glade, brightly lit by the sun. The flowers under your feet are bright and soft; the air is fresh and clean, and the surroundings are filled with peace and sorrow. 
    In the middle of the glade you see a lonely grave, old, but mostly untouched by time. In front of it there is a sword stuck into the dirt. The light reflects from its edge, but also passes through, leaving very little shade.)`,
  engraving: `    The engraving says:
    
  Here lies the great hero of Caltor,
  Defender of the weak and protector of the destitute.
  Call his name, glorify his deeds, mourn his fall, swear his oath
  And be blessed with his power to continue his course.`
};

const playerActor = {
  intro: 'Let\'s see...',
  exit: '(Leave)',
  badChoice: 'The name of this hero is Jeremy von Caltor',
  goodChoice: 'The name of this hero is Jeremaya the Bandit',
  deedsGlorified: 'The deeds of sir Jeremaya are glorified on the central square of Caltor.',
  oathTaken: 'Sir Jeremaya, your good name was called and glorified, your death is moaned. Now, let me take the oath and continue your course'
};

export const graveDialog: DialogTree = [{
  id: 'grave1',
  text: graveActor.intro,
  replies: [{
    text: playerActor.intro,
    successTriggers: 'grave2',
  }],
}, {
  id: 'grave2',
  text: graveActor.engraving,
  replies: [{
    text: playerActor.exit,
    callbackParam: 'fastEnd',
  }],
}];

export const graveDialogWithFalseName: DialogTree = [{
  id: 'grave1',
  text: graveActor.engraving,
  replies: [{
    text: playerActor.badChoice,
    callbackParam: 'falseNameCalled',
  }, {
    text: playerActor.exit,
    callbackParam: 'fastEnd',
  }],
}];

export const graveDialogWithTrueName: DialogTree = [{
  id: 'grave1',
  text: graveActor.engraving,
  replies: [{
    text: playerActor.goodChoice,
    callbackParam: 'trueNameCalled',
  }, {
    text: playerActor.exit,
    callbackParam: 'fastEnd',
  }],
}];

export const graveDialogWithGlorification: DialogTree = [{
  id: 'grave1',
  text: graveActor.engraving,
  replies: [{
    text: playerActor.deedsGlorified,
    callbackParam: 'deedsGlorified',
  }, {
    text: playerActor.exit,
    callbackParam: 'fastEnd',
  }],
}];

export const readyToTakeTheOath: DialogTree = [{
  id: 'grave1',
  text: graveActor.engraving,
  replies: [{
    text: playerActor.oathTaken,
    callbackParam: 'oathTaken',
  }, {
    text: playerActor.exit,
    callbackParam: 'fastEnd',
  }],
}];
