define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Trigger {
        constructor({ scene, name, triggerX, triggerY, triggerW, triggerH, callback = () => { }, texture = null, frame = null, interaction = 'activate', offsetX = scene.offsetX, offsetY = scene.offsetY, isSecret = false, singleUse = false, }) {
            this.scene = scene;
            this.name = name;
            this.callback = callback;
            this.type = interaction;
            this.singleUse = singleUse;
            this.isSecret = isSecret;
            this.disabled = false;
            this.destroyed = false;
            this.image = scene.physics.add
                .sprite(triggerX + offsetX, triggerY + offsetY, texture, frame)
                .setOrigin(0, 0)
                .setDisplaySize(triggerW, triggerH)
                .setImmovable();
            if (texture === null) {
                this.image.setVisible(false);
            }
            if (interaction === 'collide') {
                scene.physics.add.collider(scene.playerImage, this.image, () => {
                    if (this.disabled === false) {
                        this.callback();
                        if (singleUse) {
                            this.destroy();
                        }
                    }
                });
            }
            if (interaction === 'overlap') {
                scene.physics.add.overlap(scene.playerImage, this.image, () => {
                    if (this.disabled === false) {
                        this.callback();
                        if (singleUse) {
                            this.destroy();
                        }
                    }
                });
            }
            if (interaction === 'activate') {
                scene.physics.add.collider(scene.playerImage, this.image, this.handlePlayerImageCollision);
            }
            if (interaction === 'activateOverlap') {
                scene.physics.add.overlap(scene.playerImage, this.image);
            }
            this.highlightBorder = this.scene.add.graphics()
                .lineStyle(2, 0xca5d8f)
                .strokeRectShape(this.image.getBounds())
                .setVisible(false);
            this.setDisableState(false);
            scene.triggers.push(this);
        }
        setDisableState(shouldDisable) {
            if (shouldDisable) {
                this.highlightBorder.setVisible(false);
                this.scene.input.keyboard.removeListener('keydown-SPACE', this.onSpaceBarPressed, this);
                this.scene.input.keyboard.removeListener('keydown-SHIFT', this.onHighlightOn, this);
                this.scene.input.keyboard.removeListener('keyup-SHIFT', this.onHighlightOff, this);
                this.disabled = true;
            }
            else {
                if (this.type === 'activate' || this.type === 'activateOverlap') {
                    this.scene.input.keyboard.on('keydown-SPACE', this.onSpaceBarPressed, this);
                }
                if (this.isSecret === false) {
                    this.scene.input.keyboard.on('keydown-SHIFT', this.onHighlightOn, this);
                    this.scene.input.keyboard.on('keyup-SHIFT', this.onHighlightOff, this);
                }
                this.disabled = false;
            }
        }
        destroy() {
            this.image.destroy();
            this.destroyed = true;
            this.highlightBorder?.destroy();
            this.scene.input.keyboard.off('keydown-SPACE', this.onSpaceBarPressed, this);
            this.scene.input.keyboard.off('keydown-SHIFT', this.onHighlightOn, this);
            this.scene.input.keyboard.off('keyup-SHIFT', this.onHighlightOff, this);
            this.scene.triggers = this.scene.triggers.filter((trigger) => trigger !== this);
        }
        // @ts-ignore
        onSpaceBarPressed(event) {
            event.preventDefault();
            const { scene } = this;
            // checking if player is looking at the trigger image, adjustments are done in order to reflect the fact that physical body is smaller than the image
            const bodyBounds = this.image.body.getBounds({
                x: 0,
                y: 0,
                right: 0,
                bottom: 0,
            });
            if (this.scene.somethingTriggered === false && (this.type === 'activateOverlap'
                || (bodyBounds.y === scene.playerImage.getBottomRight().y && [0, 1, 2].includes(Number(scene.playerImage.frame.name)))
                || (bodyBounds.x === scene.playerImage.getBottomRight().x - 8 && [6, 7, 8].includes(Number(scene.playerImage.frame.name)))
                || (bodyBounds.bottom === scene.playerImage.getTopLeft().y + 16 && [18, 19, 20].includes(Number(scene.playerImage.frame.name)))
                || (bodyBounds.right === scene.playerImage.getTopLeft().x + 8 && [12, 13, 14].includes(Number(scene.playerImage.frame.name))))) {
                const bodies = scene.physics.overlapRect(this.image.x, this.image.y, this.image.displayWidth + 2, this.image.displayHeight + 2);
                // @ts-ignore
                if (bodies.includes(scene.playerImage.body) && bodies.includes(this.image.body)) {
                    this.scene.somethingTriggered = true;
                    setTimeout(() => {
                        this.scene.somethingTriggered = false;
                    }, 0);
                    this.callback();
                    if (this.singleUse) {
                        this.destroy();
                    }
                }
            }
        }
        // This is overridden by the child
        // eslint-disable-next-line no-unused-vars
        handlePlayerImageCollision(playerImage, collisionImage) { }
        // @ts-ignore
        onHighlightOn(event) {
            event.preventDefault();
            this.highlightBorder.setVisible(true);
        }
        // @ts-ignore
        onHighlightOff(event) {
            event.preventDefault();
            this.highlightBorder.setVisible(false);
        }
        updateCallback(newCallback, overwrite = false) {
            if (overwrite) {
                this.callback = newCallback;
            }
            else {
                const oldCallback = this.callback;
                this.callback = () => {
                    newCallback();
                    oldCallback();
                };
            }
        }
    }
    exports.default = Trigger;
});
//# sourceMappingURL=trigger.js.map