import * as Phaser from 'phaser';
import GeneralLocation from '../generalLocation';

import FireflyPool, { KEY_FIREFLY } from '../../../characters/creatures/fireflyPool';

import Firefly from '../../../characters/creatures/firefly';

export default class Forest extends GeneralLocation {
  private fireflyGroup?: FireflyPool

  constructor() {
    super({ key: 'Forest' });
  }

  public preload() {
    super.preload();

    this.load.image(KEY_FIREFLY);
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('forest');

    this.fireflyGroup = this.add.fireflyPool();
    this.fireflyGroup.initializeWithSize(100);

    this.time.addEvent({
      delay: Phaser.Math.Between(500, 2000),
      loop: true,
      callback: () => {
        const randomFireflyPosX = (Phaser.Math.Between(-200, 200) + this.playerImage.x);
        const randomFireflyPosY = (Phaser.Math.Between(-200, 200) + this.playerImage.y);

        this.spawnFirefly(randomFireflyPosX, randomFireflyPosY);
      },
    });
  }

  public update() {
    super.update();
    if (!this.fireflyGroup) {
      return;
    }
    this.updateFireflyPosition();
  }

  private spawnFirefly(x = 100, y = 300) {
    if (!this.fireflyGroup) {
      return null;
    }

    const firefly = this.fireflyGroup.spawn(x, y);

    this.time.addEvent({
      delay: Phaser.Math.Between(1000, 1500),
      loop: true,
      callback: () => {
        const randomFireflyFrame = Phaser.Math.Between(0, 11);
        firefly.setFrame(randomFireflyFrame);
      },
    });

    const vec = new Phaser.Math.Vector2(firefly.x, firefly.y);
    const rotation = vec.angle();
    firefly.setRotation(rotation);

    this.tweens.add({
      targets: firefly,
      scale: 0.5,
      alpha: 0,
      duration: Phaser.Math.Between(2000, 5000),
      onComplete: () => {
        this.tweens.killTweensOf(firefly);
        this.fireflyGroup!.despawn(firefly);
      },
    });

    return firefly;
  }

  updateFireflyPosition() {
    this.fireflyGroup.getChildren().forEach((firefly: Firefly) => {
      if (firefly === null) {
        return;
      }

      if (firefly.active && Math.abs(firefly.x) > (this.playerImage.x + 200)) {
        this.fireflyGroup.killAndHide(firefly);
      }
    });
  }
}
