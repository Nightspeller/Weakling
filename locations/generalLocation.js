import { playerInstance } from "../characters/adventurers/player.js";
import Item from "../entities/item.js";
import { DEBUG, GAME_H, GAME_W, PLAYER_RUN_WORLD_SPEED, PLAYER_WORLD_SPEED } from "../config/constants.js";
import { messages } from "../data/messages.js";
import Container from "../entities/container.js";
import { Trigger } from "../entities/trigger.js";
import prepareLog from "../helpers/logger.js";
export class GeneralLocation extends Phaser.Scene {
    constructor(sceneSettings) {
        super(sceneSettings);
        this.triggers = [];
        this.spaceBarCooldown = 0;
        this.playerSpeed = PLAYER_WORLD_SPEED;
        this.lastCursor = 'down';
        this.somethingTriggered = false;
    }
    preload() {
        this.load.scenePlugin({
            key: 'AnimatedTiles',
            url: './plugins/AnimatedTiles.js',
            systemKey: 'animatedTiles',
        });
    }
    init(data) {
        if (data.toCoordinates && data.toCoordinates.x !== -1) {
            this.startPoint = { x: data.toCoordinates.x * 32, y: data.toCoordinates.y * 32 };
        }
    }
    create(mapKey) {
        var _a, _b, _c, _d, _e;
        this.map = this.make.tilemap({ key: mapKey });
        this.offsetX = this.map.widthInPixels < GAME_W ? (GAME_W - this.map.widthInPixels) / 2 : 0;
        this.offsetY = this.map.heightInPixels < GAME_H ? (GAME_H - this.map.heightInPixels) / 2 : 0;
        this.player = playerInstance;
        if (!this.startPoint && this.getMapObject("Start")) {
            const startObject = this.getMapObject("Start");
            this.startPoint = { x: startObject['x'], y: startObject['y'] };
        }
        if (this.startPoint) {
            this.playerImage = this.physics.add.sprite(this.startPoint['x'] + this.offsetX, this.startPoint['y'] + this.offsetY, this.player.worldImageSpriteParams.texture, this.player.worldImageSpriteParams.frame);
            this.playerImage.setOrigin(0, 0).setDepth(1);
            this.playerImage.anims.play("idle_down");
            this.playerImage.setCollideWorldBounds(true);
            this.playerImage.body.setSize(16, 16).setOffset(8, 16);
            this.keys = this.input.keyboard.addKeys('W,S,A,D,left,right,up,down,space');
            const camera = this.cameras.main;
            camera.startFollow(this.playerImage);
            camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
            camera.setDeadzone(200, 100);
            this.showOpenInventoryIcon();
            this.showToggleSoundIcon();
            this.showToggleQuestLogIcon();
        }
        const tilesets = [];
        this.map.tilesets.forEach(tileset => {
            tilesets.push(this.map.addTilesetImage(tileset.name, tileset.name));
        });
        this.layers = [];
        this.map.layers.forEach(layer => {
            let createdLayer;
            if (Array.isArray(layer.properties) && layer.properties.find((prop) => (prop === null || prop === void 0 ? void 0 : prop.name) === 'dynamic' && prop.value === true)) {
                createdLayer = this.map.createDynamicLayer(layer.name, tilesets, this.offsetX, this.offsetY);
            }
            else {
                createdLayer = this.map.createStaticLayer(layer.name, tilesets, this.offsetX, this.offsetY);
            }
            if (layer.alpha !== 1)
                createdLayer.setAlpha(layer.alpha);
            this.layers.push(createdLayer);
            // lol kek if there is no props then it is an object, otherwise - array.. Phaser bug?
            if (Array.isArray(layer.properties) && layer.properties.find((prop) => prop.name === 'hasCollisions')) {
                createdLayer.setCollisionByProperty({ collides: true });
                this.setSidesCollisions(createdLayer.layer);
                this.physics.add.collider(this.playerImage, createdLayer);
            }
            if (Array.isArray(layer.properties) && layer.properties.find((prop) => prop.name === 'fringe')) {
                createdLayer.setDepth(1);
            }
        });
        (_a = this.map.getObjectLayer('Doors/Doors Objects')) === null || _a === void 0 ? void 0 : _a.objects.forEach(object => {
            const spriteParams = this.getSpriteParamsByObjectName(object.name, 'Doors/Doors Objects');
            // Todo: there must be a better way to do that but I am way too tired not to find it...
            const trigger = new Trigger({
                scene: this,
                name: object.name,
                triggerX: object.x,
                triggerY: object.y,
                triggerW: object.width,
                triggerH: object.height,
                texture: spriteParams.texture,
                frame: spriteParams.frame,
                interaction: 'activate',
                callback: () => {
                    trigger.setDisableState(true);
                    trigger.image.disableBody();
                    this.layers.find(layer => layer.layer.name === 'Doors/Doors Fringe').getTileAtWorldXY(trigger.image.x + 16, trigger.image.y - 16).setVisible(false);
                    trigger.image.anims.play('open_door');
                    trigger.image.y -= 64;
                    trigger.image.body.setOffset(0, 64);
                },
            });
        });
        (_b = this.map.getObjectLayer('Containers')) === null || _b === void 0 ? void 0 : _b.objects.forEach(object => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const spriteParams = this.getSpriteParamsByObjectName(object.name, 'Containers');
            const texture = spriteParams.texture;
            const frame = spriteParams.frame;
            const emptyFrame = (_b = (_a = object.properties) === null || _a === void 0 ? void 0 : _a.find(prop => prop.name === 'openedFrame')) === null || _b === void 0 ? void 0 : _b.value;
            const isSecret = (_d = (_c = object.properties) === null || _c === void 0 ? void 0 : _c.find(prop => prop.name === 'secret')) === null || _d === void 0 ? void 0 : _d.value;
            const items = JSON.parse((_f = (_e = object.properties) === null || _e === void 0 ? void 0 : _e.find(prop => prop.name === 'items')) === null || _f === void 0 ? void 0 : _f.value);
            const disableWhenEmpty = (_h = (_g = object.properties) === null || _g === void 0 ? void 0 : _g.find(prop => prop.name === 'disableWhenEmpty')) === null || _h === void 0 ? void 0 : _h.value;
            const requiresToOpen = (_k = (_j = object.properties) === null || _j === void 0 ? void 0 : _j.find(prop => prop.name === 'requiresToOpen')) === null || _k === void 0 ? void 0 : _k.value;
            new Container({
                scene: this,
                triggerX: object.x,
                triggerY: object.y,
                triggerW: object.width,
                triggerH: object.height,
                name: object.name,
                items: items.map(itemDescription => new Item(itemDescription.itemId, itemDescription.quantity)),
                texture: texture,
                frame: frame,
                isSecret: isSecret,
                emptyTexture: texture,
                emptyFrame: emptyFrame,
                flipX: object.flippedHorizontal,
                flipY: object.flippedVertical,
                disableWhenEmpty: disableWhenEmpty,
                requiresToOpen: requiresToOpen
            });
        });
        (_c = this.map.getObjectLayer('Enemies')) === null || _c === void 0 ? void 0 : _c.objects.forEach(object => {
            var _a, _b, _c;
            const enemyImage = (_b = (_a = object.properties) === null || _a === void 0 ? void 0 : _a.find(prop => prop.name === 'image')) === null || _b === void 0 ? void 0 : _b.value;
            const enemies = JSON.parse((_c = object.properties.find(prop => prop.name === 'enemies')) === null || _c === void 0 ? void 0 : _c.value);
            new Trigger({
                scene: this,
                name: object.name,
                triggerX: object.x,
                triggerY: object.y,
                triggerW: object.width,
                triggerH: object.height,
                texture: enemyImage,
                frame: null,
                interaction: 'activate',
                callback: () => {
                    this.switchToScene('Battle', { enemies: enemies, enemyName: object.name });
                },
            });
        });
        (_d = this.map.getObjectLayer('Waypoints')) === null || _d === void 0 ? void 0 : _d.objects.forEach(object => {
            var _a, _b, _c, _d;
            const toLocation = (_b = (_a = object.properties) === null || _a === void 0 ? void 0 : _a.find(prop => prop.name === 'location')) === null || _b === void 0 ? void 0 : _b.value;
            let toCoordinates = (_d = (_c = object.properties) === null || _c === void 0 ? void 0 : _c.find(prop => prop.name === 'toCoordinates')) === null || _d === void 0 ? void 0 : _d.value;
            if (toCoordinates)
                toCoordinates = JSON.parse(toCoordinates);
            new Trigger({
                scene: this,
                name: object.name,
                triggerX: object.x,
                triggerY: object.y,
                triggerW: object.width,
                triggerH: object.height,
                interaction: 'activateOverlap',
                callback: () => {
                    if (toLocation) {
                        this.switchToScene(toLocation, undefined, undefined, toCoordinates);
                    }
                    else if (toCoordinates) {
                        this.playerImage.setPosition(toCoordinates.x * 32 + this.offsetX, toCoordinates.y * 32 + this.offsetY);
                    }
                },
            });
        });
        (_e = this.map.getObjectLayer('Messages')) === null || _e === void 0 ? void 0 : _e.objects.forEach(object => {
            var _a, _b, _c, _d, _e, _f;
            const messageId = (_b = (_a = object.properties) === null || _a === void 0 ? void 0 : _a.find(prop => prop.name === 'messageId')) === null || _b === void 0 ? void 0 : _b.value;
            const messageText = messages[messageId];
            const interaction = (_d = (_c = object.properties) === null || _c === void 0 ? void 0 : _c.find(prop => prop.name === 'interaction')) === null || _d === void 0 ? void 0 : _d.value;
            const singleUse = (_f = (_e = object.properties) === null || _e === void 0 ? void 0 : _e.find(prop => prop.name === 'singleUse')) === null || _f === void 0 ? void 0 : _f.value;
            new Trigger({
                scene: this,
                name: object.name,
                triggerX: object.x,
                triggerY: object.y,
                triggerW: object.width,
                triggerH: object.height,
                interaction: interaction,
                singleUse: singleUse,
                callback: () => {
                    this.switchToScene('Dialog', {
                        dialogTree: [{
                                id: 'message',
                                text: messageText,
                                replies: [{
                                        text: '(End)',
                                        callbackParam: 'fastEnd'
                                    }]
                            }],
                        speakerName: object.name,
                    }, false);
                },
            });
        });
        this.sys['animatedTiles'].init(this.map);
        this.physics.world.setBounds(this.offsetX, this.offsetY, this.map.widthInPixels, this.map.heightInPixels);
        this.events.on('resume', (scene, data) => {
            if (data === null || data === void 0 ? void 0 : data.droppedItems) {
                data.droppedItems.forEach(droppedItem => this.createDroppedItem(droppedItem));
            }
            if (data === null || data === void 0 ? void 0 : data.switchToScene) {
                this.switchToScene(data.switchToScene, data.data);
            }
        });
        this.events.on('wake', (scene, data) => {
            if (data === null || data === void 0 ? void 0 : data.defeatedEnemy) {
                this.triggers.find(trigger => trigger.name === data.defeatedEnemy).image.destroy(true);
            }
            if (data === null || data === void 0 ? void 0 : data.toCoordinates) {
                this.playerImage.setPosition(data.toCoordinates.x * 32 + this.offsetX, data.toCoordinates.y * 32 + this.offsetY);
            }
            if (this.objectsHighlightBorders)
                this.objectsHighlightBorders.clear(true, true);
            this.playerSpeed = PLAYER_WORLD_SPEED;
            this.playerImage.play(`idle_${this.lastCursor}`);
        });
        this.setupAttackKey();
        this.setupRunKey();
        if (mapKey !== 'battle')
            this.setupDebugCollisionGraphics();
    }
    createDroppedItem(item, quantity = 1) {
        if (typeof item === "string") {
            item = new Item(item, quantity);
        }
        // TODO: name must be unique
        const droppedItemTrigger = new Trigger({
            scene: this,
            name: item.displayName,
            triggerX: this.playerImage.x,
            triggerY: this.playerImage.y,
            triggerW: 32,
            triggerH: 32,
            offsetX: 0,
            offsetY: 0,
            texture: item.sprite.texture,
            frame: item.sprite.frame,
            interaction: 'activate',
            singleUse: false,
            callback: () => {
                const itemInInventory = this.player.addItemToInventory(item);
                if (itemInInventory !== undefined) {
                    droppedItemTrigger.destroy();
                }
            },
        });
        return droppedItemTrigger;
    }
    getSpriteParamsByObjectName(objectName, objectLayer = 'Objects') {
        var _a;
        const gid = this.getMapObject(objectName, objectLayer)['gid'];
        for (let i = 0; i < this.map.tilesets.length; i++) {
            const tileset = this.map.tilesets[i];
            if (gid >= tileset.firstgid && gid < tileset.firstgid + tileset.total) {
                let animKey;
                if ((_a = tileset.tileData[gid - tileset.firstgid]) === null || _a === void 0 ? void 0 : _a.animation) {
                    console.log('Found animation', tileset.tileData[gid - tileset.firstgid].animation);
                    animKey = this._createAnimationFromTiled(tileset.image.key, gid - tileset.firstgid, tileset.tileData[gid - tileset.firstgid].animation);
                }
                return { texture: tileset.name, frame: gid - tileset.firstgid, animation: animKey };
            }
        }
    }
    _createAnimationFromTiled(tilesetImageKey, gid, tiledAnimation) {
        const phaserAnimationFrames = tiledAnimation.map(tiledFrame => {
            return {
                key: tilesetImageKey,
                frame: tiledFrame.tileid,
                duration: tiledFrame.duration,
            };
        });
        this.anims.create({
            key: tilesetImageKey + gid,
            frames: phaserAnimationFrames,
            repeat: -1
        });
        return tilesetImageKey + gid;
    }
    setSidesCollisions(layer) {
        for (let ty = 0; ty < layer.height; ty++) {
            for (let tx = 0; tx < layer.width; tx++) {
                const tile = layer.data[ty][tx];
                if (!tile)
                    continue;
                if (tile.properties['collideSides']) {
                    const directions = JSON.parse(tile.properties['collideSides']);
                    if ((tx !== 0) && directions.includes('left') && !layer.data[ty][tx - 1].collideRight) {
                        tile.setCollision(true, tile.collideRight, tile.collideUp, tile.collideDown, false);
                        layer.data[ty][tx - 1].setCollision(layer.data[ty][tx - 1].collideLeft, true, layer.data[ty][tx - 1].collideUp, layer.data[ty][tx - 1].collideDown, false);
                    }
                    if ((tx !== layer.width - 1) && directions.includes('right') && !layer.data[ty][tx + 1].collideLeft) {
                        tile.setCollision(tile.collideLeft, true, tile.collideUp, tile.collideDown, false);
                        layer.data[ty][tx + 1].setCollision(true, layer.data[ty][tx + 1].collideRight, layer.data[ty][tx + 1].collideUp, layer.data[ty][tx + 1].collideDown, false);
                    }
                    if ((ty !== 0) && directions.includes('up') && !layer.data[ty - 1][tx].collideDown) {
                        tile.setCollision(tile.collideLeft, tile.collideRight, true, tile.collideDown, false);
                        layer.data[ty - 1][tx].setCollision(layer.data[ty - 1][tx].collideLeft, layer.data[ty - 1][tx].collideRight, layer.data[ty - 1][tx].collideUp, true, false);
                    }
                    if ((ty !== layer.height - 1) && directions.includes('down') && !layer.data[ty + 1][tx].collideUp) {
                        tile.setCollision(tile.collideLeft, tile.collideRight, tile.collideUp, true, false);
                        layer.data[ty + 1][tx].setCollision(layer.data[ty + 1][tx].collideLeft, layer.data[ty + 1][tx].collideRight, true, layer.data[ty + 1][tx].collideDown, false);
                    }
                }
            }
        }
    }
    ;
    showOpenInventoryIcon(opts, closeCallback) {
        const topMenuBackgroundGraphics = this.add.graphics().setScrollFactor(0)
            .fillStyle(0xf0d191, 0.8)
            .fillRect(+GAME_W - 32 - 32 - 32 - 32 - 32 - 32 - 16, 16, 64 * 3, 64)
            .lineStyle(3, 0x907748)
            .strokeRect(+GAME_W - 32 - 32 - 32 - 32 - 32 - 32 - 16, 16, 64 * 3, 64)
            .setDepth(10 - 1);
        const inventoryGraphics = this.add.graphics().setScrollFactor(0)
            .fillStyle(0xf0d191, 0.8)
            .fillRect(+GAME_W - 32 - 32, 32, 32, 32)
            .lineStyle(3, 0x907748)
            .strokeRect(+GAME_W - 32 - 32, 32, 32, 32)
            .setDepth(10 - 1);
        const inventoryIconImage = this.add.image(+GAME_W - 32 - 32, 32, 'bag-green')
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(10 - 1);
        inventoryIconImage.on('pointerdown', () => {
            this.switchToScene('Inventory', { opts, closeCallback }, false);
        });
        this.input.keyboard.off('keyup-I');
        this.input.keyboard.on('keyup-I', () => {
            this.switchToScene('Inventory', { opts, closeCallback }, false);
        });
    }
    getMapObject(objectName, objectLayer = 'Objects') {
        const object = this.map.findObject(objectLayer, obj => obj.name === objectName);
        if (!object)
            console.log(`Object ${objectName} was not found on ${objectLayer} layer!`);
        return object;
    }
    update() {
        this.updatePlayer();
        if (DEBUG) {
            const cursorX = Math.round(this.input.mousePointer.x);
            const cursorY = Math.round(this.input.mousePointer.y);
            if (this.cursorCoordinatesText) {
                this.cursorCoordinatesText.setText(`${cursorX} ${cursorY}`);
            }
            else {
                this.cursorCoordinatesText = this.add.text(0, 0, `${cursorX} ${cursorY}`, {
                    color: 'black',
                    background: 'yellow'
                })
                    .setDepth(1000).setScrollFactor(0).setOrigin(0, 0);
            }
        }
    }
    setupDebugCollisionGraphics() {
        let debugModeOn = false;
        const debugGraphicsGroup = this.add.group();
        this.layers.forEach(layer => {
            const debugGraphics = this.add.graphics().setAlpha(0.25);
            if (Array.isArray(layer.layer.properties) && layer.layer.properties.find((prop) => prop.name === 'hasCollisions')) {
                layer.renderDebug(debugGraphics, {
                    tileColor: null,
                    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
                    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
                });
            }
            debugGraphicsGroup.add(debugGraphics);
        });
        debugGraphicsGroup.setVisible(debugModeOn);
        this.input.keyboard.off('keyup-F1');
        this.input.keyboard.on('keyup-F1', () => {
            debugModeOn = !debugModeOn;
            debugGraphicsGroup.setVisible(debugModeOn);
        });
        this.input.keyboard.off('keyup-F2');
        this.input.keyboard.on('keyup-F2', () => {
            console.log(this);
        });
    }
    switchToScene(sceneKey, data = {}, shouldSleep = true, toCoordinates = null) {
        console.log(...prepareLog(`Switching from ??${this.scene.key} to ??${sceneKey}. Should ??${this.scene.key} turn off !!(sleep): !!${shouldSleep}`));
        console.log(`Data passed to ${sceneKey}:`, data);
        // TODO: figure out proper way to stop player from sticky controls - caused by scene pausing...
        // further investigation - confirmed in FF, dunno about other browsers. If take away focus from the window and back - no bug.
        // still dont know how to fix properly..
        // this event handler should not be here (it actually should not exist at all) but keeping it here for easier port of the fix..
        // NEW INFO - apparently this does the fix, though mechanisms changed since it was detected so not sure, keeping old solution just in case
        this.input.keyboard.resetKeys();
        //if (this.keys) Object.values(this.keys).forEach(key => key.isDown = false);
        if (sceneKey === this.scene.key) {
            throw new Error(`Trying to switch to scene while already being there: ${sceneKey}`);
        }
        if (shouldSleep) {
            this.scene.sleep(this.scene.key);
        }
        else {
            this.scene.pause(this.scene.key);
        }
        this.scene.run(sceneKey, { ...data, prevScene: this.scene.key, toCoordinates: toCoordinates });
    }
    updatePlayer() {
        const up = this.keys.up.isDown || this.keys['W'].isDown;
        const down = this.keys.down.isDown || this.keys['S'].isDown;
        const right = this.keys.right.isDown || this.keys['D'].isDown;
        const left = this.keys.left.isDown || this.keys['A'].isDown;
        this.playerImage.setVelocity(0);
        const isAttackAnimPlaying = this.playerImage.anims.isPlaying && this.playerImage.anims.getCurrentKey().includes('attack');
        if (!isAttackAnimPlaying) {
            if (this.lastCursor && !up && !down && !right && !left) {
                this.playerImage.play(`idle_${this.lastCursor}`, true);
            }
            if (up) {
                this.playerImage.setVelocityY(-this.playerSpeed);
            }
            else if (down) {
                this.playerImage.setVelocityY(this.playerSpeed);
            }
            if (right) {
                this.playerImage.setVelocityX(this.playerSpeed);
            }
            else if (left) {
                this.playerImage.setVelocityX(-this.playerSpeed);
            }
            this.playerImage.body.velocity.normalize().scale(this.playerSpeed);
            if (up || (up && right) || (up && left)) {
                this.playerImage.play('walk_up', true);
                this.lastCursor = 'up';
            }
            else if (down || (down && right) || (down && left)) {
                this.playerImage.play('walk_down', true);
                this.lastCursor = 'down';
            }
            if (right && !up && !down) {
                this.playerImage.play('walk_right', true);
                this.lastCursor = 'right';
            }
            else if (left && !up && !down) {
                this.playerImage.play('walk_left', true);
                this.lastCursor = 'left';
            }
        }
    }
    setupRunKey() {
        this.input.keyboard.off('keyup-Q');
        this.input.keyboard.on('keyup-Q', () => {
            if (this.playerSpeed === PLAYER_RUN_WORLD_SPEED) {
                this.playerSpeed = PLAYER_WORLD_SPEED;
            }
            else {
                this.playerSpeed = PLAYER_RUN_WORLD_SPEED;
            }
        });
    }
    showToggleSoundIcon() {
        const soundGraphics = this.add.graphics().setScrollFactor(0)
            .fillStyle(0xf0d191, 0.8)
            .fillRect(+GAME_W - 32 - 32 - 32 - 32, 32, 32, 32)
            .lineStyle(3, 0x907748)
            .strokeRect(+GAME_W - 32 - 32 - 32 - 32, 32, 32, 32)
            .setDepth(10 - 1);
        const inventoryIconImage = this.add.image(+GAME_W - 32 - 32 - 32 - 32, 32, 'icon-item-set', 179)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(10 - 1);
        inventoryIconImage.on('pointerdown', () => {
            this.switchToScene('Options', {}, false);
        });
        this.input.keyboard.off('keyup-O');
        this.input.keyboard.on('keyup-O', () => {
            this.switchToScene('Options', {}, false);
        });
        this.input.keyboard.off('keyup-ESC');
        this.input.keyboard.on('keyup-ESC', () => {
            this.switchToScene('Options', {}, false);
        });
    }
    setupAttackKey() {
        this.input.keyboard.off('keydown-E');
        this.input.keyboard.on('keydown-E', () => {
            const isWalkAnimPlaying = this.playerImage.anims.isPlaying && this.playerImage.anims.getCurrentKey().includes('walk');
            const isAttackAnimPlaying = this.playerImage.anims.isPlaying && this.playerImage.anims.getCurrentKey().includes('attack');
            if (!isWalkAnimPlaying && !isAttackAnimPlaying) {
                this.playerImage.anims.play(`attack_${this.lastCursor}`, true);
            }
        });
    }
    showToggleQuestLogIcon() {
        const questLogGraphics = this.add.graphics().setScrollFactor(0)
            .fillStyle(0xf0d191, 0.8)
            .fillRect(+GAME_W - 32 - 32 - 32 - 32 - 32 - 32, 32, 32, 32)
            .lineStyle(3, 0x907748)
            .strokeRect(+GAME_W - 32 - 32 - 32 - 32 - 32 - 32, 32, 32, 32)
            .setDepth(10 - 1);
        const questLogIconImage = this.add.image(+GAME_W - 32 - 32 - 32 - 32 - 32 - 32, 32, 'icon-item-set', 216)
            .setOrigin(0, 0).setScrollFactor(0).setInteractive({ useHandCursor: true }).setDepth(10 - 1);
        questLogIconImage.on('pointerdown', () => {
            this.switchToScene('QuestLog', {}, false);
        });
        this.input.keyboard.off('keyup-J');
        this.input.keyboard.on('keyup-J', () => {
            this.switchToScene('QuestLog', {}, false);
        });
    }
}
//# sourceMappingURL=generalLocation.js.map