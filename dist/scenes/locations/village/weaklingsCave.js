define(["require", "exports", "../generalLocation", "../../../data/dialogs/introDialog", "../../../config/constants", "../../../triggers/alchemyStand"], function (require, exports, generalLocation_1, introDialog_1, constants_1, alchemyStand_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WeaklingsCaveScene extends generalLocation_1.default {
        constructor() {
            super({ key: 'WeaklingsCave' });
        }
        preload() {
            super.preload();
        }
        init(data) {
            super.init(data);
        }
        create() {
            super.create('weaklingsCave');
            const bgMusic = this.sound.add('keys-for-success', {
                loop: true,
                volume: 0.1,
            });
            // bgMusic.soundType = 'music';
            bgMusic.play();
            const chest1trigger = this.triggers.find((trigger) => trigger.name === 'Chest 1');
            const destroyCallback = chest1trigger.callback;
            chest1trigger.updateCallback(() => {
                this.switchToScene('Dialog', {
                    dialogTree: introDialog_1.chest1Dialog,
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
                    dialogTree: introDialog_1.chest2Dialog,
                    speakerName: 'Narrator',
                    closeCallback: () => {
                        chest2trigger.updateCallback(destroy2Callback, true);
                        destroy2Callback();
                    },
                }, false);
            }, true);
            if (!constants_1.DEBUG) {
                this.switchToScene('Dialog', {
                    dialogTree: introDialog_1.introDialog,
                    speakerName: 'Narrator',
                    closeCallback: () => {
                    },
                }, false);
            }
            const alchemyStandMapObject = this.getMapObject('Alchemy stand');
            const spriteParams = this.getSpriteParamsByObjectName(alchemyStandMapObject.name);
            const { texture } = spriteParams;
            const frame = spriteParams.frame;
            const workingFrame = alchemyStandMapObject.properties?.find((prop) => prop.name === 'workingFrame')?.value;
            new alchemyStand_1.default({
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
        update() {
            super.update();
        }
    }
    exports.default = WeaklingsCaveScene;
});
//# sourceMappingURL=weaklingsCave.js.map