import GeneralLocation from '../generalLocation';

export default class DungeonScene extends GeneralLocation {
  constructor() {
    super({ key: 'Dungeon' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('dungeon');
  }

  public update() {
    super.update();
  }
}
