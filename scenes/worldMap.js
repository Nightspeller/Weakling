import Player from "../entities/player.js";
export class WorldMapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WorldMap' });
    }
    preload() { }
    create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileSet1 = map.addTilesetImage('[Base]BaseChip_pipo', 'base');
        const tileSet2 = map.addTilesetImage('[A]Grass1_pipo', 'grass1');
        const tileSet3 = map.addTilesetImage('[A]Dirt1-Dirt2_pipo', 'dirt1-dirt2');
        const tileSet4 = map.addTilesetImage('[A]Grass1-Dirt2_pipo', 'grass1-dirt2');
        const baseLayer = map.createStaticLayer('Base Layer', [tileSet1, tileSet2, tileSet3, tileSet4], 0, 0);
        const layer2 = map.createStaticLayer('Tile Layer 2', [tileSet1], 0, 0);
        const layer3 = map.createStaticLayer('Tile Layer 3', [tileSet1], 0, 0);
        const layer4 = map.createStaticLayer('Tile Layer 4', [tileSet1], 0, 0);
        layer2.setCollisionByProperty({ collides: true });
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Start");
        this.player = new Player(this, spawnPoint['x'], spawnPoint['y']);
        this.physics.add.collider(this.player.worldImage, layer2);
        const camera = this.cameras.main;
        camera.startFollow(this.player.worldImage);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        const houseDoorObject = map.findObject("Objects", obj => obj.name === "House Door");
        const houseDoor = this.physics.add
            .image(houseDoorObject['x'], houseDoorObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(houseDoorObject['width'], houseDoorObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.player.worldImage, houseDoor, () => this.scene.start("House"));
        const enemyObject = map.findObject("Objects", obj => obj.name === "Goblin");
        const enemy = this.physics.add
            .image(enemyObject['x'], enemyObject['y'], 'enemies', 2)
            .setOrigin(0, 0)
            .setDisplaySize(enemyObject['width'], enemyObject['height'])
            // .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.player.worldImage, enemy, () => this.scene.start("Fight"));
        const barracksObject = map.findObject("Objects", obj => obj.name === "Barracks");
        const barracks = this.physics.add
            .image(barracksObject['x'], barracksObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(barracksObject['width'], barracksObject['height'])
            .setVisible(false)
            .setImmovable();
        let layer4visible = true;
        this.physics.add.overlap(this.player.worldImage, barracks, () => {
            if (layer4visible) {
                layer4.setVisible(false);
                layer4visible = false;
            }
        });
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
//# sourceMappingURL=worldMap.js.map