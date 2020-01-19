import {Player, playerInstance} from "../entities/player.js";
import {elderFirstTimeDialog, elderGoodsObtainedDialog, elderSecondTimeDialog} from "../dialogs/elderGreetingDialog.js";
import {ModalDialogPlugin} from "../plugins/modal-dialog.js";
import {
    nahkhaAfterGoodsObtainedDialog,
    nahkhaAfterTheElderDialog,
    nahkhaBeforeTheElderDialog
} from "../dialogs/nahkhaDialog.js";
import {InventoryPlugin} from "../plugins/inventory.js";
import {
    hargkakhAfterGoodsObtainedDialog,
    hargkakhFirstDialog,
    hargkakhSecondTryDialog
} from "../dialogs/hargkakhDialog.js";

export class VillageScene extends Phaser.Scene {
    private player: Player;
    private modalDialog: ModalDialogPlugin;
    private inventory: InventoryPlugin;
    private playerImage: Phaser.GameObjects.Image;
    private keys:  { [key: string]: any };

    constructor() {
        super({key: 'Village'});
    }

    public preload() {
        this.load.scenePlugin('ModalDialogPlugin', ModalDialogPlugin, 'modalDialog', 'modalDialog');
        this.load.scenePlugin('InventoryPlugin', InventoryPlugin, 'inventory', 'inventory');
    }

    public init() { }

