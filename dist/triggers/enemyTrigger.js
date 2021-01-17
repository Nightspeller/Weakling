define(["require", "exports", "./trigger"], function (require, exports, trigger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EnemyTrigger extends trigger_1.default {
        constructor({ scene, name, triggerX, triggerY, triggerW, triggerH, spriteParameters, background, drop, enemies, xpReward, }) {
            super({
                scene,
                name,
                triggerX,
                triggerY,
                triggerW,
                triggerH,
                texture: spriteParameters.texture,
                frame: spriteParameters.frame,
                interaction: 'activate',
                callback: () => {
                    scene.switchToScene('Battle', {
                        enemies,
                        enemyName: name,
                        background,
                    }, false);
                },
            });
            this.drop = drop;
            this.xpReward = xpReward;
        }
    }
    exports.default = EnemyTrigger;
});
//# sourceMappingURL=enemyTrigger.js.map