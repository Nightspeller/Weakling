import { DialogTree } from '../../../types/my-types';

const signActor = {
  intro: `You are standing in front of your little patch. It's empty now because you just collected the crop of Sourgrass for your recent experiments. Usually it flourishes with all kinds of plants.
  Not many in the village understand why you would grow so many inedible plants but you know that cabbage just doesn't cut it for really cool things. Aunt Nahkha is the only person who kind of gets it. She likes and grows all kinds of flowers.
  So, would now be the time to start growing something new?`,
  plantOptions: 'Based on the seeds and saplings you have with you, you could plant:'
};

const playerActor = {
  intro: 'Let\'s see...',
  exit: 'Nothing, today I simply don\'t have time for that.'
};

export const firstTimePatchDialog: DialogTree = [{
  id: 'patch1',
  text: signActor.intro,
  replies: [{
    text: playerActor.intro,
    successTriggers: 'selectPlants',
  }, {
    text: playerActor.exit,
    callbackParam: 'fastEnd',
  }],
}, {
  id: 'selectPlants',
  text: signActor.plantOptions,
  replies: [{
    text: playerActor.exit,
    callbackParam: 'fastEnd',
  }],
}];

export const secondTimePatchDialog: DialogTree = [{
  id: 'selectPlants',
  text: signActor.plantOptions,
  replies: [{
    text: playerActor.exit,
    callbackParam: 'fastEnd',
  }],
}];
