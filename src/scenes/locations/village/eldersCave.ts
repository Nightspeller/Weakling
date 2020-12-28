import GeneralLocation from '../generalLocation';
import LiatshNpc from '../../../triggers/npcs/eldersCave/liatshNpc';

export default class EldersCaveScene extends GeneralLocation {
  constructor() {
    super({ key: 'EldersCave' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('eldersCave');

    new LiatshNpc({ scene: this });
  }

  public update() {
    super.update();
  }
}
