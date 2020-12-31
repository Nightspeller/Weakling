import GeneralLocation from '../generalLocation';
import Trigger from '../../../triggers/trigger';

export default class HouseScene extends GeneralLocation {
  constructor() {
    super({ key: 'House' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('house');
    const charPickerMapObject = this.getMapObject('Character Picker');
    new Trigger({
      scene: this,
      name: charPickerMapObject.name,
      triggerX: charPickerMapObject.x,
      triggerY: charPickerMapObject.y,
      triggerW: charPickerMapObject.width,
      triggerH: charPickerMapObject.height,
      callback: () => {
        this.switchToScene('CharacterPicker', {}, false);
      },
    });
  }

  public update() {
    super.update();
  }
}
