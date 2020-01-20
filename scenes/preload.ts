import {Player, playerInstance} from "../entities/player.js";

export class PreloadScene extends Phaser.Scene {
    private player: Player;
    constructor() {
        super({key: 'Preload'});
    }

    preload() {
        this.player = playerInstance;
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

        // Tilesets
        this.load.image('base', 'assets/images/tilesets/main.png');
        this.load.image('dirt1-dirt2', 'assets/images/tilesets/dirt1-dirt2.png');
        this.load.image('grass1', 'assets/images/tilesets/grass1.png');
        this.load.image('grass4', 'assets/images/tilesets/grass4.png');
        this.load.image('dirt1', 'assets/images/tilesets/dirt1.png');
        this.load.image('dirt2', 'assets/images/tilesets/dirt2.png');
        this.load.image('dirt4', 'assets/images/tilesets/dirt4.png');
        this.load.image('water2', 'assets/images/tilesets/water2.png');
        this.load.image('grass1-dirt1', 'assets/images/tilesets/grass1-dirt1.png');
        this.load.image('grass1-dirt2', 'assets/images/tilesets/grass1-dirt2.png');
        this.load.image('grass1-dirt4', 'assets/images/tilesets/grass1-dirt4.png');
        this.load.image('flowers', 'assets/images/tilesets/flowers.png');
        this.load.image('castle', 'assets/images/tilesets/castle.png');

        // Interface
        this.load.image('interface', 'assets/images/interface/Interface.png');
        this.load.image('debug-icon', 'assets/images/interface/debug-icon.png');
        this.load.spritesheet("action-points", "assets/images/interface/action-points.png", {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("icons", 'assets/images/interface/icons-with-background.png', {frameWidth: 32, frameHeight: 32});

        // World characters images
        this.load.spritesheet("martha-pink", "assets/images/characters/world-map/party/martha-pink.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("martha-blond", "assets/images/characters/world-map/party/martha-blond.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("martha-green", "assets/images/characters/world-map/party/martha-green.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("jeremy-pink", "assets/images/characters/world-map/party/jeremy-pink.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("jeremy-blond", "assets/images/characters/world-map/party/jeremy-blond.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("jeremy-green", "assets/images/characters/world-map/party/jeremy-green.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('solider', 'assets/images/characters/world-map/neutral/solider.png',{frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('fisherman', 'assets/images/characters/world-map/neutral/fisherman.png',{frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('enemies', 'assets/images/characters/various-enemies.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet("stranger", "assets/images/characters/world-map/neutral/stranger.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("trader", "assets/images/characters/world-map/neutral/trader.png", {frameWidth: 32, frameHeight: 32});

        // Battle characters images
        this.load.image('weakling', 'assets/images/characters/battle/party/weakling.png');
        this.load.image('elder', 'assets/images/characters/battle/party/elder.png');
        this.load.image('boar-avatar', 'assets/images/characters/battle/enemies/boar.png');
        this.load.image("dead-character", "assets/images/characters/battle/dead-character.png");

        // Items
        this.load.image("rope-belt", "assets/images/items/rope-belt.png");
        this.load.image("bag-green", "assets/images/items/bag-green.png");
        this.load.image("allpowerful-necklace", "assets/images/items/allpowerful-necklace.png");
        this.load.spritesheet("potion-sheet", "assets/images/items/potion-sheet.png",{frameWidth: 64, frameHeight: 64, spacing: 1, margin:1});
        this.load.spritesheet("icon-item-set", "assets/images/items/icon-item-set.png",{frameWidth: 32, frameHeight: 32});

        // Animations
        this.load.spritesheet("light-pillar", "assets/images/animations/light-pillar/light-pillar-yellow.png", {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet("light-pillar-back", "assets/images/animations/light-pillar/light-pillar-yellow-back.png", {frameWidth: 192, frameHeight: 192});
        this.load.spritesheet("light-pillar-front", "assets/images/animations/light-pillar/light-pillar-yellow-front.png", {frameWidth: 192, frameHeight: 192});

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('caltor', 'assets/tilemaps/caltor.json');
        this.load.tilemapTiledJSON('house', 'assets/tilemaps/house.json');
        this.load.tilemapTiledJSON('village', 'assets/tilemaps/village.json');
        this.load.tilemapTiledJSON('fight', 'assets/tilemaps/fight.json');
        this.load.tilemapTiledJSON('hargkakhsCave', 'assets/tilemaps/hargkakhsCave.json');
    }
    create() {
        this.createAnimations();
        console.log('Preload done, calling Caltor');
        this.scene.start("Caltor");
    }

    private createAnimations() {
        this.anims.create({
            key: 'walk_down',
            frames: this.anims.generateFrameNames(this.player.worldImageSpriteParams.texture, {start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_up',
            frames: this.anims.generateFrameNames(this.player.worldImageSpriteParams.texture, {start: 9, end: 11}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNames(this.player.worldImageSpriteParams.texture, {start: 6, end: 8}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNames(this.player.worldImageSpriteParams.texture, {start: 3, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_up',
            frames: [{key: this.player.worldImageSpriteParams.texture, frame: 10}],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_down',
            frames: [{key: this.player.worldImageSpriteParams.texture, frame: 1}],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_left',
            frames: [{key: this.player.worldImageSpriteParams.texture, frame: 4}],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_right',
            frames: [{key: this.player.worldImageSpriteParams.texture, frame: 7}],
            frameRate: 10,
            repeat: -1
        });
    }
}