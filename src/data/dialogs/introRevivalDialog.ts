import { DialogTree } from '../../types/my-types';

export const introRevivalDialog: DialogTree = [
  {
    id: 'intro_1',
    text: 'Still... Stay still... Calm... Stay calm... \n\n You do not have to go, you do not have to do anything at all...\n\n',
    replies: [
      {
        text: '(Continue}',
        successTriggers: 'intro_2',
      },
    ],
  },
  {
    id: 'intro_2',
    text: '    Just stay that incredibly still..and listen to my voice.',
    replies: [
      {
        text: '(Continue}',
        successTriggers: 'intro_3',
      },
    ],
  },
  {
    id: 'intro_3',
    text: 'I can sense your desperation and your deepest desires, and I will help you regain your dignity',
    replies: [
      {
        text: '(Continue}',
        successTriggers: 'intro_4',
      },
    ],
  },
  {
    id: 'intro_4',
    text: 'But first, I need you to take me back to that day and show me what really happened to you.',
    replies: [
      {
        text: '(Continue}',
        successTriggers: 'intro_5',
      },
    ],
  },
  {
    id: 'intro_5',
    text: 'So ... Think. Just Think...',
    replies: [
      {
        text: '(Continue}',
        successTriggers: 'intro_6',
      },
    ],
  },
  {
    id: 'intro_6',
    text: 'Good... Very good. \n\n\n Now...take me there, show me...',
    replies: [
      {
        text: 'Show him the lovely morning at the Village',
        successTriggers: 'intro_7',
      },
    ],
  },
  {
    id: 'intro_7',
    text: '...',
    replies: [
      {
        text: '(End)',
        callbackParam: 'fastEnd',
      },
    ],
  },
];

export default introRevivalDialog;
