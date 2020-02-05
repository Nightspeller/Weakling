import {Player, playerInstance} from "../entities/player.js";
import {items} from "../actionsAndEffects/items.js";

export class Location extends Phaser.Scene {
    public player: Player;
    public playerImage: Phaser.Physics.Arcade.Sprite;
    public keys: { [key: string]: any };
    public layers: Phaser.Tilemaps.StaticTilemapLayer[];
    public map: Phaser.Tilemaps.Tilemap;
    public prevSceneKey: string;
    private triggers: any[];

    constructor(sceneSettings) {
        super(sceneSettings);
        this.triggers = [];
    }

    public preparePlugins() {
    }

    public prepareMap(mapKey, layerOffsetX = 0, layerOffsetY = 0) {
        this.map = this.make.tilemap({key: mapKey});

        this.player = playerInstance;
        const spawnPoint = this.getMapObject("Start");
        if (spawnPoint) {
            const playerData = this.player.prepareWorldImage(this, spawnPoint['x'] + layerOffsetX, spawnPoint['y'] + layerOffsetY);
            this.playerImage = playerData.worldImage;
            this.keys = playerData.keys;
            const camera = this.cameras.main;
            camera.startFollow(this.playerImage);
            camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
            camera.setDeadzone(200, 100);
            this.showOpenInventoryIcon();
        }

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
                this.setSidesCollisions(createdLayer.layer);
                this.physics.add.collider(this.playerImage, createdLayer);
            }
            if (Array.isArray(layer.properties) && layer.properties.find(prop => prop.name === 'fringe')) {
                createdLayer.setDepth(1);
            }
        });

        this.map.getObjectLayer('Enemies')?.objects.forEach(object => {
            const enemyImage = object.properties.find(prop => prop.name === 'image')?.value;
            const enemies = JSON.parse(object.properties.find(prop => prop.name === 'enemies')?.value);
            this.createTrigger({
                objectName: object.name,
                objectLayer: 'Enemies',
                texture: enemyImage,
                frame: null,
                interaction: 'activate',
                offsetX: layerOffsetX,
                offsetY: layerOffsetY,
                callback: () => {
                    this.switchToScene('Battle', {enemies: enemies});
                },
            });
        });

        this.map.getObjectLayer('Waypoints')?.objects.forEach(object => {
            const toLocation = object.properties.find(prop => prop.name === 'location')?.value;
            this.createTrigger({
                objectName: object.name,
                objectLayer: 'Waypoints',
                texture: null,
                frame: null,
                interaction: 'activate',
                offsetX: layerOffsetX,
                offsetY: layerOffsetY,
                callback: () => {
                    this.switchToScene(toLocation);
                },
            });
        });

        this.map.getObjectLayer('Items')?.objects.forEach(object => {
            const itemId = object.properties.find(prop => prop.name === 'itemId')?.value;
            const itemQuantity = object.properties.find(prop => prop.name === 'quantity')?.value;
            const item = {...items[itemId]};
            const trigger = this.createTrigger({
                objectName: object.name,
                objectLayer: 'Items',
                texture: item.sprite.key,
                frame: item.sprite.frame,
                interaction: 'activate',
                offsetX: layerOffsetX,
                offsetY: layerOffsetY,
                callback: () => {
                    this.player.addItemToInventory(itemId, itemQuantity);
                    trigger.destroy(true);
                },
            });
        });

        this.physics.world.setBounds(layerOffsetX, layerOffsetY, this.map.widthInPixels, this.map.heightInPixels);

        if (mapKey !== 'battle') this.createDebugButton();
    }

    private setSidesCollisions(layer) {
        for (let ty = 0; ty < layer.height; ty++) {
            for (let tx = 0; tx < layer.width; tx++) {
                const tile = layer.data[ty][tx];

                if (!tile) continue;

                if (tile.properties['collideSides']) {
                    const directions = JSON.parse(tile.properties['collideSides']);
                    if ((tx !== 0) && directions.includes('left') && !layer.data[ty][tx - 1].collideRight) {
                        tile.setCollision(true, tile.collideRight, tile.collideUp, tile.collideDown, false);
                        layer.data[ty][tx - 1].setCollision(layer.data[ty][tx - 1].collideLeft, true, layer.data[ty][tx - 1].collideUp, layer.data[ty][tx - 1].collideDown, false);
                    }
                    if ((tx !== layer.width-1) && directions.includes('right') && !layer.data[ty][tx + 1].collideLeft) {
                        tile.setCollision(tile.collideLeft, true, tile.collideUp, tile.collideDown, false);
                        layer.data[ty][tx + 1].setCollision(true, layer.data[ty][tx + 1].collideRight, layer.data[ty][tx + 1].collideUp, layer.data[ty][tx + 1].collideDown, false);
                    }
                    if ((ty !== 0) && directions.includes('up') && !layer.data[ty - 1][tx].collideDown) {
                        tile.setCollision(tile.collideLeft, tile.collideRight, true, tile.collideDown, false);
                        layer.data[ty - 1][tx].setCollision(layer.data[ty - 1][tx].collideLeft, layer.data[ty - 1][tx].collideRight, layer.data[ty - 1][tx].collideUp, true, false);
                    }
                    if ((ty !== layer.height-1) && directions.includes('down') && !layer.data[ty + 1][tx].collideUp) {
                        tile.setCollision(tile.collideLeft, tile.collideRight, tile.collideUp, true, false);
                        layer.data[ty + 1][tx].setCollision(layer.data[ty + 1][tx].collideLeft, layer.data[ty + 1][tx].collideRight, true, layer.data[ty + 1][tx].collideDown, false);
                    }
                }
            }
        }
    };

    public showOpenInventoryIcon(opts?: Object, closeCallback?: Function) {
        const inventoryGraphics = this.add.graphics().setScrollFactor(0)
            .fillStyle(0xf0d191, 0.8)
            .fillRect(+this.sys.game.config.width - 32 - 64, 32, 64, 64)
            .lineStyle(3, 0x907748)
            .strokeRect(+this.sys.game.config.width - 32 - 64, 32, 64, 64)
            .setDepth(10 - 1);
        const inventoryIconImage = this.add.image(+this.sys.game.config.width - 32 - 64, 32, 'bag-green')
            .setOrigin(0, 0,).setScrollFactor(0).setScale(2).setInteractive().setDepth(10 - 1);
        inventoryIconImage.on('pointerdown', () => {
            this.switchToScene('Inventory', {opts, closeCallback}, false);
        });
    }

    public createTrigger(
        {
            objectName,
            callback = () => {
            },
            objectLayer = 'Objects',
            texture = null,
            frame = null,
            interaction = 'activate',
            offsetX = 0,
            offsetY = 0
        }: TriggerParams
    ) {
        const object = this.getMapObject(objectName, objectLayer);
        const trigger = this.physics.add
            .image(object['x'] + offsetX, object['y'] + offsetY, texture, frame)
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
        if (interaction === 'activate') {
            this.physics.add.collider(this.playerImage, trigger);
        }
        //TODO: might need rework to support callback update...
        this.triggers.push({image: trigger, callback: callback, type: interaction});
        return trigger;
    }

    public getMapObject(objectName: string, objectLayer = 'Objects'): Phaser.GameObjects.GameObject {
        return this.map.findObject(objectLayer, obj => obj.name === objectName)
    }

    public updatePlayer() {
        this.player.update(this.playerImage, this.keys);
        this.triggers.forEach(trigger => {
            if (trigger.type === 'activate') {
                const image = trigger.image;
                const callback = trigger.callback;
                if (this.keys.space.isDown) {
                    const bodies = this.physics.overlapRect(image.x, image.y, image.displayWidth + 2, image.displayHeight + 2);
                    // @ts-ignore
                    if (bodies.includes(this.playerImage.body) && bodies.includes(image.body)) {
                        callback();
                    }
                }
            }
        });

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

    public switchToScene(sceneKey: string, data: object = {}, shouldSleep = true) {
        console.log('Switching to', sceneKey);
        // TODO: figure out proper way to stop player from sticky controls - caused by scene pausing...
        // further investigation - confirmed in FF, dunno about other browsers. If take away focus from the window and back - no bug.
        // still dont know how to fix properly..
        // this event handler should not be here (it actually should not exist at all) but keeping it here for easier port of the fix..
        if (this.keys) Object.values(this.keys).forEach(key => key.isDown = false);

        if (shouldSleep) {
            this.scene.sleep(this.scene.key);
        } else {
            this.scene.pause(this.scene.key);
        }
        this.scene.run(sceneKey, {...data, prevScene: this.scene.key});
    }
}
