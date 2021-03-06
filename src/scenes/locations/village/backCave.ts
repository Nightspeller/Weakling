import GeneralLocation from '../generalLocation';
import EyeballNpc from '../../../triggers/npcs/backCave/eyeballNpc';
import Item from '../../../entities/item';
import Trigger from '../../../triggers/trigger';

export default class BackCaveScene extends GeneralLocation {
  private eyeball: EyeballNpc;

  constructor() {
    super({ key: 'BackCave' });
  }

  public create() {
    super.create('backCave');

    this.eyeball = new EyeballNpc({ scene: this });
  }

  public createDroppedItem(item: Item | string, quantity: number = 1): Trigger {
    const trigger = super.createDroppedItem(item, quantity);
    if (this.eyeball.destroyed === false && item instanceof Item && item.itemId === 'purplecup-mushroom') {
      this.tweens.add({
        targets: this.eyeball.image,
        x: trigger.image.x - 75,
        y: trigger.image.y - 75,
        duration: 5000,
        onComplete: () => {
          this.eyeball.image
            .play('eyeball_attack1')
            .once('animationcomplete', (/* currentAnim, currentFrame, sprite */) => {
              this.eyeball.image.play('eyeball_idle');
              this.player.updateQuest('scaredyBat', 'purplecupFed');
              trigger.destroy();
            });
        },
      });
    }
    return trigger;
  }
}
