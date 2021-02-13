import * as Phaser from 'phaser';

// This isn't finished yet. Will probebly add properties to prevent overlaping/collisions, etc.
export default class DestinationPoint extends Phaser.GameObjects.Image {
    private _isReserved: boolean;

    set isReserved(isReserved: boolean) {
      this._isReserved = isReserved;
    }

    get isReserved() {
      return this._isReserved;
    }

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
      super(scene, x, y, texture, frame);

      this._isReserved = false;
    }
}
