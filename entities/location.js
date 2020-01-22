import { playerInstance } from "../entities/player.js";
import { ModalDialogPlugin } from "../plugins/modal-dialog.js";
import { InventoryPlugin } from "../plugins/inventory.js";
export class Location extends Phaser.Scene {
    constructor(sceneSettings) {
        super(sceneSettings);
    }
    preparePlugins() {
        this.load.scenePlugin('ModalDialogPlugin', ModalDialogPlugin, 'modalDialog', 'modalDialog');
        this.load.scenePlugin('InventoryPlugin', InventoryPlugin, 'inventory', 'inventory');
    }
    prepareMap(mapKey, layerOffsetX = 0, layerOffsetY = 0) {
        var _a;
        this.map = this.make.tilemap({ key: mapKey });
        this.player = playerInstance;
        const spawnPoint = this.getMapObject("Start");
        const playerData = this.player.prepareWorldImage(this, spawnPoint['x'] + layerOffsetX, spawnPoint['y'] + layerOffsetY);
        this.playerImage = playerData.worldImage;
        this.keys = playerData.keys;
        const tilesets = [];
        this.map.tilesets.forEach(tileset => {
            tilesets.push(this.map.addTilesetImage(tileset.name, tileset.name));
        });
        this.layers = [];
        this.map.layers.forEach(layer => {
            const createdLayer = this.map.createStaticLayer(layer.name, tilesets, layerOffsetX, layerOffsetY);
            this.layers.push(createdLayer);
            // lol kek if there is no props then it is an object, otherwise - array.. Phaser bug?
            if (Array.isArray(layer.properties) && layer.properties.find(prop => prop.name === 'hasCollisions')) {
                createdLayer.setCollisionByProperty({ collides: true });
                this.physics.add.collider(this.playerImage, createdLayer);
            }
        });
        (_a = this.map.getObjectLayer('Enemies')) === null || _a === void 0 ? void 0 : _a.objects.forEach(object => {
            var _a, _b;
            console.log(object.name, object.properties);
            const enemyImage = (_a = object.properties.find(prop => prop.name === 'image')) === null || _a === void 0 ? void 0 : _a.value;
            const enemies = JSON.parse((_b = object.properties.find(prop => prop.name === 'enemies')) === null || _b === void 0 ? void 0 : _b.value);
            this.createTrigger(object.name, () => {
                this.switchToScene('Fight', enemies);
            }, 'Enemies', enemyImage, null, 'collide', layerOffsetX, layerOffsetY);
        });
        this.physics.world.setBounds(layerOffsetX, layerOffsetY, this.map.widthInPixels, this.map.heightInPixels);
        const camera = this.cameras.main;
        camera.startFollow(this.playerImage);
        camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        camera.setDeadzone(200, 100);
        this.createDebugButton();
    }
    createTrigger(objectName, callback, objectLayer = 'Objects', texture = null, frame = null, interaction = 'collide', offsetX = 0, offsetY = 0) {
        const object = this.getMapObject(objectName, objectLayer);
        const trigger = this.physics.add
            .image(object['x'] + offsetX, object['y'] + offsetY, texture, frame)
            .setOrigin(0, 0)
            .setDisplaySize(object['width'], object['height'])
            .setImmovable();
        if (texture === null) {
            trigger.setVisible(false);
        }
        if (interaction === 'collide') {
            this.physics.add.collider(this.playerImage, trigger, () => callback());
        }
        if (interaction === 'overlap') {
            this.physics.add.overlap(this.playerImage, trigger, () => callback());
        }
        return trigger;
    }
    getMapObject(objectName, objectLayer = 'Objects') {
        return this.map.findObject(objectLayer, obj => obj.name === objectName);
    }
    updatePlayer() {
        this.player.update(this.playerImage, this.keys);
    }
    createDebugButton() {
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
//# sourceMappingURL=location.js.map