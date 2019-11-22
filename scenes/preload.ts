export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({key: 'Preload'});
    }

    preload() {
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 70,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 25,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(Math.floor(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
        
        this.load.image('base', 'assets/images/Pipoya RPG Tileset 32x32/[Base]BaseChip_pipo.png');
        this.load.image('dirt1-dirt2', 'assets/images/Pipoya RPG Tileset 32x32/[A]_type3/[A]Dirt1-Dirt2_pipo.png');
        this.load.image('grass1', 'assets/images/Pipoya RPG Tileset 32x32/[A]_type3/[A]Grass1_pipo.png');
        this.load.image('grass1-dirt2', 'assets/images/Pipoya RPG Tileset 32x32/[A]_type3/[A]Grass1-Dirt2_pipo.png');
        this.load.image('castle', 'assets/images/castle.png');
        this.load.image('interface', 'assets/images/interface/Interface.png');
        this.load.image('weakling', 'assets/images/characters/weakling.png');
        this.load.image('boar-avatar', 'assets/images/characters/boar-avatar.png');
        this.load.spritesheet('solider', 'assets/images/characters/PIPOYA FREE RPG Character Sprites 32x32/Soldier/Soldier 01-1.png',{frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('enemies', 'assets/images/characters/RoguelikeSprites@512_mod.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet("player", "assets/images/sprites/Martha Pink.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("icons", "assets/images/Shikashi's Fantasy Icons Pack/Background 2c.png", {frameWidth: 32, frameHeight: 32});
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/caltor.json');
        this.load.tilemapTiledJSON('house', 'assets/tilemaps/house.json');
        this.load.tilemapTiledJSON('fight', 'assets/tilemaps/fight.json');
    }
    create() {
        console.log('Preload done, calling WorldMap');
        this.scene.start("Fight");
    }
}