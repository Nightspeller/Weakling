import evelynDialog from './dialogs/greatPlains/evelynDialog';
import { CutsceneTree } from '../types/my-types';

const cutsceneData: CutsceneTree = [{
  cutsceneId: 'evelynsDream',
  events: [
    {
      eventName: 'togglePlayerMovement',
      eventData: {
        disableMovement: true,
      },
    },
    {
      eventName: 'fadeAudio',
      eventData: {
        audioType: 'mainAudio',
        fadeDuration: 1500,
        fadeToVolume: 0,
        audioOffset: 0,
      },
    },
    {
      eventName: 'changeCameraFormatEvent',
      eventData: {
        type: 'widenCameraFormat',
        changeViewportHeight: 100,
        zoomNumber: 2,
        tweenDuration: 1500,
      },
    },
    {
      eventName: 'playAudio',
      eventData: {
        soundAssetKey: 'evelyns-story',
        loopAudio: true,
        audioVolume: 0.3,
        audioOffset: 2000,
      },
    },
    {
      eventName: 'startMovingObject',
      eventData: {
        target: 'npc',
        toPosX: 'playerPosX',
        toPosY: 'playerPosY',
      },
    },
    {
      eventName: 'startDialog',
      eventData: {
        sceneKey: 'Dialog',
        dialogTree: evelynDialog,
        dialogDelay: 4000,
        onCloseEvents: [
          {
            eventName: 'stopMovingObject',
            eventData: {
              target: 'npc',
            },
          },
          {
            eventName: 'togglePlayerMovement',
            eventData: {
              disableMovement: false,
            },
          },
          {
            eventName: 'changeCameraFormatEvent',
            eventData: {
              type: 'restoreCameraFormat',
              changeViewportHeight: 100,
              zoomNumber: 2,
              tweenDuration: 1500,
            },
          },
          {
            eventName: 'fadeAudio',
            eventData: {
              audioType: 'cutsceneAudio',
              fadeDuration: 1500,
              fadeToVolume: 0,
              audioOffset: 1500,
            },
          },
          {
            eventName: 'fadeAudio',
            eventData: {
              audioType: 'mainAudio',
              fadeDuration: 5000,
              fadeToVolume: 0.1,
              audioOffset: 3000,
            },
          },
        ],
      },
    },
  ],
}];

export default cutsceneData;
