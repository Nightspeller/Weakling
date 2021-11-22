import { VideoDataTree } from '../types/my-types';

export const introVideoData: VideoDataTree = [
  {
    order: 0, key: 'intro-part-1', playbackRate: 1, loop: false, fadeIn: true, fadeOut: true,
  },
  {
    order: 1, key: 'intro-part-2', playbackRate: 1, loop: true, fadeIn: true, fadeOut: true,
  },
  {
    order: 2, key: 'intro-part-3', playbackRate: 1, loop: true, fadeIn: true, fadeOut: true,
  },
  {
    order: 3, key: 'intro-part-4', playbackRate: 1, loop: true, fadeIn: false, fadeOut: false,
  },
  {
    order: 4, key: 'intro-part-5', playbackRate: 0.5, loop: false, fadeIn: true, fadeOut: true,
  },
  {
    order: 6, key: 'intro-part-6', playbackRate: 1, loop: true, fadeIn: true, fadeOut: true,
  },
  {
    order: 5, key: 'intro-part-2', playbackRate: 1, loop: true, fadeIn: false, fadeOut: false,
  },
  {
    order: 7, key: 'intro-part-7', playbackRate: 1, loop: true, fadeIn: false, fadeOut: false,
  },
  {
    order: 8, key: 'intro-part-8', playbackRate: 1, loop: false, fadeIn: false, fadeOut: false,
  },
  {
    order: 9, key: 'intro-part-9', playbackRate: 1, loop: true, fadeIn: false, fadeOut: true,
  },
];

export default introVideoData;
