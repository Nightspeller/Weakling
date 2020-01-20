import {Player, playerInstance} from "../entities/player.js";
import {ModalDialogPlugin} from "../plugins/modal-dialog.js";
import {InventoryPlugin} from "../plugins/inventory.js";

export class Location extends Phaser.Scene {
    public player: Player;
    private modalDialog: ModalDialogPlugin;
    public inventory: InventoryPlugin;
    public playerImage: Phaser.GameObjects.Image;
    private keys: { [key: string]: any };
    public layers: Phaser.Tilemaps.StaticTilemapLayer[];
    public map: Phaser.Tilemaps.Tilemap;

    constructor(sceneSettings) {
        super(sceneSettings);
    }

    public preparePlugins() {
        this.load.scenePlugin('ModalDialogPlugin', ModalDialogPlugin, 'modalDialog', 'modalDialog');
        this.load.scenePlugin('InventoryPlugin', InventoryPlugin, 'inventory', 'inventory');
    }

    public prepareMap(mapKey) {
        this.map = this.make.tilemap({key: mapKey});

        this.player = playerInstance;
        const spawnPoint = this.map.findObject("Objects", obj => obj.name === "Start");
        const playerData = this.player.prepareWorldImage(this, spawnPoint['x'], spawnPoint['y']);
        this.playerImage = playerData.worldImage;
        this.keys = playerData.keys;

        const tilesets = [];
        this.map.tilesets.forEach(tileset => {
            tilesets.push(this.map.addTilesetImage(tileset.name, tileset.name))
        });

        this.layers = [];
        this.map.layers.forEach(layer => {
            const createdLayer = this.map.createStaticLayer(layer.name, tilesets, 0, 0);
            this.layers.push(createdLayer);
            // lol kek if there is no props then it is an object, otherwise - array.. Phaser bug?
            if (Array.isArray(layer.properties) && layer.properties.find(prop => prop.name === 'hasCollisions')) {
                createdLayer.setCollisionByProperty({collides: true});
                this.physics.add.collider(this.playerImage, createdLayer);
            }
        });

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        const camera = this.cameras.main;
        camera.startFollow(this.playerImage);
        camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        camera.setDeadzone(200, 100);

        this.createDebugButton();
    }

    public updatePlayer() {
        this.player.update(this.playerImage, this.keys);
    }

    public createDebugButton() {
        const debugButton = this.add.image(32, 32, 'debug-icon').setOrigin(0, 0).setInteractive().setScrollFactor(0);
        let debugModeOn = false;
        const debugGraphics = this.add.graphics().setAlpha(0.25).setVisible(debugModeOn);
        this.layers.forEach(layer => {
            if (Array.isArray(layer.layer.properties) && layer.layer.properties.find(prop => prop.name === 'hasCollisions')) {
                layer.renderDebug(debugGraphics, {
                    tileColor: null,
                    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
                    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
                });
            }
        });
        debugButton.on('pointerdown', () => {
            debugModeOn = !debugModeOn;
            debugGraphics.setVisible(debugModeOn);
        });
    }

    public switchToScene(sceneKey: string, data?: object, shouldSleep = true) {
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