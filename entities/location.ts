import {Player, playerInstance} from "../entities/player.js";
import {ModalDialogPlugin} from "../plugins/modal-dialog.js";
import {InventoryPlugin} from "../plugins/inventory.js";

export class Location extends Phaser.Scene {
    public player: Player;
    private modalDialog: ModalDialogPlugin;
    public inventory: InventoryPlugin;
    public playerImage: Phaser.GameObjects.Image;
    public keys: { [key: string]: any };
    public layers: Phaser.Tilemaps.StaticTilemapLayer[];
    public map: Phaser.Tilemaps.Tilemap;

    constructor(sceneSettings) {
        super(sceneSettings);
    }

    public preparePlugins() {
        this.load.scenePlugin('ModalDialogPlugin', ModalDialogPlugin, 'modalDialog', 'modalDialog');
        this.load.scenePlugin('InventoryPlugin', InventoryPlugin, 'inventory', 'inventory');
    }

    public prepareMap(mapKey, layerOffsetX = 0, layerOffsetY = 0) {
        this.map = this.make.tilemap({key: mapKey});

        this.player = playerInstance;
        const spawnPoint = this.getMapObject("Start");
        const playerData = this.player.prepareWorldImage(this, spawnPoint['x'] + layerOffsetX, spawnPoint['y'] + layerOffsetY);
        this.playerImage = playerData.worldImage;
        this.keys = playerData.keys;

        const tilesets = [];
        this.map.tilesets.forEach(tileset => {
            tilesets.push(this.map.addTilesetImage(tileset.name, tileset.name))
        });

        this.layers = [];
        this.map.layers.forEach(layer => {
            const createdLayer = this.map.createStaticLayer(layer.name, tilesets, layerOffsetX, layerOffsetY);
            this.layers.push(createdLayer);
            // lol kek if there is no props then it is an object, otherwise - array.. Phaser bug?
            if (Array.isArray(layer.properties) && layer.properties.find(prop => prop.name === 'hasCollisions')) {
                createdLayer.setCollisionByProperty({collides: true});
                this.physics.add.collider(this.playerImage, createdLayer);
            }
        });

        this.map.getObjectLayer('Enemies')?.objects.forEach(object => {
            console.log(object.name, object.properties);
            const enemyImage = object.properties.find(prop => prop.name === 'image')?.value;
            const enemies = JSON.parse(object.properties.find(prop => prop.name === 'enemies')?.value)
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

    public createTrigger(objectName, callback, objectLayer= 'Objects', texture = null, frame = null, interaction: 'collide' | 'overlap' = 'collide', offsetX = 0, offsetY = 0) {
        const object = this.getMapObject(objectName, objectLayer);
        const trigger = this.physics.add
            .image(object['x']+offsetX, object['y']+offsetY, texture, frame)
            .setOrigin(0, 0)
            .setDisplaySize(object['width'], object['height'])
            .setImmovable();
        if (texture === null) {
            trigger.setVisible(false)
        }
        if (interaction === 'collide') {
            this.physics.add.collider(this.playerImage, trigger, () => callback());
        }
        if (interaction === 'overlap') {
            this.physics.add.overlap(this.playerImage, trigger, () => callback());
        }
        return trigger;
    }

    public getMapObject(objectName: string, objectLayer = 'Objects'): Phaser.GameObjects.GameObject {
        return this.map.findObject(objectLayer, obj => obj.name === objectName)
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