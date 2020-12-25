import { GeneralLocation } from "../generalLocation.js";
import { EyeballNpc } from "../../../npcs/backCave/eyeballNpc.js";
import Item from "../../../entities/item.js";
export class BackCaveScene extends GeneralLocation {
    constructor() {
        super({ key: 'BackCave' });
    }
    create() {
        super.create('backCave');
        this.eyeball = new EyeballNpc({ scene: this });
    }
    createDroppedItem(item, quantity = 1) {
        const trigger = super.createDroppedItem(item, quantity);
        if (this.eyeball.destroyed === false && item instanceof Item && item.itemId === 'purplecup-mushroom') {
            this.tweens.add({
                targets: this.eyeball.image,
                x: trigger.image.x - 75,
                y: trigger.image.y - 75,
                duration: 5000,
                onComplete: () => {
                    this.eyeball.image.play('eyeball_attack1').once('animationcomplete', (currentAnim, currentFrame, sprite) => {
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
//# sourceMappingURL=backCave.js.map