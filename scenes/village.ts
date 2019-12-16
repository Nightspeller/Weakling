import Player from "../entities/player.js";

export class VillageScene extends Phaser.Scene {
    private player: Player;

    constructor() {
        super({key: 'Village'});
    }

    public preload() { }

    public create() {
        const map = this.make.tilemap({key: 'village'});
        const tileSet1 = map.addTilesetImage('main', 'base');
        const tileSet2 = map.addTilesetImage('flowers', 'flowers');
        const tileSet3 = map.addTilesetImage('dirt1', 'dirt1');
        const tileSet4 = map.addTilesetImage('dirt2', 'dirt2');
        const tileSet5 = map.addTilesetImage('dirt4', 'dirt4');
        const tileSet6 = map.addTilesetImage('grass4', 'grass4');
        const tileSet7 = map.addTilesetImage('grass1-dirt1', 'grass1-dirt1');
        const tileSet8 = map.addTilesetImage('grass1-dirt2', 'grass1-dirt2');
        const tileSet9 = map.addTilesetImage('grass1-dirt4', 'grass1-dirt4');


        const layer1 = map.createStaticLayer('Tile Layer 1', [tileSet1, tileSet2, tileSet3, tileSet4, tileSet5, tileSet6, tileSet7, tileSet8, tileSet9], 0, 0);
        const layer2 = map.createStaticLayer('Tile Layer 2', [tileSet1, tileSet2, tileSet3, tileSet4, tileSet5, tileSet6, tileSet7, tileSet8, tileSet9], 0, 0);
        const layer3 = map.createStaticLayer('Tile Layer 3', [tileSet1, tileSet2, tileSet3, tileSet4, tileSet5, tileSet6, tileSet7, tileSet8, tileSet9], 0, 0);
        const layer4 = map.createStaticLayer('Tile Layer 4', [tileSet1, tileSet2, tileSet3, tileSet4, tileSet5, tileSet6, tileSet7, tileSet8, tileSet9], 0, 0);
        //layer2.setCollisionByProperty({collides: true});

        const spawnPoint = map.findObject("Objects", obj => obj.name === "Start");
        this.player = new Player(this, spawnPoint['x'], spawnPoint['y']);
        this.physics.add.collider(this.player.worldImage, layer2);

        const worldMapObject = map.findObject("Objects", obj => obj.name === "WorldMap");
        const worldMapPortal = this.physics.add
            .image(worldMapObject['x'], worldMapObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(worldMapObject['width'], worldMapObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.player.worldImage, worldMapPortal, () => this.scene.start("WorldMap"));

        const camera = this.cameras.main;
        camera.startFollow(this.player.worldImage);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setDeadzone(200, 100);

        /*const houseDoorObject = map.findObject("Objects", obj => obj.name === "House Door");
        const houseDoor = this.physics.add
            .image(houseDoorObject['x'], houseDoorObject['y'], null).setOrigin(0,0)
            .setDisplaySize(houseDoorObject['width'],houseDoorObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.player.sprite, houseDoor, () => console.log('collided with the door') );*/

        const debugGraphics = this.add.graphics().setAlpha(0.25);
        layer2.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    }

    public update() {
        this.player.update();
    }
}