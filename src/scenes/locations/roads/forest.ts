import GeneralLocation from '../generalLocation';

import Firefly from '../../../characters/creatures/firefly';
import KaiNpc from '../../../triggers/npcs/forest/kaiNpc';
import RonNpc from '../../../triggers/npcs/forest/ronNpc';

export default class Forest extends GeneralLocation {
  constructor() {
    super({ key: 'Forest' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('forest');

    for (let i = 0; i < 50; i += 1) {
      new Firefly(this);
    }

    new KaiNpc({ scene: this });
    new RonNpc({ scene: this });
  }
}
