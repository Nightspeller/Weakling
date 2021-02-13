import * as Phaser from 'phaser';

// An EventEmitter instance for passing messages between scenes or anything else
const sceneEvents = new Phaser.Events.EventEmitter();

export {
  // eslint-disable-next-line import/prefer-default-export
  sceneEvents,
};
