define(["require", "exports", "../generalLocation", "../../../triggers/npcs/backCave/eyeballNpc", "../../../entities/item"], function (require, exports, generalLocation_1, eyeballNpc_1, item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BackCaveScene extends generalLocation_1.default {
        constructor() {
            super({ key: 'BackCave' });
        }
        create() {
            super.create('backCave');
            this.eyeball = new eyeballNpc_1.default({ scene: this });
        }
        createDroppedItem(item, quantity = 1) {
            const trigger = super.createDroppedItem(item, quantity);
            if (this.eyeball.destroyed === false && item instanceof item_1.default && item.itemId === 'purplecup-mushroom') {
                this.tweens.add({
                    targets: this.eyeball.image,
                    x: trigger.image.x - 75,
                    y: trigger.image.y - 75,
                    duration: 5000,
                    onComplete: () => {
                        this.eyeball.image
                            .play('eyeball_attack1')
                            .once('animationcomplete', ( /* currentAnim, currentFrame, sprite */) => {
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
    exports.default = BackCaveScene;
});
//# sourceMappingURL=backCave.js.map