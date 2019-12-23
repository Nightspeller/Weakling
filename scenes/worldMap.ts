import Player from "../entities/player.js";
import {ModalDialogPlugin} from "../plugins/modal-dialog.js";
import greetingDialog from "../dialogs/greetingDialog.js";
import {InventoryPlugin} from "../plugins/inventory.js";

export class WorldMapScene extends Phaser.Scene {
    private player: Player;
    private modalDialog: ModalDialogPlugin;
    public inventory: InventoryPlugin;

    constructor() {
        super({key: 'WorldMap'});
    }

    public preload() {
        this.load.scenePlugin('ModalDialogPlugin', ModalDialogPlugin, 'modalDialog', 'modalDialog');
        this.load.scenePlugin('InventoryPlugin', InventoryPlugin, 'inventory', 'inventory');
    }

    public create() {
        const map = this.make.tilemap({key: 'map'});
        const tileSet1 = map.addTilesetImage('base', 'base');
        const tileSet2 = map.addTilesetImage('grass1', 'grass1');
        const tileSet3 = map.addTilesetImage('dirt1-dirt2', 'dirt1-dirt2');
        const tileSet4 = map.addTilesetImage('grass1-dirt2', 'grass1-dirt2');
        const baseLayer = map.createStaticLayer('Base Layer', [tileSet1, tileSet2, tileSet3, tileSet4], 0, 0);
        const layer2 = map.createStaticLayer('Tile Layer 2', [tileSet1], 0, 0);
        const layer3 = map.createStaticLayer('Tile Layer 3', [tileSet1], 0, 0);
        const layer4 = map.createStaticLayer('Tile Layer 4', [tileSet1], 0, 0);
        layer2.setCollisionByProperty({collides: true});

        const spawnPoint = map.findObject("Objects", obj => obj.name === "Start");
        this.player = new Player(this, spawnPoint['x'], spawnPoint['y']);
        this.physics.add.collider(this.player.worldImage, layer2);

        const camera = this.cameras.main;
        camera.startFollow(this.player.worldImage);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setDeadzone(200, 100);

        const houseDoorObject = map.findObject("Objects", obj => obj.name === "House Door");
        const houseDoor = this.physics.add
            .image(houseDoorObject['x'], houseDoorObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(houseDoorObject['width'], houseDoorObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.player.worldImage, houseDoor, () => this.scene.start("House"));

        const villageObject = map.findObject("Objects", obj => obj.name === "Village");
        const villagePortal = this.physics.add
            .image(villageObject['x'], villageObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(villageObject['width'], villageObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.player.worldImage, villagePortal, () => this.scene.start("Village"));

        const enemyObject = map.findObject("Objects", obj => obj.name === "Goblin");
        const enemy = this.physics.add
            .image(enemyObject['x'], enemyObject['y'], 'boar-avatar', 2)
            .setOrigin(0, 0)
            .setDisplaySize(enemyObject['width'], enemyObject['height'])
            // .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.player.worldImage, enemy, () => this.scene.start("Fight", this.player));

        const barracksObject = map.findObject("Objects", obj => obj.name === "Barracks");
        const barracks = this.physics.add
            .image(barracksObject['x'], barracksObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(barracksObject['width'], barracksObject['height'])
            .setVisible(false)
            .setImmovable();
        let layer4visible = true;
        this.physics.add.overlap(this.player.worldImage, barracks, () => {
            if (layer4visible) {
                layer4.setVisible(false);
                layer4visible = false
            }
        });

        const strangerObject = map.findObject("Objects", obj => obj.name === "Stranger");
        const stranger = this.physics.add
            .image(strangerObject['x'], strangerObject['y'], 'stranger')
            .setOrigin(0, 0)
            .setDisplaySize(strangerObject['width'], strangerObject['height'])
            .setImmovable();
        let isDialogClosed = true;
        this.physics.add.collider(this.player.worldImage, stranger, () => {
            if (isDialogClosed) {
                isDialogClosed = false;
                this.modalDialog.showDialog(greetingDialog, this.player, {}, (param) => {
                    console.log('dialog closed', param);
                    if (param === 'daggerObtained') {
                        this.player.addItemToInventory('dagger-weapon');
                    }
                    isDialogClosed = true;
                });
            }
        });

        this.inventory.showOpenIcon(this.player);



        const debugGraphics = this.add.graphics().setAlpha(0.25);
        layer2.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    }

    public update() {
        this.player.update();
    }
}