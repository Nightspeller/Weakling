import {GeneralLocation} from "../locations/generalLocation.js";

interface TriggerParams {
    scene: GeneralLocation,
    name: string,
    triggerX: number,
    triggerY: number,
    triggerW: number,
    triggerH: number,
    callback?: Function;
    texture?: string;
    frame?: number;
    interaction?: 'collide' | 'overlap' | 'activate' | 'activateOverlap';
    offsetX?: number;
    offsetY?: number;
    singleUse?: boolean;
    isSecret?: boolean;
}

export class Trigger {
    public image: Phaser.Physics.Arcade.Sprite;
    callback: Function;
    private scene: GeneralLocation;
    private type: "collide" | "overlap" | "activate" | "activateOverlap";
    private singleUse: boolean;
    private isSecret: boolean;
    private highlightBorder: Phaser.GameObjects.Graphics;
    public name: string;
    private disabled: boolean;

    constructor(
        {
            scene,
            name,
            triggerX,
            triggerY,
            triggerW,
            triggerH,
            callback = () => {
            },
            texture = null,
            frame = null,
            interaction = 'activate',
            offsetX = scene.offsetX,
            offsetY = scene.offsetY,
            isSecret = false,
            singleUse = false
        }: TriggerParams
    ) {
        this.scene = scene;
        this.name = name;
        this.callback = callback;
        this.type = interaction;
        this.singleUse = singleUse;
        this.isSecret = isSecret;
        this.disabled = false;
        this.image = scene.physics.add
            .sprite(triggerX + offsetX, triggerY + offsetY, texture, frame)
            .setOrigin(0, 0)
            .setDisplaySize(triggerW, triggerH)
            .setImmovable();
        if (texture === null) {
            this.image.setVisible(false)
        }

        if (interaction === 'collide') {
            scene.physics.add.collider(scene.playerImage, this.image, () => {
                if (this.disabled === false){
                    this.callback();
                    if (singleUse) {
                        this.destroy();
                    }
                }
            });
        }
        if (interaction === 'overlap') {
            scene.physics.add.overlap(scene.playerImage, this.image, () => {
                if (this.disabled === false){
                    this.callback();
                    if (singleUse) {
                        this.destroy();
                    }
                }
            });
        }
        if (interaction === 'activate') {
            scene.physics.add.collider(scene.playerImage, this.image);
        }
        if (interaction === 'activateOverlap') {
            scene.physics.add.overlap(scene.playerImage, this.image);
        }

        this.highlightBorder = this.scene.add.graphics()
            .lineStyle(2, 0xca5d8f)
            .strokeRectShape(this.image.getBounds()).setVisible(false);

        this.setDisableState(false);

        scene.triggers.push(this);
    }

    public setDisableState(shouldDisable: boolean) {
        if (shouldDisable) {
            this.highlightBorder.setVisible(false);
            this.scene.input.keyboard.removeListener('keydown-SPACE', this.onSpaceBarPressed, this);
            this.scene.input.keyboard.removeListener('keydown-SHIFT', this.onHighlightOn, this);
            this.scene.input.keyboard.removeListener('keyup-SHIFT', this.onHighlightOff, this);
            this.disabled = true;
        } else {
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

    public destroy() {
        this.image.destroy(true);
        this.highlightBorder?.destroy(true);
        this.scene.input.keyboard.off('keydown-SPACE', this.onSpaceBarPressed, this);
        this.scene.input.keyboard.off('keydown-SHIFT', this.onHighlightOn, this);
        this.scene.input.keyboard.off('keyup-SHIFT', this.onHighlightOff, this);
        this.scene.triggers = this.scene.triggers.filter(trigger => trigger !== this);
    }

    private onSpaceBarPressed(event) {
        event.preventDefault();
        const scene = this.scene
        //checking if player is looking at the trigger image, adjustments are done in order to reflect the fact that physical body is smaller than the image
        if (this.type === 'activateOverlap' ||
            (this.image.getTopLeft().y === scene.playerImage.getBottomRight().y && [0, 1, 2].includes(Number(scene.playerImage.frame.name))) ||
            (this.image.getTopLeft().x === scene.playerImage.getBottomRight().x - 8 && [6, 7, 8].includes(Number(scene.playerImage.frame.name))) ||
            (this.image.getBottomRight().y === scene.playerImage.getTopLeft().y + 16 && [18, 19, 20].includes(Number(scene.playerImage.frame.name))) ||
            (this.image.getBottomRight().x === scene.playerImage.getTopLeft().x + 8 && [12, 13, 14].includes(Number(scene.playerImage.frame.name)))
        ) {
            const bodies = scene.physics.overlapRect(this.image.x, this.image.y, this.image.displayWidth + 2, this.image.displayHeight + 2);
            // @ts-ignore
            if (bodies.includes(scene.playerImage.body) && bodies.includes(this.image.body)) {
                this.callback();
                if (this.singleUse) {
                    this.destroy();
                }
            }
        }
    }

    private onHighlightOn(event) {
        event.preventDefault();
        this.highlightBorder.setVisible(true);
    }

    private onHighlightOff(event) {
        event.preventDefault();
        this.highlightBorder.setVisible(false);
    }

    public updateCallback(newCallback: Function, overwrite = false) {
        if (overwrite) {
            this.callback = newCallback;
        } else {
            const oldCallback = this.callback;
            this.callback = () => {
                newCallback();
                oldCallback();
            }
        }
    }
}
