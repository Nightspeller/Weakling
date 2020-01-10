import { playerInstance } from "../entities/player.js";
import { ModalDialogPlugin } from "../plugins/modal-dialog.js";
import greetingDialog from "../dialogs/greetingDialog.js";
import { InventoryPlugin } from "../plugins/inventory.js";
import Trader from "../entities/trader.js";
export class WorldMapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WorldMap' });
    }
    preload() {
        this.load.scenePlugin('ModalDialogPlugin', ModalDialogPlugin, 'modalDialog', 'modalDialog');
        this.load.scenePlugin('InventoryPlugin', InventoryPlugin, 'inventory', 'inventory');
    }
    init() {
    }
    create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileSet1 = map.addTilesetImage('base', 'base');
        const tileSet2 = map.addTilesetImage('grass1', 'grass1');
        const tileSet3 = map.addTilesetImage('dirt1-dirt2', 'dirt1-dirt2');
        const tileSet4 = map.addTilesetImage('grass1-dirt2', 'grass1-dirt2');
        const baseLayer = map.createStaticLayer('Base Layer', [tileSet1, tileSet2, tileSet3, tileSet4], 0, 0);
        const layer2 = map.createStaticLayer('Tile Layer 2', [tileSet1], 0, 0);
        const layer3 = map.createStaticLayer('Tile Layer 3', [tileSet1], 0, 0);
        const layer4 = map.createStaticLayer('Tile Layer 4', [tileSet1], 0, 0);
        layer2.setCollisionByProperty({ collides: true });
        layer3.setCollisionByProperty({ collides: true });
        this.physics.world.setBounds(0, 0, baseLayer.width, baseLayer.height);
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Start");
        this.player = playerInstance;
        const playerData = this.player.prepareWorldImage(this, spawnPoint['x'], spawnPoint['y']);
        this.playerImage = playerData.worldImage;
        this.keys = playerData.keys;
        this.physics.add.collider(this.playerImage, [layer2, layer3]);
        const camera = this.cameras.main;
        camera.startFollow(this.playerImage);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setDeadzone(200, 100);
        const houseDoorObject = map.findObject("Objects", obj => obj.name === "House Door");
        const houseDoor = this.physics.add
            .image(houseDoorObject['x'], houseDoorObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(houseDoorObject['width'], houseDoorObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, houseDoor, () => this.switchToScene("House"));
        const villageObject = map.findObject("Objects", obj => obj.name === "Village");
        const villagePortal = this.physics.add
            .image(villageObject['x'], villageObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(villageObject['width'], villageObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, villagePortal, () => this.switchToScene("Village"));
        const enemyObject = map.findObject("Objects", obj => obj.name === "Goblin");
        const enemy = this.physics.add
            .image(enemyObject['x'], enemyObject['y'], 'boar-avatar')
            .setOrigin(0, 0)
            .setDisplaySize(enemyObject['width'], enemyObject['height'])
            // .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, enemy, () => this.switchToScene("Fight"));
        const barracksObject = map.findObject("Objects", obj => obj.name === "Barracks");
        const barracks = this.physics.add
            .image(barracksObject['x'], barracksObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(barracksObject['width'], barracksObject['height'])
            .setVisible(false)
            .setImmovable();
        let layer4visible = true;
        this.physics.add.overlap(this.playerImage, barracks, () => {
            if (layer4visible) {
                layer4.setVisible(false);
                layer4visible = false;
            }
        });
        const strangerObject = map.findObject("Objects", obj => obj.name === "Stranger");
        const stranger = this.physics.add
            .image(strangerObject['x'], strangerObject['y'], 'stranger')
            .setOrigin(0, 0)
            .setDisplaySize(strangerObject['width'], strangerObject['height'])
            .setImmovable();
        let isDialogClosed = true;
        this.physics.add.collider(this.playerImage, stranger, () => {
            if (isDialogClosed) {
                isDialogClosed = false;
                this.modalDialog.showDialog(greetingDialog, this.player, {}, (param) => {
                    if (param === 'daggerObtained') {
                        this.player.addItemToInventory('dagger-weapon');
                    }
                    isDialogClosed = true;
                });
            }
        });
        const traderObject = map.findObject("Objects", obj => obj.name === "Trader");
        const trader = this.physics.add
            .image(traderObject['x'], traderObject['y'], 'trader')
            .setOrigin(0, 0)
            .setDisplaySize(traderObject['width'], traderObject['height'])
            .setImmovable();
        const traderItems = [
            { itemId: 'copper-pieces', quantity: 200 },
            { itemId: 'rope-belt', quantity: 1 },
            { itemId: 'dagger-weapon', quantity: 1 },
            { itemId: 'leather-armor', quantity: 1 },
            { itemId: 'invisibility-cape', quantity: 1 },
        ];
        const traderEntity = new Trader(traderItems);
        this.physics.add.collider(this.playerImage, trader, () => this.switchToScene('Shop', {
            player: this.player,
            trader: traderEntity
        }, false));
        const chatPickerObject = map.findObject("Objects", obj => obj.name === "Character Picker");
        const chatPicker = this.physics.add
            .image(chatPickerObject['x'], chatPickerObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(chatPickerObject['width'], chatPickerObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, chatPicker, () => this.switchToScene('CharacterPicker', {}, false));
        const debugButton = this.add.image(32, 32, 'debug-icon').setOrigin(0, 0).setInteractive().setScrollFactor(0);
        let debugModeOn = false;
        const debugGraphics = this.add.graphics().setAlpha(0.25).setVisible(debugModeOn);
        layer2.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
        layer3.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
        debugButton.on('pointerdown', () => {
            debugModeOn = !debugModeOn;
            debugGraphics.setVisible(debugModeOn);
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
//# sourceMappingURL=worldMap.js.map