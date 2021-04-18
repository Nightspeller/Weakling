import GeneralLocation from '../generalLocation';

export default class WindmillScene extends GeneralLocation {
  constructor() {
    super({ key: 'Windmill' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('windmill');
  }

  public update() {
    super.update();
  }
}