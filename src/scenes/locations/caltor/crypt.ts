import GeneralLocation from '../generalLocation';

export default class CryptScene extends GeneralLocation {
  constructor() {
    super({ key: 'Crypt' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('crypt');
  }

  public update() {
    super.update();
  }
}