    public create() {
        const map = this.make.tilemap({key: 'village'});
        const tileSet1 = map.addTilesetImage('base', 'base');
        const tileSet2 = map.addTilesetImage('flowers', 'flowers');
        const tileSet3 = map.addTilesetImage('dirt1', 'dirt1');
        const tileSet4 = map.addTilesetImage('dirt2', 'dirt2');
        const tileSet5 = map.addTilesetImage('dirt4', 'dirt4');
        const tileSet6 = map.addTilesetImage('grass4', 'grass4');
        const tileSet7 = map.addTilesetImage('grass1-dirt1', 'grass1-dirt1');
        const tileSet8 = map.addTilesetImage('grass1-dirt2', 'grass1-dirt2');
        const tileSet9 = map.addTilesetImage('grass1-dirt4', 'grass1-dirt4');


        const layer1 = map.createStaticLayer('Tile Layer 1', [tileSet1, tileSet2, tileSet3, tileSet4, tileSet5, tileSet6, tileSet7, tileSet8, tileSet9], 0, 0);
        const layer2 = map.createStaticLayer('Tile Layer 2', [tileSet1, tileSet2, tileSet3, tileSet4, tileSet5, tileSet6, tileSet7, tileSet8, tileSet9], 0, 0);
        const layer3 = map.createStaticLayer('Tile Layer 3', [tileSet1, tileSet2, tileSet3, tileSet4, tileSet5, tileSet6, tileSet7, tileSet8, tileSet9], 0, 0);
        const layer4 = map.createStaticLayer('Tile Layer 4', [tileSet1, tileSet2, tileSet3, tileSet4, tileSet5, tileSet6, tileSet7, tileSet8, tileSet9], 0, 0);
        layer2.setCollisionByProperty({collides: true});
        this.physics.world.setBounds(0,0, layer1.width, layer1.height);

        const spawnPoint = map.findObject("Objects", obj => obj.name === "Start");
        this.player = playerInstance;
        const playerData = this.player.prepareWorldImage(this, spawnPoint['x'], spawnPoint['y']);
        this.playerImage = playerData.worldImage;
        this.keys = playerData.keys;

        this.physics.add.collider(this.playerImage, layer2);

        const worldMapObject = map.findObject("Objects", obj => obj.name === "WorldMap");
        const worldMapPortal = this.physics.add
            .image(worldMapObject['x'], worldMapObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(worldMapObject['width'], worldMapObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, worldMapPortal, () => this.switchToScene("WorldMap"));

        const camera = this.cameras.main;
        camera.startFollow(this.playerImage);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setDeadzone(200, 100);

        const elderObject = map.findObject("Objects", obj => obj.name === "Elder");
        const elder = this.physics.add
            .image(elderObject['x'], elderObject['y'], 'stranger')
            .setOrigin(0, 0)
            .setDisplaySize(elderObject['width'], elderObject['height'])
            .setImmovable();
        let isDialogClosed = true;
        let elderDialogToTrigger = elderFirstTimeDialog;
        let nahkhaDialogToTrigger = nahkhaBeforeTheElderDialog;
        let hargkakhDialogToTrigger = hargkakhFirstDialog;
        this.physics.add.collider(this.playerImage, elder, () => {
            if (isDialogClosed) {
                isDialogClosed = false;
                if (this.player.inventory.find(item => item.itemId === 'basket')?.quantity === 10 && this.player.inventory.find(item => item.itemId === 'minerals')?.quantity === 10) {
                    elderDialogToTrigger = elderGoodsObtainedDialog;
                }
                this.modalDialog.showDialog(elderDialogToTrigger, this.player, {}, (param) => {
                    console.log('dialog closed', param);
                    isDialogClosed = true;
                    if (param !== 'readyToGo') {
                        elderDialogToTrigger = elderSecondTimeDialog;
                        nahkhaDialogToTrigger = nahkhaAfterTheElderDialog;
                    } else {
                        elder.destroy(true);
                    }
                });
            }
        });

        const nahkhaObject = map.findObject("Objects", obj => obj.name === "Nahkha");
        const nahkha = this.physics.add
            .image(nahkhaObject['x'], nahkhaObject['y'], 'trader')
            .setOrigin(0, 0)
            .setDisplaySize(nahkhaObject['width'], nahkhaObject['height'])
            .setImmovable();

        this.physics.add.collider(this.playerImage, nahkha, () => {
            if (isDialogClosed) {
                isDialogClosed = false;
                this.modalDialog.showDialog(nahkhaDialogToTrigger, this.player, {}, (param) => {
                    console.log('dialog closed', param);
                    isDialogClosed = true;
                    if (param === 'basketsObtained') {
                        nahkhaDialogToTrigger = nahkhaAfterGoodsObtainedDialog;
                        this.player.addItemToInventory('basket', 10);
                    }
                });
            }
        });

        const hargkakhObject = map.findObject("Objects", obj => obj.name === "Hargkakh");
        const hargkakh = this.physics.add
            .image(hargkakhObject['x'], hargkakhObject['y'], 'stranger')
            .setOrigin(0, 0)
            .setDisplaySize(hargkakhObject['width'], hargkakhObject['height'])
            .setImmovable();

        let keyGiven = false;
        this.physics.add.collider(this.playerImage, hargkakh, () => {
            if (isDialogClosed) {
                isDialogClosed = false;
                this.modalDialog.showDialog(hargkakhDialogToTrigger, this.player, {}, (param) => {
                    console.log('dialog closed', param);
                    isDialogClosed = true;
                    if (param === 'pickupFailure') {
                        hargkakhDialogToTrigger = hargkakhSecondTryDialog;
                        if (!keyGiven) {
                            this.player.addItemToInventory('copper-key').specifics.opens = 'hargkakhsChest';
                            keyGiven = true;
                        }
                    }
                    if (param === 'mineralsObtained') {
                        hargkakhDialogToTrigger = hargkakhAfterGoodsObtainedDialog;
                        this.player.addItemToInventory('minerals', 10);
                    }
                });
            }
        });

        const hargkakhsCaveObject = map.findObject("Objects", obj => obj.name === "Hargkakh's Cave");
        const hargkakhsCave = this.physics.add
            .image(hargkakhsCaveObject['x'], hargkakhsCaveObject['y'], null)
            .setVisible(false)
            .setOrigin(0, 0)
            .setDisplaySize(hargkakhsCaveObject['width'], hargkakhsCaveObject['height'])
            .setImmovable();

        this.physics.add.collider(this.playerImage, hargkakhsCave, () => this.switchToScene('HargkakhsCave'));

        const debugGraphics = this.add.graphics().setAlpha(0.25);
        layer2.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    }

    public update() {
        this.player.update(this.playerImage, this.keys);
    }

    private switchToScene(sceneKey: string, data?: object, shouldSleep = true) {
        console.log('Switching to', sceneKey);
        this.events.off('resume');
        this.events.on('resume', fromScene => {
            console.log('Resuming', this.scene.key);
            // TODO: figure out proper way to stop player from sticky controls - caused by scene pausing...
            // further investigation - confirmed in FF, dunno about other browsers. If take away focus from the window and back - no bug.
            // still dont know how to fix properly..
            // this event handler should not be here (it actually should not exist at all) but keeping it here for easier port of the fix..
        });
        Object.values(this.keys).forEach(key => key.isDown = false);
        if (shouldSleep) {
            this.scene.sleep(this.scene.key);
        } else {
            this.scene.pause(this.scene.key);
        }
        this.scene.run(sceneKey, data);
    }
}