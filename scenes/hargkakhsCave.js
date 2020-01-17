import { playerInstance } from "../entities/player.js";
import { ModalDialogPlugin } from "../plugins/modal-dialog.js";
import { InventoryPlugin } from "../plugins/inventory.js";
export class HargkakhsCaveScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HargkakhsCave' });
    }
    preload() {
        this.load.scenePlugin('ModalDialogPlugin', ModalDialogPlugin, 'modalDialog', 'modalDialog');
        this.load.scenePlugin('InventoryPlugin', InventoryPlugin, 'inventory', 'inventory');
    }
    init() {
    }
    create() {
        const map = this.make.tilemap({ key: 'hargkakhsCave' });
        const tileSet1 = map.addTilesetImage('base', 'base');
        const layer1 = map.createStaticLayer('Tile Layer 1', [tileSet1], 304, 192);
        const layer2 = map.createStaticLayer('Tile Layer 2', [tileSet1], 304, 192);
        const layer3 = map.createStaticLayer('Tile Layer 3', [tileSet1], 304, 192);
        this.layer4 = map.createStaticLayer('EmptyChest', [tileSet1], 304, 192).setVisible(false);
        layer2.setCollisionByProperty({ collides: true });
        layer3.setCollisionByProperty({ collides: true });
        this.layer4.setCollisionByProperty({ collides: true });
        this.physics.world.setBounds(304, 192, layer1.width, layer1.height);
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Start");
        this.player = playerInstance;
        const playerData = this.player.prepareWorldImage(this, spawnPoint['x'] + 304, spawnPoint['y'] + 192);
        this.playerImage = playerData.worldImage;
        this.keys = playerData.keys;
        this.physics.add.collider(this.playerImage, [layer2, layer3, this.layer4]);
        const camera = this.cameras.main;
        camera.startFollow(this.playerImage);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setDeadzone(200, 100);
        const exitObject = map.findObject("Objects", obj => obj.name === "Exit");
        const exit = this.physics.add
            .image(exitObject['x'] + 304, exitObject['y'] + 192, null)
            .setOrigin(0, 0)
            .setDisplaySize(exitObject['width'], exitObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, exit, () => this.switchToScene("Village"));
        const chestObject = map.findObject("Objects", obj => obj.name === "Chest");
        this.chest = this.physics.add
            .image(chestObject['x'] + 304, chestObject['y'] + 192, null)
            .setOrigin(0, 0)
            .setDisplaySize(chestObject['width'], chestObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.overlap(this.playerImage, this.chest, () => {
        });
        const debugGraphics = this.add.graphics().setAlpha(0.25);
        layer2.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    }
    update() {
        var _a;
        this.player.update(this.playerImage, this.keys);
        if (((_a = this.chest.body) === null || _a === void 0 ? void 0 : _a.embedded) && this.keys.space.isDown) {
            const key = this.player.inventory.find(item => { var _a; return ((_a = item.specifics) === null || _a === void 0 ? void 0 : _a.opens) === 'hargkakhsChest'; });
            if (key) {
                this.layer4.setVisible(true);
                this.player.addItemToInventory('fancy-belt');
                this.player.addItemToInventory('work-gloves');
                this.player.removeItemFromInventory(key);
                this.chest.destroy(true);
            }
        }
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
//# sourceMappingURL=hargkakhsCave.js.map