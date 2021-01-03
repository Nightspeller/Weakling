import GeneralLocation from '../generalLocation';
import GregNpc from '../../../triggers/npcs/honeywood/gregNpc';
import MashaNpc from '../../../triggers/npcs/honeywood/mashaNpc';
import LimeNpc from '../../../triggers/npcs/honeywood/limeNpc';
import AjikaNpc from '../../../triggers/npcs/honeywood/ajikaNpc';

export default class HoneywoodScene extends GeneralLocation {
  constructor() {
    super({ key: 'Honeywood' });
  }

  public preload() {
    super.preload();
  }

  public init(data: any) {
    super.init(data);
  }

  public create() {
    super.create('honeywood');

    new GregNpc({ scene: this });
    new MashaNpc({ scene: this });
    new LimeNpc({ scene: this });
    new AjikaNpc({ scene: this });
  }

  public update() {
    super.update();
  }
}
