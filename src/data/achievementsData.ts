import { SpriteParameters } from '../types/my-types';

const achievementsData: ({
  name: string;
  description: string;
  icon: SpriteParameters;
  achieved: boolean;
  progress?: [number, number]
})[] = [{
  name: 'Fully prepared',
  description: 'Equip items at every slot',
  icon: {
    texture: 'icon-item-set',
    frame: 137,
  },
  achieved: false,
}, {
  name: 'My little hobby',
  description: 'Make 10 potions or mixtures',
  icon: {
    texture: 'icon-item-set',
    frame: 188,
  },
  progress: [0, 10],
  achieved: false,
}, {
  name: 'Let it go',
  description: 'Drop an item - it might be more useful than it seems!',
  icon: {
    texture: 'icon-item-set',
    frame: 205,
  },
  achieved: false,
}, {
  name: 'Welcome to the Farmville',
  description: 'Grow 6 plants',
  icon: {
    texture: 'icon-item-set',
    frame: 197,
  },
  progress: [0, 6],
  achieved: false,
}, {
  name: 'Did you just assume?..',
  description: 'Change your gender',
  icon: {
    texture: 'icon-item-set',
    frame: 263,
  },
  achieved: false,
}, {
  name: 'Spirit them away',
  description: 'Obtain the Spirit Sword',
  icon: {
    texture: 'icon-item-set',
    frame: 84,
  },
  achieved: false,
}, {
  name: 'See battle, Boo? Run, Boo, run!',
  description: 'Run away from the battle before it begins',
  icon: {
    texture: 'edited',
    frame: 'Running',
  },
  achieved: false,
}, {
  name: 'Weak, but not useless',
  description: 'Defeat 5 enemy groups',
  icon: {
    texture: 'icon-item-set',
    frame: 48,
  },
  progress: [0, 5],
  achieved: false,
}, {
  name: 'Checked, checked aaaand checked!',
  description: 'Complete all the quests',
  icon: {
    texture: 'icon-item-set',
    frame: 216,
  },
  achieved: false,
}, {
  name: 'It is done',
  description: 'Finish the game by collecting all achievements',
  icon: {
    texture: 'icon-item-set',
    frame: 199,
  },
  achieved: false,
}];

export default achievementsData;
