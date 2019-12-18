import Player from "../entities/player.js";
import {belts} from "../actionsAndEffects/items.js";

export class InventoryPlugin extends Phaser.Plugins.ScenePlugin {
    private inventoryDisplayGroup: Phaser.GameObjects.Group;
    private options: any;
    private character: Player;
    private closeCallback: Function;

    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
        super(scene, pluginManager);

        this.options = {
            borderThickness: 3,
            borderColor: 0x907748,
            borderAlpha: 1,

            backgroundColor: 0xf0d191,
            backgroundAlpha: 0.8,

            inventoryWidth: 32 * 24,
            inventoryHeight: 32 * 19,
            inventoryX: 16,
            inventoryY: 16,

            closeButtonColor: 'darkgoldenrod',
            closeButtonHoverColor: 'red',

            textColor: 'white',
            letterAppearanceDelay: 10,
        };

        this.inventoryDisplayGroup = scene.add.group();
        this.scene.load.image('doll', 'assets/images/interface/doll.png');
        this.scene.load.image('inventory-slot', 'assets/images/interface/inventory-slot.png');
    }

    public showInventory(character: Player, options?: Object, closeCallback?: Function) {
        console.log(character, options);
        this.character = character;
        this.options = {...this.options, ...options};
        this.closeCallback = closeCallback;
        this._drawInventory();
    }

    private _drawInventory() {
        this._drawMainWindow();
        this._drawCloseButton();
        this._drawDoll();
        this._drawQuickSlots();
        this._drawBackpack();
        this._drawEquippedItems();
        this.inventoryDisplayGroup.setDepth(2)
    }

    private _drawDoll() {
        this.inventoryDisplayGroup.create(this.options.inventoryX + 16, this.options.inventoryY + 20, 'doll').setOrigin(0, 0).setScale(0.75);
    }

    private _drawQuickSlots() {
        const equippedBelt = belts[this.character.inventory.equipped.belt];
        const quickSlotsNumber = equippedBelt.quickSlots + 4;
        for (let i = 0; i < quickSlotsNumber; i++) {
            this.inventoryDisplayGroup
                .create(this.options.inventoryX + 16 + 64 * i, this.options.inventoryY + this.options.inventoryHeight - 64 - 16, 'inventory-slot')
                .setOrigin(0, 0).setDisplaySize(64, 64);
        }
    }

    private _drawBackpack() {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const slotX = this.options.inventoryX + this.options.inventoryWidth - 20 - 64 * 5 + 64 * i;
                const slotY = this.options.inventoryY + 20 + 64 * j;
                this.inventoryDisplayGroup
                    .create(slotX, slotY, 'inventory-slot')
                    .setOrigin(0, 0).setDisplaySize(64, 64);
            }
        }
    }

    private _drawEquippedItems(){
        const equippedBelt = belts[this.character.inventory.equipped.belt];
        this.inventoryDisplayGroup
            .create(222, 266, equippedBelt.sprite.key)
            .setOrigin(0, 0).setDisplaySize(60, 60).setTint(0x777777);
    }

    private _drawMainWindow() {
        const inventoryGraphics = this.scene.add.graphics()
            .fillStyle(this.options.backgroundColor, this.options.backgroundAlpha)
            .fillRect(this.options.inventoryX, this.options.inventoryY, this.options.inventoryWidth, this.options.inventoryHeight)
            .lineStyle(this.options.borderThickness, this.options.borderColor)
            .strokeRect(this.options.inventoryX, this.options.inventoryY, this.options.inventoryWidth, this.options.inventoryHeight)
            .setInteractive();
        this.inventoryDisplayGroup.add(inventoryGraphics);
    }

    private _drawCloseButton() {
        const closeButtonX = this.options.inventoryX + this.options.inventoryWidth - 20;
        const closeButtonY = this.options.inventoryY;
        const graphics = this.scene.add.graphics().setScrollFactor(0);
        graphics.lineStyle(this.options.borderThickness, this.options.borderColor, this.options.borderAlpha);
        graphics.strokeRect(closeButtonX, closeButtonY, 20, 20);
        this.inventoryDisplayGroup.add(graphics);

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
            this.inventoryDisplayGroup.clear(true, true);
            this.closeCallback?.call(this);
        });

        this.inventoryDisplayGroup.add(closeBtn);
    }


    public boot() {
        console.log('booting inventory plugin');
        this.systems.events.on('shutdown', () => this._shutdown());
        this.systems.events.on('destroy', () => this.destroy());
    }

    private _shutdown() {
        console.log('shutting down inventory plugin');
    }

    public destroy() {
        console.log('destroying inventory plugin');
        this._shutdown();
    }
}
