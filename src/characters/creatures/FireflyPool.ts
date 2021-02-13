import * as Phaser from 'phaser';
import Firefly from './firefly';

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Phaser.GameObjects
  {
    // eslint-disable-next-line no-unused-vars
    interface GameObjectFactory
    {
    fireflyPool(): FireflyPool
    }
  }
}

const KEY_FIREFLY = 'fireflies';

export default class FireflyPool extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene, config: Phaser.Types.GameObjects.Group.GroupConfig = {}) {
    const defaults: Phaser.Types.GameObjects.Group.GroupConfig = {
      classType: Firefly,
    };

    super(scene, Object.assign(defaults, config));
  }

  spawn(x = 0, y = 0) {
    const randomFireflyFrame = Phaser.Math.Between(0, 11);
    const firefly: Firefly = this.get(x, y, KEY_FIREFLY, randomFireflyFrame);

    firefly.setVisible(true);
    firefly.setActive(true);

    return firefly;
  }

  despawn(firefly: Firefly) {
    this.killAndHide(firefly);

    firefly.alpha = 1;
    firefly.scale = 1;
  }

  initializeWithSize(size: number) {
    if (this.getLength() > 0 || size <= 0) {
      return;
    }

    this.createMultiple({
      key: KEY_FIREFLY,
      quantity: size,
      visible: false,
      active: false,
    });
  }
}

// eslint-disable-next-line func-names
Phaser.GameObjects.GameObjectFactory.register('fireflyPool', function () {
  // @ts-ignore
  return this.updateList.add(new FireflyPool(this.scene));
});

export {
  KEY_FIREFLY,
};
