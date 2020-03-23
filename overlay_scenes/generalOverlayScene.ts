export class GeneralOverlayScene extends Phaser.Scene {
    public opts: OverlaySceneOptions;
    protected parentSceneKey: string;

    constructor({key: key}) {
        super({key: key});
    }

    public create(parentSceneKey: string, opts?: OverlaySceneOptions) {
        this.opts = {
            ...{
                backgroundColor: 0xf0d191,
                backgroundAlpha: 1,
                windowX: 16,
                windowY: 16,
                windowWidth: 32 * 24,
                windowHeight: 32 * 19,

                borderThickness: 2,
                borderColor: 0x907748,
                borderAlpha: 1,

                baseDepth: 0,

                closeButtonColor: '#2d2d2d',
                closeButtonHoverColor: 'red',

                textColor: 'white',
            }, ...opts
        };
        this.parentSceneKey = parentSceneKey;
        this._drawBackground();
        this._drawCloseButton();
    }

    private _drawBackground() {
        this.add.image(this.opts.windowX, this.opts.windowY, 'interface-24x19')
            .setDisplaySize(this.opts.windowWidth, this.opts.windowHeight).setAlpha(this.opts.backgroundAlpha)
            .setOrigin(0).setScrollFactor(0).setDepth(this.opts.baseDepth);
       /* this.add.graphics()
            .fillStyle(this.opts.backgroundColor, this.opts.backgroundAlpha)
            .fillRect(this.opts.windowX, this.opts.windowY, this.opts.windowWidth, this.opts.windowHeight)
            .lineStyle(this.opts.borderThickness, this.opts.borderColor)
            .strokeRect(this.opts.windowX, this.opts.windowY, this.opts.windowWidth, this.opts.windowHeight)
            .setScrollFactor(0).setDepth(this.opts.baseDepth);*/
    }

    private _drawCloseButton() {
        const closeButtonX = this.opts.windowX + this.opts.windowWidth - 24;
        const closeButtonY = this.opts.windowY + 4;
        this.add.graphics()
            .lineStyle(this.opts.borderThickness, this.opts.borderColor, this.opts.borderAlpha)
            .strokeRect(closeButtonX, closeButtonY, 20, 20)
            .setScrollFactor(0).setDepth(this.opts.baseDepth);

        const closeBtn = this.add.text(closeButtonX, closeButtonY, 'X', {
            font: 'bold 16px Arial',
            fill: this.opts.closeButtonColor,
            fixedWidth: 20,
            fixedHeight: 20,
            align: 'center'
        }).setScrollFactor(0).setDepth(this.opts.baseDepth).setInteractive({useHandCursor: true});

        closeBtn.on('pointerover', () => closeBtn.setColor(this.opts.closeButtonHoverColor));
        closeBtn.on('pointerout', () => closeBtn.setColor(this.opts.closeButtonColor));
        closeBtn.on('pointerdown', () => this.closeScene());
        this.input.keyboard.on('keyup-' + 'ESC', () => this.closeScene());
    }

    public closeScene() {
        //console.log(`Switching from %c${this.scene.key}%c to %c${this.parentSceneKey}%c. Should %c${this.scene.key}%c turn off %c(sleep): true`, 'color: red', 'color: auto', 'color: red', 'color: auto', 'color: red', 'color: auto', 'color: red');
        this.scene.resume(this.parentSceneKey);
        this.scene.sleep(this.scene.key);
    }
}
