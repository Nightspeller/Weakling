import GeneralLocation from '../generalLocation';
import { chest1Dialog, chest2Dialog, introDialog } from '../../../data/dialogs/introDialog';
import { DEBUG } from '../../../config/constants';
import AlchemyStand from '../../../triggers/alchemyStand';

export default class WeaklingsCaveScene extends GeneralLocation {
  constructor() {
    super({ key: 'WeaklingsCave' });
  }

  public preload() {
    super.preload();
  }

  public init(data: any) {
    super.init(data);
  }

  public create() {
    super.create('weaklingsCave');

    const chest1trigger = this.triggers.find((trigger) => trigger.name === 'Chest 1');
    const destroyCallback = chest1trigger.callback;
    chest1trigger.updateCallback(() => {
      this.switchToScene('Dialog', {
        dialogTree: chest1Dialog,
        speakerName: 'Narrator',
        closeCallback: () => {
          chest1trigger.updateCallback(destroyCallback, true);
          destroyCallback();
        },
      }, false);
    }, true);

    const chest2trigger = this.triggers.find((trigger) => trigger.name === 'Chest 2');
    const destroy2Callback = chest2trigger.callback;
    chest2trigger.updateCallback(() => {
      this.switchToScene('Dialog', {
        dialogTree: chest2Dialog,
        speakerName: 'Narrator',
        closeCallback: () => {
          chest2trigger.updateCallback(destroy2Callback, true);
          destroy2Callback();
        },
      }, false);
    }, true);

    if (!DEBUG) {
      this.switchToScene('Dialog', {
        dialogTree: introDialog,
        speakerName: 'Narrator',
        closeCallback: () => {
        },
      }, false);
    }

    const alchemyStandMapObject = this.getMapObject('Alchemy stand');
    const spriteParams = this.getSpriteParamsByObjectName(alchemyStandMapObject.name);
    const { texture } = spriteParams;
    const frame = spriteParams.frame as number;
    const workingFrame = alchemyStandMapObject.properties?.find((prop: any) => prop.name === 'workingFrame')?.value;
    new AlchemyStand({
      scene: this,
      name: alchemyStandMapObject.name,
      triggerX: alchemyStandMapObject.x,
      triggerY: alchemyStandMapObject.y,
      triggerW: alchemyStandMapObject.width,
      triggerH: alchemyStandMapObject.height,
      texture,
      frame,
      workingTexture: texture,
      workingFrame,
    });
  }

  public update() {
    super.update();
  }
}
