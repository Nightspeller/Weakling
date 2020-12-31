import GeneralLocation from '../generalLocation';

export default class GreatPlainsScene extends GeneralLocation {
  constructor() {
    super({ key: 'GreatPlains' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('greatPlains');
  }

  public update() {
    super.update();
  }
}
