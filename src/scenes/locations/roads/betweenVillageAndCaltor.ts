import GeneralLocation from '../generalLocation';
import GraveNpc from '../../../triggers/npcs/betweenVillageAndCaltor/graveNpc';

export default class BetweenVillageAndCaltorScene extends GeneralLocation {
  constructor() {
    super({ key: 'BetweenVillageAndCaltor' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('betweenVillageAndCaltor');

    new GraveNpc({ scene: this });
  }

  public update() {
    super.update();
  }
}
