export class ModalDialogPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);
        this.options = {
            borderThickness: 3,
            borderColor: 0x907748,
            borderAlpha: 1,
            backgroundColor: 0x303030,
            backgroundAlpha: 0.8,
            dialogWidth: +scene.sys.game.config.width - 32 * 2,
            dialogHeight: 150,
            dialogX: 32,
            dialogY: +scene.sys.game.config.height - 32 - 150,
            closeButtonColor: 'darkgoldenrod',
            closeButtonHoverColor: 'red',
            textColor: 'white',
            letterAppearanceDelay: 10,
        };
        this.dialogDisplayGroup = scene.add.group();
    }
    showDialog(text, options, closeCallback) {
        var _a;
        this.dialogDisplayGroup.clear(true, true);
        (_a = this.timedEvent) === null || _a === void 0 ? void 0 : _a.remove();
        this.options = { ...this.options, ...options };
        this.closeCallback = closeCallback;
        this._drawDialogWindow();
        this._setText(text, this.options.letterAppearanceDelay > 0);
    }
    boot() {
        console.log('booting dialog plugin');
        this.systems.events.on('shutdown', () => this._shutdown());
        this.systems.events.on('destroy', () => this.destroy());
    }
    _shutdown() {
        var _a;
        console.log('shutting down dialog plugin');
        // It appears that plugin does good enough just of clearing after itself, dunno if\why we need code below
        (_a = this.timedEvent) === null || _a === void 0 ? void 0 : _a.remove();
        this.dialogDisplayGroup.destroy(true);
    }
    destroy() {
        console.log('destroying dialog plugin');
        this._shutdown();
    }
    _drawDialogWindow() {
        const graphics = this.scene.add.graphics().setScrollFactor(0);
        graphics.fillStyle(this.options.backgroundColor, this.options.backgroundAlpha);
        graphics.fillRect(this.options.dialogX, this.options.dialogY, this.options.dialogWidth, this.options.dialogHeight);
        graphics.lineStyle(this.options.borderThickness, this.options.borderColor, this.options.borderAlpha);
        graphics.strokeRect(this.options.dialogX, this.options.dialogY, this.options.dialogWidth, this.options.dialogHeight);
        this.dialogDisplayGroup.add(graphics);
        this._createCloseButton();
    }
    _createCloseButton() {
        const closeButtonX = this.options.dialogX + this.options.dialogWidth - 20;
        const closeButtonY = this.options.dialogY;
        const graphics = this.scene.add.graphics().setScrollFactor(0);
        graphics.lineStyle(this.options.borderThickness, this.options.borderColor, this.options.borderAlpha);
        graphics.strokeRect(closeButtonX, closeButtonY, 20, 20);
        this.dialogDisplayGroup.add(graphics);
        const closeBtn = this.scene.add.text(closeButtonX, closeButtonY, 'X', {
            font: 'bold 16px Arial',
            fill: this.options.closeButtonColor,
            fixedWidth: 20,
            fixedHeight: 20,
            align: 'center'
        }).setScrollFactor(0).setInteractive();
        closeBtn.on('pointerover', () => closeBtn.setColor(this.options.closeButtonHoverColor));
        closeBtn.on('pointerout', () => closeBtn.setColor(this.options.closeButtonColor));
        closeBtn.on('pointerdown', () => {
            var _a, _b;
            console.log('close btn clicked');
            (_a = this.timedEvent) === null || _a === void 0 ? void 0 : _a.remove();
            this.dialogDisplayGroup.clear(true, true);
            (_b = this.closeCallback) === null || _b === void 0 ? void 0 : _b.call(this);
        });
        this.dialogDisplayGroup.add(closeBtn);
    }
    _setText(text, animate) {
        const textX = this.options.dialogX + 25;
        const textY = this.options.dialogY + 10;
        const textGameObject = this.scene.add.text(textX, textY, '', {
            color: this.options.textColor,
            wordWrap: {
                width: this.options.dialogWidth - 50
            }
        }).setScrollFactor(0);
        this.dialogDisplayGroup.add(textGameObject);
        if (animate) {
            let shownLettersCounter = 0;
            if (this.timedEvent)
                this.timedEvent.remove();
            this.timedEvent = this.scene.time.addEvent({
                delay: this.options.letterAppearanceDelay,
                callback: () => {
                    textGameObject.setText(text.slice(0, shownLettersCounter));
                    if (text.length === shownLettersCounter) {
                        this.timedEvent.remove();
                    }
                    else {
                        shownLettersCounter++;
                    }
                },
                loop: true
            });
        }
        else {
            textGameObject.setText(text);
        }
    }
}
//# sourceMappingURL=modal-dialog.js.map