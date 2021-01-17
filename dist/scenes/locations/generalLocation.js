define(["require", "exports", "phaser", "../../characters/adventurers/player", "../../entities/item", "../../config/constants", "../../data/messages", "../../triggers/container", "../../triggers/trigger", "../../helpers/logger", "../../triggers/enemyTrigger"], function (require, exports, Phaser, player_1, item_1, constants_1, messages_1, container_1, trigger_1, logger_1, enemyTrigger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GeneralLocation extends Phaser.Scene {
        constructor(sceneSettings) {
            super(sceneSettings);
            this.triggers = [];
            this.spaceBarCooldown = 0;
            this.playerSpeed = constants_1.PLAYER_WORLD_SPEED;
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
                this.startPoint = {
                    x: data.toCoordinates.x * 32,
                    y: data.toCoordinates.y * 32,
                };
            }
        }
        create(mapKey) {
            this.map = this.make.tilemap({ key: mapKey });
            this.offsetX = this.map.widthInPixels < constants_1.GAME_W ? (constants_1.GAME_W - this.map.widthInPixels) / 2 : 0;
            this.offsetY = this.map.heightInPixels < constants_1.GAME_H ? (constants_1.GAME_H - this.map.heightInPixels) / 2 : 0;
            this.player = player_1.playerInstance;
            const startObject = this.getMapObject('Start');
            if (!this.startPoint && startObject) {
                this.startPoint = {
                    x: startObject.x,
                    y: startObject.y,
                };
            }
            if (this.startPoint) {
                this.playerImage = this.physics.add.sprite(this.startPoint.x + this.offsetX, this.startPoint.y + this.offsetY, this.player.worldImageSpriteParams.texture, this.player.worldImageSpriteParams.frame);
                this.playerImage.setOrigin(0, 0).setDepth(1);
                this.playerImage.anims.play('idle_down');
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
                this.showAchievementsIcon();
                if (constants_1.DEBUG)
                    this.showAllItemsIcon();
            }
            const tilesets = [];
            this.map.tilesets.forEach((tileset) => {
                tilesets.push(this.map.addTilesetImage(tileset.name, tileset.name));
            });
            this.layers = [];
            this.map.layers.forEach((layer) => {
                const createdLayer = this.map.createLayer(layer.name, tilesets, this.offsetX, this.offsetY);
                if (layer.alpha !== 1)
                    createdLayer.setAlpha(layer.alpha);
                this.layers.push(createdLayer);
                // lol kek if there is no props then it is an object, otherwise - array.. Phaser bug?
                if (Array.isArray(layer.properties) && layer.properties.find((prop) => prop.name === 'hasCollisions' && prop.value === true)) {
                    createdLayer.setCollisionByProperty({ collides: true });
                    this.setSidesCollisions(createdLayer.layer);
                    this.physics.add.collider(this.playerImage, createdLayer);
                }
                if (Array.isArray(layer.properties) && layer.properties.find((prop) => prop.name === 'fringe')) {
                    createdLayer.setDepth(1);
                }
            });
            this.map.getObjectLayer('Doors/Doors Objects')?.objects.forEach((object) => {
                const spriteParams = this.getSpriteParamsByObjectName(object.name, 'Doors/Doors Objects');
                // Todo: there must be a better way to do that but I am way too tired now to find it...
                const trigger = new trigger_1.default({
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
                        this.layers.find((layer) => layer.layer.name === 'Doors/Doors Fringe')
                            .getTileAtWorldXY(trigger.image.x + 16, trigger.image.y - 16)
                            .setVisible(false);
                        trigger.image.anims.play('open_door');
                        trigger.image.y -= 64;
                        trigger.image.body.setOffset(0, 64);
                    },
                });
            });
            this.map.getObjectLayer('Containers')?.objects.forEach((object) => {
                const spriteParams = this.getSpriteParamsByObjectName(object.name, 'Containers');
                const { texture } = spriteParams;
                const frame = spriteParams.frame;
                const emptyFrame = object.properties?.find((prop) => prop.name === 'openedFrame')?.value;
                const isSecret = object.properties?.find((prop) => prop.name === 'secret')?.value;
                const items = JSON.parse(object.properties?.find((prop) => prop.name === 'items')?.value);
                const disableWhenEmpty = object.properties?.find((prop) => prop.name === 'disableWhenEmpty')?.value;
                const requiresToOpen = object.properties?.find((prop) => prop.name === 'requiresToOpen')?.value;
                const instantPickup = object.properties?.find((prop) => prop.name === 'instantPickup')?.value;
                new container_1.default({
                    scene: this,
                    triggerX: object.x,
                    triggerY: object.y,
                    triggerW: object.width,
                    triggerH: object.height,
                    name: object.name,
                    items: items.map((itemDescription) => new item_1.default(itemDescription.itemId, itemDescription.quantity)),
                    texture,
                    frame,
                    isSecret,
                    emptyTexture: texture,
                    emptyFrame,
                    flipX: object.flippedHorizontal,
                    flipY: object.flippedVertical,
                    disableWhenEmpty,
                    requiresToOpen,
                    instantPickup,
                });
            });
            this.map.getObjectLayer('Enemies')?.objects.forEach((object) => {
                const enemyImage = object.properties?.find((prop) => prop.name === 'image')?.value;
                const enemies = JSON.parse(object.properties.find((prop) => prop.name === 'enemies')?.value);
                const background = object.properties.find((prop) => prop.name === 'background')?.value || 'field-background';
                const drop = JSON.parse(object.properties.find((prop) => prop.name === 'drop')?.value || '[]');
                const xpReward = object.properties?.find((prop) => prop.name === 'xpReward')?.value ?? 0;
                new enemyTrigger_1.default({
                    scene: this,
                    name: object.name,
                    triggerX: object.x,
                    triggerY: object.y,
                    triggerW: object.width,
                    triggerH: object.height,
                    spriteParameters: { texture: enemyImage, frame: null },
                    enemies,
                    drop,
                    xpReward,
                    background,
                });
            });
            this.map.getObjectLayer('Waypoints')
                ?.objects
                .forEach((object) => {
                const toLocation = object.properties?.find((prop) => prop.name === 'location')?.value;
                let toCoordinates = object.properties?.find((prop) => prop.name === 'toCoordinates')?.value;
                if (toCoordinates)
                    toCoordinates = JSON.parse(toCoordinates);
                new trigger_1.default({
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
            this.map.getObjectLayer('Messages')
                ?.objects
                .forEach((object) => {
                const messageId = object.properties?.find((prop) => prop.name === 'messageId')?.value;
                const messageText = messages_1.default[messageId];
                const interaction = object.properties?.find((prop) => prop.name === 'interaction')?.value;
                const singleUse = object.properties?.find((prop) => prop.name === 'singleUse')?.value;
                new trigger_1.default({
                    scene: this,
                    name: object.name,
                    triggerX: object.x,
                    triggerY: object.y,
                    triggerW: object.width,
                    triggerH: object.height,
                    texture: this.getSpriteParamsByObjectName(object.name, 'Messages')?.texture,
                    frame: this.getSpriteParamsByObjectName(object.name, 'Messages')?.frame,
                    interaction,
                    singleUse,
                    callback: () => {
                        this.switchToScene('Dialog', {
                            dialogTree: [{
                                    id: 'message',
                                    text: messageText,
                                    replies: [{
                                            text: '(End)',
                                            callbackParam: 'fastEnd',
                                        }],
                                }],
                            speakerName: object.name,
                        }, false);
                    },
                });
            });
            // @ts-ignore
            this.sys.animatedTiles.init(this.map);
            this.physics.world.setBounds(this.offsetX, this.offsetY, this.map.widthInPixels, this.map.heightInPixels);
            this.levelUpIcon = this.add.sprite(this.playerImage.x, this.playerImage.y, 'icon-item-set', 32)
                .setOrigin(0, 1)
                .setVisible(false);
            this.levelUpIcon.setInteractive({ useHandCursor: true });
            this.levelUpIcon.on('pointerdown', () => this.switchToScene('LevelUpScreen', {}, false));
            this.events.on('resume', (scene, data) => {
                if (data?.defeatedEnemy) {
                    this.player.defeatedEnemies.push(`${mapKey}/${data.defeatedEnemy}`);
                    const trigger = this.triggers.find((trigger) => trigger.name === data.defeatedEnemy);
                    trigger?.destroy();
                    if (trigger && (trigger instanceof enemyTrigger_1.default)) {
                        trigger.drop?.forEach((dropped) => {
                            const shouldDrop = !(Math.random() > dropped.chance);
                            if (shouldDrop) {
                                this.createDroppedItem(dropped.itemId, dropped.quantity);
                            }
                        });
                        if (trigger.xpReward !== 0) {
                            this.player.addXp(trigger.xpReward);
                            this.showTextAbovePlayer(`${trigger.xpReward} XP!`, 2000);
                        }
                    }
                }
                if (data?.droppedItems) {
                    data.droppedItems.forEach((droppedItem) => this.createDroppedItem(droppedItem));
                }
                if (data?.switchToScene) {
                    this.switchToScene(data.switchToScene, data.data);
                }
            });
            this.events.on('wake', (scene, data) => {
                if (data?.toCoordinates) {
                    this.playerImage.setPosition(data.toCoordinates.x * 32 + this.offsetX, data.toCoordinates.y * 32 + this.offsetY);
                }
                if (this.objectsHighlightBorders)
                    this.objectsHighlightBorders.clear(true, true);
                this.playerSpeed = constants_1.PLAYER_WORLD_SPEED;
                this.playerImage.play(`idle_${this.lastCursor}`);
            });
            this.setupAttackKey();
            this.setupRunKey();
        }
        createDroppedItem(item, quantity = 1) {
            if (typeof item === 'string') {
                item = new item_1.default(item, quantity);
            }
            // TODO: name must be unique
            const droppedItemTrigger = new trigger_1.default({
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
                        this.showTextAbovePlayer(`${itemInInventory.displayName} (${quantity})`);
                        droppedItemTrigger.destroy();
                    }
                },
            });
            return droppedItemTrigger;
        }
        getSpriteParamsByObjectName(objectName, objectLayer = 'Objects') {
            const { gid } = this.getMapObject(objectName, objectLayer);
            for (let i = 0; i < this.map.tilesets.length; i += 1) {
                const tileset = this.map.tilesets[i];
                if (gid >= tileset.firstgid && gid < tileset.firstgid + tileset.total) {
                    let animKey;
                    // @ts-ignore
                    if (tileset.tileData[gid - tileset.firstgid]?.animation) {
                        // @ts-ignore
                        console.log('Found animation', tileset.tileData[gid - tileset.firstgid].animation);
                        animKey = this._createAnimationFromTiled(tileset.image.key, gid - tileset.firstgid, 
                        // @ts-ignore
                        tileset.tileData[gid - tileset.firstgid].animation);
                    }
                    return {
                        texture: tileset.name,
                        frame: gid - tileset.firstgid,
                        animation: animKey,
                    };
                }
            }
            return undefined;
        }
        _createAnimationFromTiled(tilesetImageKey, gid, tiledAnimation) {
            const phaserAnimationFrames = tiledAnimation.map((tiledFrame) => ({
                key: tilesetImageKey,
                frame: tiledFrame.tileid,
                duration: tiledFrame.duration,
            }));
            this.anims.create({
                key: tilesetImageKey + gid,
                frames: phaserAnimationFrames,
                repeat: -1,
            });
            return tilesetImageKey + gid;
        }
        setSidesCollisions(layer) {
            for (let ty = 0; ty < layer.height; ty += 1) {
                for (let tx = 0; tx < layer.width; tx += 1) {
                    const tile = layer.data[ty][tx];
                    if (tile?.properties.collideSides) {
                        const directions = JSON.parse(tile.properties.collideSides);
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
        showOpenInventoryIcon(opts, closeCallback) {
            // topMenuBackgroundGraphics
            this.add.graphics()
                .setScrollFactor(0)
                .fillStyle(0xf0d191, 0.8)
                .fillRect(+constants_1.GAME_W - 32 - 32 - 32 - 32 - 32 - 32 - 32 - 32 - 16, 16, 64 * 4, 64)
                .lineStyle(3, 0x907748)
                .strokeRect(+constants_1.GAME_W - 32 - 32 - 32 - 32 - 32 - 32 - 32 - 32 - 16, 16, 64 * 4, 64)
                .setDepth(10 - 1);
            // inventoryGraphics
            this.add.graphics()
                .setScrollFactor(0)
                .fillStyle(0xf0d191, 0.8)
                .fillRect(+constants_1.GAME_W - 32 - 32, 32, 32, 32)
                .lineStyle(3, 0x907748)
                .strokeRect(+constants_1.GAME_W - 32 - 32, 32, 32, 32)
                .setDepth(10 - 1);
            const inventoryIconImage = this.add.image(+constants_1.GAME_W - 32 - 32, 32, 'icons', 'icons/bags/green-bag')
                .setOrigin(0, 0)
                .setScrollFactor(0)
                .setInteractive({ useHandCursor: true })
                .setDepth(10 - 1);
            inventoryIconImage.on('pointerdown', () => {
                this.switchToScene('Inventory', {
                    opts,
                    closeCallback,
                }, false);
            });
            this.input.keyboard.off('keyup-I');
            this.input.keyboard.on('keyup-I', () => {
                this.switchToScene('Inventory', {
                    opts,
                    closeCallback,
                }, false);
            });
        }
        getMapObject(objectName, objectLayer = 'Objects') {
            const object = this.map.findObject(objectLayer, (obj) => obj.name === objectName);
            if (!object)
                console.log(`Object ${objectName} was not found on ${objectLayer} layer!`);
            return object;
        }
        update() {
            this.updatePlayer();
            if (constants_1.DEBUG) {
                const cursorX = Math.round(this.input.mousePointer.x);
                const cursorY = Math.round(this.input.mousePointer.y);
                if (this.cursorCoordinatesText) {
                    this.cursorCoordinatesText.setText(`${cursorX} ${cursorY}`);
                }
                else {
                    this.cursorCoordinatesText = this.add.text(0, 0, `${cursorX} ${cursorY}`, {
                        color: 'black',
                        backgroundColor: '#f0d191',
                    })
                        .setDepth(1000)
                        .setScrollFactor(0)
                        .setOrigin(0, 0);
                }
            }
        }
        setupDebugCollisionGraphics() {
            let debugModeOn = false;
            const debugGraphicsGroup = this.add.group();
            this.layers.forEach((layer) => {
                const debugGraphics = this.add.graphics()
                    .setAlpha(0.25);
                if (Array.isArray(layer.layer.properties)
                    && layer.layer.properties.find((prop) => prop.name === 'hasCollisions' && prop.value === true)) {
                    layer.renderDebug(debugGraphics, {
                        tileColor: null,
                        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
                        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
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
                console.log(this.player);
            });
        }
        switchToScene(sceneKey, data = {}, shouldSleep = true, toCoordinates = null) {
            console.log(...logger_1.default(`Switching from ??${this.scene.key} to ??${sceneKey}. Should ??${this.scene.key} turn off !!(sleep): !!${shouldSleep}`));
            console.log(`Data passed to ${sceneKey}:`, data);
            // TODO: figure out proper way to stop player from sticky controls - caused by scene pausing...
            // further investigation - confirmed in FF, dunno about other browsers. If take away focus from the window and back - no bug.
            // still dont know how to fix properly..
            // this event handler should not be here (it actually should not exist at all) but keeping it here for easier port of the fix..
            // NEW INFO - apparently this does the fix, though mechanisms changed since it was detected so not sure, keeping old solution just in case
            this.input.keyboard.resetKeys();
            // if (this.keys) Object.values(this.keys).forEach(key => key.isDown = false);
            if (sceneKey === this.scene.key) {
                throw new Error(`Trying to switch to scene while already being there: ${sceneKey}`);
            }
            if (shouldSleep) {
                this.scene.sleep(this.scene.key);
            }
            else {
                this.scene.pause(this.scene.key);
            }
            this.scene.run(sceneKey, {
                ...data,
                prevScene: this.scene.key,
                toCoordinates,
            });
        }
        updatePlayer() {
            const up = this.keys.up.isDown || this.keys.W.isDown;
            const down = this.keys.down.isDown || this.keys.S.isDown;
            const right = this.keys.right.isDown || this.keys.D.isDown;
            const left = this.keys.left.isDown || this.keys.A.isDown;
            this.playerImage.setVelocity(0);
            const isAttackAnimPlaying = this.playerImage.anims.isPlaying && this.playerImage.anims.getName()
                .includes('attack');
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
                this.playerImage.body.velocity.normalize()
                    .scale(this.playerSpeed);
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
            if (this.player.readyForLevelUp) {
                if (!this.levelUpIcon.visible)
                    this.levelUpIcon.setVisible(true);
                this.levelUpIcon.setPosition(this.playerImage.x, this.playerImage.y);
            }
            else if (this.levelUpIcon.visible)
                this.levelUpIcon.setVisible(false);
        }
        setupRunKey() {
            this.input.keyboard.off('keyup-Q');
            this.input.keyboard.on('keyup-Q', () => {
                if (this.playerSpeed === constants_1.PLAYER_RUN_WORLD_SPEED) {
                    this.playerSpeed = constants_1.PLAYER_WORLD_SPEED;
                }
                else {
                    this.playerSpeed = constants_1.PLAYER_RUN_WORLD_SPEED;
                }
            });
        }
        showToggleSoundIcon() {
            // soundGraphics
            this.add.graphics()
                .setScrollFactor(0)
                .fillStyle(0xf0d191, 0.8)
                .fillRect(+constants_1.GAME_W - 32 - 32 - 32 - 32, 32, 32, 32)
                .lineStyle(3, 0x907748)
                .strokeRect(+constants_1.GAME_W - 32 - 32 - 32 - 32, 32, 32, 32)
                .setDepth(10 - 1);
            const inventoryIconImage = this.add.image(+constants_1.GAME_W - 32 - 32 - 32 - 32, 32, 'icon-item-set', 179)
                .setOrigin(0, 0)
                .setScrollFactor(0)
                .setInteractive({ useHandCursor: true })
                .setDepth(10 - 1);
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
                const isWalkAnimPlaying = this.playerImage.anims.isPlaying && this.playerImage.anims.getName()
                    .includes('walk');
                const isAttackAnimPlaying = this.playerImage.anims.isPlaying && this.playerImage.anims.getName()
                    .includes('attack');
                if (!isWalkAnimPlaying && !isAttackAnimPlaying) {
                    this.playerImage.anims.play(`attack_${this.lastCursor}`, true);
                }
            });
        }
        showToggleQuestLogIcon() {
            // questLogGraphics
            this.add.graphics()
                .setScrollFactor(0)
                .fillStyle(0xf0d191, 0.8)
                .fillRect(+constants_1.GAME_W - 32 - 32 - 32 - 32 - 32 - 32, 32, 32, 32)
                .lineStyle(3, 0x907748)
                .strokeRect(+constants_1.GAME_W - 32 - 32 - 32 - 32 - 32 - 32, 32, 32, 32)
                .setDepth(10 - 1);
            const questLogIconImage = this.add.image(+constants_1.GAME_W - 32 - 32 - 32 - 32 - 32 - 32, 32, 'icon-item-set', 216)
                .setOrigin(0, 0)
                .setScrollFactor(0)
                .setInteractive({ useHandCursor: true })
                .setDepth(10 - 1);
            questLogIconImage.on('pointerdown', () => {
                this.switchToScene('QuestLog', {}, false);
            });
            this.input.keyboard.off('keyup-J');
            this.input.keyboard.on('keyup-J', () => {
                this.switchToScene('QuestLog', {}, false);
            });
        }
        showAchievementsIcon() {
            // achievementsGraphics
            this.add.graphics()
                .setScrollFactor(0)
                .fillStyle(0xf0d191, 0.8)
                .fillRect(+constants_1.GAME_W - 32 - 32 - 32 - 32 - 32 - 32 - 32 - 32, 32, 32, 32)
                .lineStyle(3, 0x907748)
                .strokeRect(+constants_1.GAME_W - 32 - 32 - 32 - 32 - 32 - 32 - 32 - 32, 32, 32, 32)
                .setDepth(10 - 1);
            const achievementsIconImage = this.add.image(+constants_1.GAME_W - 32 - 32 - 32 - 32 - 32 - 32 - 32 - 32, 32, 'icon-item-set', 199)
                .setOrigin(0, 0)
                .setScrollFactor(0)
                .setInteractive({ useHandCursor: true })
                .setDepth(10 - 1);
            achievementsIconImage.on('pointerdown', () => {
                this.switchToScene('Achievements', {}, false);
            });
            this.input.keyboard.off('keyup-K');
            this.input.keyboard.on('keyup-K', () => {
                this.switchToScene('Achievements', {}, false);
            });
        }
        showAllItemsIcon() {
            // allItemsGraphics
            this.add.graphics()
                .setScrollFactor(0)
                .fillStyle(0xf0d191, 0.8)
                .fillRect(32, 32, 32, 32)
                .lineStyle(3, 0x907748)
                .strokeRect(32, 32, 32, 32)
                .setDepth(10 - 1);
            const allItemsIconImage = this.add.image(32, 32, 'icon-item-set', 270)
                .setOrigin(0, 0)
                .setScrollFactor(0)
                .setInteractive({ useHandCursor: true })
                .setDepth(10 - 1);
            allItemsIconImage.on('pointerdown', () => {
                this.switchToScene('AllItems', {}, false);
            });
        }
        showTextAbovePlayer(text, duration = 1000) {
            const textObj = this.add.text(this.playerImage.x + 16, this.playerImage.y, text, {
                color: 'black',
                fontStyle: 'bold',
            })
                .setDepth(10)
                .setOrigin(0.5, 0.5);
            let delay = 0;
            if (this.abovePlayerTextTween) {
                delay = 500;
            }
            this.abovePlayerTextTween = this.add.tween({
                targets: textObj,
                y: {
                    from: this.playerImage.y,
                    to: this.playerImage.y - 50,
                },
                ease: 'Linear',
                delay,
                duration,
                repeat: 0,
                yoyo: false,
                onComplete: () => {
                    textObj.destroy();
                    this.abovePlayerTextTween = undefined;
                },
            });
        }
    }
    exports.default = GeneralLocation;
});
//# sourceMappingURL=generalLocation.js.map