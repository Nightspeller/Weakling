import { playerInstance } from "../entities/player.js";
import { ModalDialogPlugin } from "../plugins/modal-dialog.js";
import { InventoryPlugin } from "../plugins/inventory.js";
export class HouseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'House' });
    }
    preload() {
        this.load.scenePlugin('ModalDialogPlugin', ModalDialogPlugin, 'modalDialog', 'modalDialog');
        this.load.scenePlugin('InventoryPlugin', InventoryPlugin, 'inventory', 'inventory');
    }
    init() { }
    create() {
        const map = this.make.tilemap({ key: 'house' });
        const tileSet1 = map.addTilesetImage('base', 'base');
        const tileSet2 = map.addTilesetImage('castle', 'castle');
        const layer1 = map.createStaticLayer('Tile Layer 1', [tileSet1, tileSet2], 0, 0);
        const layer2 = map.createStaticLayer('Tile Layer 2', [tileSet1, tileSet2], 0, 0);
        const layer3 = map.createStaticLayer('Tile Layer 3', [tileSet1, tileSet2], 0, 0);
        layer2.setCollisionByProperty({ collides: true });
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Start");
        this.player = playerInstance;
        const playerData = this.player.prepareWorldImage(this, spawnPoint['x'], spawnPoint['y']);
        this.playerImage = playerData.worldImage;
        this.keys = playerData.keys;
        this.physics.add.collider(this.playerImage, layer2);
        const worldMapObject = map.findObject("Objects", obj => obj.name === "Caltor");
        const worldMapPortal = this.physics.add
            .image(worldMapObject['x'], worldMapObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(worldMapObject['width'], worldMapObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, worldMapPortal, () => this.switchToScene("Caltor"));
        const camera = this.cameras.main;
        camera.startFollow(this.playerImage);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        /*const houseDoorObject = map.findObject("Objects", obj => obj.name === "House Door");
        const houseDoor = this.physics.add
            .image(houseDoorObject['x'], houseDoorObject['y'], null).setOrigin(0,0)
            .setDisplaySize(houseDoorObject['width'],houseDoorObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.player.sprite, houseDoor, () => console.log('collided with the door') );*/
        const debugGraphics = this.add.graphics().setAlpha(0.25);
        layer2.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    }
    update() {
        this.player.update(this.playerImage, this.keys);
    }
    switchToScene(sceneKey, data, shouldSleep = true) {
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
        }
        else {
            this.scene.pause(this.scene.key);
        }
        this.scene.run(sceneKey, data);
    }
}
//# sourceMappingURL=house.js.map