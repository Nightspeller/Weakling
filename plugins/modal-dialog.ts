import Player from "../entities/player.js";

export class ModalDialogPlugin extends Phaser.Plugins.ScenePlugin {
    private timedEvent: Phaser.Time.TimerEvent;
    private dialogDisplayGroup: Phaser.GameObjects.Group;
    private options: DialogOptions;
    private closeCallback: Function;
    private dialogTree: any[];
    private player: Player;

    constructor(scene: Phaser.Scene, pluginManager) {
        super(scene, pluginManager);

        this.options = {
            borderThickness: 3,
            borderColor: 0x907748,
            borderAlpha: 1,

            backgroundColor: 0x303030,
            backgroundAlpha: 0.8,

            dialogWidth: +scene.sys.game.config.width - 32 * 2,
            dialogHeight: 250,
            dialogX: 32,
            dialogY: +scene.sys.game.config.height - 32 - 250,

            closeButtonColor: 'darkgoldenrod',
            closeButtonHoverColor: 'red',

            textColor: 'white',
            letterAppearanceDelay: 10,
        };

        this.dialogDisplayGroup = scene.add.group();
    }

    public showDialog(dialogTree: DialogTree, player: Player, options?: DialogOptions, closeCallback?: Function) {


        this.dialogTree = dialogTree;
        this.options = {...this.options, ...options};
        this.closeCallback = closeCallback;
        this.player = player;

        this._showLine(dialogTree[0])
    }

    private _showLine(line) {
        this.dialogDisplayGroup.clear(true, true);
        this.timedEvent?.remove();
        this._drawDialogWindow();

        this._setText(line.text, this.options.letterAppearanceDelay > 0)
        this._setReplies(line.replies)
    }

    private _setReplies(replies) {
        replies.forEach((reply, index) => {
            const replyX = this.options.dialogX + 25;
            const replyY = this.options.dialogY + this.options.dialogHeight - 10 - 34 * replies.length + 34 * index;
            const replyGameObject = this.scene.add.text(replyX, replyY, `${index+1}. ${reply.text}`, {
                color: this.options.closeButtonColor,
                wordWrap: {
                    width: this.options.dialogWidth - 50
                }
            }).setScrollFactor(0).setInteractive();
            replyGameObject.once('pointerdown', () => {
                if (reply.checkCharacteristic !== undefined) {
                    const charToCheck = reply.checkCharacteristic.split('.');
                    if (this.player.currentCharacteristics[charToCheck[0]][charToCheck[1]] >= reply.checkValue) {
                        const nextLine = this.dialogTree.find(line => line.id === reply.successTriggers);
                        this._showLine(nextLine);
                    } else {
                        const nextLine = this.dialogTree.find(line => line.id === reply.failureTriggers);
                        this._showLine(nextLine);
                    }
                } else {
                    if (reply.successTriggers !== undefined) {
                        const nextLine = this.dialogTree.find(line => line.id === reply.successTriggers);
                        this._showLine(nextLine);
                    } else {
                        this._closeDialog(reply.callbackParam);
                    }
                }
            });
            this.dialogDisplayGroup.add(replyGameObject);
        })
    }

    public boot() {
        console.log('booting dialog plugin');
        this.systems.events.on('shutdown', () => this._shutdown());
        this.systems.events.on('destroy', () => this.destroy());
    }

    private _shutdown() {
        console.log('shutting down dialog plugin');
        // It appears that plugin does good enough just of clearing after itself, dunno if\why we need code below
        this.timedEvent?.remove();
        this.dialogDisplayGroup.destroy(true);
    }

    public destroy() {
        console.log('destroying dialog plugin');
        this._shutdown();
    }

    private _drawDialogWindow() {
        const graphics = this.scene.add.graphics().setScrollFactor(0);

        graphics.fillStyle(this.options.backgroundColor, this.options.backgroundAlpha);
        graphics.fillRect(this.options.dialogX, this.options.dialogY, this.options.dialogWidth, this.options.dialogHeight);

        graphics.lineStyle(this.options.borderThickness, this.options.borderColor, this.options.borderAlpha);
        graphics.strokeRect(this.options.dialogX, this.options.dialogY, this.options.dialogWidth, this.options.dialogHeight);

        this.dialogDisplayGroup.add(graphics);

        this._createCloseButton();
    }

    private _createCloseButton() {
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
            console.log('close btn clicked');
           this._closeDialog();
        });

        this.dialogDisplayGroup.add(closeBtn);
    }

    private _closeDialog(param?) {
        this.timedEvent?.remove();
        this.dialogDisplayGroup.clear(true, true);
        this.closeCallback?.call(this, param);
    }

    private _setText(text: string, animate: boolean) {
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
            if (this.timedEvent) this.timedEvent.remove();
            this.timedEvent = this.scene.time.addEvent({
                delay: this.options.letterAppearanceDelay,
                callback: () => {
                    textGameObject.setText(text.slice(0, shownLettersCounter));
                    if (text.length === shownLettersCounter) {
                        this.timedEvent.remove();
                    } else {
                        shownLettersCounter++;
                    }
                },
                loop: true
            });
        } else {
            textGameObject.setText(text);
        }
    }
}
