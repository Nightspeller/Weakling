import Player from "../entities/player.js";
import {ModalDialogPlugin} from "../plugins/modal-dialog.js";
import {InventoryPlugin} from "../plugins/inventory.js";

export class HargkakhsCaveScene extends Phaser.Scene {
    private player: Player;
    private modalDialog: ModalDialogPlugin;
    private inventory: InventoryPlugin;

    constructor() {
        super({key: 'HargkakhsCave'});
    }

    public preload() {
        this.load.scenePlugin('ModalDialogPlugin', ModalDialogPlugin, 'modalDialog', 'modalDialog');
        this.load.scenePlugin('InventoryPlugin', InventoryPlugin, 'inventory', 'inventory');
    }

    public init({player}) {
        if (player) {
            this.player = player;
        } else {
            this.player = new Player();
        }
    }

    public create() {
        const map = this.make.tilemap({key: 'hargkakhsCave'});
        const tileSet1 = map.addTilesetImage('base', 'base');

        const layer1 = map.createStaticLayer('Tile Layer 1', [tileSet1], 304, 192);
        const layer2 = map.createStaticLayer('Tile Layer 2', [tileSet1], 304, 192);
        const layer3 = map.createStaticLayer('Tile Layer 3', [tileSet1], 304, 192);
        const layer4 = map.createStaticLayer('EmptyChest', [tileSet1], 304, 192);
        layer2.setCollisionByProperty({collides: true});
        layer3.setCollisionByProperty({collides: true});
        layer4.setCollisionByProperty({collides: true});
        this.physics.world.setBounds(304, 192, layer1.width, layer1.height);

        const spawnPoint = map.findObject("Objects", obj => obj.name === "Start");
        this.player.prepareWorldImage(this, spawnPoint['x']+304, spawnPoint['y']+192);

        this.physics.add.collider(this.player.worldImage, [layer2, layer3, layer4]);

        const camera = this.cameras.main;
        camera.startFollow(this.player.worldImage);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setDeadzone(200, 100);

        const exitObject = map.findObject("Objects", obj => obj.name === "Exit");
        const exit = this.physics.add
            .image(exitObject['x']+304, exitObject['y']+192, null)
            .setOrigin(0, 0)
            .setDisplaySize(exitObject['width'], exitObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.player.worldImage, exit, () => this.scene.start("Village"));

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