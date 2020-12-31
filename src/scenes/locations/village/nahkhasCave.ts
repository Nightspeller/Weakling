import GeneralLocation from '../generalLocation';

export default class NahkhasCaveScene extends GeneralLocation {
  constructor() {
    super({ key: 'NahkhasCave' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('nahkhasCave');
  }

  public update() {
    super.update();
  }
}
