import GeneralLocation from '../generalLocation';
import HopperNpc from '../../../triggers/npcs/windmill/hopperNpc';

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

    new HopperNpc({ scene: this });
  }

  public update() {
    super.update();
  }
}
