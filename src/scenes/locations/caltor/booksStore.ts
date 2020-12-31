import GeneralLocation from '../generalLocation';
import FrettNpc from '../../../triggers/npcs/booksStore/frettNpc';

export default class BooksStoreScene extends GeneralLocation {
  constructor() {
    super({ key: 'BooksStore' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('booksStore');
    new FrettNpc({ scene: this });
  }

  public update() {
    super.update();
  }
}
