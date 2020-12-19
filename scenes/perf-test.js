import { playerInstance } from "../characters/adventurers/player.js";
export class TestPreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TestPreload' });
    }
    preload() {
        this.player = playerInstance;
        this.playerSpeed = 500;
        const tilesetConfig = {
            frameWidth: 32,
            frameHeight: 32,
            margin: 1,
            spacing: 2
        };
        // Tilesets
        this.load.spritesheet('base', 'assets/images-extruded/tilesets/base.png', tilesetConfig);
        this.load.spritesheet('base-addition', 'assets/images-extruded/tilesets/base-addition.png', tilesetConfig);
        this.load.spritesheet('houses', 'assets/images-extruded/tilesets/houses.png', tilesetConfig);
        this.load.spritesheet('dirt1-dirt2', 'assets/images-extruded/tilesets/dirt1-dirt2.png', tilesetConfig);
        this.load.spritesheet('grass1', 'assets/images-extruded/tilesets/grass1.png', tilesetConfig);
        this.load.spritesheet('grass2', 'assets/images-extruded/tilesets/grass2.png', tilesetConfig);
        this.load.spritesheet('grass3', 'assets/images-extruded/tilesets/grass3.png', tilesetConfig);
        this.load.spritesheet('grass4', 'assets/images-extruded/tilesets/grass4.png', tilesetConfig);
        this.load.spritesheet('long-grass', 'assets/images-extruded/tilesets/long-grass.png', tilesetConfig);
        this.load.spritesheet('dirt1', 'assets/images-extruded/tilesets/dirt1.png', tilesetConfig);
        this.load.spritesheet('dirt2', 'assets/images-extruded/tilesets/dirt2.png', tilesetConfig);
        this.load.spritesheet('dirt4', 'assets/images-extruded/tilesets/dirt4.png', tilesetConfig);
        this.load.spritesheet('water2', 'assets/images-extruded/tilesets/water2.png', tilesetConfig);
        this.load.spritesheet('grass1-dirt1', 'assets/images-extruded/tilesets/grass1-dirt1.png', tilesetConfig);
        this.load.spritesheet('grass1-dirt2', 'assets/images-extruded/tilesets/grass1-dirt2.png', tilesetConfig);
        this.load.spritesheet('grass1-dirt4', 'assets/images-extruded/tilesets/grass1-dirt4.png', tilesetConfig);
        this.load.spritesheet('wall-up', 'assets/images-extruded/tilesets/wall-up.png', tilesetConfig);
        this.load.spritesheet('flowers', 'assets/images-extruded/tilesets/flowers.png', tilesetConfig);
        this.load.spritesheet('castle', 'assets/images-extruded/tilesets/castle.png', tilesetConfig);
        this.load.spritesheet('grassland', 'assets/images-extruded/tilesets/grassland.png', tilesetConfig);
        this.load.spritesheet('caves', 'assets/images-extruded/tilesets/caves.png', tilesetConfig);
        this.load.spritesheet('caves-grassland-entrance', 'assets/images-extruded/tilesets/caves-grassland-entrance.png', tilesetConfig);
        this.load.spritesheet('caves-decoration-animated-b', 'assets/images-extruded/tilesets/caves-decoration-animated-b.png', tilesetConfig);
        // World characters images
        this.load.spritesheet("martha-pink", "assets/images-extruded/characters/world-map/party/martha-pink.png", tilesetConfig);
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('caltor', 'assets/exported-maps/caltor.json');
        this.load.tilemapTiledJSON('dungeonLevel1', 'assets/exported-maps/dungeonLevel1.json');
    }
    create() {
        this.playerImage = this.physics.add.sprite(500, 500, 'martha-pink', 0);
        this.playerImage.setOrigin(0, 0).setDepth(1);
        this.playerImage.anims.play("idle_down");
        //this.playerImage.setCollideWorldBounds(true);
        this.playerImage.body.setSize(16, 16).setOffset(8, 16);
        const map = this.make.tilemap({ key: 'caltor' });
        const tilesets = [];
        map.tilesets.forEach(tileset => {
            tilesets.push(map.addTilesetImage(tileset.name, tileset.name));
        });
        const layers = [];
        map.layers.forEach(layer => {
            const createdLayer = map.createLayer(layer.name, tilesets);
            if (layer.alpha !== 1)
                createdLayer.setAlpha(layer.alpha);
            layers.push(createdLayer);
            // lol kek if there is no props then it is an object, otherwise - array.. Phaser bug?
            if (Array.isArray(layer.properties) && layer.properties.find((prop) => prop.name === 'hasCollisions' && prop.value === true)) {
                createdLayer.setCollisionByProperty({ collides: true });
                // this.setSidesCollisions(createdLayer.layer);
                // this.physics.add.collider(this.playerImage, createdLayer);
            }
            if (Array.isArray(layer.properties) && layer.properties.find((prop) => prop.name === 'fringe')) {
                createdLayer.setDepth(1);
            }
        });
        this.keys = this.input.keyboard.addKeys('W,S,A,D,left,right,up,down,space');
        const camera = this.cameras.main;
        camera.startFollow(this.playerImage);
        //camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setDeadzone(200, 100);
    }
    update(time, delta) {
        const up = this.keys.up.isDown || this.keys['W'].isDown;
        const down = this.keys.down.isDown || this.keys['S'].isDown;
        const right = this.keys.right.isDown || this.keys['D'].isDown;
        const left = this.keys.left.isDown || this.keys['A'].isDown;
        this.playerImage.setVelocity(0);
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
    }
}
//# sourceMappingURL=perf-test.js.map