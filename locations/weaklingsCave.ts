import {GeneralLocation} from "./generalLocation.js";
import {chest1Dialog, chest2Dialog, introDialog} from "../data/dialogs/introDialog.js";
import {DEBUG} from "../config/constants.js";
import AlchemyStand from "../entities/alchemyStand.js";

export class WeaklingsCaveScene extends GeneralLocation {
    constructor() {
        super({key: 'WeaklingsCave'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('weaklingsCave');

        const bgMusic = this.sound.add('keys-for-success', {loop: true, volume: 0.1});
        bgMusic['soundType'] = 'music';
        bgMusic.play();

        const chest1trigger = this.triggers.find(trigger => trigger.name === 'Chest 1');
        const destroyCallback = chest1trigger.callback;
        chest1trigger.updateCallback(() => {
            this.switchToScene('Dialog', {
                dialogTree: chest1Dialog,
                speakerName: 'Narrator',
                closeCallback: (param) => {
                    chest1trigger.updateCallback(destroyCallback, true)
                    destroyCallback();
                }
            }, false);
        }, true);

        const chest2trigger = this.triggers.find(trigger => trigger.name === 'Chest 2');
        const destroy2Callback = chest2trigger.callback;
        chest2trigger.updateCallback(() => {
            this.switchToScene('Dialog', {
                dialogTree: chest2Dialog,
                speakerName: 'Narrator',
                closeCallback: (param) => {
                    chest2trigger.updateCallback(destroy2Callback, true)
                    destroy2Callback();
                }
            }, false);
        }, true);

        if (!DEBUG) {
            this.switchToScene('Dialog', {
                dialogTree: introDialog,
                speakerName: 'Narrator',
                closeCallback: (param) => {
                }
            }, false);
        }

        const alchemyStandMapObject = this.getMapObject(`Alchemy stand`);
        const spriteParams = this.getSpriteParamsByObjectName(alchemyStandMapObject.name);
        const texture = spriteParams.texture;
        const frame = spriteParams.frame as number;
        const workingFrame = alchemyStandMapObject.properties?.find(prop => prop.name === 'workingFrame')?.value;
        new AlchemyStand({
            scene: this,
            name: alchemyStandMapObject.name,
            triggerX: alchemyStandMapObject.x,
            triggerY: alchemyStandMapObject.y,
            triggerW: alchemyStandMapObject.width,
            triggerH: alchemyStandMapObject.height,
            texture: texture,
            frame: frame,
            workingTexture: texture,
            workingFrame: workingFrame,
        })
    }

    public update() {
        super.update();
    }
}
