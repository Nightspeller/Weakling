import GeneralLocation from '../generalLocation';
import HermitNpc from '../../../triggers/npcs/hermitsTower/hermitNpc';

export default class HermitsTowerScene extends GeneralLocation {
  constructor() {
    super({ key: 'HermitsTower' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('hermitsTower');
    new HermitNpc({ scene: this });
  }

  public update() {
    super.update();
  }
}
