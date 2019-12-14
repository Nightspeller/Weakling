import Player from "../entities/player.js";
export class VillageScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Village' });
    }
    preload() { }
    create() {
        const map = this.make.tilemap({ key: 'village' });
        const tileSet1 = map.addTilesetImage('main', 'base');
        const tileSet2 = map.addTilesetImage('grass1-dirt4', 'grass1-dirt4');
        const tileSet3 = map.addTilesetImage('flowers', 'flowers');
        const layer1 = map.createStaticLayer('Tile Layer 1', [tileSet1, tileSet2, tileSet3], 0, 0);
        const layer2 = map.createStaticLayer('Tile Layer 2', [tileSet1, tileSet2, tileSet3], 0, 0);
        const layer3 = map.createStaticLayer('Tile Layer 3', [tileSet1, tileSet2, tileSet3], 0, 0);
        //layer2.setCollisionByProperty({collides: true});
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Start");
        this.player = new Player(this, spawnPoint['x'], spawnPoint['y']);
        this.physics.add.collider(this.player.worldImage, layer2);
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
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    }
    update() {
        this.player.update();
    }
}
//# sourceMappingURL=village.js.map