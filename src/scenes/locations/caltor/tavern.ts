import GeneralLocation from '../generalLocation';
import BartenderNpc from '../../../triggers/npcs/tavern/bartenderNpc';
import FarmerJoeNpc from '../../../triggers/npcs/tavern/farmerJoeNpc';
import VerdeckNpc from '../../../triggers/npcs/tavern/verdeckNpc';
import VictousNpc from '../../../triggers/npcs/tavern/victousNpc';
import MelodyNpc from '../../../triggers/npcs/tavern/melodyNpc';
import SylviaNpc from '../../../triggers/npcs/tavern/sylviaNpc';

export default class TavernScene extends GeneralLocation {
  constructor() {
    super({ key: 'Tavern' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('tavern');
    new BartenderNpc({ scene: this });
    new FarmerJoeNpc({ scene: this });

    new VerdeckNpc({ scene: this });
    new VictousNpc({ scene: this });
    new MelodyNpc({ scene: this });
    new SylviaNpc({ scene: this });
  }

  public update() {
    super.update();
  }
}
